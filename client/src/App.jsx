import React, { useContext, useState } from 'react';
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
import AuthContext from './context/AuthContext';

function App() {
  const [problemId, setProblemId] = useState(null);
  const { isAuthenticated } = useContext(AuthContext);

  const requireAuth = (component) => {
    return isAuthenticated ? component : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/contact" element={<Contact />} />
          {/* <Route path="/profile" element={<Profile />} /> */}
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login problemId={problemId} />} />
          <Route
            path="/problems"
            element={<Problems setProblemId={setProblemId} />}
          />
          <Route path="*" element={<NoPage />} />
        </Route>
        <Route
          path="/problem/:pid/"
          element={requireAuth(<ProblemDetails />)}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
