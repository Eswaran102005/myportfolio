import { motion } from 'motion/react';

export default function CartoonRocket() {
  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      {/* Cartoon Rocket SVG */}
      <motion.svg 
        width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"
        animate={{ scaleY: [1, 1.1, 1], scaleX: [1, 0.9, 1] }} 
        transition={{ repeat: Infinity, duration: 0.3, ease: "easeInOut" }}
      >
        {/* Rocket Body */}
        <path d="M40 5C30 20 25 40 25 55C25 60 30 65 40 65C50 65 55 60 55 55C55 40 50 20 40 5Z" fill="#ff4d4d" stroke="#000" strokeWidth="2" />
        {/* Window */}
        <circle cx="40" cy="35" r="8" fill="#81d4fa" stroke="#000" strokeWidth="2" />
        <circle cx="38" cy="33" r="3" fill="#ffffff" fillOpacity="0.5" />
        {/* Fins */}
        <path d="M25 55L10 65V55L25 50V55Z" fill="#d32f2f" stroke="#000" strokeWidth="2" />
        <path d="M55 55L70 65V55L55 50V55Z" fill="#d32f2f" stroke="#000" strokeWidth="2" />
        {/* Nose Cone */}
        <path d="M40 5C35 15 30 20 28 25H52C50 20 45 15 40 5Z" fill="#d32f2f" stroke="#000" strokeWidth="2" />
      </motion.svg>

      {/* Multi-Color Cartoon Exhaust */}
      <div className="absolute top-[60px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-[-10px]">
        {/* Main Fire */}
        <motion.div 
          animate={{ height: [40, 80, 40], scaleX: [1, 1.5, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ repeat: Infinity, duration: 0.1 }}
          className="w-10 bg-gradient-to-t from-orange-600 via-yellow-400 to-transparent blur-md rounded-full shadow-[0_0_20px_rgba(255,165,0,0.8)]"
        />
        {/* Blue Flame Core */}
        <motion.div 
          animate={{ height: [20, 40, 20], scaleX: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 0.08, delay: 0.05 }}
          className="w-6 bg-gradient-to-t from-cyan-400 to-transparent blur-sm rounded-full -mt-10"
        />
        
        {/* Animated Pop-Particles (Smoke Bubbles) */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              y: [0, 60], 
              x: [(i - 2) * 15, (i - 2) * 40], 
              opacity: [0.8, 0], 
              scale: [0.5, 1.5, 0] 
            }}
            transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.1 }}
            className="absolute top-10 w-4 h-4 bg-white/20 rounded-full blur-[4px]"
          />
        ))}
      </div>
    </div>
  );
}
