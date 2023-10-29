const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/user-model');
const USERS = require('../data/users');

router.post('/signup', async (req, res) => {
  const { userName, email, password } = req.body;

  if (!userName || !email || !password) {
    return res.status(401).json({ message: 'Enter all the credentials' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(403)
        .json({ message: 'User already exists with given email' });
    }

    // Fetch the last user's ID from the database
    const lastUser = await User.findOne({}, {}, { sort: { id: -1 } });

    let nextUserId;
    if (lastUser) {
      // If there's an existing user, increment the ID
      nextUserId = String(Number(lastUser.id) + 1);
    } else {
      // If no user exists, start with ID 1
      nextUserId = '1';
    }

    // const hashedPassword = await bcrypt.hash(password, 10);
    const hashedPassword = password;
    // console.log('Password entered : ', password);
    // console.log('Hashed Password : ', hashedPassword);

    const user = new User({
      id: nextUserId,
      userName,
      email,
      password: hashedPassword,
      role: 'user',
    });

    USERS.push(user);
    await user.save();
    // console.log('User created successfully:', user);
    return res.status(200).json({ message: 'User created successfully' });
  } catch (err) {
    console.log('Error : ', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
