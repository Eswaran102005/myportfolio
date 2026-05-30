import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function TypingText({ 
  texts = [], 
  speed = 100, 
  deleteSpeed = 50, 
  pause = 2000, 
  className = "" 
}) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (index === texts.length) return;

    if (subIndex === texts[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), pause);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % texts.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? deleteSpeed : speed);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, texts, speed, deleteSpeed, pause]);

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <span className="font-body font-light">
        {texts[index].substring(0, subIndex)}
      </span>
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="w-[2px] h-[1.2em] bg-white inline-block"
      />
    </div>
  );
}
