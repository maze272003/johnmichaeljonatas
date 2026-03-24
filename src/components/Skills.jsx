import React from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { FaPython, FaPhp, FaLaravel, FaJava, FaJsSquare, FaNodeJs, FaReact } from 'react-icons/fa';
import { SiAndroidstudio, SiUnity, SiExpo, SiDotnet } from 'react-icons/si';

const ConvexIcon = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" role="img">
    <title>Convex</title>
    <polygon points="12,2 22,12 12,22 2,12" fill="currentColor" />
  </svg>
);

const skillsData = [
  { name: 'Python', icon: <FaPython />, color: '#3776AB', level: 90 },
  { name: 'PHP', icon: <FaPhp />, color: '#777BB4', level: 88 },
  { name: 'Laravel', icon: <FaLaravel />, color: '#FF2D20', level: 87 },
  { name: 'Java', icon: <FaJava />, color: '#007396', level: 76 },
  { name: 'C#', icon: <SiDotnet />, color: '#512BD4', level: 74 },
  { name: 'JavaScript', icon: <FaJsSquare />, color: '#F7DF1E', level: 92 },
  { name: 'Node.js', icon: <FaNodeJs />, color: '#339933', level: 84 },
  { name: 'Convex', icon: <ConvexIcon />, color: '#EE342F', level: 70 },
  { name: 'React Native', icon: <FaReact />, color: '#61DAFB', level: 82 },
  { name: 'Android Studio', icon: <SiAndroidstudio />, color: '#3DDC84', level: 78 },
  { name: 'Unity', icon: <SiUnity />, color: '#FFFFFF', level: 67 },
  { name: 'Expo', icon: <SiExpo />, color: '#000020', level: 73 },
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
        Skills Matrix
      </motion.h2>

      <motion.div 
        className="skills-keycap-container skills-honeycomb"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <svg className="skills-connections" viewBox="0 0 1000 700" preserveAspectRatio="none" aria-hidden="true">
          <path d="M180 180 C320 100, 420 220, 560 170" />
          <path d="M560 170 C700 130, 760 250, 900 210" />
          <path d="M220 430 C380 360, 500 460, 680 400" />
        </svg>
        {skillsData.map((skill) => (
          <motion.div key={skill.name} variants={itemVariants} className="keycap-wrapper hex-node">
            <div className="keycap hex-keycap">
              <div className="keycap-face keycap-front">
                <span className="keycap-icon" style={{ color: skill.color }}>{skill.icon}</span>
              </div>
            </div>
            <div
              className="expertise-ring"
              style={{ '--expertise-level': `${skill.level}%` }}
              aria-label={`${skill.name} expertise ${skill.level}%`}
            >
              <span>{skill.level}%</span>
            </div>
            <span className="keycap-label">{skill.name}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default Skills;
