const mongoose = require('mongoose');
const Submission = require('../models/submission-model'); // Import the User model you defined
const SUBMISSIONS = require('../data/submissions');
async function loadLocalSubmissionsToDatabase() {
  try {
    for (const submissionData of SUBMISSIONS) {
      const existingSubmission = await Submission.findOne({
        userId: submissionData.userId,
      });

      if (!existingSubmission) {
        const newSubmission = new Submission(submissionData);
        await newSubmission.save();
        console.log(`Submission has been saved to the database.`);
      } else {
        console.log(`Submission already exists in the database.`);
      }
    }
  } catch (err) {
    console.error('Error loading questions to the database:', err);
  } finally {
    mongoose.connection.close();
  }
}

module.exports = { loadLocalSubmissionsToDatabase };
