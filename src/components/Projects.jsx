import React from 'react';
import CardSwap, { Card } from './CardSwap';
import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Import project images
import jabsImg from '../assets/projects/jabs.png';
import luminaImg from '../assets/projects/lumina3.png';
import arkvisionImg from '../assets/projects/arkvsion.png';
import autoservImg from '../assets/projects/Autoserv.png';
import springbullbarsImg from '../assets/projects/springbullbars.png';
import rmpoims from '../assets/projects/rctmed.png';
import gtims from '../assets/projects/gtims.png'
import doconnect from '../assets/projects/doconnect.png';

const projectData = [
    { id: 1, title: 'SpringBullBars - Inventory System', description: "Developed to enhance inventory management and track analytics for admins and staff.", tech: ['Vanilla PHP', 'MySql', 'Bootstrap'], imageUrl: springbullbarsImg, liveUrl: 'https://springbullbars.shop/', status: 'Working', statusColor: 'green' },
    { id: 6, title: 'RMPOIMS - Inventory System', description: 'A comprehensive inventory system that utilizes QR codes for efficient ordering and tracking.', tech: ['Laravel', 'MySql', 'Tailwindcss'], imageUrl: rmpoims, liveUrl: 'https://rmpoims.com/', status: 'Working', statusColor: 'green' },
    { id: 2, title: 'AutoServ Service Center', description: 'A web platform for managing car servicing appointments, tracking repairs, and customer communication.', tech: ['Laravel', 'PHP', 'MySql'], imageUrl: autoservImg, liveUrl: '#', status: 'Expired', statusColor: 'red' },
    { id: 3, title: 'Lumina E-commerce', description: 'An e-commerce website offering a variety of products with a user-friendly shopping experience.', tech: ['Vanilla PHP', 'MySql'], imageUrl: luminaImg, liveUrl: '#', status: 'Expired', statusColor: 'red' },
    { id: 4, title: 'Jabs Basic Sound', description: 'Offers affordable sound system rentals for events and showcases music collaborations with artists.', tech: ['HTML', 'CSS', 'JavaScript'], imageUrl: jabsImg, liveUrl: '#', status: 'Expired', statusColor: 'red' },
    { id: 5, title: 'ArkVision Photo Studio', description: 'A photo studio platform for professional photography services, featuring a variety of visual styles.', tech: ['Node.js', 'Express', 'mongodb'], imageUrl: arkvisionImg, liveUrl: 'https://drive.google.com/drive/folders/16Xv620F_LgnsPllMRAUDktXM91C39U93?usp=sharing', status: 'Expired', statusColor: 'red' },
    { id: 6, title: 'General Tinio Inventory', description: 'General Tinio Inventory For hru health center.', tech: ['Laravel','MySql', 'Tailwind'], imageUrl: gtims, liveUrl: 'https://gtimss.hostcluster.site', status: 'Working', statusColor: 'green' },
    { id: 7, title: 'Doconnect', description: 'Documents Request System For San Lorenzo Gapan City', tech: ['Laravel','MySql', 'Tailwind','React + Inertia'], imageUrl: doconnect, liveUrl: 'https://doconnect.hostcluster.site', status: 'Working', statusColor: 'green' },
];

function Projects() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="projects" className="projects-section-container" ref={ref}>
      <motion.div 
        className="projects-text-content"
        initial={{ opacity: 0, x: -100 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">
          <span className="number">05.</span>
          My Projects
        </h2>
        <p className="projects-description">
          Here are some of my recent works. This deck automatically cycles, but you can also pause on hover to explore a project.
        </p>
      </motion.div>

      <div className="projects-card-swap-wrapper">
        <CardSwap
          width={400}
          height={500}
          cardDistance={50}
          verticalDistance={60}
          delay={4000}
          pauseOnHover={true}
          skewAmount={4}
          easing="power1"
        >
          {projectData.map(project => (
            <Card key={project.id} customClass="project-card">
              <div className="project-image-container">
                <img src={project.imageUrl} alt={project.title} className="project-image" />
                <span className={`project-status-badge status-${project.statusColor}`}>
                  {project.status}
                </span>
              </div>
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
            </Card>
          ))}
        </CardSwap>
      </div>
    </section>
  );
}

export default Projects;