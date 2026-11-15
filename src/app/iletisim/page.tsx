'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { useApp } from '@/context/AppContext';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function IletisimPage() {
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
            <span className="text-[var(--accent-gold)]">{t('İLETİŞİM', 'CONTACT')}</span>
          </div>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--accent-gold)]/40 bg-[var(--card-bg)]/80 text-[11px] font-mono tracking-[0.25em] text-[var(--accent-gold)] uppercase mb-6">
              <MapPin size={13} />
              <span>{t("URLA & ACARKENT OFİSLERİMİZ", "URLA & ACARKENT STUDIOS")}</span>
            </div>

            <h1 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl tracking-tight leading-[1.1] mb-6">
              {t(
                'Bir Sonraki Yaşam Alanınızı Konuşalım.',
                'Let Us Discuss Your Next Living Sanctuary.'
              )}
            </h1>

            <p className="text-base sm:text-xl text-[var(--text-muted)] leading-relaxed max-w-2xl font-light">
              {t(
                "Urla tasarım stüdyomuz veya Acarkent temsilciliğimizde özel bir kahve eşliğinde projenizin mimari vizyonunu planlayabiliriz.",
                'Schedule a private appointment over coffee at our Urla design atelier or Acarkent boutique office to shape your architectural vision.'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Main Contact & Inquiry Form */}
      <Contact />

      <Footer />
    </main>
  );
}
