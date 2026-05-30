"use client";

import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { useScroll, useTransform, useSpring, motion, useMotionValueEvent, AnimatePresence } from "framer-motion";
import AppleNav from "../src/components/AppleNav";
import BrainCanvasSequence from "../src/components/BrainCanvasSequence";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Active section tracker state
  const [activeSection, setActiveSection] = useState("hero");
  const [hoveredSkillIndex, setHoveredSkillIndex] = useState<number | null>(null);
  const [selectedSkillIndex, setSelectedSkillIndex] = useState<number | null>(null);

  const skillDetails = [
    {
      category: "Frontend Dev",
      items: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
      desc: "Creating stunning, highly interactive, and responsive user interfaces. Focused on performance optimization and fluid animations.",
      accent: "from-accent-cyan to-accent-blue"
    },
    {
      category: "Backend Systems",
      items: ["Node.js", "Express.js", "Python", "SQL & NoSQL"],
      desc: "Building highly scalable server-side systems, microservices, and secure RESTful APIs with relational/non-relational database design.",
      accent: "from-accent-blue to-accent-purple"
    },
    {
      category: "Core Computer Science",
      items: ["Java", "C++", "Data Structures", "OOP Concepts"],
      desc: "Writing highly optimized algorithms, complexity analysis, and object-oriented architectures to solve complex computational problems.",
      accent: "from-accent-purple to-accent-pink"
    },
    {
      category: "Tools & DevOps",
      items: ["Git & GitHub", "Postman API", "Vercel Hosting", "Figma Design"],
      desc: "Streamlining development workflows with modern developer tools, visual interface drafting, version control, and continuous integration.",
      accent: "from-accent-pink to-accent-cyan"
    }
  ];

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const scrollToProgress = (targetProgress: number) => {
    const totalScrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const targetY = totalScrollableHeight * targetProgress;
    window.scrollTo({
      top: targetY,
      behavior: "smooth"
    });
  };

  // Form State
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  // Certificates State and Data
  const [isCertificatesOpen, setIsCertificatesOpen] = useState(false);
  const [activeCertIndex, setActiveCertIndex] = useState(0);

  const basePath = "/myportfolio";
  const certificates = [
    {
      title: "Java Programming",
      issuer: "Great Learning",
      date: "2023",
      file: `${basePath}/assets/JAVA_PROGRAMMING_CERTIFICATE.pdf`,
      credentialUrl: `${basePath}/assets/JAVA_PROGRAMMING_CERTIFICATE.pdf`
    },
    {
      title: "Python Programming Basics",
      issuer: "Great Learning",
      date: "2023",
      file: `${basePath}/assets/Python_certificate.pdf`,
      credentialUrl: `${basePath}/assets/Python_certificate.pdf`
    },
    {
      title: "SQL Database Certification",
      issuer: "Great Learning",
      date: "2023",
      file: `${basePath}/assets/SQL_%20Certificate.pdf`,
      credentialUrl: `${basePath}/assets/SQL_%20Certificate.pdf`
    },
    {
      title: "C Programming Basics",
      issuer: "Great Learning",
      date: "2023",
      file: `${basePath}/assets/C_Basics_Certificate.pdf`,
      credentialUrl: `${basePath}/assets/C_Basics_Certificate.pdf`
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setStatus("sending");

    try {
      const response = await fetch("https://formsubmit.co/ajax/leswaran870@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: "New Portfolio Message!"
        })
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000); // Reset status after 5s
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  // Apply a buttery smooth physics-based spring to the scroll progress for UI elements
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    mass: 0.5,
    restDelta: 0.0001
  });

  // Smooth Scrolling with Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.8, 
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.8, 
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  // Active section tracker listener
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (latest < 0.15) {
      setActiveSection("hero");
    } else if (latest >= 0.15 && latest < 0.35) {
      setActiveSection("about");
    } else if (latest >= 0.35 && latest < 0.55) {
      setActiveSection("projects");
    } else if (latest >= 0.55 && latest < 0.75) {
      setActiveSection("skills");
    } else if (latest >= 0.75 && latest < 0.90) {
      setActiveSection("education");
    } else {
      setActiveSection("contact");
    }
  });

  // Opacity Mappings for Sections (0 to 1) using smoothProgress
  // 0-15% : Hero
  const heroOpacity = useTransform(smoothProgress, [0, 0.1, 0.15, 0.18], [1, 1, 0, 0]);
  const heroY = useTransform(smoothProgress, [0, 0.15], [0, -50]);

  // 15-35% : About
  const aboutOpacity = useTransform(smoothProgress, [0.12, 0.18, 0.32, 0.38], [0, 1, 1, 0]);
  const aboutY = useTransform(smoothProgress, [0.12, 0.18, 0.32, 0.38], [50, 0, 0, -50]);

  // 35-55% : Projects
  const projectOpacity = useTransform(smoothProgress, [0.32, 0.38, 0.52, 0.58], [0, 1, 1, 0]);
  const projectY = useTransform(smoothProgress, [0.32, 0.38, 0.52, 0.58], [50, 0, 0, -50]);

  // 55-75% : Skills
  const skillsOpacity = useTransform(smoothProgress, [0.52, 0.58, 0.72, 0.78], [0, 1, 1, 0]);
  const skillsTitleY = useTransform(smoothProgress, [0.52, 0.58, 0.72, 0.78], [40, 0, 0, -50]);
  const skillsRingY = useTransform(smoothProgress, [0.52, 0.58, 0.72, 0.78], [60, 0, 0, -50]);

  // 75-90% : Education
  const experienceOpacity = useTransform(smoothProgress, [0.72, 0.78, 0.88, 0.92], [0, 1, 1, 0]);
  const experienceY = useTransform(smoothProgress, [0.72, 0.78, 0.88, 0.92], [50, 0, 0, -50]);

  // 90-100% : Contact
  const contactOpacity = useTransform(smoothProgress, [0.88, 0.95, 1], [0, 1, 1]);
  const contactY = useTransform(smoothProgress, [0.88, 0.95, 1], [50, 0, 0]);

  return (
    <main className="relative bg-black text-white selection:bg-accent-blue/30 overflow-hidden font-sans">
      <AppleNav />

      {/* Global styles for 3D Ring Carousel */}
      <style>{`
        @keyframes spinRing {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(-360deg); }
        }
        :root {
          --ring-radius: 240px;
        }
        @media (max-w: 768px) {
          :root {
            --ring-radius: 180px;
          }
        }
        @media (max-w: 640px) {
          :root {
            --ring-radius: 90px;
          }
        }
      `}</style>

      {/* The 3D Canvas Background fixed to the viewport */}
      {/* Canvas uses raw scrollYProgress for perfect 1:1 sync with Lenis, preventing rubber-band stutter */}
      <BrainCanvasSequence progress={scrollYProgress} totalFrames={240} />

      {/* Scrollytelling Container - determines total scroll height */}
      <div ref={containerRef} className="relative w-full h-[600vh]">
        
        {/* All content is fixed over the canvas, animated by scroll progress */}
        <div className="fixed inset-0 pointer-events-none flex items-center justify-center">
          
          {/* 1. HERO SECTION */}
          <motion.div
            style={{ 
              opacity: heroOpacity, 
              y: heroY, 
              pointerEvents: activeSection === "hero" ? "auto" : "none" 
            }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 w-full"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,80,255,0.2)]">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent-cyan to-accent-blue">E</span>
            </div>
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] font-display font-bold tracking-tight mb-4 text-white drop-shadow-2xl">
              ESWARAN
            </h1>
            <h2 className="text-xl sm:text-2xl md:text-4xl font-medium text-white/90 mb-4 tracking-tight">
              Software Developer & MCA Graduate
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-white/60 max-w-2xl font-light mb-8 px-4">
              Building intelligent full-stack applications, futuristic AI interfaces, and highly performant web experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs sm:max-w-none justify-center px-4">
              <button 
                onClick={() => scrollToProgress(0.45)}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-white text-black font-medium tracking-tight hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] text-sm"
              >
                View Projects
              </button>
              <button 
                onClick={() => scrollToProgress(0.82)}
                className="w-full sm:w-auto px-6 py-3 rounded-full glassmorphism text-white font-medium tracking-tight hover:scale-105 hover:bg-white/10 transition-all duration-300 border border-white/10 text-sm"
              >
                Resume
              </button>
              <button 
                onClick={() => scrollToProgress(1.0)}
                className="w-full sm:w-auto px-6 py-3 rounded-full glassmorphism text-white font-medium tracking-tight hover:scale-105 hover:bg-white/10 transition-all duration-300 border border-white/10 text-sm"
              >
                Contact Me
              </button>
            </div>
          </motion.div>

          {/* 2. ABOUT SECTION */}
          <motion.div
            style={{ 
              opacity: aboutOpacity, 
              y: aboutY, 
              pointerEvents: activeSection === "about" ? "auto" : "none" 
            }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 w-full"
          >
            <span className="text-accent-cyan font-medium tracking-widest uppercase text-xs sm:text-sm mb-4">About Me</span>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold tracking-tight mb-6 text-white drop-shadow-lg">
              Driven by logic, defined by creativity.
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-3xl font-light leading-relaxed px-4">
              As an MCA graduate, I bridge the gap between complex backend architecture and cinematic frontend experiences. My objective is to engineer scalable applications while exploring the intersection of AI and modern web technologies.
            </p>
          </motion.div>

          {/* 3. PROJECTS SECTION */}
          <motion.div
            style={{ 
              opacity: projectOpacity, 
              y: projectY, 
              pointerEvents: activeSection === "projects" ? "auto" : "none" 
            }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 w-full"
          >
             <span className="text-accent-cyan font-medium tracking-widest uppercase text-xs sm:text-sm mb-4">Featured Work</span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight mb-8 text-white drop-shadow-lg">
              Projects
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-7xl w-full px-4">
              {[
                { title: "AI Assistant Engine", stack: "Python, FastAPI, NLP", desc: "A robust voice-activated AI backend capable of processing natural language commands." },
                { title: "Cinematic Portfolio", stack: "Next.js, Framer, Canvas", desc: "A highly optimized scrollytelling web experience running at a locked 60FPS." },
                { title: "E-Commerce API", stack: "Node.js, Express, MongoDB", desc: "A secure, scalable RESTful API handling authentication and dynamic inventory." },
                { title: "Smart Dashboard", stack: "React, Tailwind, Redux", desc: "A realtime analytics dashboard with fluid data visualization and responsive layout." }
              ].map((project, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ 
                    y: -8, 
                    scale: 1.03, 
                    borderColor: "rgba(0, 214, 255, 0.4)",
                    boxShadow: "0 15px 30px -10px rgba(0, 120, 255, 0.25)",
                    backgroundColor: "rgba(255, 255, 255, 0.08)"
                  }}
                  transition={{ type: "spring", stiffness: 350, damping: 20 }}
                  className="glassmorphism rounded-2xl p-6 cursor-pointer group flex flex-col items-start border border-white/5"
                >
                  <div className="flex justify-between w-full items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-blue/20 to-accent-purple/20 flex items-center justify-center border border-white/10 group-hover:border-accent-cyan/50 transition-colors">
                      <div className="w-3 h-3 rounded-full bg-accent-cyan shadow-[0_0_15px_rgba(0,214,255,0.8)]" />
                    </div>
                    <div className="flex gap-2">
                       <span className="text-xs text-white/50 hover:text-white transition-colors">GitHub</span>
                       <span className="text-xs text-accent-cyan/80 hover:text-accent-cyan transition-colors">Live</span>
                    </div>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold tracking-tight mb-2 text-left">{project.title}</h3>
                  <span className="text-xs text-accent-purple font-medium mb-3">{project.stack}</span>
                  <p className="text-left text-white/60 text-xs md:text-sm leading-relaxed">
                    {project.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 4. SKILLS SECTION */}
          <motion.div
            style={{ 
              opacity: skillsOpacity, 
              pointerEvents: activeSection === "skills" ? "auto" : "none" 
            }}
            onClick={() => setSelectedSkillIndex(null)}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 w-full cursor-default"
          >
            <motion.div style={{ y: skillsTitleY }} className="flex flex-col items-center mb-8">
              <span className="text-accent-cyan font-medium tracking-widest uppercase text-xs sm:text-sm mb-4">Technical Arsenal</span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight text-white drop-shadow-lg">
                The tools I command.
              </h2>
            </motion.div>
             {/* Horizontal Layout Container for 3D Ring + Mini Panel */}
             <div className="relative flex flex-col md:flex-row items-center justify-center w-full max-w-5xl mt-4 overflow-visible h-auto md:h-[350px]">
               
               {/* 3D Ring Carousel Wrapper */}
               <motion.div 
                 style={{ y: skillsRingY, perspective: "1000px" }}
                 className="flex items-center justify-center h-[240px] sm:h-[280px] md:h-[350px] overflow-visible"
               >
                 <div 
                   style={{ transformStyle: "preserve-3d" }}
                   className={`relative w-[120px] h-[95px] sm:w-[160px] sm:h-[120px] md:w-[220px] md:h-[150px] transition-transform duration-700 ${
                     selectedSkillIndex === null ? "animate-[spinRing_24s_linear_infinite] hover:[animation-play-state:paused]" : ""
                   }`}
                 >
                   {[
                     { category: "Frontend", items: "React, Next.js, Tailwind, HTML/CSS" },
                     { category: "Backend", items: "Node.js, Express, Python, SQL/NoSQL" },
                     { category: "Core Tech", items: "Java, C++, Data Structures, OOP" },
                     { category: "Tools", items: "Git, Postman, Vercel, Figma" }
                   ].map((skillBlock, i) => {
                     const isSelected = selectedSkillIndex === i;
                     const isAnySelected = selectedSkillIndex !== null;
                     const isHidden = isAnySelected && !isSelected;

                     return (
                       <div
                         key={i}
                         onClick={(e) => {
                           e.stopPropagation();
                           setSelectedSkillIndex(i);
                         }}
                         style={{
                           transform: isSelected
                             ? `translateX(${isMobile ? 0 : -95}px) rotateY(0deg) translateZ(0px)`
                             : `translateX(0px) rotateY(${i * 90}deg) translateZ(var(--ring-radius))`,
                           transformStyle: "preserve-3d",
                           position: "absolute",
                           inset: 0,
                           width: "100%",
                           height: "100%",
                           opacity: isHidden ? 0 : 1,
                           scale: isHidden ? 0.3 : 1,
                           pointerEvents: isHidden ? "none" : "auto",
                           transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease, scale 0.5s ease"
                         }}
                       >
                         <motion.div
                           onMouseEnter={() => setHoveredSkillIndex(i)}
                           onMouseLeave={() => setHoveredSkillIndex(null)}
                           whileHover={{
                             scale: isAnySelected ? 1 : 1.05,
                             borderColor: "rgba(0, 214, 255, 0.5)",
                             boxShadow: "0 10px 30px -10px rgba(0, 120, 255, 0.3)",
                             backgroundColor: "rgba(255, 255, 255, 0.12)"
                           }}
                           transition={{ type: "spring", stiffness: 300, damping: 15 }}
                           style={{
                             width: "100%",
                             height: "100%",
                             transformStyle: "preserve-3d",
                             backfaceVisibility: "visible"
                           }}
                           className={`glassmorphism p-4 sm:p-5 rounded-2xl flex flex-col items-center justify-center border cursor-pointer select-none transition-colors duration-300 ${
                             isSelected ? "border-accent-cyan/50 bg-white/10" : "border-white/10"
                           }`}
                         >
                           <h3 className="text-white font-semibold text-xs sm:text-sm md:text-base mb-1 sm:mb-2">{skillBlock.category}</h3>
                           <p className="text-white/50 text-[10px] sm:text-xs md:text-sm font-light leading-relaxed">{skillBlock.items}</p>
                         </motion.div>
                       </div>
                     );
                   })}
                 </div>
               </motion.div>

               {/* Right Side: Sleek Details Panel */}
               <AnimatePresence>
                 {selectedSkillIndex !== null && (
                   <motion.div
                     initial={{ opacity: 0, scale: 0.9, x: 20 }}
                     animate={{ opacity: 1, scale: 1, x: 0 }}
                     exit={{ opacity: 0, scale: 0.9, x: 20 }}
                     transition={{ type: "spring", stiffness: 300, damping: 20 }}
                     className="glassmorphism p-5 sm:p-6 rounded-2xl border border-white/15 w-[280px] sm:w-[320px] md:w-[330px] text-left select-none shadow-[0_15px_30px_-5px_rgba(0,214,255,0.15)] flex flex-col justify-between h-[180px] sm:h-[200px] md:h-[220px] z-20 md:absolute md:right-0 lg:right-6 md:top-1/2 md:-translate-y-1/2 mt-4 md:mt-0"
                     onClick={(e) => e.stopPropagation()}
                   >
                     <div>
                       <div className="flex items-center gap-2 mb-2 sm:mb-3">
                         <div className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${skillDetails[selectedSkillIndex].accent} animate-pulse`} />
                         <h4 className="text-white font-bold text-sm sm:text-base tracking-tight">{skillDetails[selectedSkillIndex].category}</h4>
                       </div>
                       <p className="text-white/70 text-[11px] sm:text-xs md:text-sm font-light leading-relaxed mb-3 sm:mb-4">
                         {skillDetails[selectedSkillIndex].desc}
                       </p>
                     </div>
                     <div>
                       <div className="text-[9px] sm:text-[10px] font-semibold text-accent-cyan uppercase tracking-wider mb-2">Core Competencies</div>
                       <div className="flex flex-wrap gap-1.5">
                         {skillDetails[selectedSkillIndex].items.map((item, idx) => (
                           <span key={idx} className="bg-white/5 border border-white/10 px-2 py-0.5 rounded-md text-[9px] sm:text-[10px] text-white/80 font-medium">
                             {item}
                           </span>
                         ))}
                       </div>
                     </div>
                   </motion.div>
                 )}
               </AnimatePresence>
             </div>
          </motion.div>

          {/* 5. EDUCATION SECTION */}
          <motion.div
            style={{ 
              opacity: experienceOpacity, 
              y: experienceY, 
              pointerEvents: activeSection === "education" ? "auto" : "none" 
            }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 w-full"
          >
            <span className="text-accent-cyan font-medium tracking-widest uppercase text-xs sm:text-sm mb-4">Academic Background</span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight mb-8 text-white drop-shadow-lg">
              A foundation built on knowledge.
            </h2>
            
            <div className="flex flex-col gap-4 w-full max-w-3xl px-4">
               <div className="glassmorphism p-6 md:p-8 rounded-2xl border border-white/10 text-left relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-accent-blue to-accent-purple opacity-50 group-hover:opacity-100 transition-opacity" />
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-1">Master of Computer Applications</h3>
                  <h4 className="text-accent-cyan text-sm font-medium mb-3">Your University Name • 2022 - 2024</h4>
                  <p className="text-white/60 text-sm md:text-base font-light">
                    Specialized in advanced software engineering, database management systems, and artificial intelligence. Graduated with honors, demonstrating a strong aptitude for algorithm design and full-stack development.
                  </p>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div 
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsCertificatesOpen(true);
                    }}
                    className="glassmorphism p-5 rounded-2xl border border-white/5 text-left hover:border-accent-cyan/50 hover:scale-[1.02] cursor-pointer transition-all flex flex-col justify-between"
                  >
                     <div>
                        <h4 className="text-white font-semibold text-sm mb-1 flex items-center gap-1.5">
                           <span>Certifications</span>
                           <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
                        </h4>
                        <p className="text-white/50 text-xs">Full-Stack Development, AWS Cloud, React</p>
                     </div>
                     <span className="text-[10px] text-accent-cyan font-medium mt-2 hover:underline">Click to view certificates →</span>
                  </div>
                  <div className="glassmorphism p-5 rounded-2xl border border-white/5 text-left hover:border-accent-purple/50 hover:scale-[1.02] transition-all flex flex-col justify-between">
                     <div>
                        <h4 className="text-white font-semibold text-sm mb-1 flex items-center gap-1.5">
                           <span>Achievements</span>
                           <span className="w-1.5 h-1.5 rounded-full bg-accent-purple animate-pulse" />
                        </h4>
                        <p className="text-white/70 text-xs mt-1.5 leading-relaxed">
                           Successfully launched my freelancing career, delivering <strong>3 high-performance full-stack web projects</strong> directly to satisfied clients.
                        </p>
                     </div>
                     <span className="text-[10px] text-accent-purple font-medium mt-2">Professional Milestone Achieved ✓</span>
                  </div>
               </div>
            </div>
          </motion.div>

          {/* 6. CONTACT SECTION */}
          <motion.div
            style={{ 
              opacity: contactOpacity, 
              y: contactY, 
              pointerEvents: activeSection === "contact" ? "auto" : "none" 
            }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 w-full"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-accent-blue/10 border border-accent-blue/30 flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(0,80,255,0.3)]">
              <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-accent-cyan shadow-[0_0_20px_rgba(0,214,255,1)] animate-pulse" />
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold tracking-tight mb-4 text-white drop-shadow-2xl">
              Let's create the future.
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-white/70 mb-8 font-light max-w-xl px-4">
              I am actively looking for entry-level developer roles and exciting projects. Let's connect and build something extraordinary.
            </p>
            
            <div className="w-full max-w-md px-4">
              <form className="flex flex-col gap-3 mb-6" onSubmit={handleSubmit}>
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full bg-black/60 backdrop-blur-md border border-white/25 rounded-xl px-4 py-3 text-white placeholder-white/50 text-sm focus:outline-none focus:border-accent-cyan transition-colors" 
                />
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full bg-black/60 backdrop-blur-md border border-white/25 rounded-xl px-4 py-3 text-white placeholder-white/50 text-sm focus:outline-none focus:border-accent-cyan transition-colors" 
                />
                <textarea 
                  placeholder="Your Message" 
                  rows={3} 
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  className="w-full bg-black/60 backdrop-blur-md border border-white/25 rounded-xl px-4 py-3 text-white placeholder-white/50 text-sm focus:outline-none focus:border-accent-cyan transition-colors resize-none" 
                />
                <button 
                  type="submit" 
                  disabled={status === "sending"}
                  className="w-full bg-white text-black font-semibold rounded-xl px-4 py-3 text-sm hover:scale-[1.02] transition-transform shadow-[0_0_15px_rgba(255,255,255,0.2)] disabled:opacity-50"
                >
                  {status === "sending" ? "Sending..." : "Send Message"}
                </button>
                {status === "success" && (
                  <p className="text-accent-cyan text-xs mt-2 font-medium">Message sent successfully! Check your email to activate first-time setup if needed.</p>
                )}
                {status === "error" && (
                  <p className="text-red-500 text-xs mt-2 font-medium">Failed to send message. Please try again.</p>
                )}
              </form>
              
              <div className="flex justify-center gap-6">
                <a 
                  href="https://github.com/Eswaran102005" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white/50 hover:text-white text-sm cursor-pointer transition-colors"
                >
                  GitHub
                </a>
                <a 
                  href="https://www.linkedin.com/in/eswaran-l-55826b281?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white/50 hover:text-white text-sm cursor-pointer transition-colors"
                >
                  LinkedIn
                </a>
                <a 
                  href="mailto:leswaran870@gmail.com" 
                  className="text-white/50 hover:text-white text-sm cursor-pointer transition-colors"
                >
                  Email
                </a>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Certificates Modal Overlay */}
      <AnimatePresence>
        {isCertificatesOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCertificatesOpen(false)}
            className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl h-[85vh] md:h-[75vh] glassmorphism border border-white/15 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-6 overflow-hidden text-left"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsCertificatesOpen(false)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors z-30"
              >
                ✕
              </button>

              {/* Left Sidebar: Certificate List */}
              <div className="w-full md:w-[320px] flex flex-col h-full border-r border-white/10 pr-0 md:pr-6 overflow-y-auto">
                <h3 className="text-xl font-bold text-white mb-1">My Certificates</h3>
                <p className="text-xs text-white/50 mb-6">Select a certificate to view details and credentials.</p>
                
                <div className="flex flex-col gap-3">
                  {certificates.map((cert, idx) => {
                    const isActive = activeCertIndex === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => setActiveCertIndex(idx)}
                        className={`w-full text-left p-4 rounded-xl border transition-all flex flex-col gap-1 ${
                          isActive 
                            ? "bg-white/10 border-accent-cyan/50 shadow-[0_0_15px_rgba(0,214,255,0.15)]" 
                            : "bg-white/5 border-white/5 hover:border-white/10"
                        }`}
                      >
                        <span className={`text-[10px] uppercase font-bold tracking-wider ${isActive ? "text-accent-cyan" : "text-white/40"}`}>
                          {cert.issuer}
                        </span>
                        <span className="text-sm font-semibold text-white leading-snug">{cert.title}</span>
                        <span className="text-[11px] text-white/50 mt-1">{cert.date}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Side: Active Certificate Detail & Image View */}
              <div className="flex-1 flex flex-col justify-between h-full overflow-y-auto">
                <div className="flex flex-col gap-4">
                  <div className="relative aspect-[4/3] w-full rounded-2xl border border-white/10 overflow-hidden bg-white/5 flex items-center justify-center group">
                    {/* Fallback layout if PDF fails */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-white/5 to-white/10">
                      <span className="text-accent-cyan text-4xl mb-3">🎓</span>
                      <h4 className="text-white font-bold text-base mb-1">{certificates[activeCertIndex].title}</h4>
                      <p className="text-white/60 text-xs max-w-sm">
                        Issued by {certificates[activeCertIndex].issuer} • {certificates[activeCertIndex].date}
                      </p>
                    </div>
                    
                    {/* Embedded Interactive PDF Viewer */}
                    <iframe
                      src={`${certificates[activeCertIndex].file}#toolbar=0&navpanes=0`}
                      title={certificates[activeCertIndex].title}
                      className="absolute inset-0 w-full h-full border-0 rounded-2xl bg-white/5 opacity-95 z-10"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mt-6 border-t border-white/10 pt-4">
                  <div>
                    <h4 className="text-white font-bold text-sm">{certificates[activeCertIndex].title}</h4>
                    <p className="text-xs text-white/50">{certificates[activeCertIndex].issuer} ({certificates[activeCertIndex].date})</p>
                  </div>
                  
                  <a
                    href={certificates[activeCertIndex].credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-black text-center text-xs font-semibold px-5 py-3 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-[0_0_15px_rgba(255,255,255,0.15)] cursor-pointer"
                  >
                    Verify Credential
                  </a>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
