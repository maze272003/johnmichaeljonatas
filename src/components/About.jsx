import React from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import profileImage from '../assets/jm.jpg';

const fromLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
};

const fromRight = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.2 } }
};

function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.section 
      id="about" 
      className="about" 
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      <h2 className="section-title">
        <span className="number">01.</span>
        About Me
      </h2>
      <div className="about-content">
        <motion.div variants={fromLeft} className="about-image-wrapper">
          <img src={profileImage} alt="John Michael Jonatas" className="profile-image" />
        </motion.div>

        <motion.div variants={fromRight} className="about-text">
          <h3>I'm JM, a <span style={{ color: 'var(--accent-color)' }}>Full Tank Developer</span></h3>
          <p>
            I am a Full-Tank Developer student at Phinma AU, currently in my third year pursuing a degree in System Development. I am passionate about enhancing my coding skills and developing applications and websites. 
          </p>
          <p>
            Welcome to my portfolio! I am dedicated to improving my skills and love building innovative projects in the Full-Tank development ecosystem.
          </p>
          <a href="#" className="cta-button" style={{ marginTop: '1rem' }}>View Resume</a>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default About;