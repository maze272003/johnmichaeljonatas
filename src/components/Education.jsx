import React from 'react';
import { useInView } from 'react-intersection-observer';
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
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="education" className="education" ref={ref}>
      <h2 className={`section-title animate-item ${inView ? 'visible fade-in-up' : 'fade-in-up'}`}>
        <span className="number">03.</span>
        My Education
      </h2>
      <div className="education-container">
        {educationData.map((edu, index) => (
          <div 
            key={edu.school} 
            className={`education-box animate-item ${inView ? 'visible fade-in-up' : 'fade-in-up'}`}
            style={{ transitionDelay: `${index * 200}ms` }}
          >
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