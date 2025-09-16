const express = require('express');
const router = express.Router();
const Section = require('../models/Section');

// GET all sections
router.get('/', async (req, res) => {
  const sections = await Section.find();
  res.json(sections);
});

// CREATE section
router.post('/create', async (req, res) => {
  try {
    const section = new Section({ name: req.body.name });
    const savedSection = await section.save();
    res.status(201).json(savedSection);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE section
router.delete('/:id', async (req, res) => {
  try {
    await Section.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Section deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
