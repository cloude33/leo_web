'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Services from '@/components/Services';
import Footer from '@/components/Footer';
import { useApp } from '@/context/AppContext';
import { ArrowRight } from 'lucide-react';

export default function HizmetlerPage() {
  const { t } = useApp();

  return (
    <main className="min-h-screen selection:bg-[var(--accent-gold)] selection:text-black">
      <Navbar />

      {/* Editorial Page Header */}
      <section className="pt-36 pb-16 md:pt-44 md:pb-20 relative overflow-hidden architectural-grid border-b"
        style={{ borderColor: 'var(--border-color)' }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-mono mb-6 text-[var(--text-muted)]">
            <Link href="/" className="hover:text-[var(--accent-gold)] transition-colors">
              {t('ANA SAYFA', 'HOME')}
            </Link>
            <span>/</span>
            <span className="text-[var(--accent-gold)]">{t('HİZMETLER', 'SERVICES')}</span>
          </div>

          <div className="max-w-4xl">
            <p className="text-[11px] font-mono tracking-[0.28em] text-[var(--accent-gold)] uppercase mb-6">
              {t('Hizmetler', 'Services')}
            </p>

            <h1 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl tracking-tight leading-[1.05] mb-6">
              {t(
                'Projelendirme, inşaat ve uygulama.',
                'Design, construction and execution.'
              )}
            </h1>

            <p className="text-base sm:text-xl text-[var(--text-muted)] leading-relaxed max-w-2xl">
              {t(
                'Ruhsat projesinden cephe ve iç mimariye, şantiye süperpozesinden ince imalata kadar üç iş aynı ofiste yürür.',
                'Permit drawings, facade and interiors, the site overlay and the fine works: three trades, one office.'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid Component */}
      <Services showIntro={false} />

      <Footer />
    </main>
  );
}
