'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, CheckCircle, ExternalLink, RefreshCw } from 'lucide-react';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    projectType: 'villa',
    location: 'urla',
    message: ''
  });
  const [honeypot, setHoneypot] = useState('');
  const formStartTime = React.useRef<number>(0);
  React.useEffect(() => {
    formStartTime.current = Date.now();
  }, []);

  const getMailtoUrl = () => {
    const subject = encodeURIComponent(`[LEO Mimarlık Web] Proje Danışmanlık Talebi - ${formData.name}`);
    const body = encodeURIComponent(
      `Sayın Ersin Aslan,\n\n` +
      `Web siteniz üzerinden yeni bir proje danışmanlık talebi doldurulmuştur:\n\n` +
      `• Ad Soyad: ${formData.name}\n` +
      `• Telefon: ${formData.phone}\n` +
      `• E-Posta: ${formData.email || 'Belirtilmedi'}\n` +
      `• Proje Lokasyonu: ${formData.location}\n` +
      `• Proje Tipi: ${formData.projectType}\n` +
      `• Proje Notları & Beklentiler:\n${formData.message || 'Not girilmedi'}\n\n` +
      `İyi çalışmalar dilerim.`
    );
    return `mailto:ersina@leoyapi.com?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          _hp: honeypot,
          _ts: formStartTime.current,
        }),
      });
      if (!response.ok) throw new Error('Contact request failed');
      setSubmitted(true);
      setSubmitError(false);
    } catch {
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      projectType: 'villa',
      location: 'urla',
      message: ''
    });
    setSubmitted(false);
    setSubmitError(false);
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
              </div>

              {/* Direct Partner Contacts */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                <a
                  href="mailto:ersina@leoyapi.com"
                  className="p-4 rounded-xl border border-[var(--border-color)] hover:border-[var(--accent-gold)] flex items-center gap-3 transition-colors bg-[var(--card-bg)]/30 group"
                >
                  <div className="w-8 h-8 rounded-full bg-[var(--accent-gold)]/10 text-[var(--accent-gold)] flex items-center justify-center">
                    <Mail size={14} />
                  </div>
                  <div>
                    <span className="opacity-60 text-[10px] uppercase block">ERSİN ASLAN</span>
                    <span className="font-semibold group-hover:text-[var(--accent-gold)]">ersina@leoyapi.com</span>
                  </div>
                </a>

                <a
                  href="mailto:can@leoyapi.com"
                  className="p-4 rounded-xl border border-[var(--border-color)] hover:border-[var(--accent-gold)] flex items-center gap-3 transition-colors bg-[var(--card-bg)]/30 group"
                >
                  <div className="w-8 h-8 rounded-full bg-[var(--accent-gold)]/10 text-[var(--accent-gold)] flex items-center justify-center">
                    <Mail size={14} />
                  </div>
                  <div>
                    <span className="opacity-60 text-[10px] uppercase block">CAN ASLAN</span>
                    <span className="font-semibold group-hover:text-[var(--accent-gold)]">can@leoyapi.com</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Direct WhatsApp Concierge Button */}
            <div className="mt-8">
              <a
                href="https://wa.me/905326005555?text=Merhaba,%20LEO%20Mimarlık%20ve%20Yapı%20projeleriniz%20hakkında%20bilgi%20almak%20istiyorum."
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
                  'Formu ilettikten sonra bilgileriniz doğrudan baş mimarımız Ersin Aslan\'a (ersina@leoyapi.com) ulaşacak ve en geç 24 saat içinde dönüş sağlanacaktır.',
                  'Your inquiry will be routed directly to our principal architect Ersin Aslan (ersina@leoyapi.com).'
                )}
              </p>

              {submitted ? (
                <div className="py-10 flex flex-col items-center text-center gap-5 animate-in fade-in">
                  <div className="w-16 h-16 rounded-full bg-[var(--accent-gold)]/20 text-[var(--accent-gold)] flex items-center justify-center">
                    <CheckCircle size={36} />
                  </div>
                  <h4 className="font-serif-luxury text-2xl sm:text-3xl font-medium">
                    {t('Talebiniz Alındı', 'Inquiry Received')}
                  </h4>
                  <p className="text-sm text-[var(--text-muted)] max-w-md leading-relaxed">
                    {t(
                      'Detaylı proje dosyanız mimari ekibimize ve ersina@leoyapi.com adresine başarıyla iletilmiştir. En kısa sürede sizinle iletişime geçeceğiz.',
                      'Your project specifications have been dispatched to our architectural team and ersina@leoyapi.com.'
                    )}
                  </p>

                  <div className="flex flex-col sm:flex-row items-center gap-3 mt-4 w-full max-w-md">
                    <a
                      href={getMailtoUrl()}
                      className="w-full py-3 px-5 rounded-xl border border-[var(--accent-gold)] bg-[var(--accent-gold)]/10 text-[var(--accent-gold)] hover:bg-[var(--accent-gold)] hover:text-black font-mono text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                    >
                      <Mail size={14} />
                      <span>{t('E-Posta İstemcisiyle de Gönder', 'Open in Email Client')}</span>
                    </a>

                    <button
                      onClick={resetForm}
                      className="w-full py-3 px-5 rounded-xl border border-[var(--border-color)] hover:border-[var(--accent-gold)] text-[var(--text-primary)] font-mono text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                    >
                      <RefreshCw size={14} />
                      <span>{t('Yeni Talep Gönder', 'New Inquiry')}</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-xs">
                  {/* Honeypot - gizli alan, botlar doldurur insanlar görmez */}
                  <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}>
                    <input
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>
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
                    disabled={isSubmitting}
                    className="w-full mt-2 py-4 rounded-xl bg-[var(--accent-gold)] text-black font-semibold font-mono tracking-[0.2em] uppercase hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-md disabled:opacity-50 cursor-pointer"
                  >
                    <Send size={15} />
                    <span>
                      {isSubmitting
                        ? t('GÖNDERİLİYOR...', 'SENDING...')
                        : t('GÖNDER', 'SEND')}
                    </span>
                  </button>
                  {submitError && (
                    <div role="alert" className="p-4 border border-[var(--accent-gold)]/50 text-sm text-[var(--text-muted)] leading-relaxed">
                      {t(
                        'Talebiniz şu anda gönderilemedi. Bilgilerinizi e-posta uygulamanızda açıp doğrudan iletebilirsiniz.',
                        'Your inquiry could not be sent. Open it in your email app to send it directly.'
                      )}{' '}
                      <a href={getMailtoUrl()} className="underline underline-offset-4 text-[var(--accent-gold)]">
                        {t('E-posta ile gönder', 'Send by email')}
                      </a>
                    </div>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
