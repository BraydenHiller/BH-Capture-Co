import React from 'react';

const ClientLogin = ({
  clientData,
  clientName,
  setClientName,
  password,
  setPassword,
  handleLogin,
  error,
}) => {
  return (
    <form
      onSubmit={handleLogin}
      style={{
        maxWidth: '400px',
        margin: 'auto',
        padding: '2rem',
        backgroundColor: '#142b45',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
      }}
    >
      <h2 style={{ color: '#ffd700', marginBottom: '1.5rem' }}>Client Login</h2>

      <label>Client</label>
      <select
        value={clientName}
        onChange={(e) => setClientName(e.target.value)}
        required
        style={{
          width: '100%',
          padding: '0.5rem',
          marginBottom: '1rem',
          borderRadius: '6px',
          border: 'none',
        }}
      >
        <option value="">Select your name</option>
        {Object.keys(clientData).map((client) => (
          <option key={client} value={client}>
            {client}
          </option>
        ))}
      </select>

      <label>Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={{
          width: '100%',
          padding: '0.5rem',
          marginBottom: '1rem',
          borderRadius: '6px',
          border: 'none',
        }}
      />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button
        type="submit"
        style={{
          padding: '0.6rem 1.2rem',
          backgroundColor: '#ffd700',
          color: '#0b0f1a',
          border: 'none',
          borderRadius: '6px',
          fontWeight: '600',
          cursor: 'pointer',
          width: '100%',
          fontSize: '1rem',
        }}
      >
        Login
      </button>
    </form>
  );
};

export default ClientLogin;
