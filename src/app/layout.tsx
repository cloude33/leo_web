import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';

export const metadata: Metadata = {
  title: 'LEO YAPI & MİMARLIK | Urla & Acarkent Butik Mimari',
  description: "2004'ten beri Urla ve İstanbul'da çağdaş lüks, taş dokusu ve yüksek mimari konseptler üreten butik yapı stüdyosu.",
  icons: {
    icon: [
      { url: '/logo1.avif', type: 'image/avif' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: '/logo1.avif',
    shortcut: '/logo1.avif',
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
        <link rel="icon" href="/logo1.avif" type="image/avif" />
        <link rel="shortcut icon" href="/logo1.avif" />
        <link rel="apple-touch-icon" href="/logo1.avif" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=Manrope:wght@400;500;600&display=swap" rel="stylesheet" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var savedTheme = localStorage.getItem('leo_theme');
                if (savedTheme === 'light') {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.classList.add('light');
                  document.documentElement.setAttribute('data-theme', 'light');
                } else if (savedTheme === 'dark') {
                  document.documentElement.classList.add('dark');
                  document.documentElement.classList.remove('light');
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              } catch (e) {}

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
