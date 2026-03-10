import React from 'react';
import { motion } from 'framer-motion';

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
          Hi there, my name is
        </motion.p>
        <motion.h1 variants={itemVariants} className="name">
          John Michael Jonatas.
        </motion.h1>
        <motion.h2 variants={itemVariants} className="subtitle">
          I build robust web solutions.
        </motion.h2>
        <motion.p variants={itemVariants} className="description">
          I'm a Full-Stack Developer specializing in building scalable backend systems
          and modern web applications. Currently a 4th-year BS Information Technology
          student at Phinma AU, I turn ideas into reliable, production-ready software.
        </motion.p>
        <motion.div variants={itemVariants}>
          <a href="#projects" className="cta-button">
            View My Work
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Hero;