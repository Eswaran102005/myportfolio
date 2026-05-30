import { motion } from 'framer-motion';
import { useState } from 'react';
import PerspectiveCard from './PerspectiveCard';

const PROJECTS = [
  {
    id: 1,
    title: 'Automotive Motion',
    tag: 'Brand & Motion',
    span: 'md:col-span-7',
    aspect: 'aspect-[16/10]',
    gradient: 'from-zinc-900 via-zinc-800 to-zinc-700',
    accent: '#89AACC',
  },
  {
    id: 2,
    title: 'Urban Architecture',
    tag: 'Photography',
    span: 'md:col-span-5',
    aspect: 'aspect-[4/5] sm:aspect-[4/5]',
    gradient: 'from-stone-900 via-stone-800 to-stone-700',
    accent: '#7A9EC4',
  },
  {
    id: 3,
    title: 'Human Perspective',
    tag: 'Editorial',
    span: 'md:col-span-5',
    aspect: 'aspect-[4/5] sm:aspect-[4/5]',
    gradient: 'from-neutral-900 via-neutral-800 to-zinc-700',
    accent: '#6B9ABB',
  },
  {
    id: 4,
    title: 'Brand Identity',
    tag: 'Branding',
    span: 'md:col-span-7',
    aspect: 'aspect-[16/10]',
    gradient: 'from-zinc-900 via-slate-800 to-slate-700',
    accent: '#89AACC',
  },
];

function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`${project.span} col-span-1`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <PerspectiveCard>
        <div
          className={`relative rounded-2xl sm:rounded-3xl overflow-hidden group cursor-pointer ${project.aspect} bg-gradient-to-br ${project.gradient} border border-stroke`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Fake image via gradient + pattern */}
          <div
            className="absolute inset-0 bg-gradient-to-br opacity-80"
            style={{
              background: `radial-gradient(ellipse at 30% 40%, ${project.accent}20 0%, transparent 60%), linear-gradient(160deg, hsl(var(--surface)) 0%, hsl(0 0% 6%) 100%)`,
            }}
          />

          {/* Halftone overlay */}
          <div className="absolute inset-0 halftone opacity-20 mix-blend-multiply" />

          {/* Visual element */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10" style={{ transform: 'translateZ(20px)' }}>
            <div
              className="w-32 h-32 sm:w-48 sm:h-48 rounded-full"
              style={{
                background: `radial-gradient(circle, ${project.accent} 0%, transparent 70%)`,
              }}
            />
          </div>

          {/* Hover overlay — only on non-touch */}
          <motion.div
            className="absolute inset-0 bg-bg/70 backdrop-blur-lg hidden sm:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ transform: 'translateZ(10px)' }}
          />

          {/* Hover label — only on non-touch */}
          <motion.div
            className="absolute inset-0 items-center justify-center hidden sm:flex"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
            transition={{ duration: 0.3 }}
            style={{ transform: 'translateZ(60px)' }}
          >
            <div className="relative group/btn">
              <span
                className="absolute inset-[-2px] rounded-full"
                style={{ background: 'linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)' }}
              />
              <span className="relative z-10 flex items-center gap-2 bg-white text-bg text-sm font-body font-medium px-5 py-2.5 rounded-full">
                View —{' '}
                <em className="font-display italic not-italic font-normal">{project.title}</em>
              </span>
            </div>
          </motion.div>

          {/* Bottom info (always visible) */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 flex items-end justify-between" style={{ transform: 'translateZ(30px)' }}>
            <div>
              <p className="text-white font-body font-medium text-xs sm:text-sm tracking-wide">
                {project.title}
              </p>
              <p className="text-muted text-[10px] sm:text-xs font-body mt-0.5">{project.tag}</p>
            </div>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white text-xs border border-white/20 backdrop-blur-sm">
              ↗
            </div>
          </div>
        </div>
      </PerspectiveCard>
    </div>
  );
}

const viewVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export default function SelectedWorks() {
  return (
    <section id="works" className="bg-bg py-12 md:py-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          variants={viewVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-50px' }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-10 md:mb-12"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em] font-body">
                Selected Work
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-body font-light text-white">
              Featured <em className="font-display italic not-italic">projects</em>
            </h2>
            <p className="text-muted text-sm font-body mt-3 max-w-sm leading-relaxed">
              A selection of projects I've worked on, from concept to launch.
            </p>
          </div>

          <button className="hidden md:inline-flex items-center gap-2 relative group rounded-full text-sm px-5 py-2.5 font-body text-muted border border-stroke hover:text-white transition-colors duration-200">
            <span
              className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)' }}
            />
            <span className="relative z-10 flex items-center gap-2 bg-bg rounded-full px-5 py-2.5">
              View all work <span>→</span>
            </span>
          </button>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5 md:gap-6">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.id}
              className={`${project.span} col-span-1`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '-40px' }}
              transition={{
                duration: 0.8,
                delay: i * 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
