const express = require('express');
const User = require('../models/user-model');
const router = express.Router();

router.post('/', async (req, res) => {
  const userData = req.body;

  if (!userData.userName || !userData.email || !userData.password) {
    return res.status(401).json({ message: 'Enter all the credentials' });
  }

  try {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      return res
        .status(403)
        .json({ message: 'User already exists with given email' });
    }

    const user = await User.create(userData);

    console.log('User created successfully:', user);
    return res.status(200).json({ message: 'User created successfully' });
  } catch (error) {
    console.log('Error : ', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
