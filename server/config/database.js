const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const uri = process.env.DATABASE_URL;

// Connect to MongoDB
const mongodbConnect = mongoose
  .connect(uri)
  .then(() => console.log('Mongodb connected'))
  .catch((err) => console.log('Error', err));

module.exports = { mongodbConnect };
