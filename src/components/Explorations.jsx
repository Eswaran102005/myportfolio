import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const EXPLORATIONS = [
  { id: 1, title: 'Fluid Interfaces', bg: '#1a1a1a', speed: 1.2 },
  { id: 2, title: 'Typography in Space', bg: '#222', speed: 0.8 },
  { id: 3, title: 'Generative UI', bg: '#1c1c1c', speed: 1.5 },
  { id: 4, title: 'Spatial Computing', bg: '#111', speed: 0.9 },
  { id: 5, title: 'Micro-interactions', bg: '#2a2a2a', speed: 1.1 },
  { id: 6, title: 'Data Visualization', bg: '#151515', speed: 1.3 },
];

function ExploreCard({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-20px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative group cursor-pointer aspect-square w-full"
    >
      <div
        className="absolute inset-0 rounded-2xl sm:rounded-3xl transition-transform duration-500 group-hover:scale-[1.02] group-hover:-rotate-1 border border-stroke"
        style={{ background: item.bg }}
      >
        {/* Halftone pattern overlay */}
        <div className="absolute inset-0 halftone opacity-30 mix-blend-overlay rounded-2xl sm:rounded-3xl" />
        {/* Inner gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl sm:rounded-3xl" />
      </div>
      {/* Content */}
      <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <p className="text-white font-body font-medium text-sm sm:text-base">{item.title}</p>
        <p className="text-muted text-xs font-body uppercase mt-1 tracking-widest text-[#89AACC]">View Project</p>
      </div>
      {/* Always visible label on mobile */}
      <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-end sm:hidden">
        <p className="text-white/60 font-body text-xs">{item.title}</p>
      </div>
    </motion.div>
  );
}

// Desktop: parallax pinned layout
function DesktopExplorations() {
  const containerRef = useRef(null);
  const pinnedRef = useRef(null);

  useEffect(() => {
    // Only run on non-touch / large screens
    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px)', () => {
      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          pin: pinnedRef.current,
          pinSpacing: false,
        });

        gsap.to('.left-col', {
          yPercent: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });

        gsap.to('.right-col', {
          yPercent: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }, containerRef);
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-[300vh] bg-bg py-24 hidden lg:block">
      {/* Pinned Center Content */}
      <div
        ref={pinnedRef}
        className="absolute top-0 left-0 right-0 h-screen z-10 flex flex-col items-center justify-center pointer-events-none px-6"
      >
        <CenterContent />
      </div>

      {/* Parallax Gallery */}
      <div className="relative z-20 max-w-[1400px] mx-auto px-12 grid grid-cols-2 gap-40 pt-40">
        <div className="left-col flex flex-col gap-40 mt-64">
          {EXPLORATIONS.filter((_, i) => i % 2 === 0).map((item, idx) => (
            <ExploreCard key={item.id} item={item} index={idx} />
          ))}
        </div>
        <div className="right-col flex flex-col gap-40">
          {EXPLORATIONS.filter((_, i) => i % 2 !== 0).map((item, idx) => (
            <ExploreCard key={item.id} item={item} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Mobile/Tablet: simple grid, no pinning, no GSAP — smooth & lag-free
function MobileExplorations() {
  return (
    <section className="relative bg-bg py-16 sm:py-20 lg:hidden">
      {/* Header */}
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 mb-10 sm:mb-14">
        <CenterContent mobile />
      </div>

      {/* Grid */}
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
        {EXPLORATIONS.map((item, idx) => (
          <ExploreCard key={item.id} item={item} index={idx} />
        ))}
      </div>
    </section>
  );
}

function CenterContent({ mobile = false }) {
  return (
    <div
      className={`flex flex-col pointer-events-auto ${
        mobile ? 'items-start text-left' : 'items-center text-center'
      }`}
    >
      <div className={`flex items-center gap-3 mb-4 ${mobile ? '' : 'blur-in'}`}>
        {!mobile && <div className="w-8 h-px bg-stroke" />}
        <span className="text-xs text-muted uppercase tracking-[0.3em] font-body">Explorations</span>
        {!mobile && <div className="w-8 h-px bg-stroke" />}
      </div>
      <h2
        className={`font-body font-light text-white mb-4 sm:mb-6 ${
          mobile
            ? 'text-3xl sm:text-4xl'
            : 'text-5xl md:text-7xl lg:text-8xl'
        }`}
      >
        Visual <em className="font-display italic not-italic">playground</em>
      </h2>
      <p
        className={`text-muted text-sm font-body mb-6 sm:mb-8 leading-relaxed ${
          mobile ? 'max-w-sm' : 'max-w-md'
        }`}
      >
        A collection of experimental ideas, generative art, and unused concepts exploring new interaction paradigms.
      </p>
      <a
        href="#"
        className="inline-flex items-center gap-2 relative group rounded-full text-sm px-6 sm:px-7 py-3 sm:py-3.5 font-body text-white bg-surface border border-stroke hover:border-transparent transition-all duration-300 active:scale-95"
      >
        <span
          className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)' }}
        />
        <span className="relative z-10 flex items-center gap-2 bg-surface rounded-full px-6 sm:px-7 py-3 sm:py-3.5">
          Follow on Dribbble <span>↗</span>
        </span>
      </a>
    </div>
  );
}

export default function Explorations() {
  return (
    <>
      <MobileExplorations />
      <DesktopExplorations />
    </>
  );
}
