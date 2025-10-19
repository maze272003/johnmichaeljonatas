// src/components/Hero.jsx
import React from 'react';

function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="container">
        <h1>Hi, I'm John Michael Jonatas.</h1>
        <p className="subtitle">
          A passionate **Web Developer** crafting beautiful and functional digital experiences.
        </p>
        <a href="#projects" className="btn">View My Work</a>
        <a href="#contact" className="btn" style={{ marginLeft: '20px', backgroundColor: 'transparent', border: '2px solid var(--accent-color)' }}>
          Get In Touch
        </a>
      </div>
    </section>
  );
}

export default Hero;