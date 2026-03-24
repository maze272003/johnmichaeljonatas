import React from 'react';
import './Preloader.css';

function Preloader() {
  return (
    <div className="preloader-container" role="status" aria-live="polite" aria-label="System boot in progress">
      <div className="boot-loader">
        <div className="wireframe-ico" aria-hidden="true" />
        <p className="boot-text">SYSTEM BOOTING...</p>
      </div>
    </div>
  );
}

export default Preloader;
