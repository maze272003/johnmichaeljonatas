import React from 'react';
import { useInView } from 'react-intersection-observer'; // Import the hook
import profileImage from '../assets/jm.jpg';

function About() {
  // Initialize the hook to track when the section is visible
  const { ref, inView } = useInView({
    triggerOnce: true, // Animation will only play once
    threshold: 0.1,    // Trigger when 10% of the component is visible
  });

  return (
    // Attach the 'ref' to the main section to observe it
    <section id="about" className="about" ref={ref}>
      {/* The title will fade in from the bottom */}
      <h2 className={`section-title animate-item ${inView ? 'visible fade-in-up' : 'fade-in-up'}`}>
        <span className="number">01.</span>
        About Me
      </h2>
      <div className="about-content">
        {/* The image will slide in from the left */}
        <div className={`about-image-wrapper animate-item ${inView ? 'visible fade-in-left' : 'fade-in-left'}`}>
          <img src={profileImage} alt="John Michael Jonatas" className="profile-image" />
        </div>

        {/* The text will slide in from the right, slightly delayed */}
        <div 
          className={`about-text animate-item ${inView ? 'visible fade-in-right' : 'fade-in-right'}`}
          style={{ transitionDelay: '200ms' }} // Adds a small delay for a better effect
        >
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