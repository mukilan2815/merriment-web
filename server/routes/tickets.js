
const express = require('express');
const Ticket = require('../models/Ticket');
const Event = require('../models/Event');
const { authenticateToken, isAdmin } = require('../middleware/auth');

const router = express.Router();

// Get all tickets (admin only)
router.get('/', authenticateToken, isAdmin, async (req, res) => {
  try {
    const tickets = await Ticket.find()
      .populate('eventId', 'title date')
      .populate('userId', 'name email');
    res.json(tickets);
  } catch (error) {
    console.error('Get tickets error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user tickets
router.get('/my-tickets', authenticateToken, async (req, res) => {
  try {
    const tickets = await Ticket.find({ userId: req.user._id })
      .populate('eventId', 'title date location image price');
    res.json(tickets);
  } catch (error) {
    console.error('Get user tickets error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get tickets by event
router.get('/event/:eventId', authenticateToken, isAdmin, async (req, res) => {
  try {
    const tickets = await Ticket.find({ eventId: req.params.eventId })
      .populate('userId', 'name email');
    res.json(tickets);
  } catch (error) {
    console.error('Get event tickets error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Book ticket
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { eventId, quantity } = req.body;
    
    // Find event
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    // Check available seats
    if (event.availableSeats < quantity) {
      return res.status(400).json({ message: 'Not enough available seats' });
    }
    
    // Calculate total price
    const totalPrice = event.price * quantity;
    
    // Create ticket
    const newTicket = new Ticket({
      eventId,
      userId: req.user._id,
      quantity,
      totalPrice,
    });
    
    // Update available seats
    event.availableSeats -= quantity;
    await event.save();
    
    // Save ticket
    const savedTicket = await newTicket.save();
    
    // Return ticket with populated event data
    const populatedTicket = await Ticket.findById(savedTicket._id)
      .populate('eventId', 'title date location image price');
    
    res.status(201).json(populatedTicket);
  } catch (error) {
    console.error('Book ticket error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Cancel ticket
router.put('/cancel/:id', authenticateToken, async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    
    // Check if user owns the ticket or is admin
    if (ticket.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    // Update ticket status
    ticket.status = 'cancelled';
    await ticket.save();
    
    // Return available seats
    const event = await Event.findById(ticket.eventId);
    if (event) {
      event.availableSeats += ticket.quantity;
      await event.save();
    }
    
    res.json(ticket);
  } catch (error) {
    console.error('Cancel ticket error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
