const express = require('express');
const router = express.Router();
const Question = require('../models/question-model');

router.get('/questions', async (req, res) => {
  try {
    const questions = await Question.find({}, '-__v'); // Exclude the __v field
    res.json({ problems: questions });
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Failed to retrieve questions from the database' });
  }
});

router.get('/question/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const question = await Question.findOne({ id });
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.json({ question });
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve the question' });
  }
});

module.exports = router;
