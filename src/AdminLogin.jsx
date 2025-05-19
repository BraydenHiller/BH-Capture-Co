import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('adminLoggedIn');
    if (isAuthenticated === 'true') {
      navigate('/photographer');
    }
  }, [navigate]);

  const handleLogin = () => {
    if (password === 'brayden') {
      localStorage.setItem('adminLoggedIn', 'true');
      navigate('/photographer');
    } else {
      alert('Incorrect password');
    }
  };

  return (
    <div className="client-login">
      <h2>Photographer Login</h2>
      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default AdminLogin;
