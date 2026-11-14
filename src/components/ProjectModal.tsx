'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Project } from '@/data/projects';
import { useApp } from '@/context/AppContext';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Maximize2,
  Minimize2,
  ExternalLink,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { lang, t } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inspectMode, setInspectMode] = useState(false);

  useEffect(() => {
    setCurrentIndex(0);
    setInspectMode(false);
  }, [project]);

  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev + 1) % project.images.length);
      } else if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
      } else if (e.key === 'Escape') {
        if (inspectMode) {
          setInspectMode(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, inspectMode, onClose]);

  if (!project) return null;

  const currentDisplayImg = project.images[currentIndex] || project.coverImage;

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % project.images.length);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black text-white select-none animate-in fade-in duration-300">
      {/* 1. Full-Bleed Background Visual (Crossfade Animation) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentDisplayImg}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={currentDisplayImg}
            alt={project.title[lang]}
            fill
            priority
            sizes="100vw"
            className={`${
              inspectMode
                ? 'object-contain sm:object-cover'
                : 'object-cover object-center'
            } transition-all duration-700`}
          />
        </motion.div>
      </AnimatePresence>

      {/* 2. Gradient Overlay for Perfect Typography Contrast (Fades out in Inspect Mode) */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${
          inspectMode
            ? 'opacity-0 bg-transparent'
            : 'opacity-100 bg-gradient-to-t md:bg-gradient-to-r from-black/95 via-black/70 md:via-black/55 to-black/20'
        }`}
      />

      {/* 3. Top Bar: Category Reference & Close Button */}
      <div className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-5 sm:px-10 sm:py-7">
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono tracking-[0.25em] text-[#D2B07E] uppercase font-medium">
            {project.category.toUpperCase()} | {t('MİMARLIK & YAPI', 'ARCHITECTURE & DESIGN')}
          </span>
        </div>

        <button
          onClick={onClose}
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md border border-white/20 hover:border-[#D2B07E] flex items-center justify-center text-white transition-all duration-300 shadow-xl"
          aria-label={t('Kapat', 'Close')}
        >
          <X size={20} />
        </button>
      </div>

      {/* 4. Left-Side Information Panel (QAT Project Architecture Style) */}
      <AnimatePresence>
        {!inspectMode && (
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4 }}
            className="absolute left-0 top-0 bottom-0 z-30 w-full md:w-[620px] lg:w-[680px] p-6 sm:p-10 lg:p-14 flex flex-col justify-center overflow-y-auto pointer-events-auto scrollbar-thin"
          >
            <div className="flex flex-col gap-5 pt-16 md:pt-0 pb-16 md:pb-0">
              {/* Type Subtitle */}
              <span className="text-xs font-mono tracking-[0.25em] text-[#D2B07E] uppercase block">
                {project.type[lang]}
              </span>

              {/* Grand Serif Headline */}
              <h1 className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.08] text-white drop-shadow-md">
                {project.title[lang]}
              </h1>

              {/* Architectural Narrative */}
              <p className="text-xs sm:text-sm text-gray-200 leading-relaxed font-light max-w-xl drop-shadow-sm">
                {project.description[lang]}
              </p>

              {/* Structured Metadata Table (Matches QAT Project Grid) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4 pt-4 border-t border-white/20 text-xs font-mono">
                <div>
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest block mb-0.5">
                    {t('LOKASYON', 'LOCATION')}
                  </span>
                  <span className="font-medium text-white">{project.location[lang]}</span>
                </div>

                <div>
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest block mb-0.5">
                    {t('YIL', 'YEAR')}
                  </span>
                  <span className="font-medium text-white">{project.year}</span>
                </div>

                <div>
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest block mb-0.5">
                    {t('YAPI ALANI', 'LIVING SPACE')}
                  </span>
                  <span className="font-medium text-[#D2B07E]">{project.area}</span>
                </div>

                {project.landArea && (
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest block mb-0.5">
                      {t('ARSA ALANI', 'LAND ESTATE')}
                    </span>
                    <span className="font-medium text-white">{project.landArea}</span>
                  </div>
                )}

                {project.rooms && (
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest block mb-0.5">
                      {t('TİP / DÜZEN', 'LAYOUT')}
                    </span>
                    <span className="font-medium text-white">{project.rooms}</span>
                  </div>
                )}

                <div>
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest block mb-0.5">
                    {t('DURUM', 'STATUS')}
                  </span>
                  <span className="font-medium text-white">{t('Tamamlandı', 'Completed')}</span>
                </div>
              </div>

              {/* Services List */}
              <div className="pt-3 border-t border-white/15">
                <span className="text-[10px] text-gray-400 uppercase tracking-widest block mb-1.5 font-mono">
                  {t('HİZMETLER', 'SERVICES')}
                </span>
                <p className="text-xs text-gray-300 font-mono leading-relaxed">
                  {project.services[lang].join(' • ')}
                </p>
              </div>

              {/* Video Link if present */}
              {project.videoUrl && (
                <div className="pt-2">
                  <a
                    href={project.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[11px] font-mono tracking-wider text-[#D2B07E] hover:underline uppercase"
                  >
                    <span>{t("PROJE VİDEOSUNU İZLE", "WATCH VIDEO")}</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              )}

              {/* Slider Controls (Bottom-Left) */}
              <div className="flex items-center gap-4 pt-4 font-mono text-xs text-gray-300">
                <div className="flex items-center gap-1">
                  <button
                    onClick={handlePrev}
                    className="p-1.5 rounded-full hover:bg-white/10 hover:text-[#D2B07E] transition-colors"
                    aria-label="Önceki"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <span className="tracking-widest px-2">
                    {currentIndex + 1} / {project.images.length}
                  </span>
                  <button
                    onClick={handleNext}
                    className="p-1.5 rounded-full hover:bg-white/10 hover:text-[#D2B07E] transition-colors"
                    aria-label="Sonraki"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. In Inspect Mode: Floating Arrows on Left & Right */}
      {inspectMode && project.images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md border border-white/20 hover:border-[#D2B07E] text-white flex items-center justify-center transition-all shadow-2xl"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md border border-white/20 hover:border-[#D2B07E] text-white flex items-center justify-center transition-all shadow-2xl"
          >
            <ChevronRight size={24} />
          </button>
          {/* Inspect Counter in Top Center */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 z-40 px-4 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 font-mono text-xs text-gray-200">
            {currentIndex + 1} / {project.images.length}
          </div>
        </>
      )}

      {/* 6. Bottom-Right Shortcut: "GÖRSELİ İNCELE" Button (Exactly as in Reference Screenshot) */}
      <button
        onClick={() => setInspectMode(!inspectMode)}
        className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 z-40 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/70 hover:bg-black/90 backdrop-blur-md border border-white/25 hover:border-[#D2B07E] text-white text-[11px] font-mono tracking-widest uppercase transition-all duration-300 shadow-2xl group"
      >
        <span>
          {inspectMode
            ? t('BİLGİLERİ GÖSTER', 'SHOW DETAILS')
            : t('GÖRSELİ İNCELE', 'INSPECT VISUAL')}
        </span>
        <ArrowUpRight
          size={14}
          className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#D2B07E]"
        />
      </button>
    </div>
  );
}
