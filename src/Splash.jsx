import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const Splash = () => {
  return (
    <div className="splash-container">
      <h1>BH Capture Co.</h1>
      <p>Sharp. Timeless. True.</p>
      <div className="splash-links">
        <Link to="/client" className="splash-button">Client Login</Link>
        <Link to="/photographer" className="splash-button">Admin Dashboard</Link>
      </div>
    </div>
  );
};

export default Splash;
