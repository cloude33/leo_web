'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Sun, Moon, Menu, X } from 'lucide-react';

interface NavbarProps {
  onFilterCategory?: (category: 'all' | 'urla' | 'acarkent') => void;
  activeCategory?: string;
}

export default function Navbar({ onFilterCategory, activeCategory = 'all' }: NavbarProps) {
  const { lang, setLang, theme, toggleTheme, t } = useApp();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t('ANA SAYFA', 'HOME'), href: '/' },
    { label: t('PROJELER', 'PROJECTS'), href: '/#projects' },
    { label: t('HAKKIMIZDA', 'ABOUT'), href: '/hakkimizda' },
    { label: t('HİZMETLER', 'SERVICES'), href: '/hizmetler' },
    { label: t('İLETİŞİM', 'CONTACT'), href: '/iletisim' },
  ];

  const isNavSolid = scrolled || (pathname && pathname !== '/');

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isNavSolid
          ? 'py-2.5 backdrop-blur-md shadow-sm border-b'
          : 'py-4 md:py-5 bg-transparent'
      }`}
      style={{
        backgroundColor: isNavSolid ? 'var(--nav-bg)' : 'transparent',
        borderColor: isNavSolid ? 'var(--border-color)' : 'transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-3.5 group mr-6 md:mr-10 lg:mr-14 flex-shrink-0">
          <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border-2 border-[var(--accent-gold)]/80 shadow-md transition-all duration-300 group-hover:scale-105 group-hover:border-[var(--accent-gold)] bg-[#0a0a0a] flex-shrink-0">
            <Image
              src="/logo_enhanced.avif"
              alt="LEO Mimarlık Logo"
              fill
              className="object-cover scale-100"
              priority
            />
          </div>
          <div className="flex flex-col items-center text-center justify-center">
            <span className="font-asteria tracking-[0.28em] text-xl md:text-2xl font-bold uppercase transition-colors group-hover:text-[var(--accent-gold)] leading-none mb-1 text-center pl-1">
              LEO
            </span>
            <span className="text-[10px] md:text-[11px] tracking-[0.24em] uppercase font-asteria font-bold text-[var(--text-primary)]/85 group-hover:text-[var(--text-primary)] transition-colors text-center whitespace-nowrap">
              {t('MİMARLIK & YAPI', 'ARCHITECTURE & DESIGN')}
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-9">
          {navLinks.map((item) => {
            const isActive = item.href === '/'
              ? pathname === '/'
              : item.href.startsWith('/#')
                ? false
                : pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-xs tracking-[0.2em] uppercase font-medium transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:bg-[var(--accent-gold)] hover:after:w-full after:transition-all after:duration-300 ${
                  isActive
                    ? 'text-[var(--accent-gold)] font-semibold after:w-full'
                    : 'text-[var(--text-primary)] hover:text-[var(--accent-gold)] after:w-0'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Quick Category Jump & Controls */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Urla / Acarkent direct switcher */}
          {onFilterCategory && (
            <div className="flex items-center bg-[var(--border-color)]/30 rounded-full p-1 text-[11px] font-mono tracking-wider">
              <button
                onClick={() => onFilterCategory('all')}
                className={`px-3 py-1 rounded-full transition-all ${
                  activeCategory === 'all'
                    ? 'bg-[var(--accent-gold)] text-black font-semibold'
                    : 'opacity-70 hover:opacity-100'
                }`}
              >
                {t('TÜMÜ', 'ALL')}
              </button>
              <button
                onClick={() => onFilterCategory('urla')}
                className={`px-3 py-1 rounded-full transition-all ${
                  activeCategory === 'urla'
                    ? 'bg-[var(--accent-gold)] text-black font-semibold'
                    : 'opacity-70 hover:opacity-100'
                }`}
              >
                URLA
              </button>
              <button
                onClick={() => onFilterCategory('acarkent')}
                className={`px-3 py-1 rounded-full transition-all ${
                  activeCategory === 'acarkent'
                    ? 'bg-[var(--accent-gold)] text-black font-semibold'
                    : 'opacity-70 hover:opacity-100'
                }`}
              >
                ACARKENT
              </button>
            </div>
          )}

          {/* Dil Seçimi */}
          <button
            onClick={() => setLang(lang === 'tr' ? 'en' : 'tr')}
            className="text-xs font-mono tracking-wider px-2.5 py-1 rounded border border-[var(--border-color)] hover:border-[var(--accent-gold)] transition-colors"
            title={lang === 'tr' ? 'Switch to English' : 'Türkçe\'ye geç'}
          >
            {lang === 'tr' ? 'EN' : 'TR'}
          </button>

          {/* Tema Seçimi */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-[var(--border-color)] hover:border-[var(--accent-gold)] transition-colors text-[var(--accent-gold)]"
            title={theme === 'dark' ? t('Açık Tema', 'Light Theme') : t('Koyu Tema', 'Dark Theme')}
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => setLang(lang === 'tr' ? 'en' : 'tr')}
            className="text-xs font-mono px-2 py-1 border border-[var(--border-color)] rounded"
          >
            {lang === 'tr' ? 'EN' : 'TR'}
          </button>
          <button
            onClick={toggleTheme}
            className="p-1.5 text-[var(--accent-gold)]"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 opacity-90"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="md:hidden border-b px-6 py-6 flex flex-col gap-5 animate-in slide-in-from-top-4 duration-300"
          style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
        >
          {navLinks.map((item) => {
            const isActive = item.href === '/'
              ? pathname === '/'
              : item.href.startsWith('/#')
                ? false
                : pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-medium tracking-widest uppercase py-1.5 transition-colors ${
                  isActive
                    ? 'text-[var(--accent-gold)] font-bold pl-2 border-l-2 border-[var(--accent-gold)]'
                    : 'hover:text-[var(--accent-gold)]'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          {onFilterCategory && (
            <div className="flex items-center gap-2 pt-2 border-t border-[var(--border-color)]">
              <span className="text-xs opacity-60 font-mono">{t('FİLTRE:', 'FILTER:')}</span>
              <button
                onClick={() => { onFilterCategory('urla'); setMobileMenuOpen(false); }}
                className="text-xs px-3 py-1 rounded bg-[var(--border-color)]/40 font-mono"
              >
                URLA
              </button>
              <button
                onClick={() => { onFilterCategory('acarkent'); setMobileMenuOpen(false); }}
                className="text-xs px-3 py-1 rounded bg-[var(--border-color)]/40 font-mono"
              >
                ACARKENT
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

