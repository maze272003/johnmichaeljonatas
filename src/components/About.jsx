import React from 'react';
import profileImage from '../assets/jm.jpg';

function About() {
  return (
    <section id="about" className="about">
      <h2 className="section-title">
          <span className="number">01.</span>
          About Me
      </h2>
      <div className="about-content">
        <div className="about-image-wrapper">
          <img src={profileImage} alt="John Michael Jonatas" className="profile-image" />
        </div>
        <div className="about-text">
          <p>
            Hello there! I'm John Michael Jonatas, a dedicated web developer with a keen eye for detail 
            and a love for creating engaging user interfaces. My journey into the world of web development 
            began with a fascination for how digital products come to life.
          </p>
          <p>
            I specialize in front-end development using <strong>React.js</strong>, crafting responsive 
            and dynamic experiences. I'm always eager to learn new technologies and improve my skills 
            to deliver high-quality code.
          </p>
          <p>
            When I'm not coding, you can find me exploring new design trends or contributing to 
            open-source projects. Let's build something amazing together!
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;