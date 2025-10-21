import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react'; // Mag-import tayo ng X icon para sa close button

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State para sa menu

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Function para i-toggle ang menu (open/close)
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function para mag-scroll at isara ang menu
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false); // Isasara ang menu pagkatapos mag-click ng link
  };

  return (
    <>
      <header className={scrolled ? 'header scrolled' : 'header'}>
        <a 
          href="#hero" 
          className="header-logo"
          onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}
        >
          J.M.J
        </a>

        {/* --- Desktop Navigation --- */}
        <nav className="desktop-nav">
          <ul className="nav-links">
            {/* Links for desktop */}
          </ul>
        </nav>

        {/* --- Mobile Menu Button (Burger Icon) --- */}
        <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Menu">
          {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </header>

      {/* --- Mobile Sidebar Navigation --- */}
      <nav className={isMenuOpen ? 'sidebar sidebar-open' : 'sidebar'}>
        <ul className="sidebar-links">
          <li>
            <a href="#about" onClick={() => scrollToSection('about')}>
              <span className="nav-link-number">01.</span> About
            </a>
          </li>
          <li>
            <a href="#projects" onClick={() => scrollToSection('projects')}>
              <span className="nav-link-number">02.</span> Projects
            </a>
          </li>
          <li>
            <a href="#contact" onClick={() => scrollToSection('contact')}>
              <span className="nav-link-number">03.</span> Contact
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Header;