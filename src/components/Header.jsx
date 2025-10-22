import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import logo from '../assets/jmfire.png'; // <--- IMPORT YOUR LOGO HERE

function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Education', href: '#education' },
    { name: 'Certificates', href: '#certificates' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <a href="#hero" className="header-logo">
        <img src={logo} alt="JM Portfolio Logo" style={{ height: '50px' }} /> {/* <--- YOUR LOGO IS HERE */}
      </a>

      {/* Desktop Navigation */}
      <nav className="desktop-nav">
        <ul className="nav-links">
          {navLinks.map((link, index) => (
            <li key={link.name}>
              <a href={link.href}>
                <span className="number">0{index + 1}.</span>
                {link.name}
              </a>
            </li>
          ))}
          <li>
            {/* <a href="/JM-Resume.pdf" target="_blank" rel="noopener noreferrer" className="resume-button">
              Resume
            </a> */}
          </li>
        </ul>
      </nav>

      {/* Mobile Menu Button */}
      <button className="mobile-menu-btn" onClick={toggleSidebar} aria-label="Toggle mobile menu">
        {isSidebarOpen ? <X size={32} /> : <Menu size={32} />}
      </button>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            className="sidebar"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 200 }}
          >
            <nav>
              <ul className="sidebar-links">
                {navLinks.map((link, index) => (
                  <li key={link.name}>
                    <a href={link.href} onClick={toggleSidebar}>
                      <span className="number">0{index + 1}.</span>
                      {link.name}
                    </a>
                  </li>
                ))}
                <li>
                  {/* <a href="/JM-Resume.pdf" target="_blank" rel="noopener noreferrer" className="resume-button-mobile">
                    Resume
                  </a> */}
                </li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;