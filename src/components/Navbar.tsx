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
    { label: t('PROJELER', 'PROJECTS'), href: '/projeler' },
    { label: t('HAKKIMIZDA', 'ABOUT'), href: '/hakkimizda' },
    { label: t('HİZMETLER', 'SERVICES'), href: '/hizmetler' },
    { label: t('İLETİŞİM', 'CONTACT'), href: '/iletisim' },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith('/#')) {
      const targetId = href.replace('/#', '');
      if (pathname === '/') {
        e.preventDefault();
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState(null, '', `#${targetId}`);
        }
      }
    }
  };

  // At the very top of homepage, navbar sits over the dark hero image
  const isOverHero = pathname === '/' && !scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3.5 md:py-4 ${
        isOverHero
          ? 'bg-black/40 backdrop-blur-sm border-b border-white/10 text-white'
          : theme === 'dark'
          ? 'bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#22252C] text-white shadow-lg shadow-black/40'
          : 'bg-[#F8F6F0]/95 backdrop-blur-md border-b border-[#E2DDD5] text-[#141414] shadow-sm'
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

        {/* Desktop Nav Links (High Contrast & Adaptive) */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-11">
          {navLinks.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : item.href.startsWith('/#')
                ? false
                : pathname === item.href;

            const linkColor = isOverHero || theme === 'dark'
              ? isActive
                ? 'text-[#D2B07E] font-semibold after:w-full after:bg-[#D2B07E]'
                : 'text-white/85 hover:text-[#D2B07E] after:w-0 after:bg-[#D2B07E]'
              : isActive
                ? 'text-[#9C7D54] font-semibold after:w-full after:bg-[#9C7D54]'
                : 'text-[#141414]/85 hover:text-[#9C7D54] after:w-0 after:bg-[#9C7D54]';

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`text-xs tracking-[0.22em] uppercase font-mono transition-all py-1.5 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] hover:after:w-full after:transition-all after:duration-300 ${linkColor}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Controls (Clean, Minimal, Adaptive) */}
        <div className="hidden md:flex items-center gap-3">
          {/* Dil Seçimi */}
          <button
            onClick={() => setLang(lang === 'tr' ? 'en' : 'tr')}
            className={`text-[11px] font-mono tracking-widest px-2.5 py-1 rounded border transition-colors cursor-pointer ${
              isOverHero || theme === 'dark'
                ? 'border-white/20 text-white/85 hover:text-[#D2B07E] hover:border-[#D2B07E]'
                : 'border-[#E2DDD5] text-[#141414]/85 hover:text-[#9C7D54] hover:border-[#9C7D54]'
            }`}
            title={lang === 'tr' ? 'Switch to English' : 'Türkçe\'ye geç'}
          >
            {lang === 'tr' ? 'EN' : 'TR'}
          </button>

          {/* Tema Seçimi */}
          <button
            onClick={toggleTheme}
            className={`p-1.5 rounded-full border transition-colors cursor-pointer ${
              isOverHero || theme === 'dark'
                ? 'border-white/20 text-white/85 hover:text-[#D2B07E] hover:border-[#D2B07E]'
                : 'border-[#E2DDD5] text-[#141414]/85 hover:text-[#9C7D54] hover:border-[#9C7D54]'
            }`}
            title={theme === 'dark' ? t('Açık Tema', 'Light Theme') : t('Koyu Tema', 'Dark Theme')}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>

        {/* Mobile Hamburger & Controls */}
        <div className="flex md:hidden items-center gap-2.5">
          <button
            onClick={() => setLang(lang === 'tr' ? 'en' : 'tr')}
            className={`text-xs font-mono px-2 py-1 border rounded ${
              isOverHero || theme === 'dark'
                ? 'border-white/20 text-white/85'
                : 'border-[#E2DDD5] text-[#141414]'
            }`}
          >
            {lang === 'tr' ? 'EN' : 'TR'}
          </button>
          <button
            onClick={toggleTheme}
            className={`p-1.5 ${
              isOverHero || theme === 'dark' ? 'text-white/85' : 'text-[#141414]'
            }`}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-1.5 ml-1 ${
              isOverHero || theme === 'dark' ? 'text-white' : 'text-[#141414]'
            }`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden border-b px-6 py-6 flex flex-col gap-4 animate-in slide-in-from-top-4 duration-300 ${
            theme === 'dark'
              ? 'bg-[#0e0e10] border-[#22252C] text-white'
              : 'bg-[#FAF8F5] border-[#E2DDD5] text-[#141414]'
          }`}
        >
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
                onClick={(e) => {
                  handleNavClick(e, item.href);
                  setMobileMenuOpen(false);
                }}
                className={`text-sm font-medium tracking-widest uppercase py-2 transition-colors ${
                  isActive
                    ? theme === 'dark'
                      ? 'text-[#D2B07E] font-bold pl-3 border-l-2 border-[#D2B07E]'
                      : 'text-[#9C7D54] font-bold pl-3 border-l-2 border-[#9C7D54]'
                    : theme === 'dark'
                    ? 'text-white/85 hover:text-[#D2B07E]'
                    : 'text-[#141414]/85 hover:text-[#9C7D54]'
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
