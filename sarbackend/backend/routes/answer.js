const express = require('express');
const router = express.Router();
const Answer = require('../models/Answer');

router.post('/', async (req, res) => {
  const answer = new Answer(req.body);
  await answer.save();
  res.send({ message: 'Answer saved' });
});

module.exports = router;
