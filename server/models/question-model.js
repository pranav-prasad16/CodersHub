const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  id: String,
  title: String,
  description: String,
  acceptanceRate: String,
  difficulty: String,
  input: mongoose.Schema.Types.Mixed,
  output: mongoose.Schema.Types.Mixed,
});

module.exports = mongoose.model('Question', questionSchema);
