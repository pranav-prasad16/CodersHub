const mongoose = require('mongoose');
const Contact = require('../models/contact-model'); // Import the User model you defined
const CONTACTS = require('../data/contacts');
async function loadLocalContactsToDatabase() {
  try {
    for (const contactData of CONTACTS) {
      const existingContact = await Contact.findOne({
        email: contactData.email,
      });

      if (!existingContact) {
        const newContact = new Contact(contactData);
        await newContact.save();
        console.log(`Contact has been saved to the database.`);
      } else {
        console.log(`Contact already exists in the database.`);
      }
    }
  } catch (err) {
    console.error('Error loading questions to the database:', err);
  } finally {
    mongoose.connection.close();
  }
}

module.exports = { loadLocalContactsToDatabase };
