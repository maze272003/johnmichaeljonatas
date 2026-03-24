import React, { useState, useEffect, useRef } from 'react';

const MAX_TRAIL_POINTS = 40;

function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const trailRef = useRef(null);
  const pointsRef = useRef([]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('keycap')
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = () => setIsHovering(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isMobile, isVisible]);

  useEffect(() => {
    if (isMobile) return undefined;

    const canvas = trailRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return undefined;

    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      pointsRef.current = pointsRef.current
        .map((point) => ({ ...point, life: point.life - 0.02 }))
        .filter((point) => point.life > 0);

      pointsRef.current.forEach((point) => {
        context.beginPath();
        context.arc(point.x, point.y, 8 * point.life, 0, Math.PI * 2);
        context.fillStyle = `rgba(0, 243, 255, ${0.45 * point.life})`;
        context.fill();
      });

      animationFrameId = window.requestAnimationFrame(draw);
    };

    const pushPoint = (event) => {
      pointsRef.current.push({ x: event.clientX, y: event.clientY, life: 1 });
      if (pointsRef.current.length > MAX_TRAIL_POINTS) pointsRef.current.shift();
    };

    resize();
    draw();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', pushPoint);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', pushPoint);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      <canvas ref={trailRef} className="cursor-trail-canvas" aria-hidden="true" />
      <div
        className={`custom-cursor ${isHovering ? 'hovering' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          opacity: isVisible ? 1 : 0,
        }}
        aria-hidden="true"
      />
    </>
  );
}

export default CustomCursor;
