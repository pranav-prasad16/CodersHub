const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const signupRouter = require('./routes/signup');
const loginRouter = require('./routes/login');
const meRouter = require('./routes/me');
const questionRouter = require('./routes/question');
const runRouter = require('./routes/run');
const submissionRouter = require('./routes/submission');
const contactRouter = require('./routes/contact');
const { loadLocalUsersToDatabase } = require('./scripts/loadUsersTodB');
const { loadLocalQuestionsToDatabase } = require('./scripts/loadQuesTodB');
const { loadLocalSubmissionsToDatabase } = require('./scripts/loadSubmTodB');
const { loadLocalContactsToDatabase } = require('./scripts/loadContactTodB');
const { connectMongodB } = require('./config/database');
const databaseUrl = process.env.DATABASE_URL;
const port = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // For serving static files from public directory
app.use(express.json()); // For parsing application/json
// Allow requests from your frontend domain
app.use(
  cors({
    origin: 'https://codershub-06o7.onrender.com',
  })
);

connectMongodB(databaseUrl);
mongoose.connection.on('open', async () => {
  const User = mongoose.model('User');
  const Question = mongoose.model('Question');
  const Submission = mongoose.model('Submission');
  const Contact = mongoose.model('Contact');

  // Check if there are any existing users in the database
  const existingUsers = await User.find();
  const existingQuestions = await Question.find();
  const existingSubmissions = await Submission.find();
  const existingContacts = await Contact.find();

  // If there are no existing users, load the data
  if (existingUsers.length === 0) {
    loadLocalUsersToDatabase();
  }
  if (existingQuestions.length === 0) {
    loadLocalQuestionsToDatabase();
  }
  if (existingSubmissions.length === 0) {
    loadLocalSubmissionsToDatabase();
  }
  if (existingContacts.length === 0) {
    loadLocalContactsToDatabase();
  }
});

app.get('/', (req, res) => {
  res.send('Hello everyone!');
  // console.log(USERS);
});

app.post('/signup', signupRouter);

app.post('/login', loginRouter);

app.get('/me', meRouter);

app.get('/question/:id', questionRouter);

app.get('/questions', questionRouter);

app.post('/run', runRouter);

app.get('/submission/:problemId', submissionRouter);

app.post('/submissions', submissionRouter);

app.post('/contact', contactRouter);

app.post('/admin', (req, res) => {
  const { question } = req.body.question;

  QUESTIONS.push(question);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
