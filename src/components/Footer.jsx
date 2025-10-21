import React from 'react';
import { Github, Linkedin } from 'lucide-react';

function Footer() {
  return (
    <>
      {/* These will only appear on desktop screens due to CSS */}
      <div className="social-sidebar">
        <a href="https://github.com/yourusername" aria-label="GitHub"><Github /></a>
        <a href="https://linkedin.com/in/yourprofile" aria-label="LinkedIn"><Linkedin /></a>
      </div>

      <div className="email-sidebar">
        <a href="mailto:your.email@example.com">your.email@example.com</a>
      </div>
      
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} John Michael Jonatas. Designed & Built with ❤️.</p>
      </footer>
    </>
  );
}

export default Footer;