import React from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

function Contact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="contact" className="contact" ref={ref}>
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <h2 className="number">06. What's Next?</h2>
        <h3 className="title">Get In Touch</h3>
        <p className="description">
          I'm currently open to new opportunities and my inbox is always open.
          Whether you have a question or just want to say hi, I'll do my best
          to get back to you!
        </p>
        <a href="mailto:jmjonatas4@gmail.com" className="cta-button">
          Say Hello
        </a>
      </motion.div>
    </section>
  );
}

export default Contact;