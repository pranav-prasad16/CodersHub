import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isWrong, setIsWrong] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const signupURL = 'https://codershub-api.onrender.com/api/signup';

  const handleSignup = async () => {
    event.preventDefault();
    // Clear previous messages
    setErrorMessage('');
    setIsWrong(false);
    setIsSuccess(false);
    setIsLoading(true);

    const response = await fetch('http://localhost:3000/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName,
        email,
        password,
      }),
    });

    if (response.ok) {
      setIsSuccess(true);
      const json = await response.json();
      console.log(json);
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } else {
      const json = await response.json();
      const errorResponse = json.message;
      setErrorMessage(errorResponse);
      setIsWrong(true);
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="signup-container">
        <h2>Sign Up</h2>
        <form>
          <div className="form-group">
            <label>User Name:</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            onClick={handleSignup}
            className="custom-btn-purple"
            disabled={isLoading}
          >
            {isLoading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
      </div>
      <div>
        {isWrong && <h6 className="error-message">{errorMessage}</h6>}
        {isSuccess && (
          <h6 className="success-message">
            Signup successful! Redirecting to home. Please log in to continue...
          </h6>
        )}
      </div>
    </>
  );
};

export default Signup;
