import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import { Menu, X, Hexagon } from 'lucide-react';
import { ThemeProvider } from '@/components/theme-provider';
import { ModeToggle } from '@/components/mode-toggle';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ChemSphere Nexus | B2B Chemical Marketplace',
  description: 'The Operating System for Agile Chemical Procurement.',
};

import { auth } from '@/auth';
import Navbar from '@/components/Navbar';
import { UserAccountNav } from '@/components/UserAccountNav';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar user={session?.user} />

          <main>{children}</main>
          <Toaster />

          <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center text-white mb-4">
                  <Hexagon className="h-6 w-6 mr-2" />
                  <span className="font-bold text-lg">ChemSphere</span>
                </div>
                <p className="text-sm">Digitizing the chemical supply chain.</p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-4">Platform</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/marketplace" className="hover:text-white">Marketplace</Link></li>
                  <li><Link href="/product/sourcing" className="hover:text-white">Sourcing</Link></li>
                  <li><Link href="/product/data-cube" className="hover:text-white">Analytics</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-4">Company</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/about-us" className="hover:text-white">About Us</Link></li>
                  <li><Link href="/customers" className="hover:text-white">Customers</Link></li>
                  <li><Link href="/contact-us" className="hover:text-white">Contact</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-4">Legal</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/imprint" className="hover:text-white">Imprint</Link></li>
                  <li><Link href="/privacy-notice" className="hover:text-white">Privacy Notice</Link></li>
                  <li><Link href="/terms-condition" className="hover:text-white">Terms & Conditions</Link></li>
                </ul>
              </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-800 text-sm text-center">
              &copy; 2025 ChemSphere Nexus GmbH. All rights reserved.
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
