import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { gsap } from 'gsap';
import Hls from 'hls.js';

const ROLES = ['Fullstack Developer', 'UI/UX Designer', 'Creative Developer', 'Problem Solver'];
const HLS_SRC = 'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8';

function Typewriter() {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    let timer;
    const handleTyping = () => {
      const fullText = ROLES[loopNum % ROLES.length];
      setDisplayText(
        isDeleting
          ? fullText.substring(0, displayText.length - 1)
          : fullText.substring(0, displayText.length + 1)
      );

      setTypingSpeed(isDeleting ? 40 : 120);

      if (!isDeleting && displayText === fullText) {
        timer = setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      } else {
        timer = setTimeout(handleTyping, typingSpeed);
      }
    };

    timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, loopNum, typingSpeed]);

  return (
    <span className="relative">
      <span className="bg-gradient-to-r from-[#89AACC] via-[#4E85BF] to-[#89AACC] bg-[length:200%_auto] animate-gradient-shift bg-clip-text text-transparent font-display italic">
        {displayText}
      </span>
      <span className="ml-1 w-[2px] h-[0.9em] bg-white inline-block animate-pulse align-middle" />
    </span>
  );
}

export default function Hero() {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);

  // HLS video with mobile-safe config and visibility observer
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Reduce quality level on mobile to prevent lag
    const isMobile = window.innerWidth < 768;

    let hls;
    if (Hls.isSupported()) {
      hls = new Hls({
        autoStartLoad: true,
        startLevel: isMobile ? 0 : -1, // lowest quality on mobile
        capLevelToPlayerSize: true,     // auto-cap to element size
        maxBufferLength: isMobile ? 10 : 30,
        maxMaxBufferLength: isMobile ? 20 : 60,
      });
      hls.loadSource(HLS_SRC);
      hls.attachMedia(video);
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = HLS_SRC;
    }

    // Visibility Observer to pause video when not in view (Prevents Lag)
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {}); // Play when visible
        } else {
          video.pause(); // Pause when out of view to save resources
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(video);

    return () => {
      if (hls) hls.destroy();
      observer.disconnect();
    };
  }, []);



  // GSAP entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ ease: 'power3.out' });
      tl.fromTo('.name-reveal',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.1 }
      ).fromTo('.blur-in',
        { opacity: 0, filter: 'blur(10px)', y: 20 },
        { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1, stagger: 0.1, delay: 0.1 },
        '<0.3'
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full flex items-center justify-center overflow-hidden"
      style={{ height: 'calc(var(--vh, 1vh) * 100)' }}
    >
      {/* Background video — GPU composited */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          transform: 'translate3d(0,0,0)',
          willChange: 'transform',
          backfaceVisibility: 'hidden',
        }}
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent" />

      {/* Hero content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto w-full">
        {/* Eyebrow */}
        <p className="blur-in text-xs text-muted uppercase tracking-[0.3em] mb-6 sm:mb-8 font-body">
          PORTFOLIO '26
        </p>

        {/* Name */}
        <h1 className="name-reveal text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-white mb-4 sm:mb-6">
          Eswaran L
        </h1>

        {/* Role line */}
        <p className="blur-in text-xl md:text-4xl text-muted mb-6 font-body h-[1.2em]">
          A <Typewriter /> crafting digital excellence.
        </p>

        {/* Description */}
        <p className="blur-in text-base md:text-lg text-muted max-w-2xl mx-auto mb-8 sm:mb-12 font-body leading-relaxed">
          Transforming complex ideas into elegant, high-performance digital experiences.<br />
          Specializing in modern web technologies and user-centric design.
        </p>

        {/* CTAs */}
        <div className="blur-in inline-flex gap-3 sm:gap-4 flex-wrap justify-center">
          {/* Resume */}
          <button
            onClick={() => window.open('/resume.pdf', '_blank')}
            className="relative group rounded-full text-sm px-6 sm:px-7 py-3 sm:py-3.5 font-body font-medium transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <span className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)' }} />
            <span className="relative z-10 bg-white text-bg group-hover:bg-bg group-hover:text-white rounded-full px-6 sm:px-7 py-3 sm:py-3.5 transition-colors duration-300 block">
              Resume
            </span>
          </button>

          {/* Contact */}
          <a
            href="mailto:leswaran870@gmail.com"
            className="relative group rounded-full text-sm px-6 sm:px-7 py-3 sm:py-3.5 border-2 border-stroke bg-bg text-white font-body font-medium transition-all duration-300 hover:scale-105 hover:border-transparent active:scale-95"
          >
            <span className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)' }} />
            <span className="relative z-10 bg-bg rounded-full px-6 sm:px-7 py-3 sm:py-3.5 block">Contact</span>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-xs text-muted uppercase tracking-[0.2em] font-body">SCROLL</span>
        <div className="w-px h-8 sm:h-10 bg-stroke relative overflow-hidden">
          <div className="absolute inset-0 w-full accent-gradient animate-scroll-down" />
        </div>
      </div>
    </section>
  );
}
