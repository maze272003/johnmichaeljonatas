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
            I Specialize The Backend development, with a strong focus on laravel and nodejs, convex, and a solid understanding of frontend technologies like React and Nextjs.
          </p>
          <p>
            My passion for coding started at a 1st year college, and I have been honing my skills ever since. I enjoy creating efficient and scalable web applications that solve real-world problems. In my free time, I like to explore new technologies and spending time with my family.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default About;
