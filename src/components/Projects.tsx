'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Project, projectsData } from '@/data/projects';
import { useApp } from '@/context/AppContext';
import { ArrowUpRight, Filter, MapPin, Calendar, Maximize2 } from 'lucide-react';
import ProjectModal from './ProjectModal';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectsProps {
  filterCategory: 'all' | 'urla' | 'acarkent';
  setFilterCategory: (cat: 'all' | 'urla' | 'acarkent') => void;
}

export default function Projects({ filterCategory, setFilterCategory }: ProjectsProps) {
  const { lang, t } = useApp();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Projects already sorted newest to oldest in projectsData (2026 -> 2011)
  const filteredProjects = projectsData.filter((p) => {
    if (filterCategory === 'all') return true;
    return p.category === filterCategory;
  });

  return (
    <section id="projects" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b pb-8"
          style={{ borderColor: 'var(--border-color)' }}
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-[1px] bg-[var(--accent-gold)]" />
              <span className="text-xs font-mono tracking-[0.25em] text-[var(--accent-gold)] uppercase">
                {t('KRONOLOJİK ARŞİV (2026 — 2011)', 'CHRONOLOGICAL ARCHIVE (2026 — 2011)')}
              </span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl tracking-tight">
              {t('Öne Çıkan Mimari Yapıtlar', 'Selected Architectural Works')}
            </h2>
          </div>

          {/* Category Filter Pills (Urla / Acarkent / Tümü) */}
          <div className="flex items-center gap-2 bg-[var(--card-bg)] p-1.5 rounded-full border border-[var(--border-color)] self-start md:self-auto shadow-sm">
            <button
              onClick={() => setFilterCategory('all')}
              className={`text-xs font-mono px-4 py-2 rounded-full transition-all duration-300 ${
                filterCategory === 'all'
                  ? 'bg-[var(--accent-gold)] text-black font-semibold'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              {t('TÜMÜ', 'ALL')} ({projectsData.length})
            </button>
            <button
              onClick={() => setFilterCategory('urla')}
              className={`text-xs font-mono px-4 py-2 rounded-full transition-all duration-300 ${
                filterCategory === 'urla'
                  ? 'bg-[var(--accent-gold)] text-black font-semibold'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              URLA ({projectsData.filter(p => p.category === 'urla').length})
            </button>
            <button
              onClick={() => setFilterCategory('acarkent')}
              className={`text-xs font-mono px-4 py-2 rounded-full transition-all duration-300 ${
                filterCategory === 'acarkent'
                  ? 'bg-[var(--accent-gold)] text-black font-semibold'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              ACARKENT ({projectsData.filter(p => p.category === 'acarkent').length})
            </button>
          </div>
        </div>

        {/* Projects Editorial Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer flex flex-col rounded-xl overflow-hidden border transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
                style={{
                  backgroundColor: 'var(--card-bg)',
                  borderColor: 'var(--border-color)'
                }}
              >
                {/* Image Container with Zoom & Label */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/10">
                  <Image
                    src={project.coverImage}
                    alt={project.title[lang]}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Year Tag Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="text-[10px] font-mono tracking-widest px-2.5 py-1 rounded-full bg-black/70 text-white backdrop-blur-sm border border-white/10 uppercase">
                      {project.year} • {project.category.toUpperCase()}
                    </span>
                  </div>

                  {/* Hover Quick Action Indicator */}
                  <div className="absolute bottom-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="w-9 h-9 rounded-full bg-[var(--accent-gold)] text-black flex items-center justify-center shadow-lg">
                      <ArrowUpRight size={16} />
                    </span>
                  </div>
                </div>

                {/* Card Content & Metadata */}
                <div className="p-6 flex flex-col flex-grow justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-mono tracking-widest uppercase text-[var(--accent-gold)] block mb-1">
                      {project.type[lang]}
                    </span>
                    <h3 className="font-serif-luxury text-xl font-medium tracking-tight group-hover:text-[var(--accent-gold)] transition-colors leading-snug">
                      {project.title[lang]}
                    </h3>
                  </div>

                  <p className="text-xs text-[var(--text-muted)] line-clamp-2 leading-relaxed">
                    {project.description[lang]}
                  </p>

                  <div className="pt-4 border-t flex items-center justify-between text-xs font-mono text-[var(--text-muted)]"
                    style={{ borderColor: 'var(--border-color)' }}
                  >
                    <span className="flex items-center gap-1">
                      <MapPin size={12} className="text-[var(--accent-gold)]" />
                      {project.location[lang]}
                    </span>
                    <span className="font-medium text-[var(--text-primary)]">
                      {project.area}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}

