require('dotenv').config();
const express = require('express');
const connectDB = require('./config/dataBase');
const cors = require('cors');

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/contacts', require('./routes/contacts'));

// Basic route for health check
app.get('/', (req, res) => {
  res.json({
    message: 'Contacts API is running!',
    version: '1.0.0',
    endpoints: {
      getAllContacts: 'GET /api/contacts',
      getContact: 'GET /api/contacts/:id'
    }
  });
});

// Handle 404 errors
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});