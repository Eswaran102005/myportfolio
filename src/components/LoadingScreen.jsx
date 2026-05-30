import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const words = ['Design', 'Create', 'Inspire'];

export default function LoadingScreen({ onComplete }) {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const startTime = useRef(null);
  const rafRef = useRef(null);
  const duration = 2700;

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 900);
    return () => clearInterval(wordInterval);
  }, []);

  useEffect(() => {
    const animate = (timestamp) => {
      if (!startTime.current) startTime.current = timestamp;
      const elapsed = timestamp - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      setCount(Math.floor(eased * 100));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setCount(100);
        setTimeout(() => {
          setVisible(false);
          setTimeout(onComplete, 600);
        }, 400);
      }
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loading"
          className="fixed inset-0 z-[9999] bg-bg flex flex-col"
          style={{ height: 'calc(var(--vh, 1vh) * 100)' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
        >
          {/* Top-left label */}
          <motion.span
            className="absolute top-4 left-4 sm:top-6 sm:left-6 text-xs text-muted uppercase tracking-[0.3em] font-body"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Portfolio
          </motion.span>

          {/* Center rotating word */}
          <div className="flex-1 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={wordIndex}
                className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display italic text-white/80 select-none"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
              >
                {words[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Bottom section */}
          <div className="px-4 sm:px-6 pb-4 sm:pb-6 flex flex-col gap-3 sm:gap-4">
            {/* Counter */}
            <div className="flex justify-end">
              <span className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-display text-white tabular-nums leading-none">
                {String(count).padStart(3, '0')}
              </span>
            </div>

            {/* Progress bar */}
            <div className="h-[3px] bg-stroke/50 rounded-full overflow-hidden">
              <div
                className="h-full accent-gradient rounded-full origin-left"
                style={{
                  transform: `scaleX(${count / 100})`,
                  transition: 'transform 75ms linear',
                  willChange: 'transform',
                  boxShadow: '0 0 8px rgba(137, 170, 204, 0.35)',
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
