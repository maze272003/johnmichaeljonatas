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

  const navItems = [
    { title: 'About', id: 'about' },
    { title: 'Skills', id: 'skills' },
    { title: 'Education', id: 'education' },
    { title: 'Certificates', id: 'certificates' },
    { title: 'Projects', id: 'projects' },
    { title: 'Contact', id: 'contact' },
  ];

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
            {navItems.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} onClick={(e) => { e.preventDefault(); scrollToSection(item.id); }}>
                  {item.title}
                </a>
              </li>
            ))}
            <li>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="resume-button">
                Resume
              </a>
            </li>
          </ul>
        </nav>

        {/* --- Mobile Menu Button --- */}
        <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Menu">
          {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </header>

      {/* --- Mobile Sidebar Navigation --- */}
      <nav className={isMenuOpen ? 'sidebar sidebar-open' : 'sidebar'}>
        <ul className="sidebar-links">
          {navItems.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} onClick={() => scrollToSection(item.id)}>
                {item.title}
              </a>
            </li>
          ))}
          <li>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="resume-button-mobile">
              Resume
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Header;