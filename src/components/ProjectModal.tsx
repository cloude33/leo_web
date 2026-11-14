'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/data/projects';
import { useApp } from '@/context/AppContext';
import {
  ArrowLeft,
  ArrowRight,
  Maximize2,
  Minimize2,
  Check,
  Home,
  MapPin,
  Calendar,
  Layers,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { lang, theme, t } = useApp();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Keyboard navigation & escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose, project.images.length]);

  const images = project.images && project.images.length > 0 ? project.images : [project.coverImage];

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // 5 standard services matching client mockup 2
  const servicesList = [
    t('Mimari Tasarım', 'Architectural Design'),
    t('İç Mimari Tasarım', 'Interior Architecture'),
    t('Uygulama Projeleri', 'Working Drawings'),
    t('Mimari Görselleştirme', '3D Visualization'),
    t('Anahtar Teslim Uygulama', 'Turnkey Construction'),
  ];

  const currentImage = images[activeImageIndex] || project.coverImage;
  const bottomImage = images[images.length - 1] || currentImage;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 overflow-y-auto"
      style={{ backgroundColor: 'var(--bg-page)', color: 'var(--text-primary)' }}
    >
      {/* 1. Header / Navbar Matching Client Mockup 2 */}
      <header
        className="sticky top-0 z-40 py-3.5 px-6 md:px-12 flex items-center justify-between border-b transition-colors"
        style={{
          backgroundColor: 'var(--nav-bg)',
          borderColor: 'var(--border-color)',
        }}
      >
        <Link href="/" onClick={onClose} className="flex items-center">
          <div className="relative h-10 md:h-12 w-auto flex items-center">
            <Image
              src="/logo.avif"
              alt="LEO Mimarlık & Yapı"
              width={160}
              height={50}
              className="h-9 md:h-11 w-auto object-contain"
              priority
            />
          </div>
        </Link>

        {/* Nav Links with PROJELER Active Underline */}
        <nav className="flex items-center gap-6 md:gap-9 text-xs font-mono uppercase tracking-[0.2em]">
          <Link
            href="/"
            onClick={onClose}
            className="hover:text-[var(--accent-gold)] transition-colors opacity-80 hover:opacity-100"
          >
            {t('ANA SAYFA', 'HOME')}
          </Link>
          <span className="font-semibold text-[var(--accent-gold)] relative after:absolute after:bottom-[-6px] after:left-0 after:w-full after:h-[1.5px] after:bg-[var(--accent-gold)]">
            {t('PROJELER', 'PROJECTS')}
          </span>
          <Link
            href="/hakkimizda"
            onClick={onClose}
            className="hover:text-[var(--accent-gold)] transition-colors opacity-80 hover:opacity-100 hidden sm:block"
          >
            {t('HAKKIMIZDA', 'ABOUT')}
          </Link>
          <Link
            href="/hizmetler"
            onClick={onClose}
            className="hover:text-[var(--accent-gold)] transition-colors opacity-80 hover:opacity-100 hidden md:block"
          >
            {t('HİZMETLER', 'SERVICES')}
          </Link>
          <Link
            href="/iletisim"
            onClick={onClose}
            className="hover:text-[var(--accent-gold)] transition-colors opacity-80 hover:opacity-100"
          >
            {t('İLETİŞİM', 'CONTACT')}
          </Link>
        </nav>
      </header>

      {/* 2. Main Page Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 pb-24">
        {/* Back Link */}
        <button
          onClick={onClose}
          className="inline-flex items-center gap-2 text-xs font-mono text-[var(--text-muted)] hover:text-[var(--accent-gold)] mb-6 transition-colors cursor-pointer group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          <span>{t("Projeler'e Dön", 'Back to Projects')}</span>
        </button>

        {/* Project Title Header + Gold Rule */}
        <div className="flex items-center gap-4 mb-2">
          <h1 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl text-[var(--text-primary)] font-normal tracking-tight">
            {project.title[lang]}
          </h1>
          <span className="w-16 md:w-24 h-[1.5px] bg-[var(--accent-gold)] hidden sm:block" />
        </div>

        {/* Subtitle */}
        <p className="font-mono text-xs tracking-[0.25em] text-[var(--text-muted)] uppercase mb-10">
          {project.category === 'urla' ? 'URLA' : 'ACARKENT'} &nbsp;|&nbsp; {project.year}
        </p>

        {/* 3. Main Grid: Left Visual Showcase & Right Services Checklist */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column (8 cols): Big Image + Thumbnails Strip */}
          <div className="lg:col-span-8 flex flex-col">
            {/* Main Stage Image */}
            <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-black shadow-md select-none group border border-[var(--border-color)]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImage}
                  initial={{ opacity: 0.8 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={currentImage}
                    alt={project.title[lang]}
                    fill
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    priority
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Inside Left Arrow Button */}
              <button
                onClick={prevImage}
                aria-label="Previous Image"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
              >
                <ArrowLeft size={18} />
              </button>

              {/* Inside Right Arrow Button */}
              <button
                onClick={nextImage}
                aria-label="Next Image"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
              >
                <ArrowRight size={18} />
              </button>

              {/* Bottom Left Counter & Gold Bar */}
              <div className="absolute bottom-4 left-5 flex items-center gap-3 bg-black/60 backdrop-blur-sm px-3.5 py-1.5 rounded-full z-10">
                <span className="text-xs font-mono text-white/90">
                  {activeImageIndex + 1} / {images.length}
                </span>
                <div className="w-16 h-[2px] bg-white/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[var(--accent-gold)] transition-all duration-300"
                    style={{ width: `${((activeImageIndex + 1) / images.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Bottom Right Fullscreen Toggle */}
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                aria-label="Fullscreen"
                className="absolute bottom-4 right-5 p-2 rounded-lg bg-black/60 hover:bg-black/80 text-white/90 backdrop-blur-sm transition-colors cursor-pointer z-10"
              >
                {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              </button>
            </div>

            {/* Thumbnail Strip Directly Below Main Image (Mockup 2 Exact Alignment) */}
            <div className="grid grid-cols-6 gap-2 sm:gap-3 mt-4">
              {images.slice(0, 6).map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative aspect-[16/10] rounded-lg overflow-hidden cursor-pointer border-2 transition-all duration-200 ${
                    activeImageIndex === idx
                      ? 'border-[var(--accent-gold)] ring-2 ring-[var(--accent-gold)]/30 opacity-100 shadow-sm'
                      : 'border-transparent opacity-75 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    fill
                    sizes="16vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column (4 cols): Sağladığımız Hizmetler */}
          <div className="lg:col-span-4 flex flex-col pt-2 lg:pl-4">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="font-serif-luxury text-2xl sm:text-3xl text-[var(--text-primary)] font-normal tracking-tight">
                {t('Sağladığımız Hizmetler', 'Services Provided')}
              </h2>
              <span className="w-12 h-[1.5px] bg-[var(--accent-gold)]" />
            </div>

            {/* 5 Checklist Items with Gold Square Checkmark */}
            <div className="flex flex-col gap-4">
              {servicesList.map((srv, index) => (
                <div key={index} className="flex items-center gap-3.5">
                  <div className="w-5 h-5 rounded-[4px] bg-[var(--accent-gold)] text-white flex items-center justify-center text-xs flex-shrink-0 shadow-sm">
                    <Check size={13} strokeWidth={3} />
                  </div>
                  <span className="text-sm font-medium text-[var(--text-primary)] leading-snug">
                    {srv}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4. Proje Detayları Strip (Mockup 2 Exact 5-Column Metrics) */}
        <div className="mt-16 md:mt-20">
          <div className="flex items-center gap-3 mb-8">
            <h2 className="font-serif-luxury text-2xl sm:text-3xl text-[var(--text-primary)] font-normal tracking-tight">
              {t('Proje Detayları', 'Project Details')}
            </h2>
            <span className="w-12 h-[1.5px] bg-[var(--accent-gold)]" />
          </div>

          <div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 py-8 border-y rounded-2xl px-6 md:px-8 shadow-sm transition-colors"
            style={{
              borderColor: 'var(--border-color)',
              backgroundColor: 'var(--card-bg)',
            }}
          >
            {/* Col 1: Typology */}
            <div className="flex flex-col justify-center border-r last:border-r-0 pr-4" style={{ borderColor: 'var(--border-color)' }}>
              <Home size={28} strokeWidth={1.3} className="text-[var(--text-primary)] mb-3 opacity-90" />
              <p className="font-serif-luxury text-lg text-[var(--text-primary)] font-medium leading-snug">
                {project.type[lang] || 'Çiftlik Evi'}
              </p>
            </div>

            {/* Col 2: Location */}
            <div className="flex flex-col justify-center border-r last:border-r-0 pr-4" style={{ borderColor: 'var(--border-color)' }}>
              <MapPin size={28} strokeWidth={1.3} className="text-[var(--text-primary)] mb-3 opacity-90" />
              <p className="font-serif-luxury text-lg text-[var(--text-primary)] font-medium leading-snug">
                {project.location[lang]}
              </p>
            </div>

            {/* Col 3: Year */}
            <div className="flex flex-col justify-center border-r last:border-r-0 pr-4" style={{ borderColor: 'var(--border-color)' }}>
              <Calendar size={28} strokeWidth={1.3} className="text-[var(--text-primary)] mb-3 opacity-90" />
              <p className="font-serif-luxury text-lg text-[var(--text-primary)] font-medium leading-snug">
                {project.year}
              </p>
            </div>

            {/* Col 4: Land Area */}
            <div className="flex flex-col justify-center border-r last:border-r-0 pr-4" style={{ borderColor: 'var(--border-color)' }}>
              <Layers size={28} strokeWidth={1.3} className="text-[var(--text-primary)] mb-3 opacity-90" />
              <p className="font-serif-luxury text-xl text-[var(--text-primary)] font-bold leading-none mb-1">
                {project.landArea || '3.100 m²'}
              </p>
              <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
                {t('Arsa Alanı', 'Land Area')}
              </span>
            </div>

            {/* Col 5: Building Area & Rooms */}
            <div className="flex flex-col justify-center pr-4">
              <Maximize2 size={28} strokeWidth={1.3} className="text-[var(--text-primary)] mb-3 opacity-90" />
              <p className="font-serif-luxury text-xl text-[var(--text-primary)] font-bold leading-none mb-1">
                {project.area}
              </p>
              <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
                {t('Yapı Alanı', 'Building Area')} ({project.rooms || '5+1'})
              </span>
            </div>
          </div>
        </div>

        {/* 5. Bottom Architectural Eye-Level Photo (Mockup 2 Continuation) */}
        {bottomImage && (
          <div className="relative aspect-[21/9] sm:aspect-[24/9] w-full rounded-2xl overflow-hidden mt-12 shadow-md border border-[var(--border-color)]">
            <Image
              src={bottomImage}
              alt="Project Detail Showcase"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        )}
      </div>

      {/* Fullscreen Lightbox Modal if triggered */}
      {isFullscreen && (
        <div className="fixed inset-0 z-60 bg-black/95 flex items-center justify-center p-4">
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-6 right-6 text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X size={24} />
          </button>
          <div className="relative w-full max-w-6xl aspect-[16/10]">
            <Image
              src={currentImage}
              alt="Fullscreen Preview"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </motion.div>
  );
}
