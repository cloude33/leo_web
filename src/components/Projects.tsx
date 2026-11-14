'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Project, projectsData } from '@/data/projects';
import { useApp } from '@/context/AppContext';
import { ArrowUpRight } from 'lucide-react';
import ProjectModal from './ProjectModal';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectsProps {
  filterCategory: 'all' | 'urla' | 'acarkent';
  setFilterCategory: (cat: 'all' | 'urla' | 'acarkent') => void;
}

export default function Projects({ filterCategory, setFilterCategory }: ProjectsProps) {
  const { lang, t } = useApp();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Top 3 Featured Projects from the actual portfolio (Urla Gaia, Acarkent C Tipi, Acarkent Penthouse)
  const featuredProjects = [
    projectsData.find((p) => p.id === '3')!,
    projectsData.find((p) => p.id === '12')!,
    projectsData.find((p) => p.id === '1')!,
  ].filter(Boolean);

  // Filtered list for full archive
  const filteredProjects = projectsData.filter((p) => {
    if (filterCategory === 'all') return true;
    return p.category === filterCategory;
  });

  const scrollToAll = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('all-projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* 1. ÖNE ÇIKAN PROJELER (Client Mockup 1 Exact Design) */}
      <section
        id="featured-projects"
        className="py-16 md:py-24 border-b transition-colors duration-300"
        style={{
          backgroundColor: 'var(--bg-section)',
          borderColor: 'var(--border-color)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Header: Title + Gold Rule + Tüm Projeler link */}
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-4">
              <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-[var(--text-primary)] tracking-tight font-normal">
                {t('Öne Çıkan Projeler', 'Featured Projects')}
              </h2>
              <span className="w-16 md:w-24 h-[1.5px] bg-[var(--accent-gold)] hidden sm:block" />
            </div>

            <a
              href="#all-projects"
              onClick={scrollToAll}
              className="text-sm font-serif-luxury text-[var(--text-primary)] hover:text-[var(--accent-gold)] flex items-center gap-1.5 transition-colors cursor-pointer group"
            >
              <span>{t('Tüm Projeler', 'All Projects')}</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>

          {/* 3 Featured Project Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer flex flex-col"
              >
                {/* Card Image */}
                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-neutral-200 dark:bg-neutral-800 shadow-sm border border-[var(--border-color)]">
                  <Image
                    src={project.coverImage}
                    alt={project.title[lang]}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>

                {/* Card Title & Arrow */}
                <div className="flex items-center justify-between mt-4">
                  <h3 className="font-serif-luxury text-xl sm:text-2xl text-[var(--text-primary)] group-hover:text-[var(--accent-gold)] transition-colors leading-snug">
                    {project.title[lang]}
                  </h3>
                  <span className="text-[var(--text-primary)] group-hover:text-[var(--accent-gold)] group-hover:translate-x-1 transition-all text-xl font-light">
                    →
                  </span>
                </div>

                {/* Card Subtitle */}
                <p className="font-mono text-xs tracking-[0.2em] text-[var(--text-muted)] uppercase mt-1">
                  {project.category === 'urla' ? 'URLA' : 'ACARKENT'} | {project.year}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. TÜM PROJELER ARŞİVİ (Comprehensive Architectural Portfolio) */}
      <section id="all-projects" className="py-20 md:py-28 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Header & Filter Pills */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b pb-6"
            style={{ borderColor: 'var(--border-color)' }}
          >
            <div>
              <span className="text-xs font-mono tracking-[0.25em] text-[var(--accent-gold)] uppercase block mb-2">
                {t('PORTFOLYO ARŞİVİ', 'PORTFOLIO ARCHIVE')}
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[var(--text-primary)]">
                {t('Tüm Mimari Koleksiyonlar', 'All Architectural Collections')}
              </h2>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 bg-[var(--card-bg)] p-1 rounded-full border border-[var(--border-color)] shadow-sm">
              <button
                onClick={() => setFilterCategory('all')}
                className={`text-xs font-mono px-4 py-1.5 rounded-full transition-all ${
                  filterCategory === 'all'
                    ? 'bg-[var(--accent-gold)] text-black font-semibold'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                {t('TÜMÜ', 'ALL')} ({projectsData.length})
              </button>
              <button
                onClick={() => setFilterCategory('urla')}
                className={`text-xs font-mono px-4 py-1.5 rounded-full transition-all ${
                  filterCategory === 'urla'
                    ? 'bg-[var(--accent-gold)] text-black font-semibold'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                URLA ({projectsData.filter((p) => p.category === 'urla').length})
              </button>
              <button
                onClick={() => setFilterCategory('acarkent')}
                className={`text-xs font-mono px-4 py-1.5 rounded-full transition-all ${
                  filterCategory === 'acarkent'
                    ? 'bg-[var(--accent-gold)] text-black font-semibold'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                ACARKENT ({projectsData.filter((p) => p.category === 'acarkent').length})
              </button>
            </div>
          </div>

          {/* Grid of All Projects */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProjects.map((project, idx) => (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: idx * 0.03 }}
                  onClick={() => setSelectedProject(project)}
                  className="group cursor-pointer flex flex-col rounded-xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  style={{
                    backgroundColor: 'var(--card-bg)',
                    borderColor: 'var(--border-color)',
                  }}
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-900">
                    <Image
                      src={project.coverImage}
                      alt={project.title[lang]}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono tracking-wider text-white uppercase">
                      {project.category} • {project.year}
                    </div>
                  </div>

                  <div className="p-5 flex flex-col justify-between flex-1">
                    <div>
                      <h4 className="font-serif-luxury text-lg font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-gold)] transition-colors mb-2">
                        {project.title[lang]}
                      </h4>
                      <p className="text-xs text-[var(--text-muted)] line-clamp-2 leading-relaxed">
                        {project.description[lang]}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[var(--border-color)] flex items-center justify-between text-xs font-mono text-[var(--text-muted)]">
                      <span>{project.area}</span>
                      <span className="flex items-center gap-1 text-[var(--accent-gold)] group-hover:translate-x-0.5 transition-transform">
                        {t('İNCELE', 'VIEW')} <ArrowUpRight size={13} />
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* 3. PROJECT DETAIL MODAL (Matching Client Mockup 2 Exact Design) */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
