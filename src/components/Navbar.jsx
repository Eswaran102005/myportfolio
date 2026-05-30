import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const NAV_LINKS = ['Home', 'Projects', 'Skills', 'Contact'];

export default function Navbar({ activeSection }) {
  const [scrolled, setScrolled] = useState(false);
  const [hoverLogo, setHoverLogo] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (link) => {
    const map = { Home: 'hero', Projects: 'works', Skills: 'skills', Contact: 'footer' };
    const el = document.getElementById(map[link]);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-[100] flex justify-center pt-3 sm:pt-4 md:pt-6 px-3 sm:px-4"
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
    >
      <nav
        className={`
          inline-flex items-center rounded-full backdrop-blur-md border border-white/10 
          bg-surface/80 px-1.5 sm:px-2 py-1.5 sm:py-2 gap-0.5 sm:gap-1 transition-shadow duration-300
          ${scrolled ? 'shadow-md shadow-black/30' : ''}
        `}
      >
        {/* Logo */}
        <button
          onMouseEnter={() => setHoverLogo(true)}
          onMouseLeave={() => setHoverLogo(false)}
          className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-transform duration-200 hover:scale-110 active:scale-95"
          style={{ padding: '2px' }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          {/* Gradient ring */}
          <span
            className="absolute inset-0 rounded-full"
            style={{
              background: hoverLogo
                ? 'linear-gradient(270deg, #89AACC 0%, #4E85BF 100%)'
                : 'linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)',
              transition: 'background 0.4s ease',
            }}
          />
          {/* Inner circle */}
          <span
            className="relative w-full h-full rounded-full bg-bg flex items-center justify-center m-[2px]"
            style={{ inset: '2px', position: 'absolute' }}
          >
            <span className="font-display italic text-[11px] sm:text-[12px] text-white leading-none">
              EL
            </span>
          </span>
        </button>

        {/* Divider */}
        <span className="hidden sm:block w-px h-5 bg-stroke mx-1" />

        {/* Nav links */}
        {NAV_LINKS.map((link) => {
          const isActive = activeSection === link.toLowerCase();
          return (
            <button
              key={link}
              onClick={() => handleNavClick(link)}
              className={`
                text-[11px] sm:text-xs md:text-sm rounded-full px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 
                transition-all duration-200 font-body active:scale-95
                ${
                  isActive
                    ? 'text-white bg-stroke/60'
                    : 'text-muted hover:text-white hover:bg-stroke/50'
                }
              `}
            >
              {link}
            </button>
          );
        })}

        {/* Divider */}
        <span className="hidden sm:block w-px h-5 bg-stroke mx-1" />

        {/* Say hi button */}
        <a
          href="mailto:leswaran870@gmail.com"
          className="relative group rounded-full text-[11px] sm:text-xs md:text-sm px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 font-body"
        >
          {/* Gradient border on hover */}
          <span
            className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: 'linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)' }}
          />
          <span className="relative z-10 flex items-center gap-1 bg-surface rounded-full px-2.5 sm:px-3 py-1.5 text-white backdrop-blur-md">
            Say hi <span className="text-[9px] sm:text-[10px]">↗</span>
          </span>
        </a>
      </nav>
    </motion.header>
  );
}
