import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import openLinkLogo from '../assets/logo/openlink.svg';
import logo from './../assets/logo/png black.svg';
import runLogo from './../assets/logo/run.svg';
import submitLogo from './../assets/logo/submit.svg';
import Editor from '@monaco-editor/react';
import AuthContext from '../context/AuthContext';

const ProblemDetails = () => {
  const { pid } = useParams();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submittedCode, setSubmittedCode] = useState('');
  const [result, setResult] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  const [language, setLanguage] = useState('');
  const [submissions, setSubmissions] = useState([]);
  const [showSubmissions, setShowSubmissions] = useState(false);
  const { user } = useContext(AuthContext);
  const tokenId = user.token;
  const userId = user.userId;

  const init = async () => {
    const response = await fetch(
      'https://codershub-api.onrender.com/api/questions/' + pid,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${tokenId}`,
        },
      }
    );

    if (response.ok) {
      const problem = await response.json();
      setProblem(problem);
    } else {
      setProblem(null);
    }
    setLoading(false);
  };

  const handleSubmit = () => {
    postSubmit();
    getSubmit();
  };

  useEffect(() => {
    init();
  }, []);

  const postSubmit = async () => {
    const response = await fetch(
      'https://codershub-api.onrender.com/api/submissions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${tokenId}`,
        },
        body: JSON.stringify({
          problemId: pid,
          submittedCode: submittedCode,
          userId: `${userId}`,
        }),
      }
    );

    const json = await response.json();
    console.log(json);
  };

  const getSubmit = async () => {
    const response = await fetch(
      'https://codershub-api.onrender.com/api/submissions/' + pid,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${tokenId}`,
        },
      }
    );
    const json = await response.json();
    console.log(json);
  };

  const handleRun = async () => {
    const response = await fetch('https://codershub-api.onrender.com/api/run', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${tokenId}`,
      },
      body: JSON.stringify({
        problemId: pid,
        submittedCode: submittedCode,
        language: language,
      }),
    });

    const json = await response.json();
    setResult(json.status);
    setResultMessage(json.message);
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

  const renderArray = (arr) => {
    return (
      <span>
        {' '}
        [
        {arr.map((item, index) => (
          <span key={index}>
            {Array.isArray(item) ? renderArray(item) : item.toString()}
            {index < arr.length - 1 && ', '}
          </span>
        ))}
        ]
      </span>
    );
  };

  const renderContent = (content) => {
    if (Array.isArray(content)) {
      return renderArray(content);
    } else if (typeof content === 'object' && content !== null) {
      return <pre>{JSON.stringify(content, null, 2)}</pre>;
    } else if (content === true) {
      return 'true';
    } else if (content === false) {
      return 'false';
    } else {
      return content;
    }
  };

  if (loading) {
    return (
      <div className="container text-area">
        <h1 className="mt-3 message-center">Loading...</h1>
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="container text-area">
        <h1 className="mt-3 message-center">This problem doesn't exist!</h1>
      </div>
    );
  }

  return (
    <div className="bg-customize">
      <div className="row">
        <div className="col-5">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="Your Logo" className="logo" />
          </Link>
        </div>
        <div className="col-6" style={{ marginTop: '.5rem' }}>
          <Link className="all-problems-link" to="/problems">
            <h5>
              <Link to="/problems" className="start-coding">
                All Problems
                <img
                  src={openLinkLogo}
                  alt="open link logo"
                  className="icon-filter"
                />
              </Link>
            </h5>
          </Link>
        </div>
      </div>
      <main className="custom-container">
        <div className="row">
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
              <h4>Acceptance Rate: {problem.acceptanceRate}</h4>
            </div>
            <div>
              <h4>Description:</h4>
              <h5>{problem.description}</h5>
            </div>
            <div>
              <h4>Input:</h4>
              {renderContent(problem.input)}
            </div>
            <div>
              <h4>Output:</h4>
              {renderContent(problem.output)}
            </div>
            <div>
              {showResult && (
                <div>
                  <div>Result: {generateResult(result)}</div>
                  <div>Message: {resultMessage}</div>
                </div>
              )}
            </div>
          </section>
          <section className="col-md-5">
            <div>
              <div>
                <button
                  className="btn"
                  style={{
                    background: language === 'cpp' ? 'black' : 'white',
                    color: language === 'cpp' ? 'white' : 'black',
                  }}
                  onClick={() => {
                    setLanguage('cpp');
                  }}
                >
                  C++
                </button>
                <button
                  className="btn"
                  style={{
                    background: language === 'java' ? 'black' : 'white',
                    color: language === 'java' ? 'white' : 'black',
                  }}
                  onClick={() => {
                    setLanguage('java');
                  }}
                >
                  Java
                </button>
                <button
                  className="btn"
                  style={{
                    background: language === 'python' ? 'black' : 'white',
                    color: language === 'python' ? 'white' : 'black',
                  }}
                  onClick={() => {
                    setLanguage('python');
                  }}
                >
                  Python
                </button>
              </div>
              <h5>Write your code here:</h5>
              <div className="editor-container">
                <Editor
                  max-width="100%"
                  height="100vh"
                  theme="vs-dark"
                  defaultLanguage={language}
                  defaultValue="// write your code here --->"
                  value={submittedCode}
                  onChange={(e) => setSubmittedCode(e)}
                  options={{
                    minimap: { enabled: false },
                    automaticLayout: true,
                  }}
                />
              </div>
            </div>
            <div className="d-grid gap-1 d-md-flex run-submit-div">
              <button
                type="button"
                onClick={handleRun}
                className="btn btn-success"
              >
                <img
                  src={runLogo}
                  alt="run button logo"
                  className="icon-filter"
                />{' '}
                Run
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="btn btn-success"
              >
                <img
                  src={submitLogo}
                  alt="submit button logo"
                  className="icon-filter"
                />{' '}
                Submit
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ProblemDetails;
