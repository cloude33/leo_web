'use client';

import React from 'react';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import { Award, Compass, ShieldCheck, Feather } from 'lucide-react';

export default function About() {
  const { lang, t } = useApp();

  const milestones = [
    {
      year: '2004',
      title: t('Kuruluş & İlk Temeller', 'Foundation & Beginnings'),
      desc: t('İstanbul ve Ege genelinde butik mimari ve ince yapı taahhüt yolculuğumuz başladı.', 'Inception of boutique architecture and fine construction across Istanbul and Aegean coast.')
    },
    {
      year: '2012',
      title: t('Acarkent & Beykoz İmzaları', 'Acarkent & Beykoz Era'),
      desc: t('İstanbul’un en prestijli yerleşkelerinde geniş metrajlı lüks villa ve penthouse tasarımları.', 'Bespoke grand villas and luxury penthouses executed in Istanbul’s prime enclaves.')
    },
    {
      year: '2016',
      title: t('Urla Taş Mimarisine Dönüş', 'Urla Stone Legacy'),
      desc: t('Kuşçular 12 Taş Ev ve Çamkoza projeleriyle Urla yerel taş işçiliğini modern konforla birleştirdik.', 'Harmonizing Urla native stone masonry with contemporary luxury in Kuşçular.')
    },
    {
      year: '2024+',
      title: t('Gaia Vadi & Sürdürülebilir Lüks', 'Gaia & Eco-Luxury'),
      desc: t('3.100 m² arazilerde doğa ile rezonans halinde, tarımsal ve ekolojik villa konseptleri.', 'Regenerative eco-farmstead mansions coexisting in deep dialogue with nature.')
    }
  ];

  return (
    <section id="about" className="py-24 md:py-32 relative border-t"
      style={{ borderColor: 'var(--border-color)' }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Main Philosophy Editorial */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden border border-[var(--border-color)] shadow-xl">
              <Image
                src="/projects/gaia-vadi-4/img_2.avif"
                alt="Urla Gaia Vadi Taş Ev Detayı"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[11px] font-mono tracking-widest text-[#D2B07E] uppercase block mb-1">
                  {t('URLA GELENEĞİ', 'URLA HERITAGE')}
                </span>
                <p className="font-serif-luxury text-xl">
                  {t('Her taş, Urla rüzgarının ve zeytin ağaçlarının şahididir.', 'Each stone bears witness to Urla winds and ancient olive groves.')}
                </p>
              </div>
            </div>

            {/* Overlapping Badge */}
            <div className="absolute -bottom-6 -right-4 md:-right-8 p-6 rounded-xl border bg-[var(--card-bg)] shadow-xl max-w-xs"
              style={{ borderColor: 'var(--border-color)' }}
            >
              <div className="font-serif-luxury text-4xl text-[var(--accent-gold)] font-bold">22+</div>
              <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mt-1">
                {t('Yıllık Kesintisiz Butik Mimari Tecrübesi', 'Years of Continuous Bespoke Craftsmanship')}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <span className="w-8 h-[1px] bg-[var(--accent-gold)]" />
              <span className="text-xs font-mono tracking-[0.25em] text-[var(--accent-gold)] uppercase">
                {t('FELSEFEMİZ & MANİFESTO', 'OUR PHILOSOPHY & MANIFESTO')}
              </span>
            </div>

            <h2 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl tracking-tight leading-tight">
              {t(
                'Seri Üretime Karşı, Yılda Sadece Bir Başyapıt.',
                'Against Mass Production: Just One Masterpiece a Year.'
              )}
            </h2>

            <p className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed">
              {t(
                'Leo Mimarlık & Yapı olarak 2004 yılından bu yana felsefemiz değişmedi: Bir yapının gerçek lüksü; ölçeğinde değil, malzeme samimiyetinde, ışıkla kurduğu ilişkide ve içinde yaşayan insanın ruhuna sunduğu dinginliktedir.',
                'Since 2004, our doctrine at Leo Architecture & Construction remains unwavering: True luxury does not reside in brute scale, but in material honesty, a reverent relationship with natural light, and the serenity it bestows upon its inhabitants.'
              )}
            </p>

            <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
              {t(
                'Urla’nın bin yıllık taş işçiliği geleneğini, Acarkent’in çağdaş ve sofistike beklentileriyle harmanlıyoruz. Çizdiğimiz her çizgiyi kendi şantiyemizde, milimetrik titizlikle inşa ediyoruz.',
                'We synthesize Urla’s millennia-old stone craft with Acarkent’s refined, contemporary demands. Every line we sketch on paper is built by our own master craftsmen with millimeter precision.'
              )}
            </p>

            {/* Core Values 3-col */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t"
              style={{ borderColor: 'var(--border-color)' }}
            >
              <div>
                <div className="text-[var(--accent-gold)] mb-2"><Feather size={20} /></div>
                <h4 className="font-serif-luxury text-base font-semibold mb-1">
                  {t('Malzeme Samimiyeti', 'Material Honesty')}
                </h4>
                <p className="text-xs text-[var(--text-muted)]">
                  {t('Doğal taş, ham meşe, masif pirinç ve saf kireç sıva.', 'Authentic stone, raw oak, solid bronze and pure lime plaster.')}
                </p>
              </div>

              <div>
                <div className="text-[var(--accent-gold)] mb-2"><Compass size={20} /></div>
                <h4 className="font-serif-luxury text-base font-semibold mb-1">
                  {t('Topografik Uyum', 'Topographic Harmony')}
                </h4>
                <p className="text-xs text-[var(--text-muted)]">
                  {t('Araziye hükmetmek yerine arazinin eğimine yaslanan formlar.', 'Structures resting upon natural slopes rather than dominating them.')}
                </p>
              </div>

              <div>
                <div className="text-[var(--accent-gold)] mb-2"><ShieldCheck size={20} /></div>
                <h4 className="font-serif-luxury text-base font-semibold mb-1">
                  {t('Anahtar Teslim Güvence', 'Turnkey Precision')}
                </h4>
                <p className="text-xs text-[var(--text-muted)]">
                  {t('Ruhsattan mobilya montajına dek tek muhatap garantisi.', 'A single point of accountability from blueprint to turnkey handover.')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Chronological Milestone Timeline */}
        <div className="pt-12 border-t" style={{ borderColor: 'var(--border-color)' }}>
          <span className="text-xs font-mono tracking-[0.25em] text-[var(--accent-gold)] uppercase block mb-8 text-center">
            {t('TARİHSEL MİHENK TAŞLARI', 'HISTORICAL MILESTONES')}
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl border flex flex-col gap-3 relative"
                style={{
                  backgroundColor: 'var(--card-bg)',
                  borderColor: 'var(--border-color)'
                }}
              >
                <span className="text-2xl font-serif-luxury font-bold text-[var(--accent-gold)]">
                  {item.year}
                </span>
                <h4 className="text-sm font-semibold tracking-wide">
                  {item.title}
                </h4>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

