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

    console.log(`[Contact Form Received] Target: ${recipient}`);
    console.log({
      name,
      phone,
      email: email || 'Belirtilmedi',
      projectType: formattedProjectType,
      location: formattedLocation,
      message: message || 'Not girilmedi',
      timestamp: new Date().toISOString(),
    });

    // Check if an external provider API key or webhook is configured
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        await fetch('https://api.resend.com/emails', {
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
              <p><strong>Ad Soyad:</strong> ${name}</p>
              <p><strong>Telefon:</strong> <a href="tel:${phone}">${phone}</a></p>
              <p><strong>E-Posta:</strong> ${email || 'Belirtilmedi'}</p>
              <p><strong>Lokasyon:</strong> ${formattedLocation}</p>
              <p><strong>Proje Tipi:</strong> ${formattedProjectType}</p>
              <p><strong>Notlar / Mesaj:</strong></p>
              <p style="white-space: pre-wrap; background: #f5f5f5; padding: 12px; border-radius: 8px;">${message || 'Belirtilmedi'}</p>
              <hr />
              <small>Bu mesaj LEO Yapı & Mimarlık web sitesi iletişim formundan otomatik iletilmiştir.</small>
            `,
          }),
        });
      } catch (err) {
        console.error('Failed to send via Resend:', err);
      }
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
