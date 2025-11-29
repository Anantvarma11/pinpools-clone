import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import { Menu, X, Hexagon } from 'lucide-react';
import { ThemeProvider } from '@/components/theme-provider';
import { ModeToggle } from '@/components/mode-toggle';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ChemSphere Nexus | B2B Chemical Marketplace',
  description: 'The Operating System for Agile Chemical Procurement.',
};

import { auth } from '@/auth';
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
          <nav className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <Link href="/" className="flex-shrink-0 flex items-center">
                    <Hexagon className="h-8 w-8 text-teal-600 mr-2" />
                    <span className="font-bold text-xl text-slate-900 dark:text-white">ChemSphere</span>
                  </Link>
                  <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                    <Link href="/marketplace" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-slate-900 dark:text-slate-100 hover:text-teal-600 dark:hover:text-teal-400">
                      Marketplace
                    </Link>
                    <div className="relative group inline-flex items-center">
                      <button className="inline-flex items-center px-1 pt-1 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100">
                        Products
                      </button>
                      <div className="absolute left-0 top-full w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg rounded-lg py-2 hidden group-hover:block">
                        <Link href="/product/sourcing" className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800">Sourcing Engine</Link>
                        <Link href="/product/data-cube" className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800">Data Cube</Link>
                        <Link href="/product/tender-management" className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800">Tender Mgmt</Link>
                      </div>
                    </div>
                    <Link href="/customers" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100">
                      Customers
                    </Link>
                    <Link href="/about-us" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100">
                      About
                    </Link>
                  </div>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
                  <ModeToggle />
                  {session?.user ? (
                    <UserAccountNav user={session.user} />
                  ) : (
                    <>
                      <Link href="/auth/login" className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100">
                        Log in
                      </Link>
                      <Link href="/auth/register" className="px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700">
                        Sign up
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </nav>

          <main>{children}</main>

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
