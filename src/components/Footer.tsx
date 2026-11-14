'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { ArrowUp, Phone, Mail } from 'lucide-react';

const InstagramIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const YoutubeIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
    <polygon points="10 15 15 12 10 9 10 15" fill="currentColor"/>
  </svg>
);

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
                <span className="font-aviano text-2xl font-bold tracking-[0.28em] uppercase block leading-none mb-1 pl-1 text-[var(--text-primary)]">
                  LEO
                </span>
                <span className="text-[10px] sm:text-[10.5px] font-aviano tracking-[0.24em] font-bold uppercase block text-[var(--text-primary)]/85 whitespace-nowrap">
                  MİMARLIK & YAPI
                </span>
              </div>
            </div>

            <p className="text-xs text-[var(--text-muted)] leading-relaxed max-w-sm mt-2">
              {t(
                "2004'ten beri Urla'nın taş dokusunu ve Ege'nin dinginliğini zamansız modernizm ile buluşturan butik mimarlık ve anahtar teslim yapı stüdyosu.",
                'A boutique architectural design and turnkey construction studio synthesizing Urla stone masonry and Aegean calm with enduring modernism since 2004.'
              )}
            </p>
          </div>

          <div className="lg:col-span-3 flex flex-col gap-3 font-mono text-xs">
            <span className="text-[var(--accent-gold)] font-semibold tracking-widest uppercase mb-1">
              {t('KURUMSAL & PORTFOLYO', 'STUDIO & PORTFOLIO')}
            </span>
            <Link href="/#projects" className="text-[var(--text-muted)] hover:text-[var(--accent-gold)] transition-colors">
              {t('Mimari Projeler Arşivi', 'Architectural Projects')}
            </Link>
            <Link href="/hakkimizda" className="text-[var(--text-muted)] hover:text-[var(--accent-gold)] transition-colors">
              {t('Hakkımızda & Felsefemiz', 'About & Philosophy')}
            </Link>
            <Link href="/hizmetler" className="text-[var(--text-muted)] hover:text-[var(--accent-gold)] transition-colors">
              {t('Hizmetlerimiz & Kapsam', 'Services & Scope')}
            </Link>
            <Link href="/iletisim" className="text-[var(--text-muted)] hover:text-[var(--accent-gold)] transition-colors">
              {t('İletişim & Ofisler', 'Contact & Studios')}
            </Link>
            <Link href="/#projects" className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors pt-1">
              Urla Gaia Çiftlik Evleri (2024)
            </Link>
            <Link href="/#projects" className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
              Acarkent AcarVerde Penthouse (2026)
            </Link>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3 font-mono text-xs">
            <span className="text-[var(--accent-gold)] font-semibold tracking-widest uppercase mb-1">
              {t('OFİSLER & İLETİŞİM', 'OFFICES & CONTACT')}
            </span>
            <p className="text-[var(--text-muted)] leading-relaxed">
              <strong className="text-[var(--text-primary)]">Urla, İzmir:</strong> Yelaltı mh. Nur Dikmen CD. No16/1A, Kat 1, Urla / İzmir
            </p>
            <p className="text-[var(--text-muted)] leading-relaxed">
              <strong className="text-[var(--text-primary)]">Acarkent, İstanbul:</strong> Acarlar mah. Acarkent Sit. 3. Cad. Çıra sokak, Beykoz / İstanbul
            </p>
            <div className="pt-1 flex flex-col gap-1 text-[var(--text-muted)]">
              <div>
                <strong className="text-[var(--text-primary)]">Tel:</strong>{' '}
                <a href="tel:+905326005555" className="hover:text-[var(--accent-gold)] transition-colors">0532 600 5555</a>
                {' / '}
                <a href="tel:+905414791555" className="hover:text-[var(--accent-gold)] transition-colors">0541 479 1555</a>
              </div>
              <div>
                <strong className="text-[var(--text-primary)]">E-Posta:</strong>{' '}
                <a href="mailto:ersina@leoyapi.com" className="hover:text-[var(--accent-gold)] transition-colors">ersina@leoyapi.com</a>
                {', '}
                <a href="mailto:can@leoyapi.com" className="hover:text-[var(--accent-gold)] transition-colors">can@leoyapi.com</a>
              </div>
            </div>
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
            <a
              href="https://instagram.com/leoyapi_mimarlik"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-[var(--accent-gold)] transition-colors"
            >
              <InstagramIcon className="w-3.5 h-3.5" />
              <span>@leoyapi_mimarlik</span>
            </a>
            <a
              href="https://youtube.com/@leomimarlikyapi?si=LWk9eWyRWRRl4afu"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-[var(--accent-gold)] transition-colors"
            >
              <YoutubeIcon className="w-3.5 h-3.5" />
              <span>YouTube</span>
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
