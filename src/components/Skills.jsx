import React from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import pythonIcon from '../assets/skills/python.svg';
import phpIcon from '../assets/skills/php.svg';
import laravelIcon from '../assets/skills/laravel.svg';
import javaIcon from '../assets/skills/java.svg';
import csharpIcon from '../assets/skills/csharp.svg';
import javascriptIcon from '../assets/skills/javascript.svg';
import nodejsIcon from '../assets/skills/nodejs.svg';
import convexIcon from '../assets/skills/convex.svg';
import reactIcon from '../assets/skills/react.svg';
import androidStudioIcon from '../assets/skills/android-studio.svg';
import unityIcon from '../assets/skills/unity.svg';
import expoIcon from '../assets/skills/expo.svg';

const skillsData = [
  { name: 'Python', icon: pythonIcon },
  { name: 'PHP', icon: phpIcon },
  { name: 'Laravel', icon: laravelIcon },
  { name: 'Java', icon: javaIcon },
  { name: 'C#', icon: csharpIcon },
  { name: 'JavaScript', icon: javascriptIcon },
  { name: 'Node.js', icon: nodejsIcon },
  { name: 'Convex', icon: convexIcon },
  { name: 'React Native', icon: reactIcon },
  { name: 'Android Studio', icon: androidStudioIcon },
  { name: 'Unity', icon: unityIcon },
  { name: 'Expo', icon: expoIcon },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1 }
};

function Skills() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="skills" className="skills" ref={ref}>
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <span className="number">02.</span>
        Skills & Abilities
      </motion.h2>

      <motion.div 
        className="skills-keycap-container"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {skillsData.map((skill) => (
          <motion.div key={skill.name} variants={itemVariants} className="keycap-wrapper">
              <div className="keycap">
                <div className="keycap-face keycap-front">
                  <img className="keycap-icon" src={skill.icon} alt={`${skill.name} logo`} loading="lazy" />
                </div>
              </div>
            <span className="keycap-label">{skill.name}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default Skills;
