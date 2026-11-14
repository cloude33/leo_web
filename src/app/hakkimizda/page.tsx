'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import About from '@/components/About';
import Footer from '@/components/Footer';
import { useApp } from '@/context/AppContext';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function HakkimizdaPage() {
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
            <span className="text-[var(--accent-gold)]">{t('HAKKIMIZDA', 'ABOUT')}</span>
          </div>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[var(--accent-gold)]/40 bg-[var(--card-bg)]/80 text-[11px] font-mono tracking-[0.25em] text-[var(--accent-gold)] uppercase mb-6">
              <Sparkles size={13} />
              <span>{t("2004'TEN BERİ MİMARİ MİRAS", "ARCHITECTURAL LEGACY SINCE 2004")}</span>
            </div>

            <h1 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl tracking-tight leading-[1.1] mb-6">
              {t(
                'Taşın Zamansızlığı, Çağdaş Lüksün Dinginliği.',
                'The Timelessness of Stone, The Serenity of Modern Luxury.'
              )}
            </h1>

            <p className="text-base sm:text-xl text-[var(--text-muted)] leading-relaxed max-w-2xl font-light">
              {t(
                "2004 yılında İstanbul ve Urla'da başlayan yolculuğumuz, seri üretime karşı duran ve yılda yalnızca bir başyapıt üreten butik bir mimari disipline dönüştü.",
                'Originating in 2004 between Istanbul and Urla, our journey evolved into a boutique architectural atelier defying mass production to craft singular annual masterpieces.'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Main Philosophy, Values & Milestones */}
      <About />

      {/* Next Step Exploration CTA */}
      <section className="py-20 border-t" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="text-xs font-mono tracking-widest text-[var(--accent-gold)] uppercase block mb-2">
              {t('PORTFOLYO KEŞFİ', 'PORTFOLIO DISCOVERY')}
            </span>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl">
              {t('Tamamlanan Mimari Başyapıtlarımızı İnceleyin', 'Explore Our Completed Architectural Masterpieces')}
            </h3>
          </div>
          <div className="flex items-center gap-4 flex-shrink-0">
            <Link
              href="/#projects"
              className="px-6 py-3.5 rounded-full bg-[var(--accent-gold)] text-black font-mono text-xs tracking-wider uppercase font-semibold hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <span>{t('PROJELERİ GÖRÜNTÜLE', 'VIEW PROJECTS')}</span>
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/iletisim"
              className="px-6 py-3.5 rounded-full border border-[var(--border-color)] hover:border-[var(--accent-gold)] text-[var(--text-primary)] font-mono text-xs tracking-wider uppercase transition-colors"
            >
              {t('İLETİŞİME GEÇ', 'GET IN TOUCH')}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
