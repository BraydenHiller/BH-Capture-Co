import React from 'react';

const ClientGallery = ({
  loggedInClient,
  clientData,
  selected,
  toggleSelect,
  exportSelections,
}) => {
  return (
    <>
      <h1 style={{ color: '#ffd700' }}>Welcome, {loggedInClient}</h1>
      <p>Select your favorite images below. Click "Export" to download your picks.</p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          marginTop: '2rem',
        }}
      >
        {clientData[loggedInClient].images.map((img) => (
          <div
            key={img}
            onClick={() => toggleSelect(img)}
            style={{
              border: selected.includes(img)
                ? '4px solid #ffd700'
                : '2px solid #1c2a3d',
              borderRadius: '12px',
              overflow: 'hidden',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
              transition: 'transform 0.2s ease, border 0.2s ease',
              backgroundColor: '#111827',
            }}
          >
            <img
              src={`/images/${loggedInClient}/${img}`}
              alt="Client"
              style={{
                width: '100%',
                display: 'block',
                transition: 'transform 0.3s ease',
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = 'scale(1.02)')
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.transform = 'scale(1.0)')
              }
            />
          </div>
        ))}
      </div>

      <button
        onClick={exportSelections}
        style={{
          marginTop: '2rem',
          padding: '0.75rem 1.5rem',
          backgroundColor: '#ffd700',
          border: 'none',
          borderRadius: '8px',
          color: '#0b0f1a',
          fontWeight: 'bold',
          cursor: 'pointer',
          boxShadow: '0 3px 6px rgba(0,0,0,0.3)',
          fontSize: '1rem',
        }}
      >
        Export Selected
      </button>
    </>
  );
};

export default ClientGallery;
