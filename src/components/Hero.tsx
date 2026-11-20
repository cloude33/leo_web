'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { ArrowDownRight, ArrowRight } from 'lucide-react';

export default function Hero() {
  const { t } = useApp();

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[max(680px,100svh)] overflow-hidden bg-[#171815] text-white md:min-h-[min(900px,100svh)]"
    >
      {/* Desktop & Tablet Hero Image (Landscape) */}
      <div className="hidden sm:block absolute inset-0">
        <Image
          src="/projects/gaia-vadi-4/img_8.avif"
          alt={t('Urla Gaia Çiftlik Evleri 4 mimari taş cephe ve havuz yaşam alanı', 'Stone facade and poolside living space at Urla Gaia Farm Estates 4')}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Mobile Optimized Hero Image (Portrait 9:16 - Villa & Pool Fully Visible) */}
      <div className="block sm:hidden absolute inset-0">
        <Image
          src="/projects/gaia-vadi-4/hero_mobile.avif"
          alt={t('Urla Gaia Çiftlik Evleri 4 mimari taş cephe ve havuz yaşam alanı', 'Stone facade and poolside living space at Urla Gaia Farm Estates 4')}
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />
      </div>
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/10 sm:from-black/75 sm:via-black/35 sm:to-black/5" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/30 sm:from-black/65 sm:via-transparent sm:to-black/20" />

      <div className="relative z-10 mx-auto flex min-h-[max(640px,100svh)] max-w-7xl flex-col justify-end px-5 pb-10 pt-28 sm:px-10 sm:pb-12 sm:pt-36 md:min-h-[min(900px,100svh)] md:pb-16 lg:px-12">
        <div className="max-w-4xl hero-enter">
          <p className="mb-4 sm:mb-5 flex items-center gap-2.5 sm:gap-3 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] sm:tracking-[0.24em] text-white/80">
            <span className="h-px w-6 sm:w-8 bg-[#D2B07E]" />
            {t('Urla ve İstanbul’da mimarlık & yapı', 'Architecture & construction in Urla and Istanbul')}
          </p>

          <h1 className="max-w-4xl font-serif-luxury text-3xl sm:text-5xl md:text-6xl lg:text-[5.5rem] font-medium leading-[1.08] sm:leading-[0.98] tracking-tight">
            {t('Projenizi çiziyor, yapınızı inşa ediyoruz.', 'We design your project and build what we draw.')}
          </h1>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={scrollToProjects}
              className="group inline-flex min-h-12 items-center justify-center gap-3 bg-[#D2B07E] px-6 font-mono text-xs uppercase tracking-[0.16em] text-[#171815] transition-colors hover:bg-white active:scale-[0.98]"
            >
              {t('Projeleri incele', 'Explore projects')}
              <ArrowDownRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </button>
            <Link
              href="/iletisim"
              className="group inline-flex min-h-12 items-center justify-center gap-3 border border-white/55 px-6 font-mono text-xs uppercase tracking-[0.16em] text-white transition-colors hover:border-white hover:bg-white/10 active:scale-[0.98]"
            >
              {t('Projenizi konuşalım', 'Talk about your project')}
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <div className="mt-8 sm:mt-14 flex flex-col sm:flex-row sm:items-center justify-between border-t border-white/20 pt-3 sm:pt-4 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.16em] sm:tracking-[0.18em] text-white/70 gap-1.5 sm:gap-0">
          <span>{t('Projelendirme · İnşaat · Uygulama', 'Design · Construction · Fit-out')}</span>
          <span className="text-white/60 sm:text-white/70">{t('Urla, İzmir  /  Acarkent, İstanbul', 'Urla, Izmir  /  Acarkent, Istanbul')}</span>
        </div>
      </div>
    </section>
  );
}
