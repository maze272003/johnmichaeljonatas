import React from 'react';
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
        title: 'SpringBullBars', 
        subtitle: 'Inventory & Analytics Platform',
        challenge: 'Manual inventory tracking led to stock discrepancies and lost revenue for a growing automotive parts business.',
        role: 'Led end-to-end development as sole developer—architected the database, built the admin dashboard, and deployed to production.',
        impact: 'Reduced stock discrepancies by ~40% and cut manual data entry time in half for staff.',
        tech: ['Vanilla PHP', 'MySQL', 'Bootstrap'], 
        imageUrl: springbullbarsImg, 
        liveUrl: 'https://springbullbars.shop/', 
        status: 'Live', 
        statusColor: 'green' 
    },
    { 
        id: 2,
        title: 'RMPOIMS', 
        subtitle: 'QR-Based Inventory System',
        challenge: 'A regional medical office needed to modernize paper-based inventory tracking across multiple supply categories.',
        role: 'Led a capstone team of 4—defined the system architecture, designed the QR code workflow, and built both the web and Android applications.',
        impact: 'Enabled real-time inventory visibility, reducing order processing time by ~60% and eliminating manual counting errors.',
        tech: ['Laravel', 'MySQL', 'Tailwind'], 
        imageUrl: rmpoims, 
        liveUrl: 'https://rmpoims.com/',
        androidUrl: 'https://drive.google.com/drive/folders/1Nr5BhgonSHEPllSJkH4qUenCY0mYmvAt', 
        status: 'Live', 
        statusColor: 'green' 
    },
    { 
        id: 3, 
        title: 'General Tinio IMS', 
        subtitle: 'Health Center Inventory System',
        challenge: 'A municipal health center needed a centralized system to manage medical supplies and generate usage reports.',
        role: 'Led development and stakeholder coordination with health center staff to define requirements and iterate on the UI.',
        impact: 'Streamlined supply management for the HRU health center, enabling data-driven restocking decisions.',
        tech: ['Laravel', 'MySQL', 'Tailwind'], 
        imageUrl: gtims, 
        liveUrl: 'https://gtimss.hostcluster.site', 
        status: 'Live', 
        statusColor: 'green' 
    },
    { 
        id: 4, 
        title: 'Doconnect', 
        subtitle: 'Government Document Request System',
        challenge: 'Residents of San Lorenzo, Gapan City had no digital way to request government documents—requiring in-person visits.',
        role: 'Led full-stack development using Laravel + React with Inertia.js, coordinated with local government stakeholders.',
        impact: 'Digitized the document request workflow, reducing average processing time and eliminating unnecessary trips to the office.',
        tech: ['Laravel', 'React', 'Inertia.js'], 
        imageUrl: doconnect, 
        liveUrl: 'https://doconnect.hostcluster.site', 
        status: 'Live', 
        statusColor: 'green' 
    },
    { 
        id: 5, 
        title: 'AutoServ Center',
        subtitle: 'Car Service Appointment Platform',
        challenge: 'Built a platform to streamline car servicing appointments and repair tracking for a local auto shop.',
        role: 'Designed the database schema and built the booking system as a 2nd-year academic project.',
        impact: 'Demonstrated full-stack Laravel proficiency with user authentication and appointment management.',
        tech: ['Laravel', 'PHP', 'MySQL'], 
        imageUrl: autoservImg, 
        liveUrl: '#', 
        status: 'Archived', 
        statusColor: 'gray' 
    },
    { 
        id: 6, 
        title: 'Lumina E-commerce',
        subtitle: 'Online Shopping Platform',
        challenge: 'Created a functional e-commerce platform with cart management, product catalog, and checkout flow.',
        role: 'Built the full application from database design to front-end shopping experience.',
        impact: 'Strengthened core PHP and database skills—foundation for later production-grade projects.',
        tech: ['Vanilla PHP', 'MySQL'], 
        imageUrl: luminaImg, 
        liveUrl: '#', 
        status: 'Archived', 
        statusColor: 'gray' 
    },
    { 
        id: 7, 
        title: 'ArkVision Studio',
        subtitle: 'Photography Portfolio',
        challenge: 'A photography studio needed an online presence to showcase their work and visual style.',
        role: 'Built a Node.js/Express application with MongoDB for dynamic content management.',
        impact: 'First full-stack JavaScript project—established proficiency in the Node.js ecosystem.',
        tech: ['Node.js', 'Express', 'MongoDB'], 
        imageUrl: arkvisionImg, 
        liveUrl: 'https://drive.google.com/drive/folders/16Xv620F_LgnsPllMRAUDktXM91C39U93?usp=sharing', 
        status: 'Archived', 
        statusColor: 'gray' 
    },
    { 
        id: 8, 
        title: 'Jabs Basic Sound',
        subtitle: 'Sound System Rental Showcase',
        challenge: 'A local sound system rental business needed a web presence to display services and equipment.',
        role: 'Designed and built a static site as a 1st-year project, establishing foundational web development skills.',
        impact: 'First web project—laid the groundwork for future full-stack development.',
        tech: ['HTML', 'CSS', 'JavaScript'], 
        imageUrl: jabsImg, 
        liveUrl: '#', 
        status: 'Archived', 
        statusColor: 'gray' 
    },
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
          Case Studies
        </h2>
        <p className="projects-description">
          Selected projects where I led development from problem definition through 
          production deployment. Hover to explore each case study.
        </p>
      </motion.div>

      <div className="projects-grid" role="list">
        {projectData.map(project => (
          <article key={project.id} className="project-card" role="listitem">
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
                  <div>
                    <h3 className="project-card-title">
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">{project.title}</a>
                    </h3>
                    <p className="project-card-subtitle">{project.subtitle}</p>
                  </div>
                  
                  {/* Links Container */}
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
                
                <p className="project-card-description" aria-label="Challenge">{project.challenge}</p>
                <p className="project-card-impact" aria-label="Impact">{project.impact}</p>
              </div>

              <footer className="project-card-tech">
                {project.tech.map((tech, index) => (
                  <span key={index} className="tech-pill">{tech}</span>
                ))}
              </footer>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Projects;
