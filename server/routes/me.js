const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/middleware');
const User = require('../models/user-model');

router.get('/me', auth, async (req, res) => {
  const user = await User.find((user) => user.id === req.userId);
  res.json({ user });
});

module.exports = router;
