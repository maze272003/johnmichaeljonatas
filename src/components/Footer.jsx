import React from 'react';
import { Github, Linkedin } from 'lucide-react';

function Footer() {
  return (
    <>
      <div className="social-sidebar">
        <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github /></a>
        <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin /></a>
      </div>

      <div className="email-sidebar">
        <a href="mailto:jmjonatas4@gmail.com">jmjonatas4@gmail.com</a>
      </div>
      
      <footer className="footer">
        <p> <i className="fas fa-phone"></i> +63 9615962830</p>
        <p> <i className="fas fa-envelope"></i> jmjonatas4@gmail.com</p>
        <p> <i className="fas fa-map-marked-alt"></i> Nueva Ecija, Palayan City</p>
        <p style={{marginTop: '1rem'}}>&copy; {new Date().getFullYear()} John Michael Jonatas. All rights reserved.</p>
      </footer>
    </>
  );
}

export default Footer;