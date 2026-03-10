import React from 'react';
import { Github, Linkedin } from 'lucide-react';

function Footer() {
  return (
    <>
      <div className="social-sidebar">
        <a href="https://github.com/maze272003" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github /></a>
        <a href="https://www.linkedin.com/in/john-michael-jonatas-683405390?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin /></a>
      </div>

      <div className="email-sidebar">
        <a href="mailto:jmjonatas4@gmail.com">jmjonatas4@gmail.com</a>
      </div>
      
      <footer className="footer" role="contentinfo">
        <p> <i className="fas fa-phone"></i> +63 9615962830</p>
        <p> <i className="fas fa-envelope"></i> jmjonatas4@gmail.com</p>
        <p> <i className="fas fa-map-marked-alt"></i> Nueva Ecija, Palayan City</p>
        <p style={{marginTop: '1rem'}}>&copy; {new Date().getFullYear()} John Michael Jonatas. All rights reserved.</p>
      </footer>
    </>
  );
}

export default Footer;