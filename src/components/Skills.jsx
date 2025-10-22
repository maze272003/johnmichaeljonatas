import React from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { FaPython, FaPhp, FaLaravel, FaJava, FaJsSquare, FaNodeJs, FaReact } from 'react-icons/fa';
import { SiAndroidstudio, SiUnity, SiExpo } from 'react-icons/si';

const skillsData = [
  { name: 'Python', icon: <FaPython /> },
  { name: 'PHP', icon: <FaPhp /> },
  { name: 'Laravel', icon: <FaLaravel /> },
  { name: 'Java', icon: <FaJava /> },
  { name: 'JavaScript', icon: <FaJsSquare /> },
  { name: 'Node.js', icon: <FaNodeJs /> },
  { name: 'React Native', icon: <FaReact /> },
  { name: 'Android Studio', icon: <SiAndroidstudio /> },
  { name: 'Unity', icon: <SiUnity /> },
  { name: 'Expo', icon: <SiExpo /> },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

function Skills() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="skills" className="skills" ref={ref}>
      <h2 className="section-title">
        <span className="number">02.</span>
        Skills & Abilities
      </h2>
      <motion.div 
        className="skills-container"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {skillsData.map((skill) => (
          <motion.div key={skill.name} variants={itemVariants} className="skill-item">
            {skill.icon}
            <span>{skill.name}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default Skills;