'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VillaConstructionSimulation from '@/components/VillaConstructionSimulation';
import { useApp } from '@/context/AppContext';
import {
  Compass,
  Layers,
  Scissors,
  Video,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Box,
} from 'lucide-react';

export default function InsaatSimulasyonuPage() {
  const { t } = useApp();

  const specifications = [
    {
      num: '01',
      title: t('Topografik Uyum & Radye Temel', 'Topographic Sitework & Raft Footing'),
      specs: 'C35/45 Çift Sıra Donatılı Betonarme • 40 cm Radye Temel Plakası',
      detail: t(
        "Kuşçular sırtlarının doğal eğimine oturan kademeli hafriyat kotları ve drenaj yatakları ile zemin oturması sıfıra indirgenir.",
        'Stepped excavation contours nestled into the Kuşçular slopes eliminate differential settlement through dual-layer C35/45 raft foundations.'
      ),
    },
    {
      num: '02',
      title: t('Urla Masif Taş Duvar İşçiliği', 'Urla Native Stone Masonry'),
      specs: '25 cm Doğal Urla Kireç Taşı • Yerel Zanaatkar Taş Örümü',
      detail: t(
        "Fabrikasyon panel kullanılmaz; binanın tüm dış kabuğu Urla taş ocaklarından çıkarılan blokların harçla tek tek işlenmesiyle yükselir.",
        'Zero artificial cladding panels; the entire envelope rises from hand-dressed Urla limestone blocks laid with heritage lime mortar.'
      ),
    },
    {
      num: '03',
      title: t('Lamine Meşe & Çelik Taşıyıcılar', 'Glulam Timber & Steel Framework'),
      specs: '30x40 cm Lamine Meşe Ana Kirişler • Gizli Çelik Flanş Ankrajlar',
      detail: t(
        "Geniş açıklıkları kolonsuz geçen lamine meşe strüktür, 2.5 metreye varan konsol saçaklarıyla güneşi keser ve iç mekan ferahlığını sağlar.",
        'Continuous laminated oak girders span wide living vistas, providing 2.5m cantilevered solar overhangs for climate resilience.'
      ),
    },
    {
      num: '04',
      title: t('45° Kesit (Cutaway) & Yerden Isıtma', '45° Cutaway Section & Heating'),
      specs: 'Zemin İçi Serpantin Isıtma Hattı • 3.20 m Minimalist Sürme Camlar',
      detail: t(
        "Teknik çizim standardında taranan kesit düzlemi, şömine çekirdeğini, çift cidarlı yalıtımı ve taban içi ısı döngüsünü açığa çıkarır.",
        'Technical cross-section planes with 45-degree hatching expose the thermal envelope, fireplace core, and radiant underfloor hydronics.'
      ),
    },
  ];

  return (
    <main className="min-h-screen selection:bg-[var(--accent-gold)] selection:text-black">
      <Navbar />

      {/* Page Header */}
      <section
        className="pt-36 pb-12 md:pt-44 md:pb-16 relative overflow-hidden architectural-grid border-b"
        style={{ borderColor: 'var(--border-color)' }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-mono mb-6 text-[var(--text-muted)]">
            <Link href="/" className="hover:text-[var(--accent-gold)] transition-colors">
              {t('ANA SAYFA', 'HOME')}
            </Link>
            <span>/</span>
            <span className="text-[var(--accent-gold)]">
              {t('İNŞAAT VE KESİT SİMÜLASYONU', 'CONSTRUCTION & CUTAWAY SIMULATION')}
            </span>
          </div>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#FF5722]/50 bg-[var(--card-bg)]/80 text-[11px] font-mono tracking-[0.25em] text-[#FF5722] uppercase mb-6">
              <Compass size={13} />
              <span>{t('HARDCORE-INFO • LİNE-ART CUTAWAY TEKNİĞİ', 'HARDCORE-INFO • LINE-ART CUTAWAY')}</span>
            </div>

            <h1 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl tracking-tight leading-[1.1] mb-6">
              {t(
                'Urla Gaia Çiftlik Evi: 3D İnşaat ve Canlı Kesit Filmi.',
                'Urla Gaia Estate: 3D Construction & Real-Time Cutaway.'
              )}
            </h1>

            <p className="text-base sm:text-xl text-[var(--text-muted)] leading-relaxed max-w-3xl font-light">
              {t(
                'Tasarım ve mühendislik detaylarımızı şeffafça inceleyin: Temelden çatıya doğru milimetrik hatlarla yükselen 3D villa modelini döndürün, 45° kesit bıçağıyla iç mekan katmanlarını görün veya videoyu kaydedin.',
                'Inspect our architectural craftsmanship in granular clarity: A line-art technical film tracing the villa step-by-step from earth to finished sanctuary.'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Main 3D Simulation Workbench */}
      <section className="py-12 md:py-16 bg-[var(--bg-section)] border-b" style={{ borderColor: 'var(--border-color)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* 3D Component */}
          <VillaConstructionSimulation />

          {/* Quick Guidance strip */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[var(--text-muted)]">
            <div className="flex items-center gap-4">
              <span>💡 <strong>Etkileşim:</strong> Farenizle basılı tutup çevirerek villayı 360° inceleyebilirsiniz.</span>
              <span>✂️ <strong>Kesit:</strong> &ldquo;Kesit&rdquo; butonuna basarak iç mimariyi açabilirsiniz.</span>
            </div>
            <div>
              <span>🎥 <strong>Video Kaydet:</strong> &ldquo;Video Kaydet&rdquo; butonu ile animasyonu cihazınıza indirebilirsiniz.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Structural & Engineering Breakdown */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-[1px] bg-[var(--accent-gold)]" />
            <span className="text-xs font-mono tracking-[0.25em] text-[var(--accent-gold)] uppercase">
              {t('MİMARİ ŞARTNAME & İMALAT SIRASI', 'CONSTRUCTION PHASES & SPECIFICATION')}
            </span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-5xl tracking-tight mb-16 max-w-2xl">
            {t(
              'Çizgiden Gerçeğe: 4 Temel İnşaat Disiplini',
              'From Line to Monument: 4 Core Construction Disciplines'
            )}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {specifications.map((item, idx) => (
              <div
                key={idx}
                className="p-8 rounded-xl border flex flex-col justify-between transition-all duration-300 hover:border-[var(--accent-gold)]"
                style={{
                  backgroundColor: 'var(--card-bg)',
                  borderColor: 'var(--border-color)',
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-2xl font-bold text-[var(--accent-gold)]">
                      {item.num}
                    </span>
                    <span className="text-[10px] font-mono tracking-widest text-[#FF5722] uppercase bg-[#FF5722]/10 px-2.5 py-1 rounded">
                      TEKNİK FAZ
                    </span>
                  </div>

                  <h3 className="font-serif-luxury text-2xl mb-2 text-[var(--text-primary)]">
                    {item.title}
                  </h3>

                  <div className="font-mono text-xs text-[var(--accent-gold)] mb-4">
                    {item.specs}
                  </div>

                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section
        className="py-20 border-t"
        style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)' }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="font-serif-luxury text-2xl sm:text-4xl mb-2">
              {t('Kendi Villa Projenizi Birlikte İnşa Edelim.', 'Let Us Engineer Your Bespoke Villa.')}
            </h3>
            <p className="text-sm text-[var(--text-muted)] max-w-xl">
              {t(
                "Urla veya Acarkent'te arazinizin rüzgar, ışık ve toprak analizlerini yaparak anahtar teslim hayata geçirelim.",
                'Partner with our architectural atelier to engineer your bespoke retreat with millimeter precision.'
              )}
            </p>
          </div>

          <Link
            href="/iletisim"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[var(--text-primary)] text-[var(--bg-page)] hover:bg-[var(--accent-gold)] hover:text-black transition-all rounded font-mono text-xs tracking-widest uppercase font-semibold cursor-pointer group shadow-lg"
          >
            <span>{t('DANIŞMANLIK RANDEVUSU ALIN', 'BOOK ARCHITECTURAL CONSULTATION')}</span>
            <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
