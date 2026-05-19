import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import logo from '../assets/jmfire.png';

function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('portfolioTheme');
    return saved ? saved === 'dark' : true;
  });

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const toggleTheme = useCallback(() => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem('portfolioTheme', newMode ? 'dark' : 'light');
      document.documentElement.setAttribute('data-theme', newMode ? 'dark' : 'light');
      return newMode;
    });
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);

      const sections = ['about', 'skills', 'education', 'certificates', 'projects', 'contact'];
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
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`} role="banner">
      <a href="#hero" className="header-logo" aria-label="Back to top">
        <img src={logo} alt="JM Portfolio Logo" className="portfolio-logo" />
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
          <li>
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </li>
        </ul>
      </nav>

      {/* Mobile Menu Button */}
      <div className="mobile-controls">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
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