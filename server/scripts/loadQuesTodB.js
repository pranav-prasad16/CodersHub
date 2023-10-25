const mongoose = require('mongoose');
const Question = require('../models/question-model'); // Import the User model you defined
const QUESTIONS = require('../data/questions');
async function loadLocalQuestionsToDatabase() {
  try {
    for (const questionData of QUESTIONS) {
      const existingQuestion = await Question.findOne({
        id: questionData.id,
      });

      if (!existingQuestion) {
        const question = new Question(questionData);
        await question.save();
        console.log(`Question has been saved to the database.`);
      } else {
        console.log(`Question already exists in the database.`);
      }
    }
  } catch (err) {
    console.error('Error loading questions to the database:', err);
  } finally {
    mongoose.connection.close();
  }
}

module.exports = { loadLocalQuestionsToDatabase };
