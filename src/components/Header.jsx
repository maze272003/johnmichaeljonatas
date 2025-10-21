import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';

function Header() {
  const [scrolled, setScrolled] = useState(false);

  // This effect adds a background to the header when you scroll down
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={scrolled ? 'header scrolled' : 'header'}>
      <a 
        href="#hero" 
        className="header-logo"
        onClick={(e) => {
          e.preventDefault();
          scrollToSection('hero');
        }}
      >
        J.M.J
      </a>

      {/* --- Desktop Navigation --- */}
      <nav>
        <ul className="nav-links">
          <li className="nav-link">
            <a 
              href="#projects" 
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('projects');
              }}
            >
              <span className="nav-link-number">01.</span> Projects
            </a>
          </li>
          <li className="nav-link">
            <a 
              href="#contact" 
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('contact');
              }}
            >
              <span className="nav-link-number">02.</span> Contact
            </a>
          </li>
        </ul>
      </nav>

      {/* --- Mobile Menu Button --- */}
      <button className="mobile-menu-btn" aria-label="Menu">
        <Menu size={32} />
      </button>
    </header>
  );
}

export default Header;