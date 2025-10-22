import React from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

// Import your certificate images from the assets folder
import awsArchImg from '../assets/cert/aws_cloud_arch.png';
import awsSem1Img from '../assets/cert/aws_cloud_sem1.jpg';
import innovex from '../assets/cert/innovex2025.png'; // Correct extension

const certificatesData = [
  {
    id: 1,
    title: 'AWS Cloud Architect',
    issuer: 'Amazon Web Services',
    imageUrl: awsArchImg,
    link: '#', // Optional: Add a link to the certificate verification
  },
  {
    id: 2,
    title: 'AWS Cloud Semester 1',
    issuer: 'Amazon Web Services',
    imageUrl: awsSem1Img,
    link: '#', // Optional: Add a link to the certificate verification
  },
  {
    id: 3,
    title: 'Innovex 2025',
    issuer: 'International Presentation',
    imageUrl: innovex,
    link: '#', // Optional: Add a link to the certificate verification
  },
  // Add more certificates here in the future
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 }
};

function Certificates() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="certificates" className="certificates" ref={ref}>
      <h2 className="section-title">
        <span className="number">04.</span>
        My Certificates
      </h2>
      <motion.div 
        className="certificates-container"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {certificatesData.map(cert => (
          <motion.a 
            key={cert.id} 
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            variants={itemVariants} 
            className="certificate-card"
          >
            <img src={cert.imageUrl} alt={cert.title} className="certificate-image" />
            <div className="certificate-info">
              <h3>{cert.title}</h3>
              <p>{cert.issuer}</p>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}

export default Certificates;