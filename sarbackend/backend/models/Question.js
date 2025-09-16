const mongoose = require('mongoose');
const questionSchema = new mongoose.Schema({
  section: { type: String, required: true },
  questionText: String,
  questionImage: String,
  questionAudio: String,
  options: [
    {
      type: { type: String, enum: ['text', 'image', 'audio'], required: true },
      content: { type: String, required: true }
    }
  ],
  correctAnswer: { type: String, enum: ['a', 'b', 'c', 'd'], required: true }
});
module.exports = mongoose.model('Question', questionSchema);