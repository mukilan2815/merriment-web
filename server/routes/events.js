
const express = require('express');
const Event = require('../models/Event');
const { authenticateToken, isAdmin } = require('../middleware/auth');

const router = express.Router();

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().populate('speakers', 'name role company image featured');
    res.json(events);
  } catch (error) {
    console.error('Get events error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get featured events
router.get('/featured', async (req, res) => {
  try {
    const events = await Event.find({ featured: true }).populate('speakers', 'name role company image featured');
    res.json(events);
  } catch (error) {
    console.error('Get featured events error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get event by ID
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('speakers');
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    res.json(event);
  } catch (error) {
    console.error('Get event error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create event (admin only)
router.post('/', authenticateToken, isAdmin, async (req, res) => {
  try {
    const newEvent = new Event({
      ...req.body,
      createdBy: req.user._id
    });
    
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    console.error('Create event error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update event (admin only)
router.put('/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    ).populate('speakers');
    
    res.json(updatedEvent);
  } catch (error) {
    console.error('Update event error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete event (admin only)
router.delete('/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Delete event error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Search events
router.get('/search/:query', async (req, res) => {
  try {
    const query = req.params.query;
    const events = await Event.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } }
      ]
    }).populate('speakers', 'name role company image featured');
    
    res.json(events);
  } catch (error) {
    console.error('Search events error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
