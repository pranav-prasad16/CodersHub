const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/middleware');
const Submission = require('../models/submission-model'); // Import your Submission model

router.post('/submissions', auth, async (req, res) => {
  const answer = Math.floor(Math.random() * 2) > 0;
  const problemId = req.body.problemId;
  const submissionText = req.body.submission;
  const userId = req.userId; // Assuming you have the user ID from the authentication middleware

  try {
    const status = answer ? 'AC' : 'WA';

    // Create a new Submission document
    const newSubmission = new Submission({
      submission: submissionText,
      problemId,
      userId,
      status,
    });

    // Save the submission to the database
    await newSubmission.save();

    return res.json({
      submission: submissionText,
      problemId,
      userId,
      status,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to save the submission' });
  }
});

router.get('/submission/:problemId', auth, async (req, res) => {
  const problemId = req.params.problemId;
  const userId = req.userId; // Assuming you have the user ID from the authentication middleware

  try {
    // Find all submissions for the specified problem ID and user ID
    const submissions = await Submission.find({ problemId, userId });

    res.json({ submissions });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to retrieve submissions' });
  }
});

module.exports = router;
