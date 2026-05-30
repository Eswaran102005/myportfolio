import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function FloatingOrbs() {
  const containerRef = useRef(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX / innerWidth) - 0.5);
      mouseY.set((clientY / innerHeight) - 0.5);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const orbs = [
    { size: 'w-64 h-64', color: 'bg-blue-500/20', x: -20, y: -20, factor: 50 },
    { size: 'w-96 h-96', color: 'bg-purple-500/10', x: 30, y: 40, factor: -70 },
    { size: 'w-72 h-72', color: 'bg-cyan-500/15', x: -40, y: 50, factor: 30 },
    { size: 'w-80 h-80', color: 'bg-indigo-500/10', x: 50, y: -30, factor: -40 },
  ];

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-[100px] ${orb.size} ${orb.color}`}
          style={{
            left: `${50 + orb.x}%`,
            top: `${50 + orb.y}%`,
            x: useTransform(smoothX, [ -0.5, 0.5 ], [ -orb.factor, orb.factor ]),
            y: useTransform(smoothY, [ -0.5, 0.5 ], [ -orb.factor, orb.factor ]),
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}
