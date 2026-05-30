import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'motion/react';

export default function BlurText({
  text = '',
  delay = 200,
  className = '',
  animateBy = 'words', // 'words' or 'letters'
  direction = 'bottom', // 'top' or 'bottom'
  onAnimationComplete,
}) {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const [animatedCount, setAnimatedCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  useEffect(() => {
    if (inView && onAnimationComplete) {
      const totalDuration = delay * elements.length + 350;
      const timeout = setTimeout(onAnimationComplete, totalDuration);
      return () => clearTimeout(timeout);
    }
  }, [inView, elements.length, delay, onAnimationComplete]);

  return (
    <p ref={ref} className={`flex flex-wrap ${className}`}>
      {elements.map((el, i) => (
        <motion.span
          key={i}
          initial={{ filter: 'blur(10px)', opacity: 0, y: direction === 'bottom' ? 50 : -50 }}
          animate={inView ? { 
            filter: ['blur(10px)', 'blur(5px)', 'blur(0px)'],
            opacity: [0, 0.5, 1],
            y: [direction === 'bottom' ? 50 : -50, -5, 0] 
          } : {}}
          transition={{
            duration: 0.35,
            delay: (i * delay) / 1000,
            times: [0, 0.5, 1],
            ease: "easeOut"
          }}
          className="inline-block mr-[0.2em]"
        >
          {el === ' ' ? '\u00A0' : el}
        </motion.span>
      ))}
    </p>
  );
}
