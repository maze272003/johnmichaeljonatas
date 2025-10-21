import React, { useState, useEffect } from 'react';

// Import all your components
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Education from './components/Education';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import AnimatedSection from './components/AnimatedSection'; // <-- I-IMPORT ANG BAGO
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <Header />
          <main>
            <Hero /> {/* Hindi na kailangan i-animate dahil ito ang una */}
            
            <AnimatedSection>
              <About />
            </AnimatedSection>
            
            <AnimatedSection>
              <Skills />
            </AnimatedSection>
            
            <AnimatedSection>
              <Education />
            </AnimatedSection>
            
            <AnimatedSection>
              <Projects />
            </AnimatedSection>
            
            <AnimatedSection>
              <Contact />
            </AnimatedSection>
          </main>
          <Footer />
        </>
      )}
    </>
  );
}

export default App;