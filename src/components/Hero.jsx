import React from 'react';

function Hero() {
  return (
    <section id="hero" className="hero">
      <p className="intro">Hi, my name is</p>
      <h1 className="name">John Michael Jonatas.</h1>
      <h2 className="subtitle">I build things for the web.</h2>
      <p className="description">
        I'm a passionate web developer specializing in crafting exceptional
        digital experiences. Currently, I'm focused on building responsive and
        user-friendly web applications using modern technologies like React.
      </p>
      <a href="#projects" className="cta-button">
        View My Work
      </a>
    </section>
  );
}

export default Hero;