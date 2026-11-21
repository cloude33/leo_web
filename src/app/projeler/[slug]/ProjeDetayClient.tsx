'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/data/projects';
import { useApp } from '@/context/AppContext';
import Navbar from '@/components/Navbar';
import { useSwipe } from '@/hooks/useSwipe';
import {
  ArrowLeft, ArrowRight, Maximize2, Check,
  Home, MapPin, Calendar, Layers, X, ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  project: Project;
}

export default function ProjeDetayClient({ project }: Props) {
  const { lang, t } = useApp();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const images = project.images?.length ? project.images : [project.coverImage];
  const currentImage = images[activeImageIndex] || project.coverImage;

  const prevImage = () => setActiveImageIndex((p) => (p === 0 ? images.length - 1 : p - 1));
  const nextImage = () => setActiveImageIndex((p) => (p === images.length - 1 ? 0 : p + 1));

  const swipeHandlers = useSwipe(nextImage, prevImage);

  useEffect(() => {
    if (!isFullscreen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsFullscreen(false);
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isFullscreen, activeImageIndex]);

  const servicesList = [
    t('Mimari Tasarım', 'Architectural Design'),
    t('İç Mimari Tasarım', 'Interior Architecture'),
    t('Uygulama Projeleri', 'Working Drawings'),
    t('Mimari Görselleştirme', '3D Visualization'),
    t('Anahtar Teslim Uygulama', 'Turnkey Construction'),
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-page)', color: 'var(--text-primary)' }}>
      <Navbar />

      <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-12 pt-28 pb-24">
        {/* Geri */}
        <Link
          href="/projeler"
          className="inline-flex items-center gap-2 text-xs font-mono text-[var(--text-muted)] hover:text-[var(--accent-gold)] mb-8 transition-colors group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          {t("Projeler'e Dön", 'Back to Projects')}
        </Link>

        {/* Başlık */}
        <div className="flex items-center gap-4 mb-2">
          <h1 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight">
            {project.title[lang]}
          </h1>
          <span className="w-16 md:w-24 h-[1.5px] bg-[var(--accent-gold)] hidden sm:block" />
        </div>
        <p className="font-mono text-xs tracking-[0.25em] text-[var(--text-muted)] uppercase mb-10">
          {project.category === 'urla' ? 'URLA' : 'ACARKENT'}&nbsp;|&nbsp;{project.year}
        </p>

        {/* Ana Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Sol: Fotoğraf galerisi */}
          <div className="lg:col-span-8 flex flex-col">
            {/* Ana fotoğraf */}
            <div
              {...swipeHandlers}
              onClick={() => setIsFullscreen(true)}
              className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden bg-[#0a0a0a] shadow-lg border border-[var(--border-color)] cursor-zoom-in touch-pan-y"
              title={t('Büyük boyutta incelemek için tıklayın', 'Click to view fullscreen')}
            >
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <Image src={currentImage} alt="" fill className="object-cover blur-2xl opacity-20 scale-110" aria-hidden />
                <div className="absolute inset-0 bg-black/30" />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImage}
                  initial={{ opacity: 0.8 }} animate={{ opacity: 1 }} exit={{ opacity: 0.8 }}
                  transition={{ duration: 0.25 }}
                  className="relative w-full h-full flex items-center justify-center z-10"
                >
                  <Image src={currentImage} alt={project.title[lang]} fill sizes="(max-width: 1024px) 100vw, 66vw" priority className="object-contain" />
                </motion.div>
              </AnimatePresence>

              <button onClick={(e) => { e.stopPropagation(); prevImage(); }} aria-label="Önceki"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/85 text-white hidden sm:flex items-center justify-center transition-all shadow-md z-10 cursor-pointer">
                <ArrowLeft size={18} />
              </button>
              <button onClick={(e) => { e.stopPropagation(); nextImage(); }} aria-label="Sonraki"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/85 text-white hidden sm:flex items-center justify-center transition-all shadow-md z-10 cursor-pointer">
                <ArrowRight size={18} />
              </button>

              <div className="absolute bottom-4 left-5 flex items-center gap-3 bg-black/60 backdrop-blur-sm px-3.5 py-1.5 rounded-full z-10">
                <span className="text-xs font-mono text-white/90">{activeImageIndex + 1} / {images.length}</span>
                <div className="w-16 h-[2px] bg-white/30 rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--accent-gold)] transition-all duration-300" style={{ width: `${((activeImageIndex + 1) / images.length) * 100}%` }} />
                </div>
              </div>
              <button onClick={(e) => { e.stopPropagation(); setIsFullscreen(true); }} aria-label="Tam Ekran"
                className="absolute bottom-4 right-5 p-2 rounded-lg bg-black/60 hover:bg-black/80 text-white/90 backdrop-blur-sm transition-colors cursor-pointer z-10">
                <Maximize2 size={16} />
              </button>
            </div>

            {/* Küçük resim şeridi */}
            <div className="grid grid-cols-6 gap-2 sm:gap-3 mt-4">
              {images.slice(0, 6).map((img, idx) => (
                <div key={idx} onClick={() => setActiveImageIndex(idx)}
                  className={`relative aspect-[16/10] rounded-lg overflow-hidden cursor-pointer border-2 transition-all duration-200 ${
                    activeImageIndex === idx ? 'border-[var(--accent-gold)] ring-2 ring-[var(--accent-gold)]/30 opacity-100' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}>
                  <Image src={img} alt={`Küçük ${idx + 1}`} fill sizes="16vw" className="object-cover" />
                </div>
              ))}
            </div>

            {/* Açıklama */}
            {project.description && (
              <p className="mt-8 text-sm leading-relaxed text-[var(--text-muted)]">
                {project.description[lang]}
              </p>
            )}

            {/* Video linki */}
            {project.videoUrl && (
              <a href={project.videoUrl} target="_blank" rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-xs font-mono text-[var(--accent-gold)] hover:underline">
                <ExternalLink size={13} />
                {t('Proje videosunu izle', 'Watch project video')}
              </a>
            )}
          </div>

          {/* Sağ: Hizmetler */}
          <div className="lg:col-span-4 flex flex-col pt-2 lg:pl-4">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="font-serif-luxury text-2xl sm:text-3xl font-normal tracking-tight">
                {t('Sağladığımız Hizmetler', 'Services Provided')}
              </h2>
              <span className="w-12 h-[1.5px] bg-[var(--accent-gold)]" />
            </div>
            <div className="flex flex-col gap-4">
              {servicesList.map((srv, i) => (
                <div key={i} className="flex items-center gap-3.5">
                  <div className="w-5 h-5 rounded-[4px] bg-[var(--accent-gold)] text-white flex items-center justify-center flex-shrink-0">
                    <Check size={13} strokeWidth={3} />
                  </div>
                  <span className="text-sm font-medium">{srv}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Proje Detayları Şeridi */}
        <div className="mt-16 md:mt-20">
          <div className="flex items-center gap-3 mb-8">
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-normal tracking-tight">
              {t('Proje Detayları', 'Project Details')}
            </h2>
            <span className="w-12 h-[1.5px] bg-[var(--accent-gold)]" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 py-8 border-y rounded-2xl px-6 md:px-8 shadow-sm"
            style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)' }}>
            <div className="flex flex-col justify-center border-r last:border-r-0 pr-4" style={{ borderColor: 'var(--border-color)' }}>
              <Home size={28} strokeWidth={1.3} className="mb-3 opacity-90" />
              <p className="font-serif-luxury text-lg font-medium leading-snug">{project.type[lang]}</p>
            </div>
            <div className="flex flex-col justify-center border-r last:border-r-0 pr-4" style={{ borderColor: 'var(--border-color)' }}>
              <MapPin size={28} strokeWidth={1.3} className="mb-3 opacity-90" />
              <p className="font-serif-luxury text-lg font-medium leading-snug">{project.location[lang]}</p>
            </div>
            <div className="flex flex-col justify-center border-r last:border-r-0 pr-4" style={{ borderColor: 'var(--border-color)' }}>
              <Calendar size={28} strokeWidth={1.3} className="mb-3 opacity-90" />
              <p className="font-serif-luxury text-lg font-medium leading-snug">{project.year}</p>
            </div>
            {project.landArea && (
              <div className="flex flex-col justify-center border-r last:border-r-0 pr-4" style={{ borderColor: 'var(--border-color)' }}>
                <Layers size={28} strokeWidth={1.3} className="mb-3 opacity-90" />
                <p className="font-serif-luxury text-xl font-bold leading-none mb-1">{project.landArea}</p>
                <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">{t('Arsa', 'Land')}</span>
              </div>
            )}
            <div className="flex flex-col justify-center pr-4">
              <Maximize2 size={28} strokeWidth={1.3} className="mb-3 opacity-90" />
              <p className="font-serif-luxury text-xl font-bold leading-none mb-1">{project.area}</p>
              <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
                {t('Yapı', 'Built')} {project.rooms && `(${project.rooms})`}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tam Ekran Lightbox */}
      {isFullscreen && (
        <div
          {...swipeHandlers}
          className="fixed inset-0 z-[60] bg-black/95 flex flex-col items-center justify-center p-4 select-none backdrop-blur-md animate-in fade-in duration-200 touch-pan-y"
          onClick={() => setIsFullscreen(false)}>
          <div className="absolute top-5 left-5 md:left-8 z-30 flex items-center gap-3">
            <span className="font-serif-luxury text-base md:text-xl text-white font-medium">{project.title[lang]}</span>
            <span className="text-white/40 font-mono text-sm hidden sm:inline">|</span>
            <div className="flex items-center gap-1.5 bg-black/60 border border-white/20 px-3 py-1 rounded-full text-xs font-mono text-white/90">
              <span className="text-[#D2B07E] font-bold">{activeImageIndex + 1}</span>
              <span className="opacity-50">/</span>
              <span>{images.length}</span>
            </div>
          </div>
          <button onClick={() => setIsFullscreen(false)} aria-label="Kapat"
            className="absolute top-5 right-5 md:right-8 z-30 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 border border-white/25 hover:border-white text-white flex items-center justify-center transition-all cursor-pointer">
            <X size={20} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); prevImage(); }} aria-label="Önceki"
            className="absolute left-3 sm:left-6 md:left-10 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/60 hover:bg-black/90 border border-white/25 hover:border-[#D2B07E] text-white hover:text-[#D2B07E] hidden sm:flex items-center justify-center transition-all cursor-pointer">
            <ArrowLeft size={24} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); nextImage(); }} aria-label="Sonraki"
            className="absolute right-3 sm:right-6 md:right-10 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/60 hover:bg-black/90 border border-white/25 hover:border-[#D2B07E] text-white hover:text-[#D2B07E] hidden sm:flex items-center justify-center transition-all cursor-pointer">
            <ArrowRight size={24} />
          </button>
          <div className="relative w-full h-full max-w-6xl max-h-[72vh] md:max-h-[76vh] flex items-center justify-center px-4"
            onClick={(e) => e.stopPropagation()}>
            <AnimatePresence mode="wait">
              <motion.div key={currentImage} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
                className="relative w-full h-full flex items-center justify-center">
                <Image src={currentImage} alt={`${project.title[lang]} - ${activeImageIndex + 1}`} fill priority className="object-contain" />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="absolute bottom-4 md:bottom-6 left-0 right-0 z-30 flex justify-center px-4 pointer-events-none">
            <div className="flex items-center gap-2 md:gap-3 p-2 rounded-2xl bg-black/70 backdrop-blur-md border border-white/15 max-w-full overflow-x-auto pointer-events-auto">
              {images.map((img, idx) => (
                <button key={idx} onClick={(e) => { e.stopPropagation(); setActiveImageIndex(idx); }}
                  className={`relative h-12 md:h-14 aspect-[16/10] rounded-lg overflow-hidden flex-shrink-0 border-2 cursor-pointer transition-all ${
                    activeImageIndex === idx ? 'border-[#D2B07E] scale-105 ring-2 ring-[#D2B07E]/40 opacity-100' : 'border-transparent opacity-50 hover:opacity-100'
                  }`}>
                  <Image src={img} alt={`${idx + 1}`} fill sizes="90px" className="object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
