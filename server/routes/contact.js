const express = require('express');
const Contact = require('../models/contact-model');
const router = express.Router();

router.post('/', async (req, res) => {
  const contactData = req.body;

  if (!contactData.userName || !contactData.email || !contactData.message) {
    return res.status(409).json({ message: 'Required fields are empty' });
  }

  try {
    const newContact = await Contact.create(contactData);
    console.log(newContact);

    return res
      .status(201)
      .json({ message: 'Thanks for connecting we will get to you soon' });
  } catch (error) {
    console.log('Error : ', error);
    return res.status(500).json({ message: 'Failed to save the message' });
  }
});

module.exports = router;
