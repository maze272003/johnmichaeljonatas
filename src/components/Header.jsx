import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import logo from '../assets/jmfire.png';

function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);

      const sections = ['about', 'skills', 'education', 'certificates', 'projects', 'games', 'testimonials', 'contact'];
      const scrollPos = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          return;
        }
      }
      setActiveSection('');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Education', href: '#education' },
    { name: 'Certificates', href: '#certificates' },
    { name: 'Projects', href: '#projects' },
    { name: 'Games', href: '#games' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <a href="#hero" className="header-logo">
        <img src={logo} alt="JM Portfolio Logo" style={{ height: '50px' }} />
      </a>

      {/* Desktop Navigation */}
      <nav className="desktop-nav">
        <ul className="nav-links">
          {navLinks.map((link, index) => (
            <li key={link.name}>
              <a
                href={link.href}
                className={activeSection === link.href.slice(1) ? 'active' : ''}
              >
                <span className="number">0{index + 1}.</span>
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Menu Button */}
      <div className="mobile-controls">
        <button className="mobile-menu-btn" onClick={toggleSidebar} aria-label="Toggle mobile menu">
          {isSidebarOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

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
                    <a
                      href={link.href}
                      onClick={toggleSidebar}
                      className={activeSection === link.href.slice(1) ? 'active' : ''}
                    >
                      <span className="number">0{index + 1}.</span>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
