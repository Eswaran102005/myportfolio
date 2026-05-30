import { Zap, Palette, BarChart3, Shield } from 'lucide-react';
import { motion } from 'motion/react';

export default function FeaturesGrid() {
  const cards = [
    {
      icon: Zap,
      title: "Days, Not Months",
      description: "Concept to launch at a pace that redefines fast. Because waiting isn't a strategy."
    },
    {
      icon: Palette,
      title: "Obsessively Crafted",
      description: "Every detail considered. Every element refined. Design so precise, it feels inevitable."
    },
    {
      icon: BarChart3,
      title: "Built to Convert",
      description: "Layouts informed by data. Decisions backed by performance. Results you can measure."
    },
    {
      icon: Shield,
      title: "Secure by Default",
      description: "Enterprise-grade protection comes standard. SSL, DDoS mitigation, compliance. All included."
    }
  ];

  return (
    <section className="bg-black py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <div className="liquid-glass rounded-full px-4 py-1 text-xs font-medium text-white mb-6 border border-white/5 font-body uppercase tracking-wider">
            Why Us
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9] max-w-2xl">
            The difference is everything.
          </h2>
        </div>

        {/* Grid */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          transition={{ staggerChildren: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
                visible: { opacity: 1, y: 0, filter: 'blur(0px)' }
              }}
              whileHover={{ y: -8 }}
              className="liquid-glass rounded-3xl p-8 border border-white/5 transition-all duration-500 hover:border-white/20 group"
            >
              <div className="liquid-glass-strong rounded-full w-12 h-12 flex items-center justify-center mb-8 border border-white/10 group-hover:scale-110 transition-transform">
                <card.icon className="h-5 w-5 text-white" />
              </div>
              <h4 className="text-lg font-medium text-white mb-4 font-body">{card.title}</h4>
              <p className="text-white/50 text-sm font-body font-light leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
