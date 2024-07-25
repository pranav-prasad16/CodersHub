const express = require('express');
const Question = require('../models/question-model');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { json } = require('body-parser');

router.use(authMiddleware);

router.post('/', async (req, res) => {
  const answer = Math.floor(Math.random() * 2) > 0;
  const { problemId, submittedCode, languageId } = req.body;
  //testing for body content received
  console.log(problemId);
  console.log(submittedCode);
  console.log(languageId);
  const question = await Question.findOne({ id: problemId });
  //testing for the actual question received
  console.log(question);
  console.log(question.input);
  console.log(question.output);

  try {
    const responseToJudge = await fetch(
      'https://judge0-ce.p.rapidapi.com/submissions?fields=*',
      {
        method: 'POST',
        headers: {
          'x-rapidapi-key':
            '1bdbb89fcdmshe1b63b938f1bc95p1e59f4jsnca8f24cd9b06',
          'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          source_code: submittedCode,
          language_id: languageId,
          stdin: question.input,
          expected_output: question.output,
        }),
      }
    );

    if (!responseToJudge.ok) {
      throw new Error(`Judge0 API error: ${responseToJudge.statusText}`);
    }

    const judgeResponseJson = await responseToJudge.json();
    const submissionToken = judgeResponseJson.token;
    const getJudgeResult = async () => {
      const resultResponse = await fetch(
        `https://judge0-ce.p.rapidapi.com/submissions/${submissionToken}?base64_encoded=true&fields=*`,
        {
          method: 'GET',
          headers: {
            'x-rapidapi-key': 'YOUR_RAPIDAPI_KEY',
            'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
          },
        }
      );

      if (!resultResponse.ok) {
        throw new Error(
          `Judge0 result API error: ${resultResponse.statusText}`
        );
      }

      return resultResponse.json();
    };

    // might be the reason for error ------------->
    // Adding delay for result polling
    await new Promise((resolve) => setTimeout(resolve, 3000)); // Wait for 3 seconds before checking results

    const result = getJudgeResult();

    const isCorrectOutput = checkOutput(result.stdout, question.output);
    if (isCorrectOutput > 0)
      return res.status(201).json({ message: 'AC', isCorrectOutput });
    return res.status(201).json({ message: 'WA', isCorrectOutput });
  } catch (error) {
    console.log('Error : ', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

const checkOutput = (actualOutput, expectedOutput) => {
  try {
    const actual = JSON.parse(actualOutput);
    const expected = JSON.parse(expectedOutput);

    return actual.trim() === expected.trim();
  } catch (error) {
    return actualOutput.trim() === expectedOutput.trim();
  }
};

module.exports = router;
