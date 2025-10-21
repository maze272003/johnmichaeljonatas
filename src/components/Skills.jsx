import React from 'react';
import { useInView } from 'react-intersection-observer';
import {
  FaPython, FaPhp, FaLaravel, FaJava, FaJsSquare, FaNodeJs, FaReact
} from 'react-icons/fa';
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

function Skills() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="skills" className="skills" ref={ref}>
      <h2 className={`section-title animate-item ${inView ? 'visible fade-in-up' : 'fade-in-up'}`}>
        <span className="number">02.</span>
        Skills & Abilities
      </h2>
      <div className="skills-container">
        {skillsData.map((skill, index) => (
          <div 
            key={skill.name} 
            className={`skill-item animate-item ${inView ? 'visible fade-in-up' : 'fade-in-up'}`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            {skill.icon}
            <span>{skill.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;