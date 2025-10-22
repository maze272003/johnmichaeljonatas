import React, { useState, useEffect } from 'react';

// Import all your components
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Education from './components/Education';
import Certificates from './components/Certificates';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hide the preloader after 3 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    // Cleanup the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []); // The empty array ensures this effect runs only once on mount

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <>
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
        </>
      )}
    </>
  );
}

export default App;