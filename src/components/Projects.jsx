import React from 'react';
import { Github, ExternalLink } from 'lucide-react';

const projectData = [
  // ... (pareho pa rin ang data mo dito)
    {
    id: 1,
    title: 'E-commerce Platform',
    description: 'A full-featured e-commerce solution built with React and Node.js, featuring product management, cart functionality, and secure checkout.',
    tech: ['React', 'Node.js', 'MongoDB'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'A productivity application with drag-and-drop functionality, real-time updates, and team collaboration features.',
    tech: ['React', 'Firebase', 'CSS'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 3,
    title: 'Portfolio Website',
    description: 'A responsive portfolio website showcasing modern design principles and optimized performance.',
    tech: ['React', 'CSS3', 'Vite'],
    liveUrl: '#',
    githubUrl: '#',
  },
];

function Projects() {
  return (
    <section id="projects" className="projects">
      <h2 className="section-title">
          <span className="number">02.</span>
          Some Things I’ve Built
      </h2>
      <ul className="projects-grid">
        {projectData.map(project => (
          <li key={project.id} className="project-card">
            <div>
              <header className="project-card-header">
                <h3 className="project-card-title">
                  <a href={project.liveUrl || project.githubUrl}>{project.title}</a>
                </h3>
                <div className="project-card-links">
                  <a href={project.githubUrl} aria-label="GitHub"><Github size={20} /></a>
                  <a href={project.liveUrl} aria-label="Live Demo"><ExternalLink size={20} /></a>
                </div>
              </header>
              <p className="project-card-description">{project.description}</p>
            </div>
            <footer className="project-card-tech">
              {project.tech.map(tech => <span key={tech}>{tech}</span>)}
            </footer>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Projects;