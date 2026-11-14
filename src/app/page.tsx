'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import About from '@/components/About';
import Services from '@/components/Services';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  const [filterCategory, setFilterCategory] = useState<'all' | 'urla' | 'acarkent'>('all');

  return (
    <main className="min-h-screen selection:bg-[var(--accent-gold)] selection:text-black">
      {/* Editorial Navigation */}
      <Navbar
        onFilterCategory={(cat) => setFilterCategory(cat)}
        activeCategory={filterCategory}
      />

      {/* Cinematic Hero */}
      <Hero />

      {/* Chronological Projects Archive (Client drawing layout) */}
      <Projects
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
      />

      {/* Philosophy & Craftsmanship */}
      <About />

      {/* Architectural Capabilities & Scope */}
      <Services />

      {/* Private Consultation & Direct VIP WhatsApp */}
      <Contact />

      {/* Refined Footer */}
      <Footer />
    </main>
  );
}
