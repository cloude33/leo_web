'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Sun, Moon, Menu, X } from 'lucide-react';

export default function Navbar() {
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
    { label: t('İLETİŞİM', 'CONTACT'), href: '/iletisim' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3.5 md:py-4 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#22252C] ${
        scrolled ? 'shadow-lg shadow-black/40' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center group flex-shrink-0">
          <div className="relative h-11 sm:h-12 md:h-13 w-auto flex items-center">
            <Image
              src="/logo.avif"
              alt="LEO Mimarlık & Yapı"
              width={200}
              height={66}
              className="h-10 sm:h-11 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              priority
            />
          </div>
        </Link>

        {/* Desktop Nav Links (High Contrast, Crisp & Legible) */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-11">
          {navLinks.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : item.href.startsWith('/#')
                ? false
                : pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-xs tracking-[0.22em] uppercase font-mono transition-all py-1.5 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-[#D2B07E] hover:after:w-full after:transition-all after:duration-300 ${
                  isActive
                    ? 'text-[#D2B07E] font-semibold after:w-full'
                    : 'text-white/85 hover:text-[#D2B07E] after:w-0'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Controls (Clean & Minimal) */}
        <div className="hidden md:flex items-center gap-3">
          {/* Dil Seçimi */}
          <button
            onClick={() => setLang(lang === 'tr' ? 'en' : 'tr')}
            className="text-[11px] font-mono tracking-widest px-2.5 py-1 rounded border border-white/20 text-white/80 hover:text-[#D2B07E] hover:border-[#D2B07E] transition-colors cursor-pointer"
            title={lang === 'tr' ? 'Switch to English' : 'Türkçe\'ye geç'}
          >
            {lang === 'tr' ? 'EN' : 'TR'}
          </button>

          {/* Tema Seçimi */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-full border border-white/20 text-white/80 hover:text-[#D2B07E] hover:border-[#D2B07E] transition-colors cursor-pointer"
            title={theme === 'dark' ? t('Açık Tema', 'Light Theme') : t('Koyu Tema', 'Dark Theme')}
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>

        {/* Mobile Hamburger & Controls */}
        <div className="flex md:hidden items-center gap-2.5">
          <button
            onClick={() => setLang(lang === 'tr' ? 'en' : 'tr')}
            className="text-xs font-mono px-2 py-1 border border-white/20 text-white/80 rounded"
          >
            {lang === 'tr' ? 'EN' : 'TR'}
          </button>
          <button
            onClick={toggleTheme}
            className="p-1.5 text-white/80 hover:text-[#D2B07E]"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-white ml-1"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b px-6 py-6 flex flex-col gap-4 animate-in slide-in-from-top-4 duration-300 bg-[#0e0e10] border-[#22252C]">
          {navLinks.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : item.href.startsWith('/#')
                ? false
                : pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-medium tracking-widest uppercase py-2 transition-colors ${
                  isActive
                    ? 'text-[#D2B07E] font-bold pl-3 border-l-2 border-[#D2B07E]'
                    : 'text-white/85 hover:text-[#D2B07E]'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
