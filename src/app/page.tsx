'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Footer from '@/components/Footer';

export default function Home() {
  const [filterCategory, setFilterCategory] = useState<'all' | 'urla' | 'acarkent'>('all');

  return (
    <main className="min-h-screen selection:bg-[var(--accent-gold)] selection:text-black">
      {/* Editorial Navigation */}
      <Navbar />

      {/* Cinematic Hero Showcase */}
      <Hero />

      {/* Chronological Projects Archive */}
      <Projects
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
      />

      {/* Refined Footer */}
      <Footer />
    </main>
  );
}
