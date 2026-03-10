import React from 'react';
import { Github, Linkedin } from 'lucide-react';

function Footer() {
  return (
    <>
      <div className="social-sidebar">
        <a href="https://github.com/maze272003" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github /></a>
        <a href="https://www.linkedin.com/in/john-michael-jonatas-683405390" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin /></a>
      </div>

      <div className="email-sidebar">
        <a href="mailto:jmjonatas4@gmail.com">jmjonatas4@gmail.com</a>
      </div>
      
      <footer className="footer" role="contentinfo">
        <div className="footer-links">
          <a href="https://github.com/maze272003" target="_blank" rel="noopener noreferrer" aria-label="GitHub">GitHub</a>
          <span className="footer-separator" aria-hidden="true">·</span>
          <a href="https://www.linkedin.com/in/john-michael-jonatas-683405390" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">LinkedIn</a>
          <span className="footer-separator" aria-hidden="true">·</span>
          <a href="mailto:jmjonatas4@gmail.com">jmjonatas4@gmail.com</a>
        </div>
        <p style={{marginTop: '1rem'}}>&copy; {new Date().getFullYear()} John Michael Jonatas. Built with React &amp; Vite.</p>
      </footer>
    </>
  );
}

export default Footer;