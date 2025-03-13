
const express = require('express');
const Speaker = require('../models/Speaker');
const { authenticateToken, isAdmin } = require('../middleware/auth');

const router = express.Router();

// Get all speakers
router.get('/', async (req, res) => {
  try {
    const speakers = await Speaker.find();
    res.json(speakers);
  } catch (error) {
    console.error('Get speakers error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get featured speakers
router.get('/featured', async (req, res) => {
  try {
    const speakers = await Speaker.find({ featured: true });
    res.json(speakers);
  } catch (error) {
    console.error('Get featured speakers error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get speaker by ID
router.get('/:id', async (req, res) => {
  try {
    const speaker = await Speaker.findById(req.params.id);
    
    if (!speaker) {
      return res.status(404).json({ message: 'Speaker not found' });
    }
    
    res.json(speaker);
  } catch (error) {
    console.error('Get speaker error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create speaker (admin only)
router.post('/', authenticateToken, isAdmin, async (req, res) => {
  try {
    const newSpeaker = new Speaker({
      ...req.body,
      createdBy: req.user._id
    });
    
    const savedSpeaker = await newSpeaker.save();
    res.status(201).json(savedSpeaker);
  } catch (error) {
    console.error('Create speaker error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update speaker (admin only)
router.put('/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const speaker = await Speaker.findById(req.params.id);
    
    if (!speaker) {
      return res.status(404).json({ message: 'Speaker not found' });
    }
    
    const updatedSpeaker = await Speaker.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    
    res.json(updatedSpeaker);
  } catch (error) {
    console.error('Update speaker error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete speaker (admin only)
router.delete('/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const speaker = await Speaker.findById(req.params.id);
    
    if (!speaker) {
      return res.status(404).json({ message: 'Speaker not found' });
    }
    
    await Speaker.findByIdAndDelete(req.params.id);
    res.json({ message: 'Speaker deleted successfully' });
  } catch (error) {
    console.error('Delete speaker error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
