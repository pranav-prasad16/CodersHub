const express = require('express');
const router = express.Router();
const User = require('../models/user-model');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

router.get('/', async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found!' });
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.log('Error : ', error);
    return res.status(500).json({ msg: 'Internal Server error' });
  }
});

module.exports = router;
