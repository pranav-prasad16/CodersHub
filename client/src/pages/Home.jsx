import React from 'react';
import { Link } from 'react-router-dom';

const Home = (props) => {
  const { isAuthenticated } = props;
  return (
    <div className="container">
      <header className="text-center my-3">
        <h1 className="display-4">Welcome to CodersHub</h1>
        <p className="lead">Your Gateway to Coding Excellence</p>
      </header>

      <section className="features my-5">
        <h2 className="text-center">What We Offer</h2>
        <div className="row my-5">
          <div className="col-md-6">
            <div className="feature-item">
              <h3>Comprehensive Learning Resources</h3>
              <p>
                Dive into our vast library of tutorials, articles, and guides
                covering a wide array of programming languages, frameworks, and
                technologies. From Python to JavaScript, from HTML/CSS to React,
                we've got everything you need to start building your dream
                projects.
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="feature-item">
              <h3>Interactive Coding Challenges</h3>
              <p>
                Put your skills to the test with our interactive coding
                challenges and exercises. Whether you're practicing algorithms,
                mastering data structures, or honing your problem-solving
                abilities, our challenges provide the perfect opportunity to
                learn by doing.
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="feature-item">
              <h3>Community Engagement</h3>
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
            <div className="feature-item">
              <h3>Expert Insights</h3>
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
        <h2 className="text-center">Why Choose CodersHub?</h2>
        <div className="row my-5">
          <div className="col-md-6">
            <div className="feature-item">
              <h3>Accessible Learning</h3>
              <p>
                We believe that coding should be accessible to everyone,
                regardless of background or experience level. Our user-friendly
                platform is designed to make learning enjoyable, engaging, and
                effective for learners of all ages and skill levels.
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="feature-item">
              <h3>Quality Content</h3>
              <p>
                We take pride in delivering high-quality, up-to-date content
                that reflects the latest trends and best practices in the
                ever-evolving field of technology. Whether you're learning the
                basics or delving into advanced topics, you can trust us to
                provide accurate, reliable information.
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="feature-item">
              <h3>Supportive Community</h3>
              <p>
                Join a supportive community where you can learn, grow, and
                thrive alongside fellow enthusiasts and experts. Whether you're
                seeking encouragement, feedback, or collaboration opportunities,
                you'll find a welcoming and inclusive environment here.
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
        {isAuthenticated ? (
          <div className="text-center">
            <h5>
              <Link to="/problems" className="link">
                Start solving Problems
              </Link>
            </h5>
          </div>
        ) : (
          <>
            <div className="get-started text-center my-5">
              <h2>Start Your Coding Journey Today!</h2>
              <p>
                Ready to unlock your full potential and embark on an exciting
                adventure in coding? Join us at CodersHub and take the first
                step towards realizing your goals and aspirations in the world
                of technology. Whether you're dreaming of building
                groundbreaking applications, launching a successful tech career,
                or simply exploring your passion for coding, we're here to
                support you every step of the way. Let's code together and shape
                the future of technology!
              </p>
            </div>
            <div className="cta-buttons mt-4">
              <Link to="/signup" className="custom-btn-purple mx-2">
                Sign Up
              </Link>
              <Link to="/login" className="custom-btn-purple mx-2">
                Log In
              </Link>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default Home;
