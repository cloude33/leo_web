'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Services from '@/components/Services';
import Footer from '@/components/Footer';
import { useApp } from '@/context/AppContext';
import { ArrowRight, Compass, ShieldCheck, Hammer, Sparkles } from 'lucide-react';

export default function HizmetlerPage() {
  const { t } = useApp();

  const processSteps = [
    {
      step: '01',
      title: t('Arsa Analizi & Konsept Tasarım', 'Site Analysis & Conceptual Design'),
      desc: t('Işık, rüzgar ve topoğrafyanın okunmasıyla mekana özgü avan mimari kurgunun oluşturulması.', 'Reading topography, solar path, and winds to establish bespoke schematic architecture.')
    },
    {
      step: '02',
      title: t('Ruhsat & Mühendislik Projeleri', 'Permitting & Engineering Coordination'),
      desc: t('Statik, mekanik ve peyzaj paftalarının sıfır tolerans hedefiyle belediye onayına sunulması.', 'Coordinating structural, mechanical, and MEP blueprints for seamless municipal approval.')
    },
    {
      step: '03',
      title: t('Şantiye İcrası & Zanaatkar İşçiliği', 'Site Execution & Master Masonry'),
      desc: t('Urla yerel taş ustaları, mermer ve masif ahşap zanaatkarları ile bizzat şantiye denetimi.', 'On-site execution by master stone masons, fine joiners, and bespoke metalworkers.')
    },
    {
      step: '04',
      title: t('Anahtar Teslim & Yaşama Başlama', 'Turnkey Handover & Commissioning'),
      desc: t('Akıllı ev otomasyonu, ince temizlik ve kusursuz peyzaj ile yaşamaya hazır teslim.', 'Smart home automation, fine detailing, and lush landscaping ready for immediate occupancy.')
    }
  ];

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
            <span className="text-[var(--accent-gold)]">{t('HİZMETLER', 'SERVICES')}</span>
          </div>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[var(--accent-gold)]/40 bg-[var(--card-bg)]/80 text-[11px] font-mono tracking-[0.25em] text-[var(--accent-gold)] uppercase mb-6">
              <Sparkles size={13} />
              <span>{t("BUTİK MİMARLIK & İNŞAAT DİSİPLİNLERİ", "BESPOKE ARCHITECTURE & BUILD DISCIPLINES")}</span>
            </div>

            <h1 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl tracking-tight leading-[1.1] mb-6">
              {t(
                'Hayalden Gerçeğe, Tek Elden Kusursuz İcra.',
                'From Vision to Reality: Flawless Single-Source Execution.'
              )}
            </h1>

            <p className="text-base sm:text-xl text-[var(--text-muted)] leading-relaxed max-w-2xl font-light">
              {t(
                'Konsept tasarımdan anahtar teslim inşaata, tarihi taş restorasyonundan iç mimariye kadar her aşamayı kendi şantiye şeflerimiz ve ustalarımızla yürütüyoruz.',
                'From initial sketches to turnkey construction, heritage stone restoration to interior millwork, every detail is managed in-house.'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid Component */}
      <Services />

      {/* Workflow Process Strip */}
      <section className="py-24 border-t" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono tracking-[0.25em] text-[var(--accent-gold)] uppercase mb-3 block">
              {t('YÖNTEMİMİZ & SÜREÇ', 'OUR METHODOLOGY')}
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl">
              {t('Adım Adım Başyapıt Kurgusu', 'Crafting a Masterpiece Step by Step')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl border relative flex flex-col justify-between"
                style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-page)' }}
              >
                <div>
                  <span className="font-mono text-3xl font-bold text-[var(--accent-gold)]/40 block mb-4">
                    {item.step}
                  </span>
                  <h4 className="font-serif-luxury text-lg font-medium mb-3">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Box */}
          <div className="mt-16 p-8 md:p-12 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-6"
            style={{ borderColor: 'var(--accent-gold)', backgroundColor: 'var(--card-bg)' }}
          >
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent-gold)] block mb-1">
                {t('ÖZEL DANIŞMANLIK', 'PRIVATE CONSULTATION')}
              </span>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl">
                {t('Projenizi Masaya Yatırmaya Hazır mısınız?', 'Ready to Discuss Your Architectural Project?')}
              </h3>
            </div>
            <Link
              href="/iletisim"
              className="px-8 py-4 rounded-full bg-[var(--accent-gold)] text-black font-mono text-xs tracking-wider uppercase font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 flex-shrink-0 shadow-md"
            >
              <span>{t('RANDEVU TALEP EDİN', 'REQUEST CONSULTATION')}</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
