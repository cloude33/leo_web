'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, CheckCircle } from 'lucide-react';

const InstagramIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const YoutubeIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
    <polygon points="10 15 15 12 10 9 10 15" fill="currentColor"/>
  </svg>
);

export default function Contact() {
  const { t } = useApp();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    projectType: 'villa',
    location: 'urla',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative border-t"
      style={{ borderColor: 'var(--border-color)' }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Direct Office & VIP Contact */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-8 h-[1px] bg-[var(--accent-gold)]" />
                <span className="text-xs font-mono tracking-[0.25em] text-[var(--accent-gold)] uppercase">
                  {t('ÖZEL GÖRÜŞME & İLETİŞİM', 'PRIVATE CONSULTATION')}
                </span>
              </div>

              <h2 className="font-serif-luxury text-3xl sm:text-5xl tracking-tight mb-6 leading-tight">
                {t(
                  'Yeni Bir Başyapıtı Birlikte Başlatalım.',
                  'Let Us Conceive Your Next Architectural Masterpiece.'
                )}
              </h2>

              <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed mb-10">
                {t(
                  'Urla veya İstanbul’da planladığınız arsa, villa veya iç mimari dönüşüm projeniz için ofislerimizde özel bir randevu planlayabilirsiniz.',
                  'Schedule an exclusive private consultation at our Urla or Istanbul studio to discuss your estate, bespoke villa, or interior transformation.'
                )}
              </p>

              {/* Office Details */}
              <div className="flex flex-col gap-5 font-mono text-xs">
                {/* Urla Office */}
                <div className="p-5 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)]/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[var(--accent-gold)] font-semibold tracking-wider block">
                      URLA, İZMİR ŞUBESİ
                    </span>
                    <span className="opacity-70 flex items-center gap-1.5 text-[11px]">
                      <Clock size={12} /> Pzt - Cmt: 09:00 - 18:30
                    </span>
                  </div>
                  <p className="text-[var(--text-muted)] leading-relaxed">
                    Yelaltı mh. Nur Dikmen CD. No16/1A, Kat 1, Leo Mimarlık Yapı <br />
                    <strong className="text-[var(--text-primary)]">Urla / İzmir</strong>
                  </p>
                </div>

                {/* Acarkent & Istanbul Office */}
                <div className="p-5 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)]/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[var(--accent-gold)] font-semibold tracking-wider block">
                      ACARKENT, İSTANBUL ŞUBESİ
                    </span>
                    <span className="opacity-70 flex items-center gap-1.5 text-[11px]">
                      <Clock size={12} /> Randevu ile kabul
                    </span>
                  </div>
                  <p className="text-[var(--text-muted)] leading-relaxed">
                    Acarlar mahallesi Acarkent Sitesi 3. Cadde Çıra sokak, Leo Mimarlık Yapı <br />
                    <strong className="text-[var(--text-primary)]">Beykoz / İstanbul</strong>
                  </p>
                </div>

                {/* Direct Line & Contact Numbers */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <a
                    href="tel:+905326005555"
                    className="flex items-center gap-3 text-[var(--text-primary)] hover:text-[var(--accent-gold)] transition-colors p-3 rounded-lg border border-[var(--border-color)] bg-[var(--card-bg)]/30"
                  >
                    <div className="p-2 rounded-full bg-[var(--accent-gold)]/15 text-[var(--accent-gold)]">
                      <Phone size={14} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">İletişim & WhatsApp</span>
                      <span className="font-semibold text-xs">0532 600 5555</span>
                    </div>
                  </a>

                  <a
                    href="tel:+905414791555"
                    className="flex items-center gap-3 text-[var(--text-primary)] hover:text-[var(--accent-gold)] transition-colors p-3 rounded-lg border border-[var(--border-color)] bg-[var(--card-bg)]/30"
                  >
                    <div className="p-2 rounded-full bg-[var(--accent-gold)]/15 text-[var(--accent-gold)]">
                      <Phone size={14} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">Doğrudan Hat</span>
                      <span className="font-semibold text-xs">0541 479 1555</span>
                    </div>
                  </a>
                </div>

                {/* Direct Emails */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href="mailto:ersina@leoyapi.com"
                    className="flex items-center gap-3 text-[var(--text-primary)] hover:text-[var(--accent-gold)] transition-colors p-3 rounded-lg border border-[var(--border-color)] bg-[var(--card-bg)]/30"
                  >
                    <div className="p-2 rounded-full bg-[var(--accent-gold)]/15 text-[var(--accent-gold)]">
                      <Mail size={14} />
                    </div>
                    <div className="flex flex-col truncate">
                      <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">Ersin A.</span>
                      <span className="text-xs truncate font-medium">ersina@leoyapi.com</span>
                    </div>
                  </a>

                  <a
                    href="mailto:can@leoyapi.com"
                    className="flex items-center gap-3 text-[var(--text-primary)] hover:text-[var(--accent-gold)] transition-colors p-3 rounded-lg border border-[var(--border-color)] bg-[var(--card-bg)]/30"
                  >
                    <div className="p-2 rounded-full bg-[var(--accent-gold)]/15 text-[var(--accent-gold)]">
                      <Mail size={14} />
                    </div>
                    <div className="flex flex-col truncate">
                      <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">Can B.</span>
                      <span className="text-xs truncate font-medium">can@leoyapi.com</span>
                    </div>
                  </a>
                </div>

                {/* Social Networks: Instagram & YouTube */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href="https://instagram.com/leoyapi_mimarlik"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-[var(--text-primary)] hover:text-[var(--accent-gold)] transition-colors p-3 rounded-lg border border-[var(--border-color)] bg-[var(--card-bg)]/30 group"
                  >
                    <div className="p-2 rounded-full bg-[var(--accent-gold)]/15 text-[var(--accent-gold)] group-hover:scale-110 transition-transform">
                      <InstagramIcon className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex flex-col truncate">
                      <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">Instagram</span>
                      <span className="text-xs truncate font-medium">@leoyapi_mimarlik</span>
                    </div>
                  </a>

                  <a
                    href="https://youtube.com/@leomimarlikyapi?si=LWk9eWyRWRRl4afu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-[var(--text-primary)] hover:text-[var(--accent-gold)] transition-colors p-3 rounded-lg border border-[var(--border-color)] bg-[var(--card-bg)]/30 group"
                  >
                    <div className="p-2 rounded-full bg-[var(--accent-gold)]/15 text-[var(--accent-gold)] group-hover:scale-110 transition-transform">
                      <YoutubeIcon className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex flex-col truncate">
                      <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">YouTube Kanalı</span>
                      <span className="text-xs truncate font-medium">@leomimarlikyapi</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp VIP Button */}
            <div className="mt-8 pt-6 border-t border-[var(--border-color)]">
              <a
                href="https://wa.me/905326005555?text=Merhaba,%20Leo%20Mimarlık%20Yapı%20projeleri%20ve%20mimari%20danışmanlık%20hakkında%20bilgi%20almak%20istiyorum."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#25D366] text-white font-mono text-xs tracking-wider uppercase hover:opacity-90 transition-opacity shadow-sm"
              >
                <MessageSquare size={16} />
                {t('WHATSAPP VIP DANIŞMA HATTI (0532 600 5555)', 'DIRECT WHATSAPP VIP CONCIERGE')}
              </a>
            </div>
          </div>

          {/* Right Column: Architectural Inquire Form */}
          <div className="lg:col-span-7">
            <div
              className="p-8 sm:p-10 rounded-2xl border shadow-xl relative"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--border-color)'
              }}
            >
              <h3 className="font-serif-luxury text-2xl font-medium tracking-tight mb-2">
                {t('Proje Danışmanlık Talep Formu', 'Project Inquiry Brief')}
              </h3>
              <p className="text-xs text-[var(--text-muted)] mb-8">
                {t(
                  'Formu doldurduktan sonra baş mimarımız en geç 24 saat içinde sizinle iletişime geçecektir.',
                  'Our principal architect will reach out within 24 hours of your submission.'
                )}
              </p>

              {submitted ? (
                <div className="py-12 flex flex-col items-center text-center gap-4 animate-in fade-in">
                  <div className="w-14 h-14 rounded-full bg-[var(--accent-gold)]/20 text-[var(--accent-gold)] flex items-center justify-center">
                    <CheckCircle size={32} />
                  </div>
                  <h4 className="font-serif-luxury text-2xl font-medium">
                    {t('Talebiniz Alındı', 'Inquiry Received')}
                  </h4>
                  <p className="text-xs text-[var(--text-muted)] max-w-md">
                    {t(
                      'Detaylı dosyanız mimari ekibimize iletilmiştir. İlginiz için teşekkür ederiz.',
                      'Your project specifications have been dispatched to our architectural studio. Thank you.'
                    )}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="font-mono uppercase opacity-70">
                        {t('Adınız & Soyadınız *', 'Full Name *')}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Sn. ..."
                        className="p-3.5 rounded-lg border bg-transparent focus:border-[var(--accent-gold)] focus:outline-none transition-colors"
                        style={{ borderColor: 'var(--border-color)' }}
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="font-mono uppercase opacity-70">
                        {t('Telefon Numaranız *', 'Phone Number *')}
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+90 (5xx) xxx xx xx"
                        className="p-3.5 rounded-lg border bg-transparent focus:border-[var(--accent-gold)] focus:outline-none transition-colors"
                        style={{ borderColor: 'var(--border-color)' }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="font-mono uppercase opacity-70">
                        {t('E-Posta Adresi', 'Email Address')}
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="ad@ornek.com"
                        className="p-3.5 rounded-lg border bg-transparent focus:border-[var(--accent-gold)] focus:outline-none transition-colors"
                        style={{ borderColor: 'var(--border-color)' }}
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="font-mono uppercase opacity-70">
                        {t('Proje Lokasyonu', 'Project Location')}
                      </label>
                      <select
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="p-3.5 rounded-lg border bg-transparent focus:border-[var(--accent-gold)] focus:outline-none transition-colors"
                        style={{ borderColor: 'var(--border-color)' }}
                      >
                        <option value="urla" className="text-black">Urla / Çeşme / İzmir</option>
                        <option value="acarkent" className="text-black">Acarkent / Beykoz / İstanbul</option>
                        <option value="bodrum" className="text-black">Bodrum / Ege</option>
                        <option value="other" className="text-black">{t('Diğer / Yurt Dışı', 'Other / International')}</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-mono uppercase opacity-70">
                      {t('Proje Tipi & Hizmet Kapsamı', 'Project Typology')}
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="p-3.5 rounded-lg border bg-transparent focus:border-[var(--accent-gold)] focus:outline-none transition-colors"
                      style={{ borderColor: 'var(--border-color)' }}
                    >
                      <option value="villa" className="text-black">{t('Müstakil Villa / Taş Ev Tasarımı & İnşaatı', 'Bespoke Villa / Stone House Design & Build')}</option>
                      <option value="penthouse" className="text-black">{t('Penthouse & Lüks Daire İç Mimari Dönüşümü', 'Penthouse & Luxury Interior Remodel')}</option>
                      <option value="eco" className="text-black">{t('Tarımsal Çiftlik & Eko-Yerleşke Konsepti', 'Agricultural Estate & Eco-Farmstead')}</option>
                      <option value="restoration" className="text-black">{t('Restorasyon & Ruhsatlı Yapılandırma', 'Heritage Restoration & Permitting')}</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-mono uppercase opacity-70">
                      {t('Proje Notlarınız ve Hayalinizdeki Yaşam', 'Project Scope & Narrative')}
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={t('Arsa büyüklüğü, hedeflenen m², özel beklentileriniz...', 'Land area, intended m², lifestyle expectations...')}
                      className="p-3.5 rounded-lg border bg-transparent focus:border-[var(--accent-gold)] focus:outline-none transition-colors"
                      style={{ borderColor: 'var(--border-color)' }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 py-4 rounded-xl bg-[var(--accent-gold)] text-black font-semibold font-mono tracking-[0.2em] uppercase hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-md"
                  >
                    <Send size={15} />
                    {t('DANIŞMANLIK TALEBİNİ İLET', 'TRANSMIT PROJECT INQUIRY')}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

