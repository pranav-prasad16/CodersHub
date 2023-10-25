const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  submission: String,
  problemId: String,
  userId: String,
  status: String,
});

module.exports = mongoose.model('Submission', submissionSchema);
