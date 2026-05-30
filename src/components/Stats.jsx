import { motion } from 'framer-motion';

const STATS = [
  { label: 'Years Experience', value: '20+' },
  { label: 'Projects Done', value: '95+' },
  { label: 'Satisfied Clients', value: '200%' }, // As requested in prompt "200% Satisfied Clients"
];

export default function Stats() {
  return (
    <section id="stats" className="bg-bg py-12 sm:py-16 md:py-24 border-t border-stroke">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-10 md:divide-x divide-stroke">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
              className="flex flex-col items-center justify-center text-center"
            >
              <h3 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display italic text-white mb-1 sm:mb-2 tracking-tight">
                {stat.value}
              </h3>
              <p className="text-[10px] sm:text-xs md:text-sm text-muted uppercase tracking-[0.15em] sm:tracking-[0.2em] font-body">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
