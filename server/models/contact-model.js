const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  userName: String,
  email: String,
  message: String,
});

module.exports = mongoose.model('Contact', contactSchema);
