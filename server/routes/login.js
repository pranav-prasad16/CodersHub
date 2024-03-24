const express = require('express');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const User = require('../models/user-model');
const router = express.Router();

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({ message: 'Enter all the credentials' });
  }
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const passwordMatch = password === user.password ? true : false;

    if (!passwordMatch) {
      return res.status(403).json({ message: 'Incorrect password' });
    }

    const userId = user.id;
    const token = jwt.sign(
      {
        id: userId,
      },
      JWT_SECRET
    );
    console.log('Logged in successfully!');
    return res.status(200).json({ token, userId });
  } catch (error) {
    console.log('Error : ', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
