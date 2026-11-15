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
    const el = document.getElementById('featured-projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative w-full h-[540px] sm:h-[640px] md:h-[740px] lg:h-[840px] overflow-hidden bg-black select-none pt-20">
      {/* Background Slides with Fade Transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[current].id}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
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
          {/* Subtle cinematic vignette gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/30 pointer-events-none" />
        </motion.div>
      </AnimatePresence>

      {/* Hero Bottom Bar Container (Mockup 1 Exact Alignment) */}
      <div className="absolute bottom-8 md:bottom-12 left-0 right-0 z-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-end justify-between">
          {/* Left: Button & Slide Progress */}
          <div className="flex flex-col gap-4">
            <button
              onClick={scrollToFeatured}
              className="inline-flex items-center gap-3 px-6 py-3 border border-[#9C7D54] bg-black/50 backdrop-blur-sm text-[#D2B07E] hover:bg-[#9C7D54]/25 hover:border-[#D2B07E] font-mono text-xs tracking-[0.2em] uppercase transition-all duration-300 w-fit cursor-pointer group"
            >
              <span>{t('PROJELERİ İNCELE', 'EXPLORE PROJECTS')}</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>

            {/* Slide Index & Progress Bar */}
            <div className="flex items-center gap-4 text-xs font-mono text-white/90">
              <span className="tracking-widest font-medium">
                {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
              </span>
              <div className="w-24 h-[1.5px] bg-white/30 relative overflow-hidden">
                <div
                  className="h-full bg-[#D2B07E] transition-all duration-500"
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
              className="w-10 h-10 md:w-11 md:h-11 rounded-full border border-white/60 hover:border-white text-white/90 hover:text-white hover:bg-white/10 flex items-center justify-center transition-all duration-300 cursor-pointer"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next Slide"
              className="w-10 h-10 md:w-11 md:h-11 rounded-full border border-white/60 hover:border-white text-white/90 hover:text-white hover:bg-white/10 flex items-center justify-center transition-all duration-300 cursor-pointer"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
