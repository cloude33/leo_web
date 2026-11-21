'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Projects from '@/components/Projects';
import Footer from '@/components/Footer';

export default function ProjelerPage() {
  const [filterCategory, setFilterCategory] = useState<'all' | 'urla' | 'acarkent'>('all');

  return (
    <main className="min-h-screen selection:bg-[var(--accent-gold)] selection:text-black">
      <Navbar />
      <div className="pt-20">
        <Projects filterCategory={filterCategory} setFilterCategory={setFilterCategory} />
      </div>
      <Footer />
    </main>
  );
}
