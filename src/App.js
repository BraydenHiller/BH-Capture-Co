import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import ClientLogin from './ClientLogin';
import ClientGallery from './ClientGallery';
import Photographer from './Photographer';
import AdminLogin from './AdminLogin';
import './App.css';

function AppWrapper() {
  const [clientData, setClientData] = useState({});
  const [clientName, setClientName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loggedInClient, setLoggedInClient] = useState(null);
  const [selected, setSelected] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch('/clients.json')
      .then((res) => res.json())
      .then((data) => setClientData(data))
      .catch((err) => console.error('Failed to load client data:', err));
  }, []);

  useEffect(() => {
    if (loggedInClient) {
      const saved = localStorage.getItem(`bh_selected_${loggedInClient}`);
      setSelected(saved ? JSON.parse(saved) : []);
    }
  }, [loggedInClient]);

  useEffect(() => {
    if (loggedInClient) {
      localStorage.setItem(`bh_selected_${loggedInClient}`, JSON.stringify(selected));
    }
  }, [selected, loggedInClient]);

  const handleLogin = (e) => {
    e.preventDefault();
    const client = clientData[clientName];
    if (client && client.password === password) {
      setLoggedInClient(clientName);
      setError('');
      navigate('/gallery');
    } else {
      setError('Incorrect client name or password');
    }
  };

  const toggleSelect = (img) => {
    setSelected((prev) =>
      prev.includes(img) ? prev.filter((i) => i !== img) : [...prev, img]
    );
  };

  const exportSelections = () => {
    const blob = new Blob([JSON.stringify(selected, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${loggedInClient}-selections.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      style={{
        backgroundColor: '#0b0f1a',
        color: 'white',
        minHeight: '100vh',
        padding: '2rem',
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <Routes>
        <Route
          path="/"
          element={
            <ClientLogin
              clientData={clientData}
              clientName={clientName}
              setClientName={setClientName}
              password={password}
              setPassword={setPassword}
              handleLogin={handleLogin}
              error={error}
            />
          }
        />
        <Route
          path="/gallery"
          element={
            loggedInClient ? (
              <ClientGallery
                loggedInClient={loggedInClient}
                clientData={clientData}
                selected={selected}
                toggleSelect={toggleSelect}
                exportSelections={exportSelections}
              />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route
          path="/photographer"
          element={
            localStorage.getItem('adminLoggedIn') === 'true' ? (
              <Photographer />
            ) : (
              <Navigate to="/admin-login" />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
      <AppWrapper />
  );
}

export default App;
