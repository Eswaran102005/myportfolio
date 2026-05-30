import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Mail, Github, Linkedin, Twitter, Phone, Copy, Check, Rocket as RocketIcon } from 'lucide-react';
import { useLenis } from 'lenis/react';
import CartoonRocket from './CartoonRocket';

export default function RobotContact() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isFlying, setIsFlying] = useState(false);
  const lenis = useLenis();
  const containerRef = useRef(null);

  // Mouse Tracking Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 100, damping: 20 };
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]), springConfig);

  // Pupil offsets for eyes
  const eyeX = useSpring(useTransform(mouseX, [-300, 300], [-4, 4]), springConfig);
  const eyeY = useSpring(useTransform(mouseY, [-300, 300], [-4, 4]), springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current || isRevealed) return;
      const { clientX, clientY } = e;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      mouseX.set(clientX - centerX);
      mouseY.set(clientY - centerY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isRevealed]);

  const handleReveal = () => {
    setIsRevealed(true);
    // Reset mouse values on reveal
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleRocketLaunch = () => {
    setIsFlying(true);
    if (lenis) {
      lenis.scrollTo('#home', {
        duration: 8.5,
        easing: (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
      });
    }
    setTimeout(() => {
      setIsFlying(false);
    }, 8200);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-black flex flex-col items-center justify-center px-6 overflow-hidden py-32"
    >
      {/* Cartoon Zig-Zag Rocket Migration (Slower) */}
      <AnimatePresence>
        {isFlying && (
          <motion.div
            initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
            animate={{
              scale: [0, 1.5, 1.2, 1, 0.8, 0],
              x: [0, 250, -250, 250, -250, 250, -window.innerWidth * 0.4],
              y: [0, -100, -200, -300, -400, -500, -window.innerHeight * 0.75],
              opacity: [0, 1, 1, 1, 1, 1, 0],
              rotate: [0, 45, -45, 45, -45, 45, -90]
            }}
            transition={{ duration: 8, ease: "linear" }}
            className="fixed z-[9999] pointer-events-none left-1/2 top-[80%] -translate-x-1/2 -translate-y-1/2"
          >
            <CartoonRocket />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 flex flex-col items-center max-w-4xl w-full">
        <AnimatePresence mode="wait">
          {!isRevealed ? (
            <motion.div
              key="robot"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.1, opacity: 0, filter: 'blur(20px)' }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="relative cursor-pointer group flex flex-col items-center perspective-[1000px]"
              onClick={handleReveal}
            >
              {/* Click Me Badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="absolute -top-16 left-1/2 -translate-x-1/2 liquid-glass-strong px-4 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-[0.2em] text-white border border-white/20 whitespace-nowrap z-50 pointer-events-none"
              >
                Launch Protocol
              </motion.div>

              {/* Realistic Advanced Robot Character */}
              <motion.div
                style={{ rotateX, rotateY }}
                className="relative flex flex-col items-center filter drop-shadow-[0_0_50px_rgba(255,255,255,0.05)]"
              >
                {/* Robot Head (3D Dome) */}
                <div className="relative w-52 h-44 flex items-center justify-center">
                  <svg width="200" height="180" viewBox="0 0 200 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Metallic Dome Background */}
                    <defs>
                      <radialGradient id="headGrad" cx="50%" cy="40%" r="50%" fx="30%" fy="30%">
                        <stop offset="0%" stopColor="#2c2c2c" />
                        <stop offset="100%" stopColor="#0a0a0a" />
                      </radialGradient>
                      <linearGradient id="rimGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="white" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="white" stopOpacity="0.05" />
                      </linearGradient>
                    </defs>
                    {/* Main Head Shell */}
                    <rect x="10" y="10" width="180" height="150" rx="40" fill="url(#headGrad)" stroke="url(#rimGrad)" strokeWidth="2" />

                    {/* Glowing Glass Screen */}
                    <rect x="25" y="25" width="150" height="120" rx="30" fill="white" fillOpacity="0.02" stroke="white" strokeOpacity="0.1" />

                    {/* Eyes Layout */}
                    <g transform="translate(50, 60)">
                      {/* Left Eye Shell */}
                      <circle cx="0" cy="0" r="18" fill="black" stroke="white" strokeOpacity="0.1" />
                      <motion.circle style={{ x: eyeX, y: eyeY }} cx="0" cy="0" r="8" fill="#00d2ff" className="filter blur-[1px]" />
                      <motion.circle style={{ x: eyeX, y: eyeY }} cx="0" cy="0" r="3" fill="white" />
                    </g>

                    <g transform="translate(150, 60)">
                      {/* Right Eye Shell */}
                      <circle cx="0" cy="0" r="18" fill="black" stroke="white" strokeOpacity="0.1" />
                      <motion.circle style={{ x: eyeX, y: eyeY }} cx="0" cy="0" r="8" fill="#00d2ff" className="filter blur-[1px]" />
                      <motion.circle style={{ x: eyeX, y: eyeY }} cx="0" cy="0" r="3" fill="white" />
                    </g>

                    {/* Mouth / Speaker Grill */}
                    <rect x="75" y="115" width="50" height="3" rx="1.5" fill="white" fillOpacity="0.1" />
                    <rect x="85" y="125" width="30" height="2" rx="1" fill="white" fillOpacity="0.05" />
                  </svg>

                  {/* Antenna with Pulsing Tip */}
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
                    <div className="h-12 w-[2px] bg-white/20" />
                    <motion.div
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="w-3 h-3 bg-blue-400 rounded-full blur-[2px] shadow-[0_0_10px_#00d2ff]"
                    />
                  </div>
                </div>

                {/* Robot Torso / Base */}
                <div className="w-64 h-32 -mt-4 relative">
                  <svg width="256" height="128" viewBox="0 0 256 128" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M40 10C35 40 10 90 10 110C10 120 20 128 40 128H216C236 128 246 120 246 110C246 90 221 40 216 10H40Z" fill="url(#headGrad)" stroke="url(#rimGrad)" strokeWidth="2" />
                    <rect x="80" y="30" width="96" height="40" rx="10" fill="white" fillOpacity="0.03" stroke="white" strokeOpacity="0.05" />
                    {/* Subtle Circuitry Pattern */}
                    <line x1="100" y1="50" x2="156" y2="50" stroke="white" strokeOpacity="0.05" strokeWidth="1" strokeDasharray="4 4" />
                  </svg>
                </div>
              </motion.div>

              <p className="mt-8 text-white/40 font-body text-sm uppercase tracking-[0.3em] font-light">Interactive Awareness System Active</p>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full flex flex-col items-center"
            >
              {/* Laser Scan Animation */}
              <motion.div
                initial={{ top: '0%' }}
                animate={{ top: '100%' }}
                transition={{ duration: 1, ease: "linear" }}
                className="absolute left-[-20%] right-[-20%] h-[2px] bg-[#00d2ff] shadow-[0_0_25px_#00d2ff] z-50 pointer-events-none"
              />

              {/* Revealed Contact Card */}
              <motion.div
                initial={{ scale: 0.95, filter: 'blur(10px)', opacity: 0 }}
                animate={{ scale: 1, filter: 'blur(0px)', opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="liquid-glass-strong w-full max-w-3xl rounded-[2.5rem] p-12 md:p-16 flex flex-col items-center text-center gap-12 relative overflow-hidden"
              >
                {/* Background Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

                <div className="relative z-10 flex flex-col items-center gap-6">
                  <div className="liquid-glass p-4 rounded-full border border-white/10 group cursor-pointer hover:bg-white/5 transition-all">
                    <Mail className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-4xl md:text-5xl font-heading italic text-white leading-none">Let's build together.</h2>
                  <p className="text-white/60 font-body font-light text-base max-w-sm">Contact authorized via Laser-Scan. Submit to launch.</p>
                </div>

                {/* Contact Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full text-left">
                  <div
                    onClick={() => copyToClipboard('leswaran870@gmail.com')}
                    className="liquid-glass px-8 py-6 rounded-3xl border border-white/5 flex items-center justify-between group cursor-pointer hover:border-white/20 transition-all"
                  >
                    <div className="flex flex-col items-start gap-1">
                      <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Email Address</span>
                      <span className="text-sm font-body text-white font-medium">leswaran870@gmail.com</span>
                    </div>
                    {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4 text-white/30 group-hover:text-white transition-colors" />}
                  </div>

                  <div className="liquid-glass px-8 py-6 rounded-3xl border border-white/5 flex items-center justify-between group cursor-pointer hover:border-white/20 transition-all">
                    <div className="flex flex-col items-start gap-1">
                      <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Direct Line</span>
                      <span className="text-sm font-body text-white font-medium">+91 93843 17687</span>
                    </div>
                    <Phone className="h-4 w-4 text-white/30 group-hover:text-white transition-colors" />
                  </div>
                </div>

                {/* Form Message Placeholder */}
                <div className="w-full flex flex-col gap-4">
                  <div className="liquid-glass-strong rounded-3xl p-6 border border-white/5">
                    <textarea
                      placeholder="Briefly describe your vision..."
                      className="bg-transparent border-none outline-none w-full h-32 text-white font-body text-sm resize-none placeholder:text-white/20"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,1)', color: '#000' }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleRocketLaunch}
                    className="w-full py-5 rounded-full bg-white/5 text-white font-body font-bold text-sm uppercase tracking-widest border border-white/10 transition-all flex items-center justify-center gap-3 group"
                  >
                    Send Message
                    <Rocket className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </motion.button>
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-6">
                  {[Github, Linkedin, Twitter].map((Icon, idx) => (
                    <motion.a
                      key={idx}
                      href="#"
                      whileHover={{ y: -5, scale: 1.1 }}
                      className="h-14 w-14 liquid-glass rounded-full flex items-center justify-center border border-white/5 hover:border-white/30 transition-all"
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
