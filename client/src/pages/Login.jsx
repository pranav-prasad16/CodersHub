import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isWrong, setIsWrong] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const { onLogin, problemId, setUserId } = props;
  const loginURL = 'https://codershub-api.onrender.com/api/login';

  const handleLogin = async (event) => {
    event.preventDefault();
    // Clear previous error messages
    setErrorMessage('');
    setIsWrong(false);
    setIsSuccess(false);

    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      // Successful login
      const json = await response.json();
      const token = json.token;
      const userId = json.userId;
      onLogin(token);
      sessionStorage.setItem('UserId', userId);
      setUserId(userId);
      setIsSuccess(true);
      const url = `/problem/${problemId}`;
      setTimeout(() => {
        if (problemId) {
          navigate(url);
        } else {
          navigate('/'); // Redirect to /problems if problemId is not available
        }
      }, 1000);
    } else {
      // Error occurred
      const json = await response.json();
      const errorResponse = json.message;
      setErrorMessage(errorResponse); // Set the error message state
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
