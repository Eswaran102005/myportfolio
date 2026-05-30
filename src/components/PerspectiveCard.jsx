import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function PerspectiveCard({ children, className = "" }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 300, damping: 30 });

  const glareX = useSpring(useTransform(mouseX, [0, 100], [0, 100]), { stiffness: 300, damping: 30 });
  const glareY = useSpring(useTransform(mouseY, [0, 100], [0, 100]), { stiffness: 300, damping: 30 });
  const glareOpacity = useSpring(0, { stiffness: 300, damping: 30 });

  function handleMouseMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXVal = event.clientX - rect.left;
    const mouseYVal = event.clientY - rect.top;

    const xPct = (mouseXVal / width) - 0.5;
    const yPct = (mouseYVal / height) - 0.5;

    x.set(xPct);
    y.set(yPct);

    mouseX.set((mouseXVal / width) * 100);
    mouseY.set((mouseYVal / height) * 100);
    glareOpacity.set(0.6);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
    glareOpacity.set(0);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative ${className}`}
    >
      <div style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}>
        {children}
      </div>
      
      {/* Glare effect */}
      <motion.div
        style={{
          background: useTransform(
            [glareX, glareY],
            ([gx, gy]) => `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.15) 0%, transparent 80%)`
          ),
          opacity: glareOpacity,
        }}
        className="absolute inset-0 pointer-events-none z-10"
      />
    </motion.div>
  );
}
