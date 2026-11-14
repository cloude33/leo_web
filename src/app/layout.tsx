import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';

export const metadata: Metadata = {
  title: 'LEO YAPI & MİMARLIK | Urla & Acarkent Butik Mimari',
  description: "2004'ten beri Urla ve İstanbul'da çağdaş lüks, taş dokusu ve yüksek mimari konseptler üreten butik yapı stüdyosu.",
  icons: {
    icon: '/logo_enhanced.avif',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800;900&display=swap" rel="stylesheet" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined') {
                window.addEventListener('error', function(e) {
                  if (e.filename && e.filename.startsWith('chrome-extension://')) {
                    e.stopImmediatePropagation();
                  }
                }, true);
                window.addEventListener('unhandledrejection', function(e) {
                  var reason = e.reason && (e.reason.stack || e.reason.message || '');
                  if (typeof reason === 'string' && (reason.includes('chrome-extension://') || reason.includes('MetaMask') || reason.includes('nkbihfbeogaeaoehlefnkodbefgpgknn'))) {
                    e.stopImmediatePropagation();
                    e.preventDefault();
                  }
                }, true);
              }
            `,
          }}
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
