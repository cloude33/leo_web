'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Hero() {
  const { t } = useApp();

  // Urla Gaia Çiftlik Evleri 4 projesinden seçilen gerçek mimari görseller
  const slides = [
    {
      id: 'gaia-vadi-4-slide-1',
      title: 'Urla Gaia Çiftlik Evleri 4',
      src: '/projects/gaia-vadi-4/img_3.avif',
    },
    {
      id: 'gaia-vadi-4-slide-2',
      title: 'Urla Gaia Çiftlik Evleri 4',
      src: '/projects/gaia-vadi-4/img_8.avif',
    },
    {
      id: 'gaia-vadi-4-slide-3',
      title: 'Urla Gaia Çiftlik Evleri 4',
      src: '/projects/gaia-vadi-4/img_5.avif',
    },
  ];

  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const scrollToFeatured = () => {
    const el = document.getElementById('projects') || document.getElementById('featured-projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative w-full h-[100svh] min-h-[640px] max-h-[980px] overflow-hidden bg-black select-none pt-20">
      {/* Background Slides with Fade Transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[current].id}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={slides[current].src}
            alt={slides[current].title}
            fill
            sizes="100vw"
            priority
            className="object-cover object-center"
          />
        </motion.div>
      </AnimatePresence>

      {/* Atmospheric Editorial Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/45 pointer-events-none" />

      {/* Floating Project Metadata (Top Tier - Editorial) */}
      <div className="absolute top-28 sm:top-32 left-0 right-0 z-20 pointer-events-none">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="inline-flex items-center gap-2.5 font-mono text-[11px] tracking-[0.25em] text-[#D2B07E] uppercase drop-shadow-md">
            <span className="w-8 h-[1px] bg-[#D2B07E]" />
            <span>{t('URLA & İSTANBUL BUTİK MİMARLIK', 'URLA & ISTANBUL BESPOKE ATELIER')}</span>
          </div>
          <h1 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl text-white font-normal tracking-tight mt-2.5 drop-shadow-xl max-w-2xl leading-[1.1]">
            {slides[current].title}
          </h1>
        </div>
      </div>

      {/* Hero Bottom Bar Container (Mockup 1 Exact Alignment) */}
      <div className="absolute bottom-8 md:bottom-12 left-0 right-0 z-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-end justify-between">
          {/* Left: Button & Slide Progress */}
          <div className="flex flex-col gap-4">
            <button
              onClick={scrollToFeatured}
              className="inline-flex items-center gap-3 px-6 py-3 border border-[#9C7D54] bg-black/60 backdrop-blur-md text-[#D2B07E] hover:bg-[#9C7D54]/25 hover:border-[#D2B07E] active:scale-[0.98] font-mono text-xs tracking-[0.2em] uppercase transition-all duration-300 w-fit cursor-pointer group shadow-lg"
            >
              <span>{t('PROJELERİ İNCELE', 'EXPLORE PROJECTS')}</span>
              <span className="group-hover:translate-x-1.5 transition-transform duration-200">→</span>
            </button>

            {/* Slide Index & Progress Bar */}
            <div className="flex items-center gap-4 text-xs font-mono text-white/90 drop-shadow-md">
              <span className="tracking-widest font-medium">
                {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
              </span>
              <div className="w-24 h-[1.5px] bg-white/40 relative overflow-hidden rounded-full shadow-sm">
                <div
                  className="h-full bg-[#D2B07E] transition-all duration-500 ease-out"
                  style={{ width: `${((current + 1) / slides.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Right: Round Arrow Navigation Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={prevSlide}
              aria-label="Previous Slide"
              className="w-11 h-11 rounded-full bg-black/50 backdrop-blur-md border border-white/60 hover:border-white text-white/90 hover:text-white hover:bg-black/70 active:scale-95 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-lg"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next Slide"
              className="w-11 h-11 rounded-full bg-black/50 backdrop-blur-md border border-white/60 hover:border-white text-white/90 hover:text-white hover:bg-black/70 active:scale-95 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-lg"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
