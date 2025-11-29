'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Hexagon } from 'lucide-react';
import { signOutAction } from '@/actions/auth-actions'; // We will create this if it doesn't exist

interface NavbarProps {
    user: any;
}

export default function Navbar({ user }: NavbarProps) {
    const pathname = usePathname();

    return (
        <nav className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <Link href="/" className="flex-shrink-0 flex items-center">
                            <Hexagon className="h-8 w-8 text-teal-600 mr-2" />
                            <span className="font-bold text-xl text-slate-900 dark:text-white">ChemSphere</span>
                        </Link>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <Link
                                href="/product/sourcing"
                                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${pathname === '/product/sourcing'
                                        ? 'text-teal-600 border-b-2 border-teal-600'
                                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                                    }`}
                            >
                                Sourcing
                            </Link>
                            <Link
                                href="/suppliers"
                                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${pathname === '/suppliers'
                                        ? 'text-teal-600 border-b-2 border-teal-600'
                                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                                    }`}
                            >
                                Suppliers
                            </Link>
                            <Link
                                href="/marketplace"
                                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${pathname === '/marketplace'
                                        ? 'text-teal-600 border-b-2 border-teal-600'
                                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                                    }`}
                            >
                                Marketplace
                            </Link>
                        </div>
                    </div>
                    <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
                        {user ? (
                            <>
                                <Link
                                    href="/dashboard/tenders"
                                    className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                                >
                                    Dashboard
                                </Link>
                                <form action={signOutAction}>
                                    <button
                                        type="submit"
                                        className="text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                                    >
                                        Sign Out
                                    </button>
                                </form>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/auth/login"
                                    className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                                >
                                    Log In
                                </Link>
                                <Link
                                    href="/auth/register"
                                    className="px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
