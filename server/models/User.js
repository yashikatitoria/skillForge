const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    // Validation is handled in the controller (authController.js)
  },
  password: {
    type: String,
    required: true,
    select: false // Don't return password by default
  },
  role: {
    type: String,
    enum: ['worker', 'client', 'admin'],
    default: 'worker'
  },
  credits: {
    type: Number,
    default: 100 // 100 starter credits
  },
  skills: [{
    type: String,
    enum: [
      'Graphic Design', 'Web Development', 'Content Writing', 
      'AI Data Tasks', 'Video Editing', 'Presentation Design', 'Research Assistance'
    ]
  }],
  reputationScore: {
    type: Number,
    default: 0
  },
  isVerifiedContent: {
    type: Boolean,
    default: true // Assuming true for MVP since .edu validates them
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
