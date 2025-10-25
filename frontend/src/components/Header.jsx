import React from 'react';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="custom-header">
      <div className="header-content">
        <div className="logo-section">
          <img 
            src="/logo.png" 
            alt="Rostelecom" 
            className="logo-image"
          />
          <span className="logo-text">
            Rostelecom Analytics
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;