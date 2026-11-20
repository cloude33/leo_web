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
      <Image
        src="/projects/gaia-vadi-4/img_3.avif"
        alt={t('Urla Gaia Vadi projesinden taş cephe ve yaşam alanı', 'Stone facade and living space at the Urla Gaia Vadi project')}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-black/5" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/20" />

      <div className="relative z-10 mx-auto flex min-h-[max(680px,100svh)] max-w-7xl flex-col justify-end px-6 pb-12 pt-36 sm:px-10 md:min-h-[min(900px,100svh)] md:pb-16 lg:px-12">
        <div className="max-w-4xl hero-enter">
          <p className="mb-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em] text-white/80">
            <span className="h-px w-8 bg-[#D2B07E]" />
            {t('Urla ve İstanbul’da mimarlık & yapı', 'Architecture & construction in Urla and Istanbul')}
          </p>

          <h1 className="max-w-4xl font-serif-luxury text-5xl font-medium leading-[0.98] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.5rem]">
            {t('Projenizi çiziyor, yapınızı inşa ediyoruz.', 'We design your project and build what we draw.')}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
            {t(
              'Projelendirme, inşaat ve uygulama tek ekipte. Ruhsat çiziminden son dokunuşa kadar her aşamayı birlikte yürütüyoruz.',
              'Design, construction and fit-out, together under one roof. We guide each stage from permit drawings to the final detail.'
            )}
          </p>

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

        <div className="mt-14 flex items-center justify-between border-t border-white/25 pt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-white/70">
          <span>{t('Projelendirme · İnşaat · Uygulama', 'Design · Construction · Fit-out')}</span>
          <span className="hidden sm:inline">{t('Urla, İzmir  /  Acarkent, İstanbul', 'Urla, Izmir  /  Acarkent, Istanbul')}</span>
        </div>
      </div>
    </section>
  );
}
