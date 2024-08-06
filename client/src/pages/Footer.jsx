import React from 'react';
import { Link } from 'react-router-dom';
import logo from './../assets/logo/png black.svg';
import githubIcon from './../assets/logo/github.svg';
import linkedinIcon from './../assets/logo/linkedin.svg';
import instagramIcon from './../assets/logo/instagram.svg';
import xIcon from './../assets/logo/x-icon.svg';

const Footer = () => {
  return (
    <footer className="foot">
      <div className="container">
        <div className="row">
          <div className="col">
            <h3 className="foot__heading">
              <Link className="navbar-brand center" to="/">
                <img src={logo} alt="Your Logo" className="logo" />
              </Link>
            </h3>
            <ul className="foot__list footer-social-icons">
              <li className="foot__item">
                <a
                  className="foot__link"
                  href="https://www.github.com/pranav-prasad16"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={githubIcon}
                    alt="Github"
                    className="icons icon-filter"
                  />
                </a>
              </li>
              <li className="foot__item">
                <a
                  className="foot__link"
                  href="https://www.linkedin.com/in/pranav-prasad-90b084252/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={linkedinIcon}
                    alt="Linkedin"
                    className="icons icon-filter"
                  />
                </a>
              </li>
              <li className="foot__item">
                <a
                  className="foot__link"
                  href="https://www.x.com/pranavP_16"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={xIcon} alt="X" className="icons icon-filter" />
                </a>
              </li>
              <li className="foot__item">
                <a
                  className="foot__link"
                  href="https://www.instagram.com/pranav_736"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={instagramIcon}
                    alt="Instagram"
                    className="icons icon-filter"
                  />
                </a>
              </li>
            </ul>
          </div>
          <div className="col">
            <h3 className="foot__heading">Important Links</h3>
            <ul className="foot__list">
              <li className="foot__item">
                <Link className="foot__link" to="/">
                  Home
                </Link>
              </li>
              <li className="foot__item">
                <Link className="foot__link" to="/problems">
                  Problems
                </Link>
              </li>
              <li className="foot__item">
                <Link className="foot__link" to="/blogs">
                  Blogs
                </Link>
              </li>
              <li className="foot__item">
                <Link className="foot__link" to="/contact">
                  Contact
                </Link>
              </li>
              <li className="foot__item">
                <Link className="foot__link" to="/about">
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-3">
          <p>&copy; 2024 CodersHub. All Rights Reserved.</p>
        </div>
      </div>
      <div className="text-center mt-3 developed">
        Built with ❣️ by{' '}
        <span>
          <a
            href="https://pranav-16.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="portfolio-link"
          >
            Pranav Prasad
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
