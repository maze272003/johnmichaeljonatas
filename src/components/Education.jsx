import React from 'react';
// Import your school logos
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

function Education() {
  return (
    <section id="education" className="education">
      <h2 className="section-title">
        <span className="number">04.</span>
        My Education
      </h2>
      <div className="education-container">
        {educationData.map(edu => (
          <div key={edu.school} className="education-box">
            <img src={edu.logo} alt={`${edu.school} logo`} className="education-logo" />
            <div className="education-content">
              <h3>{edu.school}</h3>
              <p>{edu.degree}</p>
              <h4>{edu.years}</h4>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Education;