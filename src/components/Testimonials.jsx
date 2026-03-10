import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    text: "JM delivered exceptional work on our inventory management system. His attention to detail and backend expertise made the project a success.",
    author: "SpringBullBars",
    role: "Client Project",
  },
  {
    text: "His ability to build robust full-stack applications using Laravel and React is impressive. The document request system he built streamlined our workflow.",
    author: "Doconnect",
    role: "Side Project",
  },
  {
    text: "A talented developer who consistently delivers clean, maintainable code. His QR-based inventory system was exactly what we needed.",
    author: "RMPOIMS",
    role: "Capstone Project",
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
        What People Say
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
