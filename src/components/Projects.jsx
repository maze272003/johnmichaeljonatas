import React from 'react';
import { Github, ExternalLink } from 'lucide-react';

// Import your project images here
import jabsImg from '../assets/projects/jabs.png';
import luminaImg from '../assets/projects/lumina3.png';
import arkvisionImg from '../assets/projects/arkvsion.png';
import autoservImg from '../assets/projects/Autoserv.png';
import springbullbarsImg from '../assets/projects/springbullbars.png';


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
    id: 2,
    category: 'School Project',
    title: 'AutoServ Service Center',
    description: 'A web platform for managing car servicing appointments, tracking repairs, and streamlining customer communication.',
    tech: ['Laravel', 'PHP', 'MySQL'],
    imageUrl: autoservImg,
    liveUrl: '#', // Add link if available
    status: 'EXPIRED',
    statusColor: 'green',
  },
  {
    id: 3,
    category: 'School Project',
    title: 'Lumina E-commerce',
    description: 'An e-commerce website offering a variety of products with a user-friendly shopping experience.',
    tech: ['Vanilla PHP', 'MySQL'],
    imageUrl: luminaImg,
    liveUrl: '#', // Add link if available
    status: 'EXPIRED',
    statusColor: 'green',
  },
  {
    id: 4,
    category: 'School Project',
    title: 'Jabs Basic Sound',
    description: 'Offers affordable sound system rentals for events and showcases music collaborations with artists.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    imageUrl: jabsImg,
    liveUrl: '#', // Add link if available
    status: 'EXPIRED',
    statusColor: 'green',
  },
  {
    id: 5,
    category: 'School Project',
    title: 'ArkVision Photo Studio',
    description: 'A photo studio platform for professional photography services, featuring a variety of visual styles.',
    tech: ['Node.js', 'Express'],
    imageUrl: arkvisionImg,
    liveUrl: 'https://drive.google.com/drive/folders/16Xv620F_LgnsPllMRAUDktXM91C39U93?usp=sharing',
    status: 'EXPIRED',
    statusColor: 'red',
  },
  {
    id: 6,
    category: 'School Project',
    title: 'RMPOIMS - Inventory Management System with ordering qr code.',
    description: 'A comprehensive inventory management system that utilizes QR codes for efficient ordering and tracking of products.',
    tech: ['Laravel', 'MySql'],
    imageUrl: arkvisionImg,
    liveUrl: 'https://rmpoims.com/',
    status: 'WORKING',
    statusColor: 'red',
  },
];

function Projects() {
  return (
    <section id="projects" className="projects">
      <h2 className="section-title">
          <span className="number">02.</span>
          My Projects
      </h2>
      <ul className="projects-grid">
        {projectData.map(project => (
          <li key={project.id} className="project-card">
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
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Projects;