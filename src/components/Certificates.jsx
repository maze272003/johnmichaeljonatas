import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import CertificateModal from './CertificateModal';

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
  const [selectedCert, setSelectedCert] = useState(null);

  // Ref para sa double tap logic sa mobile
  const lastTap = useRef(0);

  // (Lahat ng code para sa auto-scroll ay mananatili dito)
  const scrollContainerRef = useRef(null);
  const autoScrollIntervalRef = useRef(null);
  const restartTimerRef = useRef(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const startAutoScroll = () => {
      clearInterval(autoScrollIntervalRef.current);
      autoScrollIntervalRef.current = setInterval(() => {
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        } else {
          container.scrollLeft += 1;
        }
      }, 30);
    };

    const stopAutoScroll = () => {
      clearInterval(autoScrollIntervalRef.current);
    };

    const handleUserInteraction = () => {
      stopAutoScroll();
      clearTimeout(restartTimerRef.current);
      restartTimerRef.current = setTimeout(startAutoScroll, 5000);
    };

    startAutoScroll();

    container.addEventListener('wheel', handleUserInteraction, { passive: true });
    container.addEventListener('touchstart', handleUserInteraction, { passive: true });
    container.addEventListener('mousedown', handleUserInteraction);

    return () => {
      container.removeEventListener('wheel', handleUserInteraction);
      container.removeEventListener('touchstart', handleUserInteraction);
      container.removeEventListener('mousedown', handleUserInteraction);
      clearInterval(autoScrollIntervalRef.current);
      clearTimeout(restartTimerRef.current);
    };
  }, []);

  const handleDoubleClick = (imageUrl) => {
    setSelectedCert(imageUrl);
  };

  const closeModal = () => {
    setSelectedCert(null);
  };

  // BAGONG FUNCTION para sa mobile touch
  const handleTouchEnd = (imageUrl) => {
    const now = new Date().getTime();
    const timeSinceLastTap = now - lastTap.current;
    if (timeSinceLastTap < 300 && timeSinceLastTap > 0) {
      // Kung ang tap ay mas mabilis sa 300ms, consider it a double tap
      handleDoubleClick(imageUrl);
    }
    lastTap.current = now;
  };

  return (
    <>
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
            {[...certificatesData, ...certificatesData].map((cert, index) => (
              <div 
                key={`${cert.id}-${index}`}
                className="certificate-card"
                onDoubleClick={() => handleDoubleClick(cert.imageUrl)} // Para sa Desktop
                onTouchEnd={() => handleTouchEnd(cert.imageUrl)}      // Para sa Mobile
              >
                <img src={cert.imageUrl} alt={cert.title} className="certificate-image" />
                <div className="certificate-info">
                  <h3>{cert.title}</h3>
                  <p>{cert.issuer}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {selectedCert && (
        <CertificateModal imageUrl={selectedCert} onClose={closeModal} />
      )}
    </>
  );
}

export default Certificates;