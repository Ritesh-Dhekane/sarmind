// backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const questionRoutes = require('./routes/question');
const answerRoutes = require('./routes/answer');
const sectionRoutes = require('./routes/section');

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());

// Middleware
app.use(cors());
app.use(express.json()); // Replaces body-parser

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/answers', answerRoutes);
app.use('/api/sections', sectionRoutes);

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/quizApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected');
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
});
