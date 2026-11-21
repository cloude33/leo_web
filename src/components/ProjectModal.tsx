'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/data/projects';
import { useApp } from '@/context/AppContext';
import { useSwipe } from '@/hooks/useSwipe';
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

  const images = project.images && project.images.length > 0 ? project.images : [project.coverImage];

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const swipeHandlers = useSwipe(nextImage, prevImage);

  // Keyboard navigation & escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          onClose();
        }
      }
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose, images.length, isFullscreen]);

  // Hizmetler listesi
  const servicesList = [
    t('Mimari Tasarım', 'Architectural Design'),
    t('İç Mimari Tasarım', 'Interior Architecture'),
    t('Uygulama Projeleri', 'Working Drawings'),
    t('Mimari Görselleştirme', '3D Visualization'),
    t('Anahtar Teslim Uygulama', 'Turnkey Construction'),
  ];

  const currentImage = images[activeImageIndex] || project.coverImage;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 overflow-y-auto"
      style={{ backgroundColor: 'var(--bg-page)', color: 'var(--text-primary)' }}
    >
      {/* Header */}
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
            {/* Main Stage Image (Clicking opens fullscreen lightbox) */}
            <div
              {...swipeHandlers}
              onClick={() => setIsFullscreen(true)}
              className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden bg-[#0a0a0a] shadow-lg select-none group border border-[var(--border-color)] cursor-zoom-in flex items-center justify-center touch-pan-y"
              title={t('Büyük boyutta incelemek için tıklayın', 'Click to view fullscreen')}
            >
              {/* Subtle ambient blurred background matching the photo */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <Image
                  src={currentImage}
                  alt=""
                  fill
                  className="object-cover blur-2xl opacity-20 scale-110"
                  aria-hidden="true"
                />
                <div className="absolute inset-0 bg-black/30" />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImage}
                  initial={{ opacity: 0.8 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0.8 }}
                  transition={{ duration: 0.25 }}
                  className="relative w-full h-full flex items-center justify-center z-10"
                >
                  <Image
                    src={currentImage}
                    alt={project.title[lang]}
                    fill
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    priority
                    className="object-contain select-none"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Inside Left Arrow Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                aria-label="Previous Image"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/85 text-white hidden sm:flex items-center justify-center transition-all cursor-pointer shadow-md z-10"
              >
                <ArrowLeft size={18} />
              </button>

              {/* Inside Right Arrow Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                aria-label="Next Image"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/85 text-white hidden sm:flex items-center justify-center transition-all cursor-pointer shadow-md z-10"
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
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFullscreen(true);
                }}
                aria-label="Fullscreen"
                className="absolute bottom-4 right-5 p-2 rounded-lg bg-black/60 hover:bg-black/80 text-white/90 backdrop-blur-sm transition-colors cursor-pointer z-10"
              >
                <Maximize2 size={16} />
              </button>
            </div>

            {/* Thumbnail Strip */}
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

        {/* Proje Detayları Strip */}
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

      </div>

      {/* 6. Fullscreen Interactive Lightbox Modal */}
      {isFullscreen && (
        <div
          {...swipeHandlers}
          className="fixed inset-0 z-60 bg-black/95 flex flex-col items-center justify-center p-4 select-none backdrop-blur-md animate-in fade-in duration-200 touch-pan-y"
          onClick={() => setIsFullscreen(false)}
        >
          {/* Top Info & Close Bar */}
          <div className="absolute top-5 left-5 md:left-8 z-30 flex items-center gap-3 md:gap-4 pointer-events-auto">
            <span className="font-serif-luxury text-base md:text-xl text-white font-medium drop-shadow-md">
              {project.title[lang]}
            </span>
            <span className="text-white/40 font-mono text-sm hidden sm:inline">|</span>
            <div className="flex items-center gap-1.5 bg-black/60 border border-white/20 px-3 py-1 rounded-full text-xs font-mono text-white/90 backdrop-blur-md">
              <span className="text-[#D2B07E] font-bold">{activeImageIndex + 1}</span>
              <span className="opacity-50">/</span>
              <span>{images.length}</span>
            </div>
          </div>

          <button
            onClick={() => setIsFullscreen(false)}
            aria-label="Close Lightbox"
            className="absolute top-5 right-5 md:right-8 z-30 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 border border-white/25 hover:border-white text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-md shadow-lg pointer-events-auto"
          >
            <X size={20} />
          </button>

          {/* Left Arrow Navigation Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            aria-label="Previous Photo"
            className="absolute left-3 sm:left-6 md:left-10 top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/60 hover:bg-black/90 border border-white/25 hover:border-[#D2B07E] text-white hover:text-[#D2B07E] hidden sm:flex items-center justify-center transition-all cursor-pointer shadow-2xl group pointer-events-auto"
          >
            <ArrowLeft size={24} className="group-hover:-translate-x-0.5 transition-transform" />
          </button>

          {/* Right Arrow Navigation Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            aria-label="Next Photo"
            className="absolute right-3 sm:right-6 md:right-10 top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/60 hover:bg-black/90 border border-white/25 hover:border-[#D2B07E] text-white hover:text-[#D2B07E] hidden sm:flex items-center justify-center transition-all cursor-pointer shadow-2xl group pointer-events-auto"
          >
            <ArrowRight size={24} className="group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Main Fullscreen Image Container */}
          <div
            className="relative w-full h-full max-w-6xl max-h-[72vh] md:max-h-[76vh] flex items-center justify-center px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImage}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative w-full h-full flex items-center justify-center"
              >
                <Image
                  src={currentImage}
                  alt={`${project.title[lang]} - Fotoğraf ${activeImageIndex + 1}`}
                  fill
                  priority
                  className="object-contain select-none"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Thumbnails Strip for Quick Jump */}
          <div className="absolute bottom-4 md:bottom-6 left-0 right-0 z-30 flex justify-center px-4 pointer-events-none">
            <div className="flex items-center gap-2 md:gap-3 p-2 rounded-2xl bg-black/70 backdrop-blur-md border border-white/15 max-w-full overflow-x-auto pointer-events-auto shadow-2xl">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImageIndex(idx);
                  }}
                  className={`relative h-12 md:h-14 aspect-[16/10] rounded-lg overflow-hidden flex-shrink-0 transition-all border-2 cursor-pointer ${
                    activeImageIndex === idx
                      ? 'border-[#D2B07E] scale-105 ring-2 ring-[#D2B07E]/40 opacity-100 shadow-md'
                      : 'border-transparent opacity-50 hover:opacity-100 hover:border-white/40'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Küçük Resim ${idx + 1}`}
                    fill
                    sizes="90px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
