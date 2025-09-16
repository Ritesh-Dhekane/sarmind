const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

router.post('/create', async (req, res) => {
  const question = new Question(req.body);
  await question.save();
  res.send({ message: 'Question added' });
});

router.get('/', async (req, res) => {
  const questions = await Question.find();
  res.send(questions);
});

module.exports = router;
