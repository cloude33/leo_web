import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';

export const metadata: Metadata = {
  title: 'LEO YAPI & MİMARLIK | Urla & Acarkent Butik Mimari',
  description: "2006'dan beri Urla ve İstanbul'da çağdaş lüks, taş dokusu ve yüksek mimari konseptler üreten butik yapı stüdyosu.",
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
      <body className="antialiased" suppressHydrationWarning>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
