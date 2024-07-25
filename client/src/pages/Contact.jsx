import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isWrong, setIsWrong] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    // console.log(userName);
    // console.log(email);
    // console.log(message);

    const response = await fetch(
      'https://codershub-api.onrender.com/api/contact',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName, email, message }),
      }
    );
    try {
      if (response.ok) {
        const json = await response.json();
        const successResponse = json.message;
        console.log(successResponse);
        navigate('/contactSuccess');
      } else {
        const json = await response.json();
        const errorResponse = json.message;
        console.log(errorMessage);
        setErrorMessage(errorResponse);
        setIsWrong(true);
      }
    } catch (err) {
      console.log('Error is : ', err);
    }
  };
  return (
    <>
      {isWrong ? (
        <h1>{errorMessage}</h1>
      ) : (
        <div className="container">
          <header className="text-center my-3">
            <h1 className="display-4">Loved our platform?</h1>
            <p className="lead">
              We'd love to hear from you! Please use the form below to get in
              touch.
            </p>
          </header>

          <form>
            <div className="form-group">
              <label>Your Name:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Your Email:</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Message:</label>
              <textarea
                className="form-control"
                rows="4"
                placeholder="Enter your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <button
              type="button"
              className="custom-btn-purple"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Contact;
