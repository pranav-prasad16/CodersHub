const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const Docker = require('dockerode');
const databaseUrl = process.env.DATABASE_URL;

//routes
const signupRouter = require('./routes/signup');
const loginRouter = require('./routes/login');
const profileRouter = require('./routes/profile');
const questionRouter = require('./routes/question');
const runRouter = require('./routes/run');
const submissionRouter = require('./routes/submission');
const contactRouter = require('./routes/contact');

const { mongodbConnect } = require('./config/database');

const authMiddleware = require('./middleware/auth');

// Load environment variables from the .env file
dotenv.config();

const app = express();
const port = process.env.PORT;

// Allow requests from the frontend
const corsOptions = {
  origin: 'http://localhost:2717',
  methods: 'GET, PUT, PATCH POST, DELETE',
  credentials: true,
  OptionSuccessStaus: 204,
};

// using cors middleware
app.use(cors(corsOptions));

mongoose
  .connect(databaseUrl)
  .then(() => console.log('Mongodb connected'))
  .catch((err) => console.log('Error', err));

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // For serving static files from public directory
app.use(express.json()); // For parsing application/json

app.get('/', (req, res) => {
  res.send('Hello everyone!');
  // console.log(USERS);
});

app.use('/api/signup', signupRouter);

app.use('/api/login', loginRouter);

app.use('/api/profile', profileRouter);

app.use('/api/questions', questionRouter);

app.use('/api/run', runRouter);

app.use('/api/submissions', submissionRouter);

app.use('/api/contact', contactRouter);

app.use('/api/admin', (req, res) => {
  const { question } = req.body.question;

  QUESTIONS.push(question);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
