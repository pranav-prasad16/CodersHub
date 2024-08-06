import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import openLinkLogo from '../assets/logo/openlink.svg';
import AuthContext from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <div className="bg-customize">
      <div className="container">
        <header className="text-center my-3">
          <h1 className=" display-4">Welcome to CodersHub👋🏻</h1>
          <p className="lead">Your Gateway to Coding Excellence💻</p>
        </header>

        <section className="features my-5">
          <h2 className="text-center bold-font">
            <span className=" what-I-offer">
              What We <span className="blue-text">Offer</span>?
            </span>
          </h2>
          <div className="row my-5">
            <div className="col-md-6">
              <div className="feature-item box">
                <h3>Comprehensive Learning💡</h3>
                <p>
                  Dive into our vast library of tutorials, articles, and guides
                  covering a wide array of programming languages, frameworks,
                  and technologies. From Python to JavaScript, from HTML/CSS to
                  React, we've got everything you need to start building your
                  dream projects.
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="feature-item box">
                <h3>Interactive Coding💬</h3>
                <p>
                  Put your skills to the test with our interactive coding
                  challenges and exercises. Whether you're practicing
                  algorithms, mastering data structures, or honing your
                  problem-solving abilities, our challenges provide the perfect
                  opportunity to learn by doing.
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="feature-item box">
                <h3>Community Engagement🧑‍🤝‍🧑</h3>
                <p>
                  {' '}
                  Connect with a diverse community of learners, developers, and
                  tech enthusiasts from around the globe. Share your knowledge,
                  seek advice, collaborate on projects, and make meaningful
                  connections that will fuel your growth and success in the tech
                  industry.
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="feature-item box">
                <h3>Expert Insights🕵🏻‍♂️</h3>
                <p>
                  Benefit from the wisdom and experience of industry experts and
                  seasoned professionals who are passionate about helping others
                  succeed. Explore their insights, tips, and best practices to
                  accelerate your learning and stay ahead of the curve.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="features my-5">
          <h2 className="text-center bold-font">
            <span className=" what-I-offer">
              Why Choose <span className="blue-text">CodersHub</span>?🤷🏻‍♂️
            </span>
          </h2>
          <div className="row my-5">
            <div className="col-md-6">
              <div className="feature-item box">
                <h3>Accessible Learning</h3>
                <p>
                  We believe that coding should be accessible to everyone,
                  regardless of background or experience level. levels.
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="feature-item box">
                <h3>Quality Content</h3>
                <p>
                  We take pride in delivering high-quality, up-to-date content
                  that reflects the latest trends and best practices in the
                  ever-evolving field of technology.
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="feature-item box">
                <h3>Supportive Community</h3>
                <p>
                  Join a supportive community where you can learn, grow, and
                  thrive alongside fellow enthusiasts and experts.
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="feature-item box">
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
          {isAuthenticated ? (
            <div className="text-center">
              <h5>
                <Link to="/problems" className="start-coding">
                  Start solving Problems
                  <img
                    src={openLinkLogo}
                    alt="open link logo"
                    className="icon-filter"
                  />
                </Link>
              </h5>
            </div>
          ) : (
            <>
              <div className="get-started text-center my-5">
                <h2 className="bold-font">
                  <span className=" what-I-offer">
                    Start Your
                    <span className="blue-text"> Coding Journey </span>Today!
                  </span>
                </h2>
                <p>
                  Ready to unlock your full potential and embark on an exciting
                  adventure in coding? Join us at CodersHub and take the first
                  step towards realizing your goals and aspirations in the world
                  of technology. Whether you're dreaming of building
                  groundbreaking applications, launching a successful tech
                  career, or simply exploring your passion for coding, we're
                  here to support you every step of the way. Let's code together
                  and shape the future of technology!
                </p>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default Home;
