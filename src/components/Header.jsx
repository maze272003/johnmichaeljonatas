import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
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

        <nav className="desktop-nav">
          <ul className="nav-links">
            <li><a href="#about" onClick={(e) => {e.preventDefault(); scrollToSection('about')}}><span className="nav-link-number">01.</span> About</a></li>
            <li><a href="#skills" onClick={(e) => {e.preventDefault(); scrollToSection('skills')}}><span className="nav-link-number">02.</span> Skills</a></li>
            <li><a href="#projects" onClick={(e) => {e.preventDefault(); scrollToSection('projects')}}><span className="nav-link-number">03.</span> Projects</a></li>
            <li><a href="#contact" onClick={(e) => {e.preventDefault(); scrollToSection('contact')}}><span className="nav-link-number">04.</span> Contact</a></li>
          </ul>
        </nav>

        <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Menu">
          {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </header>

      <nav className={isMenuOpen ? 'sidebar sidebar-open' : 'sidebar'}>
        <ul className="sidebar-links">
          <li>
            <a href="#about" onClick={() => scrollToSection('about')}>
              <span className="nav-link-number">01.</span> About
            </a>
          </li>
          <li>
            <a href="#skills" onClick={() => scrollToSection('skills')}>
              <span className="nav-link-number">02.</span> Skills
            </a>
          </li>
          <li>
            <a href="#projects" onClick={() => scrollToSection('projects')}>
              <span className="nav-link-number">03.</span> Projects
            </a>
          </li>
          <li>
            <a href="#contact" onClick={() => scrollToSection('contact')}>
              <span className="nav-link-number">04.</span> Contact
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Header;