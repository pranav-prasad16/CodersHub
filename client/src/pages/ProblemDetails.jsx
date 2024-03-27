import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logo from './../assets/logo/png black.svg';
import Editor from '@monaco-editor/react';

const ProblemDetails = (props) => {
  const { pid } = useParams();
  const [problem, setProblem] = useState('');
  const [submittedCode, setSubmittedCode] = useState('');
  const [result, setResult] = useState('');
  const [showResult, setShowResult] = useState(false); // New state for result visibility
  const [submissions, setSubmissions] = useState([]);
  const [showSubmissions, setShowSubmissions] = useState(false); // state for Getsubmission visibility
  const { userId } = props;

  const init = async () => {
    const response = await fetch('http://localhost:3000/api/questions/' + pid, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('Token')}`, // Set the Authorization header with the token
      },
    });
    const problem = await response.json();
    setProblem(problem);
  };

  const handleSubmit = () => {
    postSubmit();
    getSubmit();
  };

  useEffect(() => {
    init();
  }, []);

  const postSubmit = async () => {
    const response = await fetch('http://localhost:3000/api/submissions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('Token')}`, // Set the Authorization header with the token
      },
      body: JSON.stringify({
        problemId: pid,
        submittedCode: submittedCode,
        userId: `${localStorage.getItem('UserId')}`,
      }),
    });

    const json = await response.json();
    console.log(json);
  };

  const getSubmit = async () => {
    const response = await fetch(
      'http://localhost:3000/api/submissions/' + pid,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('Token')}`, // Set the Authorization header with the token
        },
      }
    );
    const json = await response.json();
    console.log(json);
  };

  const handleRun = async () => {
    const response = await fetch('http://localhost:3000/api/run', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('Token')}`, // Set the Authorization header with the token
      },
      body: JSON.stringify({
        problemId: pid,
        submittedCode: submittedCode,
      }),
    });

    const json = await response.json();
    setResult(json.status);
    setShowResult(true);
  };

  const difficultyColor = (value) => {
    if (value === 'Easy') {
      return 'text-success';
    } else if (value === 'Medium') {
      return 'text-warning';
    } else return 'text-danger';
  };

  const generateResult = (result) => {
    if (result === 'WA') {
      return <span className="text-danger">Wrong Answer</span>;
    } else {
      return <span className="text-success">Accepted</span>;
    }
  };

  if (!problem) {
    return (
      <div className="container text-area">
        <h1 className="my-3">This problem doesn't exist!</h1>
      </div>
    );
  }
  return (
    <>
      <div className="row container">
        <div className="row">
          <div className="col-5">
            <Link className="navbar-brand" to="/">
              <img
                src={logo} // Replace with the actual path to your logo image
                alt="Your Logo"
                className="logo"
              />
            </Link>
          </div>
          <div className="col-6" style={{ marginTop: '.5rem' }}>
            <Link className="problems-link" to="/problems">
              <h4>All Problems</h4>
            </Link>
          </div>
        </div>
        <div>
          <h1>
            {problem.id}. {problem.title}
          </h1>
        </div>
        <section className="col-md-7">
          <div>
            <h4 className={`${difficultyColor(problem.difficulty)}`}>
              {problem.difficulty}
            </h4>
          </div>
          <div>
            <h4>Acceptance Rate : {problem.acceptanceRate}</h4>
          </div>
          <div>
            <h4>Description :</h4>
            <h5>{problem.description}</h5>
          </div>
          <div>Input : {problem.input}</div>
          <div>Output : {problem.output}</div>
          <div>
            {showResult && <div>Result : {generateResult(result)}</div>}
          </div>
        </section>
        <section className="col-md-5">
          <div>
            <h5>Write your code here : </h5>
            <Editor
              width="100%"
              height="100vh"
              theme="vs-dark"
              language="javascript"
              value={submittedCode}
              onChange={setSubmittedCode}
              options={{
                minimap: { enabled: false }, // Disable the minimap
                automaticLayout: true, // Auto-resize the editor
              }}
            />
          </div>
          <div className="d-grid gap-1 d-md-flex">
            <button
              type="button"
              onClick={handleRun}
              className="btn btn-success"
            >
              Run
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="btn btn-success"
            >
              Submit
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default ProblemDetails;
