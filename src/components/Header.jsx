// src/components/Header.jsx
import React from 'react';
// You might want to add a state for active link, or use a routing library later

function Header() {
  return (
    <header className="header">
      <div className="container"> {/* Use container for max-width */}
        <div className="header-content">
          <a href="#hero" className="header-logo">John Michael Jonatas</a>
          <nav className="header-nav">
            <ul>
              <li><a href="#about">About</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;