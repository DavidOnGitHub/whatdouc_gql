const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  content: { type: String, required: false },
  location: {
    type: { type: String, required: true },
    coordinates: { type: [Number], required: true }
  },
  questionId: { type: String, required: true },
  userId: { type: String, required: true },
  created: { type: Date, required: true },
  edited: { type: Date, required: true }
});

module.exports = mongoose.model('Answer', schema);
