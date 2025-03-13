
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/events');
const speakerRoutes = require('./routes/speakers');
const ticketRoutes = require('./routes/tickets');
const userRoutes = require('./routes/users');
const { authenticateToken } = require('./middleware/auth');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/speakers', speakerRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/users', authenticateToken, userRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Event Management API is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
