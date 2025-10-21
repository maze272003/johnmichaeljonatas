import React from 'react';
import { useInView } from 'react-intersection-observer';

function AnimatedSection({ children }) {
  const { ref, inView } = useInView({
    // Options
    triggerOnce: true, // Animation will trigger only once
    threshold: 0.1,    // Trigger when 10% of the section is visible
  });

  return (
    <div ref={ref} className={`section-animation ${inView ? 'visible' : ''}`}>
      {children}
    </div>
  );
}

export default AnimatedSection;