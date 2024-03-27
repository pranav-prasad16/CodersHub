const express = require('express');
const Question = require('../models/question-model');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const questions = await Question.find();
    if (!questions) {
      return res.status(404).json({ msg: 'No questions found' });
    }
    return res.status(200).json({ problems: questions });
  } catch (err) {
    return res
      .status(500)
      .json({ error: 'Failed to retrieve questions from the database' });
  }
});

router.use(authMiddleware);

router.get('/:questionId', async (req, res) => {
  const questionId = req.params.questionId;

  try {
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    return res.status(200).json(question);
  } catch (error) {
    console.log('Error : ', error);
    return res.status(500).json({ error: 'Failed to retrieve the question' });
  }
});

module.exports = router;
