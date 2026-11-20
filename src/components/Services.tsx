'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';

const pillars = [
  {
    num: '01',
    image: '/services/projelendirme.jpg',
    alt: 'Mimari Projelendirme ve Tasarım',
    title: { tr: 'Projelendirme', en: 'Design' },
    body: {
      tr: 'Hayalinizdeki mekânı, bütçeniz doğrultusunda en ideal çözümle tasarlıyoruz. Ruhsat projelerinden, cephe, iç mimari tasarım ve uygulama projelerine kadar tüm süreci tek bir çatı altında kurguluyoruz. Böylece hem teknik hem de estetik anlamda uyumlu ve büyüleyici projeler üretiyoruz.',
      en: 'We design the place you have in mind as the right fit for your budget. Permit drawings, facade, interior design and working drawings all sit under one roof, so the project stays coherent in both its engineering and its appearance.',
    },
  },
  {
    num: '02',
    image: '/services/insaat.jpg',
    alt: 'İnşaat ve Şantiye Yönetimi',
    title: { tr: 'İnşaat', en: 'Construction' },
    body: {
      tr: 'Yapı sahibinin ihtiyaçları üzerine hazırladığımız ruhsat projeleri ile şantiye uygulama projelerini titizlikle süperpoze ediyoruz. Böylece sahada hem kullanıcı ihtiyaçlarını karşılayan hem de ilgili yönetmeliklere uygun sıra dışı yapılar inşa ediyoruz.',
      en: 'We carefully overlay the permit set, prepared around the owner’s needs, with the site working drawings. What is built meets those needs and the relevant regulations, and still stands as a distinctive building.',
    },
  },
  {
    num: '03',
    image: '/services/uygulama.jpg',
    alt: 'İç Mimari ve İnce İmalat Uygulaması',
    title: { tr: 'Uygulama', en: 'Execution' },
    body: {
      tr: 'Tasarlanmış olan projeyi; en kaba imalatlarından, en ince ayrıntılarına kadar hayata geçiriyoruz. Bu süreçte gerekli olan tüm ürünleri özenle seçiyor, ekipleri organize ediyor ve işin finalinde özgün eserler ortaya çıkarıyoruz.',
      en: 'We carry the designed project from the roughest works through to the finest detail. Along the way we choose every product with care, organise the crews, and finish with a piece of work that is its own.',
    },
  },
] as const;

export default function Services({ showIntro = true }: { showIntro?: boolean }) {
  const { lang, t } = useApp();

  return (
    <section
      id="services"
      className="py-20 md:py-28 border-b"
      style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-page)' }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {showIntro && (
          <div className="max-w-3xl mb-16 md:mb-20">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-[var(--accent-gold)]" />
              <span className="text-[11px] font-mono tracking-[0.28em] text-[var(--accent-gold)] uppercase">
                {t('Üç iş, tek ofis', 'Three trades, one office')}
              </span>
            </div>
            <h2 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.05] mb-5">
              {t('Projelendirme, inşaat, uygulama.', 'Design, construction, execution.')}
            </h2>
            <p className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed max-w-2xl">
              {t(
                'Ruhsat çiziminden ince imalata kadar aynı ekip. İşi ayrı ofislere bölmüyoruz.',
                'From the permit set to the last finish, the same team. The work is not split across separate offices.'
              )}
            </p>
          </div>
        )}

        <div className="flex flex-col gap-16 md:gap-24">
          {pillars.map((item, index) => {
            const imageFirst = index % 2 === 0;
            return (
              <article
                key={item.num}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
              >
                <div className={`lg:col-span-7 ${imageFirst ? '' : 'lg:order-2'}`}>
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-900">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 58vw"
                      className="object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
                    />
                  </div>
                </div>

                <div className={`lg:col-span-5 flex flex-col gap-4 ${imageFirst ? '' : 'lg:order-1'}`}>
                  <span className="font-mono text-xs tracking-[0.28em] text-[var(--accent-gold)]">
                    {item.num}
                  </span>
                  <h3 className="font-serif-luxury text-3xl sm:text-4xl tracking-tight">
                    {item.title[lang]}
                  </h3>
                  <p className="text-base text-[var(--text-muted)] leading-relaxed">
                    {item.body[lang]}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-16 md:mt-20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-t pt-8"
          style={{ borderColor: 'var(--border-color)' }}
        >
          <p className="font-serif-luxury text-2xl sm:text-3xl tracking-tight max-w-xl">
            {t(
              'Bir sonraki mekânı bu üç işin bir arada yürüdüğü ofiste konuşalım.',
              'Let us talk about the next place in the office where these three trades run together.'
            )}
          </p>
          <Link
            href="/iletisim"
            className="inline-flex items-center justify-center min-h-11 px-6 bg-[var(--accent-gold)] text-black font-mono text-xs tracking-[0.18em] uppercase hover:opacity-90 active:scale-[0.98] transition-all shrink-0"
          >
            {t('Görüşme ayarla', 'Arrange a meeting')}
          </Link>
        </div>
      </div>
    </section>
  );
}
