import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, projectType, location, message } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Ad ve telefon alanları zorunludur.' },
        { status: 400 }
      );
    }

    const recipient = 'ersina@leoyapi.com';
    const emailSubject = `[LEO Mimarlık Web] Yeni Proje Danışmanlık Talebi: ${name}`;

    const projectTypeLabels: Record<string, string> = {
      villa: 'Müstakil Villa / Taş Ev Tasarımı & İnşaatı',
      penthouse: 'Penthouse & Lüks Daire İç Mimari Dönüşümü',
      eco: 'Tarımsal Çiftlik & Eko-Yerleşke Konsepti',
      restoration: 'Restorasyon & Ruhsatlı Yapılandırma',
    };

    const locationLabels: Record<string, string> = {
      urla: 'Urla / Çeşme / İzmir',
      acarkent: 'Acarkent / Beykoz / İstanbul',
      bodrum: 'Bodrum / Ege',
      other: 'Diğer / Yurt Dışı',
    };

    const formattedProjectType = projectTypeLabels[projectType] || projectType;
    const formattedLocation = locationLabels[location] || location;

    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      return NextResponse.json(
        { error: 'E-posta gönderimi yapılandırılmamış.' },
        { status: 503 }
      );
    }

    const escapeHtml = (value: unknown) =>
      String(value ?? '')
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: 'LEO Mimarlık Web <onboarding@resend.dev>',
        to: [recipient],
        subject: emailSubject,
        html: `
              <h2>Yeni Proje Danışmanlık Talebi</h2>
              <p><strong>Ad Soyad:</strong> ${escapeHtml(name)}</p>
              <p><strong>Telefon:</strong> ${escapeHtml(phone)}</p>
              <p><strong>E-Posta:</strong> ${escapeHtml(email || 'Belirtilmedi')}</p>
              <p><strong>Lokasyon:</strong> ${escapeHtml(formattedLocation)}</p>
              <p><strong>Proje Tipi:</strong> ${escapeHtml(formattedProjectType)}</p>
              <p><strong>Notlar / Mesaj:</strong></p>
              <p style="white-space: pre-wrap; background: #f5f5f5; padding: 12px; border-radius: 8px;">${escapeHtml(message || 'Belirtilmedi')}</p>
              <hr />
              <small>Bu mesaj LEO Yapı & Mimarlık web sitesi iletişim formundan otomatik iletilmiştir.</small>
            `,
      }),
    });

    if (!resendResponse.ok) {
      console.error('Contact email provider returned status:', resendResponse.status);
      return NextResponse.json(
        { error: 'E-posta gönderimi başarısız oldu.' },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      recipient,
      message: 'Talep başarıyla alındı ve iletildi.',
    });
  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      { error: 'Talep işlenirken bir hata oluştu.' },
      { status: 500 }
    );
  }
}
