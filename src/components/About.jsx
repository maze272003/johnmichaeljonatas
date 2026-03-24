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
  const systemStats = [
    { label: 'Years Experience', value: '4+' },
    { label: 'Projects Completed', value: '20+' },
    { label: 'Coffee Consumed', value: '∞' },
  ];

  const skillBars = [
    { name: 'Full Stack Engineering', value: 92 },
    { name: 'Cloud & DevOps', value: 85 },
    { name: 'Security Hardening', value: 81 },
  ];

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
        Terminal // About
      </h2>
      <div className="about-content terminal-layout">
        <motion.div variants={fromLeft} className="about-image-wrapper holo-portrait">
          <img src={profileImage} alt="John Michael Jonatas" className="profile-image" />
        </motion.div>

        <motion.div variants={fromRight} className="about-terminal">
          <p className="terminal-line">
            &gt; cat about_me.json<span className="terminal-cursor">_</span>
          </p>
          <div className="terminal-response">
            <p>
              I&apos;m JM, a full-stack developer focused on secure systems, clean architecture, and high-impact delivery.
              I build production platforms that reduce manual work, increase reliability, and scale with real-world demand.
            </p>
            <p className="terminal-easter">Try command: sudo make me a sandwich</p>
          </div>
          <div className="holo-skill-bars">
            {skillBars.map((skill) => (
              <div key={skill.name} className="holo-skill-item">
                <div className="holo-skill-header">
                  <span>{skill.name}</span>
                  <span>{skill.value}%</span>
                </div>
                <div className="holo-skill-track">
                  <span className="holo-skill-fill" style={{ width: `${skill.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.aside variants={fromRight} className="system-stats">
          <h3>System Stats</h3>
          {systemStats.map((item) => (
            <div key={item.label} className="stat-row">
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </motion.aside>
      </div>
    </motion.section>
  );
}

export default About;
