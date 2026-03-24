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
          <h3>I&apos;m JM, a <span style={{ color: 'var(--accent-color)' }}>Full-Stack Developer</span></h3>
          <p>
            I specialize in end-to-end web application development—from database 
            architecture to user-facing interfaces. I led the design, development, 
            and deployment of production systems including a QR-based inventory 
            management platform and a government document request system, both 
            serving real organizations in the Philippines.
          </p>
          <p>
            My approach emphasizes systems-level thinking: building scalable 
            architectures, designing reusable component patterns, and making 
            strategic technical decisions that balance speed with long-term 
            maintainability. I&apos;m driven by the impact of well-crafted software 
            on operational efficiency and user experience. Recent deployment
            achievements include Ubuntu deployment, Dokploy deployment, Coolify
            deployment, and Railway deployment.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default About;
