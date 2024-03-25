const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const Docker = require('dockerode');

//routes
const signupRouter = require('./routes/signup');
const loginRouter = require('./routes/login');
const profileRouter = require('./routes/profile');
const questionRouter = require('./routes/question');
const runRouter = require('./routes/run');
const submissionRouter = require('./routes/submission');
const contactRouter = require('./routes/contact');

// const { mongodbConnect } = require('./config/database');

const authMiddleware = require('./middleware/auth');

// Load environment variables from the .env file
dotenv.config();
const uri = process.env.DATABASE_URL;

const app = express();
const port = process.env.PORT || 3000;

mongoose
  .connect(uri)
  .then(() => console.log('Mongodb connected'))
  .catch((err) => console.log('Error', err));

// using cors middleware
app.use(cors());

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
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
