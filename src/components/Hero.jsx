import React from 'react';

function Hero() {
  return (
    <section id="hero" className="hero">
      <p className="intro">Hi Darling, my name is</p>
      <h1 className="name">John Michael Jonatas.</h1>
      <h2 className="subtitle">I am into Web Development.</h2> {/* You can add the typing animation here later */}
      <p className="description">
        I am a Full-Tank Developer and 3rd-year student at Phinma AU passionate about enhancing my coding skills.
      </p>
      <a href="#about" className="cta-button">
        About Me
      </a>
    </section>
  );
}
export default Hero;