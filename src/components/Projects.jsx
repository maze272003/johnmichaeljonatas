import React from 'react';
import CardSwap, { Card } from './CardSwap';
import { Globe, Smartphone } from 'lucide-react';
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
    { 
        id: 1, 
        title: 'Side Project | SpringBullBars', 
        description: "Inventory management tracking analytics for admins and staff.", 
        tech: ['Vanilla PHP', 'MySql', 'Bootstrap'], 
        imageUrl: springbullbarsImg, 
        liveUrl: 'https://springbullbars.shop/', 
        status: 'Working', 
        statusColor: 'green' 
    },
    { 
        id: 2, // Fixed ID from 6 to 2 (Unique)
        title: 'Capstone | RMPOIMS', 
        description: 'Inventory system utilizing QR codes for efficient ordering and tracking.', 
        tech: ['Laravel', 'MySql', 'Tailwind'], 
        imageUrl: rmpoims, 
        liveUrl: 'https://rmpoims.com/',
        androidUrl: 'https://drive.google.com/drive/folders/1Nr5BhgonSHEPllSJkH4qUenCY0mYmvAt', 
        status: 'Working', 
        statusColor: 'green' 
    },
    { id: 3, title: '2nd Year | AutoServ Center', description: 'Platform for managing car servicing appointments and repairs.', tech: ['Laravel', 'PHP', 'MySql'], imageUrl: autoservImg, liveUrl: '#', status: 'Expired', statusColor: 'red' },
    { id: 4, title: '2nd Year | Lumina E-commerce', description: 'User-friendly shopping experience for variety of products.', tech: ['Vanilla PHP', 'MySql'], imageUrl: luminaImg, liveUrl: '#', status: 'Expired', statusColor: 'red' },
    { id: 5, title: '1st Year | Jabs Basic Sound', description: 'Sound system rentals and music collaboration showcase.', tech: ['HTML', 'CSS', 'JS'], imageUrl: jabsImg, liveUrl: '#', status: 'Expired', statusColor: 'red' },
    { id: 6, title: '2nd Year | ArkVision Studio', description: 'Professional photography services with visual style showcase.', tech: ['Node.js', 'Express', 'Mongo'], imageUrl: arkvisionImg, liveUrl: 'https://drive.google.com/drive/folders/16Xv620F_LgnsPllMRAUDktXM91C39U93?usp=sharing', status: 'Expired', statusColor: 'red' },
    { id: 7, title: '3rd Year | General Tinio IMS', description: 'Inventory management for HRU health center.', tech: ['Laravel','MySql', 'Tailwind'], imageUrl: gtims, liveUrl: 'https://gtimss.hostcluster.site', status: 'Working', statusColor: 'green' },
    { id: 8, title: 'Side Project | Doconnect', description: 'Documents Request System For San Lorenzo Gapan City.', tech: ['Laravel','React', 'Inertia'], imageUrl: doconnect, liveUrl: 'https://doconnect.hostcluster.site', status: 'Working', statusColor: 'green' },
];

function Projects() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="projects" className="projects-section-container" ref={ref}>
      <motion.div 
        className="projects-text-content"
        initial={{ opacity: 0, x: -50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="section-title">
          <span className="number">05.</span>
          My Projects
        </h2>
        <p className="projects-description">
          Here are some of my recent works. Pause on hover to explore a project.
        </p>
      </motion.div>

      <div className="projects-card-swap-wrapper">
        <CardSwap
          width={380} // Adjusted width slightly for better mobile fit
          height={480}
          cardDistance={40}
          verticalDistance={50}
          delay={4000}
          pauseOnHover={true}
          skewAmount={0} // Reduced skew for cleaner look
          easing="back.out(1.2)" // Snappier animation
        >
          {projectData.map(project => (
            <Card key={project.id} customClass="project-card">
              {/* Image Section */}
              <div className="project-image-container">
                <img src={project.imageUrl} alt={project.title} className="project-image" />
                <span className={`project-status-badge status-${project.statusColor}`}>
                  {project.status}
                </span>
              </div>

              {/* Content Section */}
              <div className="project-content">
                <div className="project-top-info">
                  <header className="project-card-header">
                    <h3 className="project-card-title">
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">{project.title}</a>
                    </h3>
                    
                    {/* Links Container with GAP */}
                    <div className="project-card-links">
                      <a 
                        href={project.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="icon-link"
                        title="Visit Website"
                      >
                        <Globe size={18} />
                      </a>

                      {project.androidUrl && (
                        <a 
                            href={project.androidUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="icon-link"
                            title="Download Android App"
                        >
                            <Smartphone size={18} />
                        </a>
                      )}
                    </div>
                  </header>
                  
                  <p className="project-card-description">{project.description}</p>
                </div>

                <footer className="project-card-tech">
                  {project.tech.map((tech, index) => (
                    <span key={index} className="tech-pill">{tech}</span>
                  ))}
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