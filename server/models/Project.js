const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: [
      'Graphic Design', 'Web Development', 'Content Writing', 
      'AI Data Tasks', 'Video Editing', 'Presentation Design', 'Research Assistance'
    ],
    required: true
  },
  rewardParams: {
    credits: {
      type: Number,
      required: true,
      min: 1
    }
  },
  status: {
    type: String,
    enum: ['open', 'assigned', 'submitted', 'completed', 'cancelled'],
    default: 'open'
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  worker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  deliverables: [{
    fileUrl: String,
    description: String,
    submittedAt: Date
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);
