import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Blogs from './pages/Blogs';
import Contact from './pages/Contact';
import About from './pages/About';
import Layout from './pages/Layout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Problems from './pages/Problems';
import ProblemDetails from './pages/ProblemDetails';
import Footer from './pages/Footer';
// import Profile from './pages/Profile';
import NoPage from './pages/noPage';
import './styles/style.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [problemId, setProblemId] = useState(null);
  const [userId, setUserId] = useState(null);

  // Function to simulate a login
  const login = (token) => {
    sessionStorage.setItem('Token', token);
    setIsAuthenticated(true);
  };

  // Function to simulate a logout
  const logout = () => {
    sessionStorage.removeItem('Token');
    sessionStorage.removeItem('UserId');
    setIsAuthenticated(false);
  };

  // A function to handle authentication-based redirection
  const requireAuth = (component) => {
    return isAuthenticated ? component : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout isAuthenticated={isAuthenticated} onLogout={logout} />
          }
        >
          <Route index element={<Home isAuthenticated={isAuthenticated} />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/contact" element={<Contact />} />
          {/* <Route path="/profile" element={<Profile />} /> */}
          <Route
            path="/about"
            element={<About isAuthenticated={isAuthenticated} />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/login"
            element={
              <Login
                onLogin={login}
                setUserId={setUserId}
                problemId={problemId}
              />
            }
          />
          <Route
            path="/problems"
            element={<Problems setProblemId={setProblemId} />}
          />
          <Route path="*" element={<NoPage />} />
        </Route>
        <Route
          path="/problem/:pid/"
          element={requireAuth(<ProblemDetails userId={userId} />)} // Protect this route with requireAuth
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
