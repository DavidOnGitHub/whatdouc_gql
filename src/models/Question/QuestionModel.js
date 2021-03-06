const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  subject: { type: String, required: true },
  content: { type: String, required: false },
  location: {
    type: { type: String, required: true },
    coordinates: { type: [Number], required: true }
  },
  userId: { type: String, required: true },
  created: Date,
  edited: Date,
  upVotes: { type: Number, default: 0 },
  downVotes: { type: Number, default: 0 }
});

module.exports = mongoose.model('Question', schema);
