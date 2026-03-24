import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, BrainCircuit } from 'lucide-react';
import profileImage from '../assets/jm.jpg';

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
  const orbitSnippets = [
    {
      className: 'code-orbit code-orbit-one',
      code: `const secureApi = async () => {
  const token = await auth.issueToken();
  return encrypt(payload, token);
};`,
    },
    {
      className: 'code-orbit code-orbit-two',
      code: `model.fit(trainData, {
  optimizer: "adamw",
  epochs: 120
});`,
    },
    {
      className: 'code-orbit code-orbit-three',
      code: `terraform apply -var "env=prod"
ansible-playbook deploy.yml`,
    },
  ];

  return (
    <section id="hero" className="hero">
      <motion.div
        className="hero-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="hero-content">
          <motion.p variants={itemVariants} className="intro">
            &gt; system.online
          </motion.p>
          <motion.h1 variants={itemVariants} className="name glitch-heading" data-text="John Michael Jonatas.">
            John Michael Jonatas.
          </motion.h1>
          <motion.h2 variants={itemVariants} className="subtitle typing-subtitle">
            Full Stack Developer | AI Architect | Cyber Security Specialist
          </motion.h2>
          <motion.p variants={itemVariants} className="description">
            I build resilient full-stack systems, production-ready AI workflows, and secure cloud infrastructure
            with a focus on performance, maintainability, and measurable business impact.
          </motion.p>
          <motion.div variants={itemVariants} className="hero-badges">
            <span><BrainCircuit size={16} /> AI Systems</span>
            <span><ShieldCheck size={16} /> Secure Architecture</span>
          </motion.div>
          <motion.div variants={itemVariants} className="hero-cta-group">
            <a href="#projects" className="cta-button">
              View Case Studies
            </a>
            <a href="#contact" className="cta-button cta-secondary">
              Initialize Transmission
            </a>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="hero-visual">
          <div className="hero-avatar-holo">
            <img src={profileImage} alt="John Michael Jonatas holographic portrait" className="hero-avatar-image" />
          </div>
          {orbitSnippets.map((snippet) => (
            <pre key={snippet.className} className={snippet.className} aria-hidden="true">
              <code>{snippet.code}</code>
            </pre>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Hero;
