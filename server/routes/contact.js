const express = require('express');
const router = express.Router();
const Contact = require('../models/contact-model');
const CONTACTS = require('../data/contacts');

router.post('/contact', async (req, res) => {
  const { userName, email, message } = req.body;

  if (!userName || !email || !message) {
    return res
      .status(400)
      .json({ message: 'Missing or Empty required fields' });
  }

  try {
    // Create a new Contact document
    const newContact = new Contact({
      userName,
      email,
      message,
    });

    // Save the contact message to the database
    await newContact.save();

    return res.status(201).json({ message: 'We received your message' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to save the message' });
  }
});

module.exports = router;
