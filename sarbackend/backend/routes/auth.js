const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Sign Up
router.post('/signup', async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const user = new User({ username, password, role });
    await user.save();
    res.send({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).send({ error: 'Signup failed' });
  }
});

// Sign In
router.post('/signin', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (user) {
    res.send(user);
  } else {
    res.status(401).send({ message: 'Invalid credentials' });
  }
});

module.exports = router;
