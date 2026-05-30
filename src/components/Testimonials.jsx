import { motion } from 'motion/react';

export default function Testimonials() {
  const testimonials = [
    {
      quote: "A complete rebuild in five days. The result outperformed everything we'd spent months building before.",
      name: "Sarah Chen",
      role: "CEO, Luminary"
    },
    {
      quote: "Conversions up 4x. That's not a typo. The design just works differently when it's built on real data.",
      name: "Marcus Webb",
      role: "Head of Growth, Arcline"
    },
    {
      quote: "They didn't just design our site. They defined our brand. World-class doesn't begin to cover it.",
      name: "Elena Voss",
      role: "Brand Director, Helix"
    }
  ];

  return (
    <section className="bg-black py-32 px-6">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <div className="liquid-glass rounded-full px-4 py-1 text-xs font-medium text-white mb-6 border border-white/5 font-body uppercase tracking-wider">
            What They Say
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-5xl font-heading italic text-white tracking-tight leading-[0.9] max-w-2xl">
            Don't take our word for it.
          </h2>
        </div>

        {/* Grid */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          transition={{ staggerChildren: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
                visible: { opacity: 1, y: 0, filter: 'blur(0px)' }
              }}
              whileHover={{ y: -5 }}
              className="liquid-glass rounded-3xl p-10 border border-white/5 flex flex-col gap-8 transition-all hover:border-white/20"
            >
              <p className="text-white/80 font-body font-light text-sm italic leading-relaxed">
                "{t.quote}"
              </p>
              <div className="mt-auto">
                <h5 className="text-white font-body font-medium text-sm mb-1">{t.name}</h5>
                <span className="text-white/50 font-body font-light text-xs uppercase tracking-widest">{t.role}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
