'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Projects from '@/components/Projects';
import Footer from '@/components/Footer';

export default function Home() {
  const [filterCategory, setFilterCategory] = useState<'all' | 'urla' | 'acarkent'>('all');

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    }
  }, []);

  return (
    <main className="min-h-screen selection:bg-[var(--accent-gold)] selection:text-black">
      {/* Editorial Navigation */}
      <Navbar />

      {/* Cinematic Hero Showcase */}
      <Hero />

      <Projects
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
      />

      {/* Refined Footer */}
      <Footer />
    </main>
  );
}
