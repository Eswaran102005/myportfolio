import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

export default function FeaturesChess() {
  const rows = [
    {
      badge: "Capabilities",
      title: "Designed to convert. Built to perform.",
      body: "Every pixel is intentional. Our AI studies what works across thousands of top sites--then builds yours to outperform them all.",
      button: "Learn more",
      gif: "https://motionsites.ai/assets/hero-finlytic-preview-CV9g0FHP.gif",
      reverse: false
    },
    {
      title: "It gets smarter. Automatically.",
      body: "Your site evolves on its own. AI monitors every click, scroll, and conversion--then optimizes in real time. No manual updates. Ever.",
      button: "See how it works",
      gif: "https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif",
      reverse: true
    }
  ];

  return (
    <section className="bg-black py-32 px-6">
      <div className="max-w-6xl mx-auto space-y-32">
        {rows.map((row, idx) => (
          <div key={idx} className={`flex flex-col lg:flex-row items-center gap-16 ${row.reverse ? 'lg:flex-row-reverse' : ''}`}>
            {/* Content */}
            <div className="flex-1 text-left">
              {row.badge && (
                <div className="liquid-glass rounded-full px-4 py-1 text-xs font-medium text-white mb-6 border border-white/5 font-body inline-block uppercase tracking-wider">
                  {row.badge}
                </div>
              )}
              <h3 className="text-4xl md:text-5xl font-heading italic text-white tracking-tight leading-[0.95] mb-6">
                {row.title}
              </h3>
              <p className="text-white/60 font-body font-light text-sm md:text-base mb-8 leading-relaxed max-w-md">
                {row.body}
              </p>
              <button className="liquid-glass-strong rounded-full px-8 py-3.5 flex items-center gap-2 group font-medium">
                {row.button}
                <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>

            {/* Visual (GIF) */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
              className="flex-1 w-full liquid-glass rounded-2xl overflow-hidden border border-white/10"
            >
              <img 
                src={row.gif} 
                alt={row.title} 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105"
              />
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
