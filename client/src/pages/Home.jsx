import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container">
      <header className="text-center my-3">
        <h1 className="display-4">Welcome to CodersHub</h1>
        <p className="lead">Your Gateway to Coding Excellence</p>
      </header>

      <section className="features my-5">
        <h2 className="text-center">Why Choose CodersHub?</h2>
        <div className="row my-5">
          <div className="col-md-6">
            <div className="feature-item">
              <h3>Practice Coding</h3>
              <p>
                Explore a diverse range of coding problems to enhance your
                skills.
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="feature-item">
              <h3>Coding Challenges</h3>
              <p>
                Participate in coding challenges and contests to test your
                skills.
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="feature-item">
              <h3>Track Your Progress</h3>
              <p>
                Track your coding journey, earn badges, and compete with others.
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="feature-item">
              <h3>Stay Informed</h3>
              <p>
                Stay updated with coding tutorials and informative blogs from
                our community.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="get-started text-center my-5">
        <h2>Get Started Today</h2>
        <p>
          Join our vibrant coding community to embark on your coding journey.
          Create an account or sign in if you are already a member.
        </p>
        <div className="cta-buttons mt-4">
          <Link to="/signup" className="btn btn-primary mx-2">
            Sign Up
          </Link>
          <Link to="/login" className="btn btn-success mx-2">
            Log In
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
