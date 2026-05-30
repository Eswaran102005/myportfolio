import { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

export default function SkillsCanvas() {
  const containerRef = useRef(null);
  const skills = [
    { name: "React JS", color: "#61DAFB", x: 15, y: 20 },
    { name: "Node JS", color: "#339933", x: 75, y: 15 },
    { name: "MongoDB", color: "#47A248", x: 45, y: 40 },
    { name: "GitHub", color: "#181717", x: 20, y: 70 },
    { name: "Vercel", color: "#000000", x: 80, y: 65 },
    { name: "HTML", color: "#E34F26", x: 10, y: 50 },
    { name: "CSS", color: "#1572B6", x: 85, y: 40 },
    { name: "JavaScript", color: "#F7DF1E", x: 50, y: 80 }
  ];

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      // Normalize to -1 to 1 range
      mouseX.set(((clientX - left) / width) * 2 - 1);
      mouseY.set(((clientY - top) / height) * 2 - 1);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[600px] bg-black overflow-hidden flex flex-col items-center justify-center px-6"
    >
      {/* Header */}
      <div className="absolute top-20 flex flex-col items-center text-center z-10 pointer-events-none">
        <div className="liquid-glass rounded-full px-4 py-1 text-xs font-medium text-white mb-6 border border-white/5 font-body uppercase tracking-wider">
          Capabilities
        </div>
        <h2 className="text-4xl md:text-6xl font-heading italic text-white tracking-tight leading-[0.9]">
          Fullstack Force Field.
        </h2>
      </div>

      <div className="relative w-full max-w-4xl h-full mt-40 perspective-[1000px]">
        {skills.map((skill, idx) => {
          // Calculate movement based on normalized mouse position (outside render cycle via useTransform)
          const translateX = useTransform(smoothMouseX, [-1, 1], [-120, 120]);
          const translateY = useTransform(smoothMouseY, [-1, 1], [-80, 80]);
          
          return (
            <motion.div
              key={idx}
              style={{
                x: (skill.x / 100) * 800 - 400,
                y: (skill.y / 100) * 400 - 200,
                translateX,
                translateY,
                willChange: "transform"
              }}
              whileHover={{ scale: 1.1, zIndex: 50 }}
              className="absolute left-1/2 top-1/2 cursor-default"
            >
              <div className="group relative bg-[#0a0a0a] px-6 py-3 rounded-full border border-white/10 flex items-center gap-3 shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-colors hover:border-white/30">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: skill.color, boxShadow: `0 0 10px ${skill.color}` }} />
                <span className="text-sm font-body font-medium text-white/90">{skill.name}</span>
                
                {/* Subtle Glow on hover */}
                <div 
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-10 transition-opacity blur-md"
                  style={{ backgroundColor: skill.color }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Ambient Particle Nebula (CSS-only) */}
      <div className="absolute inset-0 pointer-events-none opacity-30 select-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-pulse delay-700" />
      </div>
    </section>
  );
}
