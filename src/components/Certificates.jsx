import React, { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

// Import your certificate images
import awsArchImg from '../assets/cert/aws_cloud_arch.png';
import awsSem1Img from '../assets/cert/aws_cloud_sem1.jpg';
import innovex from '../assets/cert/innovex2025.png';

const certificatesData = [
  { id: 1, title: 'AWS Cloud Architect', issuer: 'Amazon Web Services', imageUrl: awsArchImg, link: '#' },
  { id: 2, title: 'AWS Cloud Semester 1', issuer: 'Amazon Web Services', imageUrl: awsSem1Img, link: '#' },
  { id: 3, title: 'Innovex 2025', issuer: 'International Presentation', imageUrl: innovex, link: '#' },
];

function Certificates() {
  const { ref: sectionRef, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  
  // Refs for managing scroll behavior
  const scrollContainerRef = useRef(null);
  const autoScrollIntervalRef = useRef(null);
  const restartTimerRef = useRef(null);

  // Doblehin ang data para sa seamless animation
  const duplicatedCerts = [...certificatesData, ...certificatesData];

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const startAutoScroll = () => {
      // Clear any existing interval to prevent multiple loops
      clearInterval(autoScrollIntervalRef.current);
      
      autoScrollIntervalRef.current = setInterval(() => {
        // If scrolled to the end of the first set, reset to the beginning
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        } else {
          container.scrollLeft += 1; // Adjust this value for scroll speed
        }
      }, 25); // Adjust this value for scroll speed (lower = faster)
    };

    const stopAutoScroll = () => {
      clearInterval(autoScrollIntervalRef.current);
    };

    const handleUserInteraction = () => {
      stopAutoScroll();
      // Clear the previous restart timer
      clearTimeout(restartTimerRef.current);
      // Set a new timer to restart auto-scroll after 5 seconds
      restartTimerRef.current = setTimeout(startAutoScroll, 5000); // 5000ms = 5 seconds
    };

    // Start auto-scrolling initially
    startAutoScroll();

    // Add event listeners for user interaction
    container.addEventListener('wheel', handleUserInteraction);
    container.addEventListener('touchstart', handleUserInteraction);
    container.addEventListener('mousedown', handleUserInteraction);

    // Cleanup function to remove listeners and timers when the component unmounts
    return () => {
      container.removeEventListener('wheel', handleUserInteraction);
      container.removeEventListener('touchstart', handleUserInteraction);
      container.removeEventListener('mousedown', handleUserInteraction);
      clearInterval(autoScrollIntervalRef.current);
      clearTimeout(restartTimerRef.current);
    };
  }, []); // Empty dependency array ensures this runs only once

  return (
    <section id="certificates" className="certificates" ref={sectionRef}>
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <span className="number">04.</span>
        My Certificates
      </motion.h2>

      <div className="certificates-wrapper">
        <motion.div 
          ref={scrollContainerRef}
          className="certificates-scroll-container"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {duplicatedCerts.map((cert, index) => (
            <a 
              key={`${cert.id}-${index}`}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="certificate-card"
            >
              <img src={cert.imageUrl} alt={cert.title} className="certificate-image" />
              <div className="certificate-info">
                <h3>{cert.title}</h3>
                <p>{cert.issuer}</p>
              </div>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Certificates;