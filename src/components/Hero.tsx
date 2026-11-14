'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { ArrowDown, ArrowUpRight, Sparkles, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Hero() {
  const { lang, t } = useApp();

  const perspectives = [
    {
      id: 'villa',
      label: { tr: 'Kasaba Villası', en: 'Estate Villa' },
      src: '/projects/omerli-kasaba-evleri/img_5.avif',
      tag: { tr: 'Doğal Ahşap & Taş Doku Kır Evi', en: 'Natural Wood & Stone Country Estate' },
    },
    {
      id: 'living',
      label: { tr: 'Salon & Şömine', en: 'Living Room' },
      src: '/projects/omerli-kasaba-evleri/img_1.avif',
      tag: { tr: 'Bahçe Manzaralı Ferah Yaşam Alanı', en: 'Spacious Living Room with Garden Views' },
    },
    {
      id: 'kitchen',
      label: { tr: 'Ada Mutfak', en: 'Kitchen' },
      src: '/projects/omerli-kasaba-evleri/img_2.avif',
      tag: { tr: 'Çağdaş Country Mutfak Kurgusu', en: 'Contemporary Country Kitchen Design' },
    },
    {
      id: 'stairs',
      label: { tr: 'Galeri & Merdiven', en: 'Gallery & Staircase' },
      src: '/projects/omerli-kasaba-evleri/img_4.avif',
      tag: { tr: 'Masif Ahşap İç Mimari Detaylar', en: 'Solid Wood Interior Architectural Details' },
    },
  ];

  const [activePerspective, setActivePerspective] = useState(0);
  const currentView = perspectives[activePerspective];

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden architectural-grid">
      {/* Background Architectural Glow & Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-[var(--bg-page)]/50 to-[var(--bg-page)] z-10" />

      {/* Decorative Blueprint Coordinates */}
      <div className="absolute top-28 left-8 hidden lg:block text-[11px] font-mono tracking-widest opacity-40 select-none z-20">
        LAT: 38.3228° N / LON: 26.7640° E<br />
        URLA & ACARKENT ARCHITECTURAL ARCHIVE
      </div>
      <div className="absolute top-28 right-8 hidden lg:block text-right text-[11px] font-mono tracking-widest opacity-40 select-none z-20">
        ESTABLISHED 2004<br />
        ONE BESPOKE CONCEPT PER YEAR
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-20 w-full flex flex-col items-center text-center pt-8 md:pt-12">
        {/* Display Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.05] max-w-5xl mb-8"
        >
          {lang === 'tr' ? (
            <>
              Urla'nın Ruhu, <br />
              <span className="italic font-light text-[var(--accent-gold)]">Zamansız Taş</span> ve Çağdaş Lüks.
            </>
          ) : (
            <>
              The Urla Essence, <br />
              <span className="italic font-light text-[var(--accent-gold)]">Enduring Stone</span> & Refined Luxury.
            </>
          )}
        </motion.h1>

        {/* Philosophy Intro */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl max-w-2xl text-[var(--text-muted)] font-normal leading-relaxed mb-10"
        >
          {t(
            '"Her Sene 1 Konsept Villa" manifestosu ile Urla ve Acarkent’te doğayla diyalog kuran, el işçiliğiyle yoğrulmuş mimari yapıtlar tasarlıyor ve anahtar teslim inşa ediyoruz.',
            'Adhering to our manifesto of "One Bespoke Concept Per Year", we design and build turnkey architectural masterpieces in Urla and Acarkent that dialogue deeply with nature.'
          )}
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
        >
          <a
            href="#projects"
            className="px-8 py-3.5 rounded-full bg-[var(--accent-gold)] text-black font-semibold text-xs tracking-[0.2em] uppercase hover:opacity-90 transition-all duration-300 shadow-md flex items-center gap-2 group"
          >
            {t('PROJELERİ İNCELE', 'EXPLORE PROJECTS')}
            <ArrowDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
          </a>
          <Link
            href="/iletisim"
            className="px-8 py-3.5 rounded-full border border-[var(--border-color)] bg-[var(--card-bg)]/40 hover:border-[var(--accent-gold)] text-xs tracking-[0.2em] uppercase transition-all duration-300 backdrop-blur-sm flex items-center gap-2"
          >
            {t('ÖZEL GÖRÜŞME', 'PRIVATE CONSULTATION')}
            <ArrowUpRight size={14} />
          </Link>
        </motion.div>

        {/* Hero Visual Showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.4 }}
          className="w-full relative rounded-2xl overflow-hidden border border-[var(--border-color)] shadow-2xl aspect-[16/10] sm:aspect-[16/9] max-h-[640px] group bg-[#0e0e0e]"
        >
          {/* Main Visual with Smooth Crossfade */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView.src}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={currentView.src}
                alt="Ömerli Kasaba Evleri - Leo Mimarlık & Yapı"
                fill
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
                priority
              />
            </motion.div>
          </AnimatePresence>

          {/* Gradients for Luxury Legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/30 pointer-events-none" />

          {/* Top Bar: Perspective Switcher & Category Tag */}
          <div className="absolute top-3 left-3 right-3 sm:top-5 sm:left-6 sm:right-6 flex flex-wrap items-center justify-between gap-2.5 z-30">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-black/65 backdrop-blur-md border border-white/15 text-white shadow-lg">
              <Sparkles size={12} className="text-[#D2B07E]" />
              <span className="text-[9px] sm:text-xs font-mono tracking-widest uppercase">
                {t('İSTANBUL İMZA PROJESİ', 'ISTANBUL SIGNATURE RESIDENCE')}
              </span>
            </div>

            {/* Interactive Perspective Pills */}
            <div className="flex items-center gap-1 bg-black/75 backdrop-blur-md p-1 rounded-full border border-white/15 shadow-lg max-w-full overflow-x-auto scrollbar-none">
              {perspectives.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => setActivePerspective(idx)}
                  className={`px-2.5 sm:px-3 py-1 rounded-full text-[9px] sm:text-xs font-mono tracking-wider transition-all duration-300 whitespace-nowrap ${
                    activePerspective === idx
                      ? 'bg-[var(--accent-gold)] text-black font-semibold shadow-sm'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {t(p.label.tr, p.label.en)}
                </button>
              ))}
            </div>
          </div>

          {/* Floating Hero Project Metadata */}
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 md:bottom-10 md:left-10 md:right-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-4 md:gap-6 text-white z-30 pointer-events-auto">
            <div className="text-left max-w-xl">
              <span className="text-[10px] sm:text-xs font-mono tracking-widest text-[#D2B07E] uppercase block mb-1 sm:mb-1.5 flex items-center gap-2">
                <span className="w-2 h-[1px] bg-[#D2B07E]" />
                {t(currentView.tag.tr, currentView.tag.en)}
              </span>
              <h3 className="font-serif-luxury text-xl sm:text-3xl md:text-4xl font-medium tracking-wide leading-tight text-white drop-shadow-sm">
                Ömerli Kasaba Evleri
              </h3>
              <p className="text-[11px] sm:text-sm text-gray-200 mt-1 sm:mt-2 font-light leading-relaxed">
                {t(
                  '291 m² Yaşam Alanı • Masif Ahşap & Doğal Taş Dokulu Çağdaş Kır Evi Mimarisi',
                  '291 m² Living Space • Contemporary Country Architecture with Solid Wood & Natural Stone'
                )}
              </p>
            </div>

            <div className="flex items-center gap-3.5 sm:gap-6 font-mono text-[10px] sm:text-xs text-gray-200 bg-black/60 backdrop-blur-md px-3.5 py-2 sm:px-5 sm:py-3 rounded-xl border border-white/10 self-stretch sm:self-auto justify-between sm:justify-start">
              <div className="flex flex-col text-left">
                <span className="text-[9px] uppercase opacity-65 text-gray-400">{t('LOKASYON', 'LOCATION')}</span>
                <span className="text-white font-medium text-[11px] sm:text-sm">İstanbul, Ömerli</span>
              </div>
              <div className="h-5 sm:h-6 w-[1px] bg-white/20" />
              <div className="flex flex-col text-left">
                <span className="text-[9px] uppercase opacity-65 text-gray-400">{t('TESLİM', 'COMPLETED')}</span>
                <span className="text-white font-medium text-[11px] sm:text-sm">2012</span>
              </div>
              <div className="h-5 sm:h-6 w-[1px] bg-white/20" />
              <a
                href="#projects"
                className="inline-flex items-center gap-1 text-[var(--accent-gold)] hover:underline uppercase text-[10px] sm:text-[11px] tracking-wider font-semibold"
              >
                {t('DETAYLAR', 'VIEW')}
                <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

