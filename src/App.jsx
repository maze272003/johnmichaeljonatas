import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';

// Import Driver.js
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

// Import all your components
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Education from './components/Education';
import Certificates from './components/Certificates';
import Projects from './components/Projects';
import Games from './components/Games';
import Testimonials from './components/Testimonials';
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
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return undefined;

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    });

    let animationFrameId;
    const raf = (time) => {
      lenis.raf(time);
      animationFrameId = window.requestAnimationFrame(raf);
    };
    animationFrameId = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const updateScrollHue = () => {
      const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);
      const progress = Math.min(window.scrollY / maxScroll, 1);
      document.documentElement.style.setProperty('--holo-hue', `${progress * 120}deg`);
    };

    updateScrollHue();
    window.addEventListener('scroll', updateScrollHue, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollHue);
  }, []);

  useEffect(() => {
    const konamiCode = [
      'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'
    ];
    const pressed = [];
    let resetTimerId;

    const handleKeyDown = (event) => {
      pressed.push(event.key);
      if (pressed.length > konamiCode.length) pressed.shift();
      window.clearTimeout(resetTimerId);
      resetTimerId = window.setTimeout(() => {
        pressed.length = 0;
      }, 3500);

      if (pressed.join('|').toLowerCase() === konamiCode.join('|').toLowerCase()) {
        document.body.classList.add('konami-activated');
        pressed.length = 0;
        window.setTimeout(() => document.body.classList.remove('konami-activated'), 8000);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(resetTimerId);
      window.removeEventListener('keydown', handleKeyDown);
    };
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
            <Games />
            <Testimonials />
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
