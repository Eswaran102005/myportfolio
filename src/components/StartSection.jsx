import { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

export default function StartSection() {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const videoUrl = "https://stream.mux.com/9JXDljEVWYwWu01PUkAemafDugK89o01BR6zqJ3aS9u00A.m3u8";

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  useEffect(() => {
    if (videoRef.current) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(videoUrl);
        hls.attachMedia(videoRef.current);
      } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
        videoRef.current.src = videoUrl;
      }
    }
  }, []);

  return (
    <section ref={containerRef} className="relative w-full min-h-[500px] flex items-center justify-center py-20 px-6 overflow-hidden">
      {/* HLS Video Background */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-[120%] object-cover"
        />
        {/* Gradients */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute top-0 left-0 right-0 h-[200px] bg-gradient-to-b from-black to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-black to-transparent pointer-events-none" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="liquid-glass rounded-full px-6 py-2 text-xs font-medium text-white mb-8 border border-white/5 font-body uppercase tracking-wider"
        >
          Behind the Code
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-heading italic text-white tracking-tight leading-[0.9] mb-6"
        >
          MCA Student. <br/> Fullstack Engineer.
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="text-white/60 font-body font-light text-sm md:text-base max-w-md mb-10 leading-relaxed"
        >
          Bridging academic excellence with high-performance engineering. I specialize in building scalable, immersive digital experiences that redefine how users interact with the web.
        </motion.p>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="liquid-glass-strong rounded-full px-8 py-3.5 flex items-center gap-2 group font-medium"
        >
          View My Journey
          <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </motion.button>
      </div>
    </section>
  );
}
