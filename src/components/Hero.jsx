import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function Hero() {
  return (
    <section id="hero" className="hero">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p variants={itemVariants} className="intro">
          Hi, I&apos;m
        </motion.p>
        <motion.h1 variants={itemVariants} className="name">
          John Michael Jonatas.
        </motion.h1>
        <motion.h2 variants={itemVariants} className="subtitle">
          I engineer systems that scale.
        </motion.h2>
        <motion.p variants={itemVariants} className="description">
          Full-Stack Developer focused on building production-grade web applications
          and scalable backend architectures. I led the design and development of
          inventory and document management platforms that serve real organizations—reducing 
          manual workflows by up to 60% and improving operational efficiency.
        </motion.p>
        <motion.div variants={itemVariants} className="hero-cta-group">
          <a href="#projects" className="cta-button">
            View Case Studies
          </a>
          <a href="#contact" className="cta-button cta-secondary">
            <FileText size={18} />
            Get In Touch
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Hero;