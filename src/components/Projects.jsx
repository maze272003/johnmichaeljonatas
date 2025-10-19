// src/components/Projects.jsx
import React from 'react';

// You might want to move this data to a separate file (e.g., src/data/projects.js) later
const projectData = [
  {
    id: 1,
    title: 'E-commerce Storefront',
    description: 'A full-featured e-commerce platform built with React and a mock API. Includes product listings, shopping cart, and checkout process.',
    imageUrl: 'https://via.placeholder.com/400x200/e67e22/ffffff?text=Project+1', // Replace with actual image
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'A simple and intuitive task management application with drag-and-drop functionality and local storage persistence.',
    imageUrl: 'https://via.placeholder.com/400x200/34495e/ffffff?text=Project+2', // Replace with actual image
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 3,
    title: 'Personal Blog Site',
    description: 'A sleek personal blog developed with React, showcasing markdown parsing and dynamic routing for posts.',
    imageUrl: 'https://via.placeholder.com/400x200/2c3e50/ffffff?text=Project+3', // Replace with actual image
    liveUrl: '#',
    githubUrl: '#',
  },
];

function Projects() {
  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2>My Projects</h2>
        <p>A selection of my recent work, demonstrating my skills in web development.</p>

        <div className="projects-grid">
          {projectData.map(project => (
            <div className="project-card" key={project.id}>
              <img src={project.imageUrl} alt={project.title} className="project-card-image" />
              <div className="project-card-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-card-links">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">Live Demo</a>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">GitHub Repo</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;