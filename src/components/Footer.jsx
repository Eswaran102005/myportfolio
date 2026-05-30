import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Hls from 'hls.js';

const HLS_SRC = 'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8';

export default function Footer() {
  const marqueeRef = useRef(null);
  const videoRef = useRef(null);

  // GSAP Marquee — optimized with visibility check
  useEffect(() => {
    const content = marqueeRef.current;
    if (!content || !content.parentNode) return;

    const clone = content.cloneNode(true);
    content.parentNode.appendChild(clone);

    const tween = gsap.to(content.parentNode, {
      xPercent: -50,
      ease: 'none',
      duration: 40,
      repeat: -1,
      paused: true, // Start paused
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          tween.play();
        } else {
          tween.pause();
        }
      },
      { threshold: 0.01 }
    );

    observer.observe(content.parentNode);

    return () => {
      tween.kill();
      observer.disconnect();
    };
  }, []);

  // HLS Video — with visibility observer to prevent lag
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const isMobile = window.innerWidth < 768;

    let hls;
    if (Hls.isSupported()) {
      hls = new Hls({
        autoStartLoad: true,
        startLevel: isMobile ? 0 : -1,
        capLevelToPlayerSize: true,
        maxBufferLength: isMobile ? 10 : 30,
        maxMaxBufferLength: isMobile ? 20 : 60,
      });
      hls.loadSource(HLS_SRC);
      hls.attachMedia(video);
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = HLS_SRC;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
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

  return (
    <footer
      id="footer"
      className="relative bg-bg pt-12 sm:pt-16 md:pt-20 overflow-hidden flex flex-col"
      style={{ minHeight: 'calc(var(--vh, 1vh) * 100)' }}
    >
      {/* Background Video — GPU composited */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          className="w-full h-full object-cover"
          style={{
            transform: 'scale(-1) translate3d(0,0,0)',
            willChange: 'transform',
            backfaceVisibility: 'hidden',
          }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-bg to-transparent" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center pt-16 sm:pt-20 pb-24 sm:pb-32">
        {/* Marquee Container */}
        <div className="w-full overflow-hidden whitespace-nowrap mb-10 sm:mb-16 flex select-none pointer-events-none">
          <div className="flex w-[200%]">
            <div ref={marqueeRef} className="flex-shrink-0 flex items-center pr-4">
              {[...Array(10)].map((_, i) => (
                <span
                  key={i}
                  className="text-4xl sm:text-6xl md:text-8xl lg:text-[10rem] font-display italic text-white/10 uppercase tracking-tight pr-4 sm:pr-8"
                >
                  BUILDING THE FUTURE •
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-body font-light text-white mb-6 sm:mb-8 leading-tight">
            Let's create something{' '}
            <em className="font-display italic not-italic">extraordinary</em>
          </h2>
          <a
            href="mailto:leswaran870@gmail.com"
            className="inline-flex relative group rounded-full text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 bg-white text-bg font-body font-medium transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <span
              className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)' }}
            />
            <span className="relative z-10 bg-white text-bg rounded-full px-6 sm:px-8 py-3 sm:py-4 block uppercase tracking-wider text-xs sm:text-sm">
              Get in touch
            </span>
          </a>
        </div>
      </div>

      {/* Footer Bar */}
      <div className="relative z-10 w-full border-t border-white/10 bg-black/40 backdrop-blur-md pb-safe">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-4 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          {/* Status */}
          <div className="flex items-center gap-3">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
            </div>
            <span className="text-xs sm:text-sm font-body text-muted uppercase tracking-widest">
              Available for projects
            </span>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-4 sm:gap-6">
            {['Twitter', 'LinkedIn', 'Dribbble', 'GitHub'].map((social) => (
              <a
                key={social}
                href="#"
                className="text-xs sm:text-sm font-body text-muted hover:text-white transition-colors active:opacity-70"
              >
                {social}
              </a>
            ))}
          </div>

          <div className="text-xs sm:text-sm font-body text-muted order-last sm:order-none opacity-50">
            © 2026 Eswaran L
          </div>
        </div>
      </div>
    </footer>
  );
}
