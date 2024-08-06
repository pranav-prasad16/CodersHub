import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import left from './../assets/logo/skip-back.svg';
import right from './../assets/logo/skip-forward.svg';

const Problems = (props) => {
  const [problems, setProblems] = useState([]);
  const { setProblemId } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const problemsPerPage = 15;

  const init = async () => {
    const questionsURL = 'https://codershub-api.onrender.com/api/questions';
    const response = await fetch('http://localhost:3000/api/questions', {
      method: 'GET',
    });

    if (response.ok) {
      const json = await response.json();
      setProblems(json.problems);
    } else {
      setProblems(null);
    }
    setLoading(false);
  };

  const handleProblemClick = (id) => {
    if (id) {
      setProblemId(id);
    }
  };

  const difficultyColor = (value) => {
    if (value === 'Easy') {
      return 'text-success';
    } else if (value === 'Medium') {
      return 'text-warning';
    } else return 'text-danger';
  };

  useEffect(() => {
    init();
  }, []);

  const startIndex = (currentPage - 1) * problemsPerPage;
  const endIndex = currentPage * problemsPerPage;
  const displayedProblems = problems.slice(startIndex, endIndex);

  const totalPages = Math.ceil(problems.length / problemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (loading) {
    return (
      <div className="container text-center">
        <h2 className="mt-3 message-center">Loading...</h2>
      </div>
    );
  }

  return (
    <div className="bg-customize">
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th className="col">ID</th>
              <th className="col">TITLE</th>
              <th className="col">ACCEPTANCE RATE</th>
              <th className="col">DIFFICULTY</th>
            </tr>
          </thead>
          <tbody>
            {displayedProblems.map((problem, index) => (
              <tr key={problem._id}>
                <th>{problem.id}</th>
                <td>
                  <Link
                    to={`/problem/${problem._id}`}
                    onClick={() => handleProblemClick(problem._id)}
                    className="problems-link"
                  >
                    {problem.title}
                  </Link>
                </td>
                <td>{problem.acceptanceRate}</td>
                <td className={`${difficultyColor(problem.difficulty)}`}>
                  {problem.difficulty}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="d-flex justify-content-center align-items-center">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="btn btn-sm btn-outline-secondary"
          >
            <img src={left} alt="previous button" className="logo-btn" />
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="btn btn-sm btn-outline-secondary"
          >
            <img src={right} alt="next button" className="logo-btn" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Problems;
