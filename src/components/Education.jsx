import React from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import auLogo from '../assets/educat/AU.jpg';
import fmnhsLogo from '../assets/educat/fmnhs.jpg';

const educationData = [
  {
    school: 'Phinma Araullo University',
    degree: 'Bachelor Of Science in Information Technology',
    years: '2022 - 2026 | Undergrad',
    logo: auLogo,
  },
  {
    school: 'Fort Magsaysay National High School',
    degree: 'JUNIOR HIGH & STRAND | ICT',
    years: '2016 - 2021 | Completed',
    logo: fmnhsLogo,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

const itemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 }
};

function Education() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="education" className="education" ref={ref}>
      <h2 className="section-title">
        <span className="number">03.</span>
        My Education
      </h2>
      <motion.div 
        className="education-container"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {educationData.map(edu => (
          <motion.div key={edu.school} variants={itemVariants} className="education-box">
            <img src={edu.logo} alt={`${edu.school} logo`} className="education-logo" />
            <div className="education-content">
              <h3>{edu.school}</h3>
              <p>{edu.degree}</p>
              <h4>{edu.years}</h4>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default Education;