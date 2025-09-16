const mongoose = require('mongoose');
const answerSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  questionId: mongoose.Schema.Types.ObjectId,
  selectedOption: String,
});
module.exports = mongoose.model('Answer', answerSchema);
