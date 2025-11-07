const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  favoriteColor: {
    type: String,
    trim: true
  },
  birthday: {
    type: Date
  }
}, {
  timestamps: true
});

// Create index for better query performance
contactSchema.index({ email: 1 });
contactSchema.index({ firstName: 1, lastName: 1 });

module.exports = mongoose.model('Contact', contactSchema);