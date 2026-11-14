export interface Project {
  id: string;
  slug: string;
  title: {
    tr: string;
    en: string;
  };
  category: 'urla' | 'acarkent' | 'other';
  location: {
    tr: string;
    en: string;
  };
  year: number;
  area: string;
  landArea?: string;
  rooms?: string;
  type: {
    tr: string;
    en: string;
  };
  services: {
    tr: string[];
    en: string[];
  };
  description: {
    tr: string;
    en: string;
  };
  videoUrl?: string;
  coverImage: string;
  images: string[];
  featured?: boolean;
}

export const projectsData: Project[] = [
  {
    id: 'gaia-vadi',
    slug: 'gaia-vadi',
    title: {
      tr: 'Gaia Vadi Çiftlik Evleri',
      en: 'Gaia Vadi Farm Estates'
    },
    category: 'urla',
    location: {
      tr: 'Urla, Özbek',
      en: 'Urla, Ozbek'
    },
    year: 2024,
    area: '345 m²',
    landArea: '3.100 m²',
    rooms: '5+1',
    type: {
      tr: 'Çiftlik Evi',
      en: 'Farmstead Villa'
    },
    services: {
      tr: ['Mimari Tasarım', 'İç Mimari Tasarım', 'Uygulama Projeleri', 'Mimari Görselleştirme', 'Anahtar Teslim Uygulama'],
      en: ['Architectural Design', 'Interior Architecture', 'Working Drawings', '3D Visualization', 'Turnkey Construction']
    },
    description: {
      tr: 'Urla doğasıyla bütünleşen, 3.100 m² tarımsal alan içerisinde sürdürülebilir lüksü temsil eden özel çiftlik villası tasarımı.',
      en: 'An exclusive country villa set within a 3,100 m² agricultural estate, blending contemporary luxury with authentic Mediterranean nature.'
    },
    coverImage: '/featured/gaia_vadi.avif',
    images: [
      '/modal_gaia/main.avif',
      '/modal_gaia/thumb_1.avif',
      '/modal_gaia/thumb_2.avif',
      '/modal_gaia/thumb_3.avif',
      '/modal_gaia/thumb_4.avif',
      '/modal_gaia/thumb_5.avif',
      '/modal_gaia/thumb_6.avif',
      '/modal_gaia/bottom_detail.avif'
    ],
    featured: true
  },
  {
    id: 'acarkent-b514',
    slug: 'acarkent-b514',
    title: {
      tr: 'Acarkent B514 Villa',
      en: 'Acarkent B514 Villa'
    },
    category: 'acarkent',
    location: {
      tr: 'İstanbul, Beykoz',
      en: 'Istanbul, Beykoz'
    },
    year: 2024,
    area: '680 m²',
    landArea: '1.850 m²',
    rooms: '6+2',
    type: {
      tr: 'Müstakil Lüks Villa',
      en: 'Bespoke Luxury Villa'
    },
    services: {
      tr: ['Mimari Tasarım', 'İç Mimari Tasarım', 'Uygulama Projeleri', 'Mimari Görselleştirme', 'Anahtar Teslim Uygulama'],
      en: ['Architectural Design', 'Interior Architecture', 'Working Drawings', '3D Visualization', 'Turnkey Construction']
    },
    description: {
      tr: 'Acarkent siluetine hakim, cam ve antrasit çelik konstrüksiyonun çağdaş lüks ile buluştuğu müstakil havuzlu villa.',
      en: 'A premier private villa overlooking Acarkent, featuring cantilevered glass terraces and modern architectural luxury.'
    },
    coverImage: '/featured/acarkent_b514.avif',
    images: [
      '/featured/acarkent_b514.avif',
      '/projects/acarkent-c-tipi/img_1.avif',
      '/projects/acarkent-c-tipi/img_2.avif',
      '/projects/acarkent-c297/img_1.avif',
      '/projects/acarkent-c297/img_2.avif',
      '/projects/acarkent-c297/img_3.avif'
    ],
    featured: true
  },
  {
    id: 'acarkent-acarverde',
    slug: 'acarkent-acarverde',
    title: {
      tr: 'Acarkent Acar Verde Penthouse',
      en: 'Acarkent Acar Verde Penthouse'
    },
    category: 'acarkent',
    location: {
      tr: 'İstanbul, Acarkent',
      en: 'Istanbul, Acarkent'
    },
    year: 2025,
    area: '450 m²',
    landArea: 'Rezidans',
    rooms: '4+1',
    type: {
      tr: 'Lüks Çatı Katı Rezidansı',
      en: 'Luxury Penthouse Residence'
    },
    services: {
      tr: ['Mimari Tasarım', 'İç Mimari Tasarım', 'Uygulama Projeleri', 'Mimari Görselleştirme', 'Anahtar Teslim Uygulama'],
      en: ['Architectural Design', 'Interior Architecture', 'Working Drawings', '3D Visualization', 'Turnkey Construction']
    },
    description: {
      tr: 'Boğaz ve orman siluetine hakim, mermer ve pirinç detayların minimalist geometri ile buluştuğu imza penthouse projesi.',
      en: 'A signature penthouse project harmonizing panoramic vistas, monolithic stone surfaces, and refined bronze details.'
    },
    coverImage: '/featured/acarkent_acarverde.avif',
    images: [
      '/featured/acarkent_acarverde.avif',
      '/projects/acarkent-penthouse/img_2.avif',
      '/projects/acarkent-penthouse/img_3.avif',
      '/projects/acarkent-penthouse/img_4.avif',
      '/projects/acarkent-penthouse/img_5.avif',
      '/projects/acarkent-penthouse/img_6.avif'
    ],
    featured: true
  },
  {
    id: '2',
    slug: 'batum-swiss-otel',
    title: {
      tr: 'Batum Swiss Otel & Azure Residence',
      en: 'Batumi Swissotel & Azure Residence'
    },
    category: 'other',
    location: {
      tr: 'Batum, Gürcistan',
      en: 'Batumi, Georgia'
    },
    year: 2026,
    area: '70.000 m²',
    type: {
      tr: 'Otel & Karma Yaşam Kompleksi',
      en: 'Hotel & Mixed-Use Complex'
    },
    services: {
      tr: ['İç Mimari Tasarım', '3D Görselleştirme', 'Konsept Geliştirme'],
      en: ['Interior Architecture', '3D Visualization', 'Concept Development']
    },
    description: {
      tr: 'Karadeniz kıyısında uluslararası lüks konaklama ve rezidans standartlarını yeniden tanımlayan 70.000 m² lik anıtsal karma yaşam projesi.',
      en: 'A 70,000 m² landmark mixed-use development redefining coastal hospitality and residential luxury on the Black Sea coast.'
    },
    coverImage: '/projects/batum-swiss-otel/img_2.avif',
    images: [
      '/projects/batum-swiss-otel/img_2.avif',
      '/projects/batum-swiss-otel/img_3.avif',
      '/projects/batum-swiss-otel/img_4.avif',
      '/projects/batum-swiss-otel/img_5.avif',
      '/projects/batum-swiss-otel/img_6.avif',
      '/projects/batum-swiss-otel/img_7.avif',
      '/projects/batum-swiss-otel/img_8.avif',
      '/projects/batum-swiss-otel/img_9.avif'
    ],
    featured: true
  },
  {
    id: '3',
    slug: 'gaia-vadi-1',
    title: {
      tr: 'Urla Gaia Çiftlik Evleri 1',
      en: 'Urla Gaia Farm Estates Villa 1'
    },
    category: 'urla',
    location: {
      tr: 'Urla, İzmir',
      en: 'Urla, Izmir'
    },
    year: 2024,
    area: '650 m²',
    landArea: '3.100 m²',
    rooms: '5+1',
    type: {
      tr: 'Boutique Eko-Çiftlik Villası',
      en: 'Boutique Eco-Farmstead Villa'
    },
    services: {
      tr: ['Uygulama Projesi', 'İç Mimari Tasarım', 'Mimari Tasarım', 'Uygulama'],
      en: ['Working Drawings', 'Interior Architecture', 'Architectural Design', 'Execution']
    },
    description: {
      tr: 'Urla doğasıyla bütünleşen, 3.100 m² tarımsal alan içerisinde sürdürülebilir lüksü temsil eden özel çiftlik villası tasarımı.',
      en: 'An exclusive country villa set within a 3,100 m² agricultural estate, blending contemporary luxury with authentic Mediterranean nature.'
    },
    videoUrl: 'https://www.youtube.com/watch?v=OrYLcPwTOfw',
    coverImage: '/projects/gaia-vadi-1/img_1.avif',
    images: [
      '/projects/gaia-vadi-1/img_1.avif',
      '/projects/gaia-vadi-1/img_6.avif',
      '/projects/gaia-vadi-1/img_2.avif',
      '/projects/gaia-vadi-1/img_3.avif',
      '/projects/gaia-vadi-1/img_4.avif',
      '/projects/gaia-vadi-1/img_5.avif',
      '/projects/gaia-vadi-1/img_7.avif',
      '/projects/gaia-vadi-1/img_8.avif',
      '/projects/gaia-vadi-1/img_9.avif'
    ],
    featured: true
  },
  {
    id: '4',
    slug: 'gaia-vadi-4',
    title: {
      tr: 'Urla Gaia Çiftlik Evleri 4',
      en: 'Urla Gaia Farm Estates Villa 4'
    },
    category: 'urla',
    location: {
      tr: 'Urla, İzmir',
      en: 'Urla, Izmir'
    },
    year: 2024,
    area: '400 m²',
    landArea: '3.100 m²',
    rooms: '4+1',
    type: {
      tr: 'Müstakil Çiftlik Rezidansı',
      en: 'Detached Country Residence'
    },
    services: {
      tr: ['Uygulama Projesi', 'İç Mimari Tasarım', 'Mimari Tasarım', 'Uygulama'],
      en: ['Working Drawings', 'Interior Architecture', 'Architectural Design', 'Execution']
    },
    description: {
      tr: 'Topografyaya saygılı kademeli yerleşim, doğal taş ve lamel ahşap detaylarla bezeli Urla Gaia serisinin 4 numaralı villası.',
      en: 'Tiered architecture respecting local topography, featuring natural stone and timber louvers in Urla Gaia Series.'
    },
    coverImage: '/projects/gaia-vadi-4/img_1.avif',
    images: [
      '/projects/gaia-vadi-4/img_1.avif',
      '/projects/gaia-vadi-4/img_2.avif',
      '/projects/gaia-vadi-4/img_3.avif',
      '/projects/gaia-vadi-4/img_4.avif',
      '/projects/gaia-vadi-4/img_5.avif'
    ],
    featured: true
  },
  {
    id: '5',
    slug: 'adam-kule-residence',
    title: {
      tr: 'Maltepe Adam Kule Residence',
      en: 'Maltepe Adam Tower Residence'
    },
    category: 'other',
    location: {
      tr: 'İstanbul, Maltepe',
      en: 'Istanbul, Maltepe'
    },
    year: 2022,
    area: '75 m²',
    type: {
      tr: 'Modern Şehir Rezidansı',
      en: 'Contemporary Urban Residence'
    },
    services: {
      tr: ['Uygulama Projesi', 'İç Mimari Tasarım'],
      en: ['Construction Project', 'Interior Architecture']
    },
    description: {
      tr: 'Metropol yaşantısı için optimize edilmiş, kompakt ama ferah fonksiyonel iç mimari çözüm.',
      en: 'Optimized functional spatial solution crafted for refined urban living in Istanbul.'
    },
    coverImage: '/projects/adam-kule-residence/img_1.avif',
    images: [
      '/projects/adam-kule-residence/img_1.avif',
      '/projects/adam-kule-residence/img_2.avif',
      '/projects/adam-kule-residence/img_3.avif',
      '/projects/adam-kule-residence/img_4.avif'
    ]
  },
  {
    id: '6',
    slug: 'leo-urla-ofis',
    title: {
      tr: 'Leo Mimarlık & Yapı Urla Ofis',
      en: 'Leo Architecture & Construction Urla Office'
    },
    category: 'urla',
    location: {
      tr: 'Urla / İstanbul',
      en: 'Urla / Istanbul'
    },
    year: 2018,
    area: '180 m²',
    type: {
      tr: 'Mimari Tasarım Stüdyosu',
      en: 'Architectural Design Studio'
    },
    services: {
      tr: ['Uygulama Projesi', 'İç Mimari Tasarım', 'Mimari Tasarım', 'Uygulama'],
      en: ['Working Drawings', 'Interior Architecture', 'Architectural Design', 'Execution']
    },
    description: {
      tr: 'Kendi tasarım atölyemiz: Taş dokuların şeffaf cam cephelerle buluştuğu yaratıcı mimari merkez.',
      en: 'Our own architectural headquarters: stone materiality paired with light-flooded glazed volumes.'
    },
    coverImage: '/projects/leo-urla-ofis/img_3.avif',
    images: [
      '/projects/leo-urla-ofis/img_3.avif',
      '/projects/leo-urla-ofis/img_1.avif',
      '/projects/leo-urla-ofis/img_2.avif',
      '/projects/leo-urla-ofis/img_4.avif'
    ]
  },
  {
    id: '7',
    slug: 'urla-kuscular-12-tas-ev',
    title: {
      tr: 'Urla Bizim Sokak 12 Taş Ev',
      en: 'Urla Bizim Sokak 12 Stone Villas'
    },
    category: 'urla',
    location: {
      tr: 'Urla, Kuşçular, İzmir',
      en: 'Urla, Kuscular, Izmir'
    },
    year: 2016,
    area: '2.920 m²',
    type: {
      tr: 'Geleneksel Dokulu Butik Taş Evler',
      en: 'Artisan Stone Villa Compound'
    },
    services: {
      tr: ['Uygulama Projesi', 'İç Mimari Tasarım', 'Mimari Tasarım', 'Uygulama'],
      en: ['Working Drawings', 'Interior Architecture', 'Architectural Design', 'Execution']
    },
    description: {
      tr: 'Urla yerel taş ustalarının el işçiliği ve çağdaş villa konforunun kusursuz birleşimi olan 12 villalık imza yerleşke.',
      en: 'An exclusive boutique estate of 12 residences carved by Urla artisan masons, paired with contemporary luxury.'
    },
    coverImage: '/projects/urla-kuscular-12-tas-ev/img_1.avif',
    images: [
      '/projects/urla-kuscular-12-tas-ev/img_1.avif',
      '/projects/urla-kuscular-12-tas-ev/img_2.avif',
      '/projects/urla-kuscular-12-tas-ev/img_3.avif',
      '/projects/urla-kuscular-12-tas-ev/img_4.avif',
      '/projects/urla-kuscular-12-tas-ev/img_5.avif'
    ],
    featured: true
  },
  {
    id: '8',
    slug: 'urla-camkoza',
    title: {
      tr: 'Urla Çamkoza Sitesi',
      en: 'Urla Camkoza Residence'
    },
    category: 'urla',
    location: {
      tr: 'Urla, İzmir',
      en: 'Urla, Izmir'
    },
    year: 2016,
    area: '350 m²',
    type: {
      tr: 'Müstakil Çam Ormanı Villası',
      en: 'Pine Forest Villa'
    },
    services: {
      tr: ['Uygulama Projesi', '3D Görselleştirme', 'İç Mimari Tasarım', 'Mimari Tasarım', 'Uygulama'],
      en: ['Working Drawings', '3D Visualization', 'Interior Architecture', 'Architectural Design', 'Execution']
    },
    description: {
      tr: 'Kızılçam koruluğunun kalbinde, geniş teraslar ve doğal malzeme paletiyle tasarlanmış müstakil yaşam.',
      en: 'Secluded luxury enveloped by pine woods, oriented to maximize daylight and outdoor living.'
    },
    coverImage: '/projects/urla-camkoza/img_1.avif',
    images: [
      '/projects/urla-camkoza/img_1.avif',
      '/projects/urla-camkoza/img_2.avif',
      '/projects/urla-camkoza/img_3.avif',
      '/projects/urla-camkoza/img_4.avif'
    ]
  },
  {
    id: '9',
    slug: 'urla-camkoza-ekizoglu',
    title: {
      tr: 'Urla Çamkoza Sitesi Ekizoğlu Villa',
      en: 'Urla Camkoza Ekizoglu Villa'
    },
    category: 'urla',
    location: {
      tr: 'Urla, İzmir',
      en: 'Urla, Izmir'
    },
    year: 2016,
    area: '345 m²',
    type: {
      tr: 'Özel Villa Tasarımı',
      en: 'Private Bespoke Villa'
    },
    services: {
      tr: ['Uygulama Projesi', 'İç Mimari Tasarım', 'Mimari Tasarım', 'Uygulama'],
      en: ['Working Drawings', 'Interior Architecture', 'Architectural Design', 'Execution']
    },
    description: {
      tr: 'İç mekan ile bahçe avlusunu tek bir akıcı hacimde birleştiren özel mimari kurgu.',
      en: 'Custom architectural composition seamlessly merging indoor living with an open garden courtyard.'
    },
    coverImage: '/projects/urla-camkoza-ekizoglu/img_1.avif',
    images: [
      '/projects/urla-camkoza-ekizoglu/img_1.avif',
      '/projects/urla-camkoza-ekizoglu/img_2.avif',
      '/projects/urla-camkoza-ekizoglu/img_3.avif'
    ]
  },
  {
    id: '10',
    slug: 'urla-hisar-evleri',
    title: {
      tr: 'Urla Hisar Evleri Çamlı',
      en: 'Urla Hisar Houses Camli'
    },
    category: 'urla',
    location: {
      tr: 'Urla, İzmir',
      en: 'Urla, Izmir'
    },
    year: 2014,
    area: '700 m²',
    type: {
      tr: 'Geniş Ölçekli Bahçeli Villa',
      en: 'Large-Scale Garden Estate'
    },
    services: {
      tr: ['Uygulama Projesi', 'İç Mimari Tasarım', 'Uygulama'],
      en: ['Working Drawings', 'Interior Architecture', 'Execution']
    },
    description: {
      tr: 'Hisar Evleri etabı içerisinde 700 m² lik yaşam alanına sahip, zamansız taş ve ahşap kurgusu.',
      en: 'A 700 m² grand residence within Hisar Estates, featuring enduring stone craftsmanship and timber joinery.'
    },
    coverImage: '/projects/urla-hisar-evleri/img_1.avif',
    images: [
      '/projects/urla-hisar-evleri/img_1.avif',
      '/projects/urla-hisar-evleri/img_2.avif',
      '/projects/urla-hisar-evleri/img_3.avif',
      '/projects/urla-hisar-evleri/img_4.avif'
    ]
  },
  {
    id: '11',
    slug: 'acarkent-c297',
    title: {
      tr: 'Acarkent C 297 Villa',
      en: 'Acarkent C 297 Villa'
    },
    category: 'acarkent',
    location: {
      tr: 'İstanbul, Acarkent',
      en: 'Istanbul, Acarkent'
    },
    year: 2012,
    area: '1.000 m²',
    type: {
      tr: 'Özel Havuzlu Konsept Villa',
      en: 'Private Pool Concept Villa'
    },
    services: {
      tr: ['Uygulama Projesi', 'İç Mimari Tasarım', 'Mimari Tasarım', 'Uygulama'],
      en: ['Working Drawings', 'Interior Architecture', 'Architectural Design', 'Execution']
    },
    description: {
      tr: '1.000 m² kapalı kullanım alanına sahip, kış bahçesi, havuz ve jakuzili suit odalarıyla donatılmış eksiksiz malikane.',
      en: 'A 1,000 m² premier estate complete with winter garden, outdoor pool pavilion, and luxury master retreats.'
    },
    coverImage: '/projects/acarkent-c297/img_1.avif',
    images: [
      '/projects/acarkent-c297/img_1.avif',
      '/projects/acarkent-c297/img_2.avif',
      '/projects/acarkent-c297/img_3.avif',
      '/projects/acarkent-c297/img_4.avif',
      '/projects/acarkent-c297/img_5.avif'
    ]
  },
  {
    id: '12',
    slug: 'acarkent-c-tipi',
    title: {
      tr: 'Acarkent C Tipi Villa',
      en: 'Acarkent C-Type Villa'
    },
    category: 'acarkent',
    location: {
      tr: 'İstanbul, Acarkent',
      en: 'Istanbul, Acarkent'
    },
    year: 2012,
    area: '650 m²',
    type: {
      tr: 'Klasik & Modern Villa Revizyonu',
      en: 'Classic & Modern Villa Remodel'
    },
    services: {
      tr: ['Uygulama Projesi', 'İç Mimari Tasarım', 'Mimari Tasarım', 'Uygulama'],
      en: ['Working Drawings', 'Interior Architecture', 'Architectural Design', 'Execution']
    },
    description: {
      tr: 'Acarkent korusunun panoramasına açılan 650 m² lik müstakil villanın komple mimari dönüşümü.',
      en: 'Full-scope architectural and interior transformation of a 650 m² private residence in Acarkent.'
    },
    coverImage: '/projects/acarkent-c-tipi/img_1.avif',
    images: [
      '/projects/acarkent-c-tipi/img_1.avif',
      '/projects/acarkent-c-tipi/img_2.avif'
    ]
  },
  {
    id: '13',
    slug: 'omerli-kasaba-evleri',
    title: {
      tr: 'Ömerli Kasaba Evleri',
      en: 'Omerli Kasaba Residences'
    },
    category: 'other',
    location: {
      tr: 'İstanbul, Ömerli',
      en: 'Istanbul, Omerli'
    },
    year: 2012,
    area: '291 m²',
    type: {
      tr: 'Country Yaşam Rezidansı',
      en: 'Refined Country Residence'
    },
    services: {
      tr: ['Uygulama Projesi', 'İç Mimari Tasarım', 'Mimari Tasarım', 'Uygulama'],
      en: ['Working Drawings', 'Interior Architecture', 'Architectural Design', 'Execution']
    },
    description: {
      tr: 'Doğal ahşap ve taş dokuların çağdaş aile yaşamıyla harmanlandığı samimi ve lüks kır evi.',
      en: 'Natural wood and stone textures crafted into an intimate yet luxurious family retreat in Omerli.'
    },
    coverImage: '/projects/omerli-kasaba-evleri/img_5.avif',
    images: [
      '/projects/omerli-kasaba-evleri/img_5.avif',
      '/projects/omerli-kasaba-evleri/img_1.avif',
      '/projects/omerli-kasaba-evleri/img_2.avif',
      '/projects/omerli-kasaba-evleri/img_3.avif',
      '/projects/omerli-kasaba-evleri/img_4.avif'
    ]
  },
  {
    id: '14',
    slug: 'beykoz-karlitepe',
    title: {
      tr: 'Beykoz Karlıtepe Villa',
      en: 'Beykoz Karlitepe Villa'
    },
    category: 'other',
    location: {
      tr: 'İstanbul, Beykoz',
      en: 'Istanbul, Beykoz'
    },
    year: 2011,
    area: '700 m²',
    type: {
      tr: 'Boğaz Manzaralı Özel Villa',
      en: 'Bosphorus-Facing Bespoke Villa'
    },
    services: {
      tr: ['Uygulama Projesi', 'İç Mimari Tasarım', 'Mimari Tasarım', 'Uygulama'],
      en: ['Working Drawings', 'Interior Architecture', 'Architectural Design', 'Execution']
    },
    description: {
      tr: 'Beykoz tepelerinde doğanın sükunetini Boğaz esintisiyle buluşturan 700 m² lik zarif yaşam kurgusu.',
      en: 'Set high in the hills of Beykoz, a 700 m² serene retreat designed around nature and the Bosphorus breeze.'
    },
    coverImage: '/projects/beykoz-karlitepe/img_1.avif',
    images: [
      '/projects/beykoz-karlitepe/img_1.avif',
      '/projects/beykoz-karlitepe/img_2.avif',
      '/projects/beykoz-karlitepe/img_3.avif',
      '/projects/beykoz-karlitepe/img_4.avif'
    ]
  }
];

