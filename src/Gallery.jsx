import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import './App.css';

const sampleGalleryData = {
  smithfamily: [
    '/sample1.jpg',
    '/sample2.jpg',
    '/sample3.jpg'
  ],
  mariah2024: [
    '/sample4.jpg',
    '/sample5.jpg'
  ]
};

const Gallery = () => {
  const { clientId } = useParams();
  const [images, setImages] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const clientImages = sampleGalleryData[clientId] || [];
    setImages(clientImages);
  }, [clientId]);

  const toggleSelect = (img) => {
    setSelected((prev) =>
      prev.includes(img) ? prev.filter((i) => i !== img) : [...prev, img]
    );
  };

  const saveSelections = () => {
    console.log('Selected images:', selected);
    alert(`You selected ${selected.length} image(s).`);
    // In real app, save this to file or backend
  };

  return (
    <motion.div
      className="gallery-page"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Welcome, {clientId}</h2>

      {images.length === 0 ? (
        <p>No images found for this client.</p>
      ) : (
        <div className="gallery-grid">
          {images.map((src, index) => (
            <div
              key={index}
              className={`gallery-item ${selected.includes(src) ? 'selected' : ''}`}
              onClick={() => toggleSelect(src)}
            >
              <img src={src} alt={`img-${index}`} />
              <div className="checkbox">{selected.includes(src) ? '✔' : ''}</div>
            </div>
          ))}
        </div>
      )}

      {images.length > 0 && (
        <button onClick={saveSelections}>Save Selection</button>
      )}
    </motion.div>
  );
};

export default Gallery;
