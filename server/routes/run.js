const express = require('express');
const dotenv = require('dotenv');
const Question = require('../models/question-model');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

dotenv.config();

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
router.use(authMiddleware);

const languageCodeMap = {
  cpp: 54,
  python: 92,
  javascript: 93,
  java: 91,
};

router.post('/', async (req, res) => {
  const { problemId, submittedCode, language } = req.body;
  const question = await Question.findById(problemId);
  const languageId = languageCodeMap[language];

  try {
    const responseToJudge = await fetch(
      'https://judge0-ce.p.rapidapi.com/submissions?fields=*',
      {
        method: 'POST',
        headers: {
          'x-rapidapi-key': RAPIDAPI_KEY,
          'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language_id: languageId,
          source_code: submittedCode,
          stdin: question.input.toString(),
          expected_output: question.output.toString(),
        }),
      }
    );

    if (!responseToJudge.ok) {
      const errorBody = await responseToJudge.text();
      throw new Error(`Judge0 API error: ${errorBody}`);
    }

    const judgeResponseJson = await responseToJudge.json();
    const submissionToken = judgeResponseJson.token;

    const getJudgeResult = async () => {
      let attempts = 0;
      let resultResponse;

      while (attempts < 5) {
        resultResponse = await fetch(
          `https://judge0-ce.p.rapidapi.com/submissions/${submissionToken}?base64_encoded=true&fields=*`,
          {
            method: 'GET',
            headers: {
              'x-rapidapi-key': RAPIDAPI_KEY,
              'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
            },
          }
        );

        if (resultResponse.ok) break;
        await new Promise((resolve) => setTimeout(resolve, 2000));
        attempts++;
      }

      if (!resultResponse.ok) {
        throw new Error(
          `Judge0 result API error: ${resultResponse.statusText}`
        );
      }

      return resultResponse.json();
    };

    await new Promise((resolve) => setTimeout(resolve, 3000));

    const result = await getJudgeResult();
    // console.log('Result obj:', result);

    const decodedOutput = result.stdout
      ? Buffer.from(result.stdout, 'base64').toString('utf8').trim()
      : '';
    const decodedStderr = result.stderr
      ? Buffer.from(result.stderr, 'base64').toString('utf8').trim()
      : '';

    console.log('Decoded stderr:', decodedStderr);

    const expectedOutput = question.output.toString();
    const isCorrectOutput = checkOutput(decodedOutput, expectedOutput);
    // console.log('Decoded output: ', decodedOutput);
    // console.log('Expected output: ', expectedOutput);

    if (isCorrectOutput) {
      return res
        .status(201)
        .json({ status: 'AC', message: 'Passed all the test cases' });
    } else {
      return res
        .status(201)
        .json({ status: 'WA', message: result.status.description });
    }
  } catch (error) {
    console.error('Error: ', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

const checkOutput = (actualOutput, expectedOutput) => {
  return actualOutput === expectedOutput;
};

module.exports = router;
