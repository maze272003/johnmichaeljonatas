import React from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { FaPython, FaPhp, FaLaravel, FaJava, FaJsSquare, FaNodeJs, FaReact } from 'react-icons/fa';
import { SiAndroidstudio, SiUnity, SiExpo } from 'react-icons/si';

const skillsData = [
  { name: 'Python', icon: <FaPython />, color: '#3776AB' },
  { name: 'PHP', icon: <FaPhp />, color: '#777BB4' },
  { name: 'Laravel', icon: <FaLaravel />, color: '#FF2D20' },
  { name: 'Java', icon: <FaJava />, color: '#007396' },
  { name: 'C#', icon: <span>C#</span>, color: '#512BD4' },
  { name: 'JavaScript', icon: <FaJsSquare />, color: '#F7DF1E' },
  { name: 'Node.js', icon: <FaNodeJs />, color: '#339933' },
  { name: 'Convex', icon: <span>◈</span>, color: '#EE342F' },
  { name: 'React Native', icon: <FaReact />, color: '#61DAFB' },
  { name: 'Android Studio', icon: <SiAndroidstudio />, color: '#3DDC84' },
  { name: 'Unity', icon: <SiUnity />, color: '#FFFFFF' },
  { name: 'Expo', icon: <SiExpo />, color: '#000020' },
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
                <span className="keycap-icon" style={{ color: skill.color }}>{skill.icon}</span>
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
