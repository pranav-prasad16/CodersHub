import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="container">
      <header>
        <h2>Welcome to CodersHub</h2>
        <p>Your Coding Journey Begins Here</p>
      </header>

      <section className="features mt-5">
        <h2>Key Features</h2>
        <ul>
          <li className="list-group-item">
            1. Learn and practice coding with a wide range of problems.
          </li>
          <li className="list-group-item">
            2. Track your progress and see your improvement over time.
          </li>
          <li className="list-group-item">
            3. Compete with other coders in coding challenges and contests.
          </li>
        </ul>
      </section>

      <section className="get-started mt-5">
        <h2>Get Started</h2>
        <p>
          Join our coding community to start your journey. Create an account or
          sign in if you are already a member.
        </p>
        <div className="cta-buttons mt-3 d-flex justify-content-start">
          <Link className="nav-link mx-2" to="/login">
            <button className="btn btn-outline-primary">Login</button>
          </Link>
          <Link className="nav-link mx-2" to="/signup">
            <button className="btn btn-outline-primary">Signup</button>
          </Link>
        </div>
      </section>

      <section className="contact-us mt-5">
        <h2>Want to get in touch ?</h2>
        <Link to="/contact" className="btn btn-outline-primary">
          Contact Us
        </Link>
      </section>
    </div>
  );
};

export default About;
