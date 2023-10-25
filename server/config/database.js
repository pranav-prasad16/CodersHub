const mongoose = require('mongoose');

async function connectMongodB(url) {
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;

  db.on('connected', () => {
    console.log('Connected to MongoDB');
  });

  db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });
  return mongoose.connect(url);
}

module.exports = { connectMongodB };
