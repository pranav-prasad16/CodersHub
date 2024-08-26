import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isWrong, setIsWrong] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const { problemId } = props;
  const loginURL = 'https://codershub-api.onrender.com/api/login';

  const handleLogin = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    setIsWrong(false);
    setIsSuccess(false);

    const response = await fetch(
      'https://codershub-api.onrender.com/api/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      }
    );

    if (response.ok) {
      const user = await response.json();
      login(user);
      setIsSuccess(true);
      const url = `/problem/${problemId}`;
      setTimeout(() => {
        if (problemId) {
          navigate(url);
        } else {
          navigate('/');
        }
      }, 1000);
    } else {
      const json = await response.json();
      const errorResponse = json.message;
      setErrorMessage(errorResponse);
      setIsWrong(true);
    }
  };

  return (
    <>
      <div className="login-container">
        <h2>Login</h2>
        <form>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            onClick={handleLogin}
            className="custom-btn-purple"
          >
            Login
          </button>
        </form>
      </div>
      <div>
        {isWrong && <h6 className="error-message">{errorMessage}</h6>}
        {isSuccess && <h6 className="success-message">Login successful!...</h6>}
      </div>
    </>
  );
};

export default Login;
