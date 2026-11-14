'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { ArrowUp, Globe } from 'lucide-react';

export default function Footer() {
  const { t } = useApp();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t pt-16 pb-12 relative overflow-hidden"
      style={{
        backgroundColor: 'var(--card-bg)',
        borderColor: 'var(--border-color)'
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-12">
        {/* Top Tier: Brand, Philosophy, Quick Nav */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-3.5">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[var(--accent-gold)]/80 bg-[#0a0a0a] shadow-sm flex-shrink-0">
                <Image
                  src="/logo_enhanced.avif"
                  alt="Leo Logo"
                  fill
                  className="object-cover scale-100"
                />
              </div>
              <div className="flex flex-col items-center text-center justify-center">
                <span className="font-serif-luxury text-2xl font-bold tracking-[0.28em] uppercase block leading-none mb-1 pl-1 text-[var(--text-primary)]">
                  LEO
                </span>
                <span className="text-[10px] sm:text-[10.5px] font-mono tracking-[0.24em] font-semibold uppercase block text-[var(--text-primary)]/85 whitespace-nowrap">
                  MİMARLIK & YAPI
                </span>
              </div>
            </div>

            <p className="text-xs text-[var(--text-muted)] leading-relaxed max-w-sm mt-2">
              {t(
                "2006'dan beri Urla'nın taş dokusunu ve Ege'nin dinginliğini zamansız modernizm ile buluşturan butik mimarlık ve anahtar teslim yapı stüdyosu.",
                'A boutique architectural design and turnkey construction studio synthesizing Urla stone masonry and Aegean calm with enduring modernism since 2006.'
              )}
            </p>
          </div>

          <div className="lg:col-span-3 flex flex-col gap-3 font-mono text-xs">
            <span className="text-[var(--accent-gold)] font-semibold tracking-widest uppercase mb-1">
              {t('MİMARİ KOLEKSİYONLAR', 'ARCHITECTURAL PORTFOLIO')}
            </span>
            <Link href="#projects" className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
              Urla Gaia Çiftlik Evleri (2024)
            </Link>
            <Link href="#projects" className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
              Acarkent AcarVerde Penthouse (2026)
            </Link>
            <Link href="#projects" className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
              Urla Kuşçular 12 Taş Ev (2016)
            </Link>
            <Link href="#projects" className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
              Batum Swiss Otel Azure (2026)
            </Link>
            <Link href="#projects" className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
              Acarkent C 297 Malikane (2012)
            </Link>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3 font-mono text-xs">
            <span className="text-[var(--accent-gold)] font-semibold tracking-widest uppercase mb-1">
              {t('OFİSLER & TEMSİLCİLİK', 'OFFICES & ATELIER')}
            </span>
            <p className="text-[var(--text-muted)]">
              <strong className="text-[var(--text-primary)]">Urla:</strong> Kuşçular / Özbek Mevkii, Urla — İzmir
            </p>
            <p className="text-[var(--text-muted)]">
              <strong className="text-[var(--text-primary)]">İstanbul:</strong> Acarkent Mah. Beykoz — İstanbul
            </p>
            <p className="text-[var(--text-muted)]">
              <strong className="text-[var(--text-primary)]">E-Posta:</strong> info@leoyapi.com
            </p>
          </div>
        </div>

        {/* Bottom Tier: Copyright, Socials & Back to Top */}
        <div className="pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[var(--text-muted)]"
          style={{ borderColor: 'var(--border-color)' }}
        >
          <div>
            © 2026 LEO MİMARLIK & YAPI. {t('Tüm hakları saklıdır.', 'All rights reserved.')}
          </div>

          <div className="flex items-center gap-6">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent-gold)] transition-colors">
              Instagram
            </a>
            <a href="https://behance.net" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent-gold)] transition-colors">
              Behance
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent-gold)] transition-colors">
              LinkedIn
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-[var(--accent-gold)] transition-colors"
          >
            <span>{t('YUKARI DÖN', 'BACK TO TOP')}</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
