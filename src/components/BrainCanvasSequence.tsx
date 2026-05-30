"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { MotionValue, useMotionValueEvent } from "framer-motion";

interface BrainCanvasSequenceProps {
  progress: MotionValue<number>;
  totalFrames?: number;
}

export default function BrainCanvasSequence({
  progress,
  totalFrames = 240,
}: BrainCanvasSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const currentFrameRef = useRef(1);
  const resizeTimeoutRef = useRef<NodeJS.Timeout>();

  // Intelligent Progressive Preloading
  useEffect(() => {
    let isCancelled = false;
    
    const preloadImages = async () => {
      // Prioritize first 30 frames for immediate interaction
      const priorityCount = Math.min(30, totalFrames);
      
      const loadFrame = (i: number): Promise<void> => {
        return new Promise((resolve) => {
          const img = new Image();
          const frameIndex = i.toString().padStart(3, "0");
          const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
          // Added ?v=2 to bust browser cache and load the newly updated frames
          img.src = `${basePath}/brine/ezgif-frame-${frameIndex}.jpg?v=2`;
          img.onload = () => {
            if (!isCancelled) {
              imagesRef.current[i - 1] = img;
              if (i === 1) drawFrame(1);
            }
            resolve();
          };
          img.onerror = () => resolve(); // Skip broken frames gracefully
        });
      };

      // Load priority frames simultaneously
      const priorityPromises = [];
      for (let i = 1; i <= priorityCount; i++) {
        priorityPromises.push(loadFrame(i));
      }
      await Promise.all(priorityPromises);
      
      if (!isCancelled) setIsLoaded(true);

      // Lazy load the rest sequentially to save bandwidth and memory spikes
      for (let i = priorityCount + 1; i <= totalFrames; i++) {
        if (isCancelled) break;
        await loadFrame(i);
      }
    };

    preloadImages();

    return () => {
      isCancelled = true;
    };
  }, [totalFrames]);

  const drawFrame = useCallback((index: number) => {
    if (!canvasRef.current || imagesRef.current.length === 0) return;
    // alpha: false ensures the browser knows the canvas is fully opaque, skipping composite overhead
    const ctx = canvasRef.current.getContext("2d", { alpha: false, desynchronized: true });
    if (!ctx) return;

    const safeIndex = Math.max(0, Math.min(index - 1, totalFrames - 1));
    const img = imagesRef.current[safeIndex];

    if (img && img.complete) {
      const canvas = canvasRef.current;
      
      // MAXIMUM PERFORMANCE FIX:
      // Force DPR to 1. Retinas trying to render 4K canvases 60 times a second will always lag.
      // Letting CSS scale the canvas is exponentially faster and looks 99% as good.
      if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        // Default smoothing is significantly faster than "high"
        ctx.imageSmoothingEnabled = true;
      }

      // Object-fit: cover scaling logic
      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.max(hRatio, vRatio);
      const centerShift_x = (canvas.width - img.width * ratio) / 2;
      const centerShift_y = (canvas.height - img.height * ratio) / 2;

      // Draw directly, no fillRect, no save/restore (pure speed)
      ctx.drawImage(
        img,
        0, 0, img.width, img.height,
        centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
      );
    }
  }, [totalFrames]);

  const rafRef = useRef<number>();

  // Use raw progress (not spring) for the canvas to ensure perfect 1:1 sync with Lenis
  useMotionValueEvent(progress, "change", (latest) => {
    const frame = Math.max(1, Math.min(totalFrames, Math.floor(latest * totalFrames)));
    if (frame !== currentFrameRef.current) {
      currentFrameRef.current = frame;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => drawFrame(frame));
    }
  });

  // Debounced Resize Handler
  useEffect(() => {
    const handleResize = () => {
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
      resizeTimeoutRef.current = setTimeout(() => {
        if (canvasRef.current) {
           canvasRef.current.width = window.innerWidth;
           canvasRef.current.height = window.innerHeight;
        }
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => drawFrame(currentFrameRef.current));
      }, 150);
    };
    window.addEventListener("resize", handleResize, { passive: true });
    
    // Initial size setting
    handleResize();
    
    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [drawFrame]);

  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none bg-black overflow-hidden flex items-center justify-center">
      
      {/* Opaque High-Performance Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block w-full h-full z-10 transition-opacity duration-1000"
        style={{ 
          willChange: "transform, opacity",
          opacity: isLoaded ? 1 : 0.2
        }}
      />

      {/* Cinematic Ambient Glow Overlay */}
      {/* Removed mix-blend-screen - standard alpha blending is 10x faster for the GPU */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
        <div className="w-[80vw] md:w-[60vw] h-[80vw] md:h-[60vw] rounded-full bg-accent-blue/10 blur-[80px] md:blur-[120px] opacity-30" />
        <div className="absolute w-[60vw] md:w-[40vw] h-[60vw] md:h-[40vw] rounded-full bg-accent-purple/10 blur-[60px] md:blur-[100px] opacity-40" />
      </div>
      
      {/* Subtle Atmospheric Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none z-30" />
    </div>
  );
}
