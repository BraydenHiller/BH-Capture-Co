import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './App.css';

const Photographer = () => {
  const [clients, setClients] = useState([
    { id: 'smithfamily', name: 'Smith Family', password: '1234', images: [] },
    { id: 'mariah2024', name: 'Mariah S.', password: 'pass2024', images: [] }
  ]);

  const [newClientName, setNewClientName] = useState('');
  const [newClientId, setNewClientId] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const addClient = () => {
    if (!newClientId || !newClientName || !newPassword) return;
    setClients(prev => [
      ...prev,
      {
        id: newClientId,
        name: newClientName,
        password: newPassword,
        images: []
      }
    ]);
    setNewClientName('');
    setNewClientId('');
    setNewPassword('');
  };

  const handleUpload = (e, clientId) => {
    const files = Array.from(e.target.files);
    const previews = files.map(file => URL.createObjectURL(file));

    setClients(prev =>
      prev.map(client =>
        client.id === clientId
          ? { ...client, images: [...client.images, ...previews] }
          : client
      )
    );
  };

  const deleteClient = (id) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      setClients(prev => prev.filter(client => client.id !== id));
    }
  };

  return (
    <motion.div
      className="photographer-dashboard"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <h1>Photographer Dashboard</h1>

      <div className="form-section">
        <h2>Create New Client Gallery</h2>
        <input
          type="text"
          placeholder="Client Name"
          value={newClientName}
          onChange={(e) => setNewClientName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Client ID (used in image folder)"
          value={newClientId}
          onChange={(e) => setNewClientId(e.target.value)}
        />
        <input
          type="password"
          placeholder="Client Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button onClick={addClient}>Add Client</button>
      </div>

      <div className="client-list">
        <h2>Existing Clients</h2>
        {clients.map((client, idx) => (
          <motion.div
            className="client-card"
            key={idx}
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <p><strong>{client.name}</strong></p>
            <p>ID: {client.id}</p>
            <p>Password: {client.password}</p>
            <a href={`/gallery`} target="_blank" rel="noreferrer">View Gallery →</a>

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleUpload(e, client.id)}
              style={{ marginTop: '0.75rem' }}
            />

            {client.images.length > 0 && (
              <div className="image-thumbnails">
                {client.images.map((src, i) => (
                  <img src={src} alt={`preview-${i}`} key={i} className="thumbnail" />
                ))}
              </div>
            )}

            <button
              style={{
                marginTop: '1rem',
                backgroundColor: '#ff4d4f',
                color: 'white'
              }}
              onClick={() => deleteClient(client.id)}
            >
              Delete Client
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Photographer;
