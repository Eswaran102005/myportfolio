import { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

export default function CtaFooter() {
  const videoRef = useRef(null);
  const videoUrl = "https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8";

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
    <footer className="relative w-full overflow-hidden bg-black pt-32 px-6">
      {/* HLS Video Background */}
      <div className="absolute inset-0 z-0 h-[800px] overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/20 to-black pointer-events-none" />
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mb-48">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-6xl md:text-8xl font-heading italic text-white tracking-tight leading-[0.85] mb-12"
          >
            Your next website <br/> starts here.
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="text-white/60 font-body font-light text-sm md:text-base mb-12 leading-relaxed max-w-lg mx-auto"
          >
            Book a free strategy call. See what AI-powered design can do. No commitment, no pressure. Just possibilities.
          </motion.p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <button className="liquid-glass-strong rounded-full px-10 py-5 flex items-center gap-2 group font-medium text-lg">
              Book a Call
              <ArrowUpRight className="h-5 w-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
            <button className="bg-white text-black rounded-full px-10 py-5 text-lg font-medium hover:scale-105 transition-transform">
              View Pricing
            </button>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="w-full pt-12 pb-16 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
            <span className="text-white/40 text-xs font-body tracking-wider uppercase">
                (c) 2026 Eswaran L. All rights reserved.
            </span>
            <div className="flex items-center gap-10">
                {["Privacy", "Terms", "Contact"].map(link => (
                    <a key={link} href="#" className="text-white/40 text-xs font-body hover:text-white transition-colors uppercase tracking-widest leading-none">
                        {link}
                    </a>
                ))}
            </div>
        </div>
      </div>
    </footer>
  );
}
