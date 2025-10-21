import React from 'react';
// Mag-import ng specific icons mula sa library
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
  return (
    <section id="skills" className="skills">
      <h2 className="section-title">
        <span className="number">03.</span>
        Skills & Abilities
      </h2>
      <div className="skills-container">
        {skillsData.map(skill => (
          <div key={skill.name} className="skill-item">
            {/* Direkta nating ilalagay ang icon component dito */}
            {skill.icon}
            <span>{skill.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;