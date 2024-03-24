const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

router.post('/', async (req, res) => {
  const answer = Math.floor(Math.random() * 2) > 0;
  const problemId = req.body.problemId;
  const submission = req.body.submission;

  if (answer) {
    return res.json({
      status: 'AC',
    });
  } else {
    return res.json({
      status: 'WA',
    });
  }
});

module.exports = router;
