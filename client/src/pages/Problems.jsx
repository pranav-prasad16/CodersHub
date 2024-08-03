import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import left from './../assets/logo/skip-back.svg';
import right from './../assets/logo/skip-forward.svg';

const Problems = (props) => {
  const [problems, setProblems] = useState([]);
  const { setProblemId } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const problemsPerPage = 15; // Number of problems to display per page

  const init = async () => {
    const questionsURL = 'https://codershub-api.onrender.com/api/questions';
    const response = await fetch('http://localhost:3000/api/questions', {
      method: 'GET',
    });

    const json = await response.json();
    setProblems(json.problems);
  };

  const handleProblemClick = (id) => {
    // console.log(`Clicked problem with ID: ${id}`);
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

  // Calculate the range of problems to display on the current page
  const startIndex = (currentPage - 1) * problemsPerPage;
  const endIndex = currentPage * problemsPerPage;
  const displayedProblems = problems.slice(startIndex, endIndex);

  // Calculate the total number of pages
  const totalPages = Math.ceil(problems.length / problemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

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
                    to={`/problem/${problem._id}`} // Remove ':' before problem.id
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
