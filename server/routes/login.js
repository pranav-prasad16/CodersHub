const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const JWT_SECRET = 'secret';
const User = require('../models/user-model');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({ message: 'Enter all the credentials' });
  }
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // console.log('User-Submitted Password:', password);
    // console.log('Stored Hashed Password:', user.password);

    // Use await to correctly wait for the comparison to complete
    // const passwordMatch = await bcrypt.compare(password, user.password);
    const passwordMatch = password === user.password ? true : false;
    // console.log('Password Match:', passwordMatch);

    if (!passwordMatch) {
      return res.status(403).json({ message: 'Check the password' });
    }

    const token = jwt.sign(
      {
        id: user.id,
      },
      JWT_SECRET
    );
    const userId = user.id;
    // console.log('Logged in successfully!');
    return res.status(200).json({ token, userId });
  } catch (err) {
    console.log('Error : ', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
