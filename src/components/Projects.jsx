import React, { useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import ImageModal from './ImageModal'; // The reusable modal for previews

// Import your project images
import jabsImg from '../assets/projects/jabs.png';
import luminaImg from '../assets/projects/lumina3.png';
import arkvisionImg from '../assets/projects/arkvsion.png';
import autoservImg from '../assets/projects/Autoserv.png';
import springbullbarsImg from '../assets/projects/springbullbars.png';
import rmpoims from '../assets/projects/rctmed.png';

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
    id: 6,
    category: 'School Project',
    title: 'RMPOIMS - Inventory System',
    description: 'A comprehensive inventory system that utilizes QR codes for efficient ordering and tracking of products.',
    tech: ['Laravel', 'MySQL', 'Tailwindcss'],
    imageUrl: rmpoims,
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 }
};

function Projects() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [selectedImage, setSelectedImage] = useState(null); // State for the image preview
  const lastTap = useRef(0); // Ref to track taps for mobile

  const handleDoubleClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const handleTouchEnd = (imageUrl) => {
    const now = new Date().getTime();
    if (now - lastTap.current < 300) { // 300ms threshold for a double tap
      handleDoubleClick(imageUrl);
    }
    lastTap.current = now;
  };

  return (
    <>
      <section id="projects" className="projects" ref={ref}>
        <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
        >
          <span className="number">05.</span>
          My Projects
        </motion.h2>

        <motion.ul 
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {projectData.map((project) => (
            <motion.li 
              key={project.id} 
              variants={itemVariants}
              className="project-card"
              onDoubleClick={() => handleDoubleClick(project.imageUrl)}
              onTouchEnd={() => handleTouchEnd(project.imageUrl)}
            >
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
            </motion.li>
          ))}
        </motion.ul>
      </section>

      <AnimatePresence>
        {selectedImage && (
          <ImageModal imageUrl={selectedImage} onClose={closeModal} />
        )}
      </AnimatePresence>
    </>
  );
}

export default Projects;