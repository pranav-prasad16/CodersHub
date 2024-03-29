import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import logo from './../assets/logo/png black.svg';
import profileImg from './../assets/logo/profile-user.png';
import ThemeToggleButton from '../components/ThemeToggleButton';

const Layout = (props) => {
  const { isAuthenticated, onLogout } = props;
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-customize">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img
              src={logo} // Replace with the actual path to your logo image
              alt="Your Logo"
              className="logo"
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-between"
            id="navbarNav"
          >
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/problems">
                  Problems
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/blogs">
                  Blogs
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact Us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About Us
                </Link>
              </li>
            </ul>
            {isAuthenticated ? (
              <ul className="navbar-nav">
                <li className="nav-item" to="/logout">
                  <button className="custom-btn-nav" onClick={onLogout}>
                    Logout
                  </button>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    <button className="custom-btn-nav ">Login</button>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    <button className="custom-btn-nav">Signup</button>
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Layout;
