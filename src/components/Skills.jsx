import React from 'react';

const skillsData = [
  { name: 'Python', icon: 'https://img.icons8.com/color/48/000000/python.png' },
  { name: 'PHP', icon: 'https://img.icons8.com/officel/48/000000/php-logo.png' },
  { name: 'Laravel', icon: 'https://img.icons8.com/fluency/48/000000/laravel.png' },
  { name: 'Java', icon: 'https://img.icons8.com/color/48/000000/java-coffee-cup-logo.png' },
  { name: 'JavaScript', icon: 'https://img.icons8.com/color/48/000000/javascript.png' },
  { name: 'Node.js', icon: 'https://img.icons8.com/color/48/000000/nodejs.png' },
  { name: 'React Native', icon: 'https://img.icons8.com/color/48/000000/react-native.png' },
  { name: 'Android Studio', icon: 'https://img.icons8.com/color/48/000000/android-studio--v3.png' },
  { name: 'Unity', icon: 'https://img.icons8.com/ios-filled/50/000000/unity.png' },
  { name: 'Expo', icon: 'https://img.icons8.com/color/48/000000/expo.png' },
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
            <img src={skill.icon} alt={skill.name} />
            <span>{skill.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;