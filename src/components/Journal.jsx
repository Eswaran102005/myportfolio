import { motion } from 'framer-motion';

const ENTRIES = [
  {
    id: 1,
    title: 'The philosophy of white space in modern UI design',
    readTime: '4 min read',
    date: 'Mar 2026',
    tag: 'Design',
    color: '#89AACC',
  },
  {
    id: 2,
    title: 'Building design systems that scale across products',
    readTime: '6 min read',
    date: 'Feb 2026',
    tag: 'Engineering',
    color: '#7A9EC4',
  },
  {
    id: 3,
    title: 'Why motion design is the future of interfaces',
    readTime: '3 min read',
    date: 'Jan 2026',
    tag: 'Motion',
    color: '#6B9ABB',
  },
  {
    id: 4,
    title: 'From founder to designer: lessons after 3 startups',
    readTime: '8 min read',
    date: 'Dec 2025',
    tag: 'Reflection',
    color: '#89AACC',
  },
];

const viewVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export default function Journal() {
  return (
    <section id="journal" className="bg-bg py-12 sm:py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          variants={viewVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-50px' }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-10"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em] font-body">
                Journal
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-body font-light text-white">
              Recent <em className="font-display italic not-italic">thoughts</em>
            </h2>
            <p className="text-muted text-sm font-body mt-3 max-w-sm leading-relaxed">
              Reflections on design, engineering, and building things that matter.
            </p>
          </div>
          <button className="hidden md:inline-flex items-center gap-2 relative group rounded-full text-sm px-5 py-2.5 font-body text-muted border border-stroke hover:text-white transition-colors duration-200">
            <span
              className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)' }}
            />
            <span className="relative z-10 flex items-center gap-2 bg-bg rounded-full px-5 py-2.5">
              View all <span>→</span>
            </span>
          </button>
        </motion.div>

        {/* Entries */}
        <div className="flex flex-col gap-2 sm:gap-3">
          {ENTRIES.map((entry, i) => (
            <motion.article
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '-40px' }}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <button className="w-full text-left group flex items-center gap-3 sm:gap-4 md:gap-6 p-3 sm:p-4 md:p-5 bg-surface/30 hover:bg-surface border border-stroke rounded-2xl sm:rounded-[40px] md:rounded-full transition-all duration-300 active:scale-[0.98]">
                {/* Color dot / thumbnail */}
                <div
                  className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex-shrink-0 flex items-center justify-center text-white text-[10px] sm:text-xs font-body font-medium"
                  style={{
                    background: `${entry.color}20`,
                    border: `1px solid ${entry.color}30`,
                    color: entry.color,
                  }}
                >
                  {entry.id.toString().padStart(2, '0')}
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <p className="text-white text-xs sm:text-sm md:text-base font-body font-medium truncate group-hover:accent-gradient-text transition-all duration-200">
                    {entry.title}
                  </p>
                  <div className="flex items-center gap-2 sm:gap-3 mt-0.5 sm:mt-1">
                    <span className="text-muted text-[10px] sm:text-xs font-body">
                      {entry.tag}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-stroke" />
                    <span className="text-muted text-[10px] sm:text-xs font-body">
                      {entry.readTime}
                    </span>
                  </div>
                </div>

                {/* Date + arrow */}
                <div className="flex-shrink-0 flex items-center gap-2 sm:gap-3">
                  <span className="hidden sm:block text-muted text-xs font-body">
                    {entry.date}
                  </span>
                  <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-stroke flex items-center justify-center text-muted group-hover:text-white group-hover:border-white/30 transition-colors duration-200 text-[10px] sm:text-xs">
                    ↗
                  </span>
                </div>
              </button>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
