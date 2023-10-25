import React from 'react';
import { Link } from 'react-router-dom';

const About = (props) => {
  const { isAuthenticated } = props;
  return (
    <div className="container">
      <header className="text-center my-3">
        <h1 className="display-4">Welcome to CodersHub</h1>
        <p className="lead">Your Coding Journey Begins Here</p>
      </header>

      <section className="features mt-5">
        <h2 className="text-center">Our Commitment</h2>
        <div className="row">
          <div className="col-md-4">
            <div className="feature-item">
              <strong>Challenging Problems</strong>
              <p>
                Practice coding with a diverse range of challenging problems.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="feature-item">
              <strong>Progress Tracking</strong>
              <p>
                Track your coding progress and see your skills improve over
                time.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="feature-item">
              <strong>Coding Contests</strong>
              <p>
                Compete with other coders in exciting coding challenges and
                contests.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="get-started mt-5">
        <h2>Get Started</h2>
        <p>
          Ready to embark on your coding journey? Join our coding community to
          get started. Create an account or sign in if you're already a member.
        </p>
        {isAuthenticated ? (
          <div></div>
        ) : (
          <div className="cta-buttons mt-3 d-flex justify-content-start">
            <Link className="nav-link mx-2" to="/login">
              <button className="btn btn-outline-primary">Login</button>
            </Link>
            <Link className="nav-link mx-2" to="/signup">
              <button className="btn btn-outline-primary">Signup</button>
            </Link>
          </div>
        )}
      </section>

      <section className="contact-us mt-5">
        <h2>Want to get in touch?</h2>
        <Link to="/contact" className="btn btn-outline-success">
          Contact Us
        </Link>
      </section>
    </div>
  );
};

export default About;
