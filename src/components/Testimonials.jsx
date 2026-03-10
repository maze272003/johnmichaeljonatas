import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    text: "JM led the development of our inventory management system from scratch. His ability to translate our business requirements into a scalable, production-ready platform was impressive—stock discrepancies dropped significantly after launch.",
    author: "SpringBullBars",
    role: "Client — Inventory Management",
  },
  {
    text: "The document request system JM built streamlined our entire workflow. He coordinated directly with our team to understand requirements and delivered a Laravel + React application that residents actually use daily.",
    author: "San Lorenzo, Gapan City",
    role: "Doconnect — Government Document System",
  },
  {
    text: "JM led our capstone team to build a QR-based inventory system that replaced paper tracking entirely. His architectural decisions—from database schema to mobile app—resulted in a system that cut order processing time dramatically.",
    author: "RMPOIMS Capstone Team",
    role: "Capstone Project — QR Inventory System",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function Testimonials() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.section
      id="testimonials"
      className="testimonials"
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={containerVariants}
    >
      <h2 className="section-title">
        <span className="number">06.</span>
        What Collaborators Say
      </h2>
      <div className="testimonials-grid">
        {testimonials.map((item, index) => (
          <motion.div key={index} className="testimonial-card" variants={cardVariants}>
            <Quote size={28} className="testimonial-quote-icon" aria-hidden="true" />
            <p className="testimonial-text">{item.text}</p>
            <div className="testimonial-author">
              <span className="testimonial-name">{item.author}</span>
              <span className="testimonial-role">{item.role}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

export default Testimonials;
