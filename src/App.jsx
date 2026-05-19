import React, { useState, useEffect } from 'react';

import { driver } from "driver.js";
import "driver.js/dist/driver.css";

import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Education from './components/Education';
import Certificates from './components/Certificates';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // New useEffect for the tour logic
  useEffect(() => {
    if (!isLoading) {
      const isTourCompleted = localStorage.getItem('portfolioTourCompleted');

      if (isTourCompleted !== 'true') {
        const driverObj = driver({
          showProgress: true,
          showButtons: ['next', 'previous', 'close'],
          
          // --- THIS IS THE CORRECTED PART ---
          // This function now runs cleanly whenever the tour is closed for any reason
          
          onDestroyed: () => {
            localStorage.setItem('portfolioTourCompleted', 'true');
          },
          // ------------------------------------

          steps: [
            { element: '.hero', popover: { title: 'Welcome!', description: "Hi there! I'm JM. Welcome to my personal portfolio. Let me give you a quick tour." } },
            { element: '.about-content', popover: { title: 'About Me', description: 'Here you can learn a little more about my journey and passion for development.' } },
            { element: '.skills-container', popover: { title: 'My Skills', description: 'This section showcases the technologies and tools I work with.' } },
            { element: '.certificates-wrapper', popover: { title: 'Certificates', description: 'This carousel automatically scrolls through my certifications. You can also scroll it manually or double-tap any certificate to see a full preview!' } },
            { element: '.projects-grid', popover: { title: 'My Projects', description: 'Here are some of the projects I\'ve built. Feel free to double-tap any project card to view its image.' } },
            { element: '#contact', popover: { title: 'Get In Touch', description: "Let's connect! You can reach me through my email here." } },
            { element: '.social-sidebar', popover: { title: 'Social Links', description: "You can also find my social and professional links right here on the side." } }
          ]
        });

        setTimeout(() => {
          driverObj.drive();
        }, 500);
      }
    }
  }, [isLoading]);


  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <CustomCursor />
          <Header />
          <main>
            <Hero />
            <About />
            <Skills />
            <Education />
            <Certificates />
            <Projects />
            <Contact />
          </main>
          <Footer />
          <BackToTop />
        </>
      )}
    </>
  );
}

export default App;