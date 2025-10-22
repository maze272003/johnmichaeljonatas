import React from 'react';
import { useInView } from 'react-intersection-observer';
import { ExternalLink } from 'lucide-react';

// Import your project images here
import jabsImg from '../assets/projects/jabs.png';
import luminaImg from '../assets/projects/lumina3.png';
import arkvisionImg from '../assets/projects/arkvsion.png';
import autoservImg from '../assets/projects/Autoserv.png';
import springbullbarsImg from '../assets/projects/springbullbars.png';
import rmpoims from '../assets/projects/rctmed.png';
// NOTE: Add your RMPOIMS image import here when you have it
// import rmpoimsImg from '../assets/projects/rmpoims.png';


const projectData = [
  {
    id: 1,
    category: 'Freelance',
    title: 'SpringBullBars - Inventory System',
    description: "Developed to enhance inventory management and track analytics for admins and staff.",
    tech: ['Vanilla PHP', 'MySQL', 'Bootstrap'],
    imageUrl: springbullbarsImg,
    liveUrl: 'https://springbullbars.shop/',
    status: 'Completed',
    statusColor: 'blue',
  },
   {
    id: 6, // Changed ID to be unique
    category: 'School Project',
    title: 'RMPOIMS - Inventory System',
    description: 'A comprehensive inventory system that utilizes QR codes for efficient ordering and tracking of products.',
    tech: ['Laravel', 'MySQL', 'Tailwindcss'],
    imageUrl: rmpoims, // Replace with rmpoimsImg when available
    liveUrl: 'https://rmpoims.com/',
    status: 'Working',
    statusColor: 'green',
  },
  {
    id: 2,
    category: 'School Project',
    title: 'AutoServ Service Center',
    description: 'A web platform for managing car servicing appointments, tracking repairs, and streamlining customer communication.',
    tech: ['Laravel', 'PHP', 'MySQL'],
    imageUrl: autoservImg,
    liveUrl: '#',
    status: 'Expired',
    statusColor: 'gray',
  },
  {
    id: 3,
    category: 'School Project',
    title: 'Lumina E-commerce',
    description: 'An e-commerce website offering a variety of products with a user-friendly shopping experience.',
    tech: ['Vanilla PHP', 'MySQL'],
    imageUrl: luminaImg,
    liveUrl: '#',
    status: 'Expired',
    statusColor: 'gray',
  },
  {
    id: 4,
    category: 'School Project',
    title: 'Jabs Basic Sound',
    description: 'Offers affordable sound system rentals for events and showcases music collaborations with artists.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    imageUrl: jabsImg,
    liveUrl: '#',
    status: 'Expired',
    statusColor: 'gray',
  },
  {
    id: 5,
    category: 'School Project',
    title: 'ArkVision Photo Studio',
    description: 'A photo studio platform for professional photography services, featuring a variety of visual styles.',
    tech: ['Node.js', 'Express'],
    imageUrl: arkvisionImg,
    liveUrl: 'https://drive.google.com/drive/folders/16Xv620F_LgnsPllMRAUDktXM91C39U93?usp=sharing',
    status: 'Not Working',
    statusColor: 'red',
  },
];

function Projects() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="projects" className="projects" ref={ref}>
      <h2 className={`section-title animate-item ${inView ? 'visible fade-in-up' : 'fade-in-up'}`}>
        <span className="number">05.</span>
        My Projects
      </h2>
      <ul className="projects-grid">
        {projectData.map((project, index) => (
          <li 
            key={project.id} 
            className={`project-card animate-item ${inView ? 'visible fade-in-up' : 'fade-in-up'}`}
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            {/* Project Image and Status Badge */}
            <div className="project-image-container">
              <img src={project.imageUrl} alt={project.title} className="project-image" />
              <span className={`project-status-badge status-${project.statusColor}`}>
                {project.status}
              </span>
            </div>

            {/* Project Content */}
            <div className="project-content">
              <div>
                <header className="project-card-header">
                  <h3 className="project-card-title">
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">{project.title}</a>
                  </h3>
                  <div className="project-card-links">
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label="Live Demo"><ExternalLink size={20} /></a>
                  </div>
                </header>
                <p className="project-card-description">{project.description}</p>
              </div>
              <footer className="project-card-tech">
                {project.tech.map(tech => <span key={tech}>{tech}</span>)}
              </footer>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Projects;