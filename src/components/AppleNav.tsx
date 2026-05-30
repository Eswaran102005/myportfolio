"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

export default function AppleNav() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const scrollToSection = (targetProgress: number) => {
    const totalScrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const targetY = totalScrollableHeight * targetProgress;
    window.scrollTo({
      top: targetY,
      behavior: "smooth"
    });
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out px-6 py-4 flex items-center justify-between ${
        isScrolled ? "glassmorphism border-b border-white/5" : "bg-transparent"
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <div 
        onClick={() => scrollToSection(0)}
        className="text-white font-display font-bold tracking-tight text-xl cursor-pointer"
      >
        ESWARAN
      </div>
      
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
        <span onClick={() => scrollToSection(0)} className="hover:text-white transition-colors cursor-pointer">Overview</span>
        <span onClick={() => scrollToSection(0.45)} className="hover:text-white transition-colors cursor-pointer">Projects</span>
        <span onClick={() => scrollToSection(0.65)} className="hover:text-white transition-colors cursor-pointer">Skills</span>
        <span onClick={() => scrollToSection(0.82)} className="hover:text-white transition-colors cursor-pointer">Experience</span>
        <span onClick={() => scrollToSection(1.0)} className="hover:text-white transition-colors cursor-pointer">Contact</span>
      </div>

      <div>
        <button 
          onClick={() => scrollToSection(0.20)}
          className="px-5 py-2 rounded-full border border-white/20 text-white text-sm font-medium hover:bg-white hover:text-black transition-all duration-300"
        >
          Enter Portfolio
        </button>
      </div>
    </motion.nav>
  );
}
