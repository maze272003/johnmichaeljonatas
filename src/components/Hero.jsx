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
          Hi There , My name is
        </motion.p>
        <motion.h1 variants={itemVariants} className="name">
          John Michael Jonatas.
        </motion.h1>
        <motion.h2 variants={itemVariants} className="subtitle">
          I build things for the web.
        </motion.h2>
        <motion.p variants={itemVariants} className="description">
          I am a Full-Stack Developer and 4rd-year student at Phinma AU passionate about enhancing my coding skills.
        </motion.p>
        <motion.div variants={itemVariants}>
          <a href="#about" className="cta-button">
            About Me
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Hero;