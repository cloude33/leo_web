'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Compass, PenTool, Home, Sparkles, Building2, Eye } from 'lucide-react';

export default function Services() {
  const { t } = useApp();

  const services = [
    {
      icon: <Compass size={28} className="text-[var(--accent-gold)]" />,
      num: '01',
      title: t('Mimari Tasarım & Konsept', 'Architectural Design & Concept'),
      desc: t(
        'Arazinin ışığı, rüzgarı ve manzarasına göre şekillenen özgün mimari avan projeler, belediye ruhsat süreçleri ve şematik planlar.',
        'Site-specific conceptual architecture, environmental sun/wind orientation, municipal permitting, and schematic planning.'
      )
    },
    {
      icon: <PenTool size={28} className="text-[var(--accent-gold)]" />,
      num: '02',
      title: t('İç Mimari & Özel Mobilya', 'Interior Architecture & Bespoke Millwork'),
      desc: t(
        'Mekanların ruhuna uygun malzeme seçimleri, mermer, ahşap ve pirinç detaylar, mekana özel üretilen sabit ve hareketli mobilyalar.',
        'Curated material palettes, custom marble detailing, architectural joinery, and tailored loose furniture design.'
      )
    },
    {
      icon: <Home size={28} className="text-[var(--accent-gold)]" />,
      num: '03',
      title: t('Uygulama Projeleri & Detay Çözümleri', 'Construction Documents & Detail Engineering'),
      desc: t(
        'Statik, mekanik ve elektrik mühendisliği ile entegre, şantiyede sıfır hata hedefleyen 1/20, 1/5 ve 1/1 imalat detay paftaları.',
        'Integrated working drawings, structural/MEP coordination, and 1:1 fabrication mockups ensuring zero tolerance on site.'
      )
    },
    {
      icon: <Eye size={28} className="text-[var(--accent-gold)]" />,
      num: '04',
      title: t('3D Görselleştirme & Sinematik Render', '3D Photorealistic Visualization'),
      desc: t(
        'Projenin tamamlanmış halini gün ışığı simülasyonları, 4K renderlar ve sinematik animasyonlar ile henüz temel atılmadan deneyimleme.',
        'Photorealistic daylight simulations, 4K material studies, and cinematic walkthroughs before ground is broken.'
      )
    },
    {
      icon: <Building2 size={28} className="text-[var(--accent-gold)]" />,
      num: '05',
      title: t('Anahtar Teslim İnşaat & Taahhüt', 'Turnkey Construction & Execution'),
      desc: t(
        'Kaba yapıdan ince işçiliğe, peyzajdan akıllı ev otomasyonuna dek tüm şantiye yönetimini tek elden yürüten taahhüt hizmeti.',
        'Complete general contracting from excavation and fine artisan masonry to landscaping and home automation.'
      )
    },
    {
      icon: <Sparkles size={28} className="text-[var(--accent-gold)]" />,
      num: '06',
      title: t('Urla Taş Ev Restorasyon & Eko-Çiftlik', 'Urla Stone Restoration & Eco-Estates'),
      desc: t(
        'Tarihi Urla taş dokularının korunarak çağdaş villa konforuyla donatılması ve çok dönümlük arazilerde tarımsal çiftlik kurgusu.',
        'Heritage stone masonry restoration combined with modern comfort, alongside multi-acre agricultural estate masterplanning.'
      )
    }
  ];

  return (
    <section id="services" className="py-24 md:py-32 relative border-t"
      style={{ borderColor: 'var(--border-color)' }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-[1px] bg-[var(--accent-gold)]" />
            <span className="text-xs font-mono tracking-[0.25em] text-[var(--accent-gold)] uppercase">
              {t('KAPSAM & UZMANLIK', 'CAPABILITIES & EXPERTISE')}
            </span>
            <span className="w-8 h-[1px] bg-[var(--accent-gold)]" />
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl tracking-tight mb-6">
            {t('Eksiksiz Mimari ve Yapı Çözümleri', 'Comprehensive Architectural Disciplines')}
          </h2>

          <p className="text-base text-[var(--text-muted)] leading-relaxed">
            {t(
              'Konsept eskizinden anahtar teslim teslimata kadar tüm süreci kendi bünyemizdeki mimar, mühendis ve zanaatkarlarımızla yönetiyoruz.',
              'Managing every phase from conceptual sketches to final handover through our in-house architects, engineers, and artisans.'
            )}
          </p>
        </div>

        {/* Services 3x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((srv, index) => (
            <div
              key={index}
              className="p-8 rounded-xl border flex flex-col justify-between transition-all duration-300 hover:border-[var(--accent-gold)] hover:-translate-y-1 group"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--border-color)'
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="p-3 rounded-lg bg-[var(--border-color)]/20 group-hover:scale-110 transition-transform">
                    {srv.icon}
                  </div>
                  <span className="font-mono text-xs opacity-40 group-hover:text-[var(--accent-gold)] transition-colors">
                    {srv.num}
                  </span>
                </div>

                <h3 className="font-serif-luxury text-xl font-medium tracking-tight mb-3 group-hover:text-[var(--accent-gold)] transition-colors">
                  {srv.title}
                </h3>

                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  {srv.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[var(--border-color)]/40 flex items-center justify-between text-[11px] font-mono tracking-wider opacity-60 group-hover:opacity-100 transition-opacity">
                <span>{t('STANDART', 'STANDARD')}</span>
                <span className="text-[var(--accent-gold)]">LEO GRADE</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

