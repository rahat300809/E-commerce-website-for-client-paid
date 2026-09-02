import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ZENVY | Premium Sportswear & Elite Football Kits',
  description: 'ZENVY is a luxury sportswear brand offering high-performance jerseys, custom kits, and limited preorders.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400&family=Geist:wght@400;500;600;700&family=Hanken+Grotesk:ital,wght@0,300;0,400;0,600;0,700;0,800;0,900;1,400&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-on-surface antialiased selection:bg-primary selection:text-on-primary min-h-screen flex flex-col relative">
        {children}
      </body>
    </html>
  );
}
