import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Client = () => {
  const [clientId, setClientId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // For now, skip real auth
    navigate(`/gallery/${clientId}`);
  };

  return (
    <div className="client-login">
      <h2>Client Login</h2>
      <input
        type="text"
        placeholder="Client ID"
        value={clientId}
        onChange={(e) => setClientId(e.target.value)}
      />
      <input
        type="password"
        placeholder="Gallery Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Enter Gallery</button>
    </div>
  );
};

export default Client;
