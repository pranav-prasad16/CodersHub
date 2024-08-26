const express = require('express');
const Submission = require('../models/submission-model');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

router
  .post('/', async (req, res) => {
    const { userId, problemId, submittedCode, status } = req.body;

    if (!submittedCode || !problemId || !userId || !status) {
      console.log(submittedCode, problemId, userId, status);
      return res.status(401).json({ msg: 'Required fields are empty' });
    }

    const newSubmission = {
      problemId: problemId,
      submittedCode: submittedCode,
      userId: userId,
      status: status,
    };
    try {
      const submittedCode = await Submission.create(newSubmission);

      console.log(submittedCode);
      return res.status(201).json({ msg: 'Code submitted successfully' });
    } catch (error) {
      console.log('Error : ', error);
      return res
        .status(500)
        .json({ message: 'Failed to save the submittedCode' });
    }
  })
  .get('/:problemId', async (req, res) => {
    const problemId = req.params.problemId;
    const { userId } = req.body;

    try {
      const submissions = await Submission.find({ problemId, userId });
      if (!submissions) {
        return res
          .status(404)
          .json({ msg: 'No submittedCode for the user found' });
      }
      return res.status(200).json(submissions);
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Failed to retrieve submissions' });
    }
  });

module.exports = router;
