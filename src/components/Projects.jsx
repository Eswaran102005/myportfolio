import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import PerspectiveCard from './PerspectiveCard';

export default function Projects() {
  const projects = [
    {
      title: "Finlytic Dashboard",
      tag: "FinTech",
      description: "A high-performance financial tracking system with real-time data visualization.",
      image: "https://motionsites.ai/assets/hero-finlytic-preview-CV9g0FHP.gif"
    },
    {
      title: "E-Comm Core",
      tag: "E-Commerce",
      description: "Headless commerce solution built for maximum speed and SEO optimization.",
      image: "https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif"
    },
    {
      title: "AI Chat Engine",
      tag: "AI / ML",
      description: "Real-time conversational intelligence platform with advanced sentiment analysis.",
      image: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4"
    }
  ];

  return (
    <section className="bg-black py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-20 text-white">
          <div className="liquid-glass rounded-full px-4 py-1 text-xs font-medium mb-6 border border-white/5 font-body uppercase tracking-wider">
            Featured Work
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-5xl font-heading italic tracking-tight leading-[0.9] max-w-2xl">
            Liquid Glass Originals.
          </h2>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-[1500px]">
          {projects.map((p, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
            >
              <PerspectiveCard className="h-full">
                <div className="bg-[#0a0a0a] rounded-3xl overflow-hidden border border-white/5 group relative flex flex-col h-full transition-all duration-500 will-change-transform">
                  {/* Image / Video Wrapper */}
                  <div className="h-64 overflow-hidden relative border-b border-white/5">
                    {/* Simplified Filter Logic for Performance */}
                    <div className="absolute inset-0 z-10 bg-black/40 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
                    
                    {p.image.endsWith('.mp4') ? (
                      <video 
                        autoPlay 
                        loop 
                        muted 
                        playsInline 
                        className="w-full h-full object-cover grayscale brightness-90 transition-all duration-700"
                      >
                        <source src={p.image} type="video/mp4" />
                      </video>
                    ) : (
                      <img 
                        src={p.image} 
                        alt={p.title} 
                        loading="lazy"
                        className="w-full h-full object-cover grayscale brightness-90 transition-all duration-700" 
                      />
                    )}
                    
                    <div className="absolute top-4 left-4 z-20">
                      <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold text-white/90 border border-white/10">
                        {p.tag}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col flex-grow relative">
                    {/* Subtle backglow for depth without heavy blur */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
                    
                    <h3 className="text-2xl font-heading italic text-white mb-4 leading-none tracking-tight relative z-10">
                      {p.title}
                    </h3>
                    <p className="text-white/50 text-sm font-body font-light leading-relaxed mb-8 flex-grow relative z-10">
                      {p.description}
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5 relative z-10">
                      <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30">View Project</span>
                      <div className="h-10 w-10 bg-white/10 rounded-full flex items-center justify-center border border-white/10 group-hover:bg-white group-hover:text-black transition-all duration-300">
                        <ArrowUpRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </PerspectiveCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
