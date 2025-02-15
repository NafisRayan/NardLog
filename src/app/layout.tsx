import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Layout } from '@/components/layout/Layout';
import { ThemeProvider } from '@/lib/context/ThemeContext';
import { AuthProvider } from '@/lib/context/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next.js Blog',
  description: 'A modern blog platform built with Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
        <AuthProvider>
          <ThemeProvider>
            <Layout>
              <main className="min-h-screen">{children}</main>
            </Layout>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
