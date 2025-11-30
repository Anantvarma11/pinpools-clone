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

    const role = user?.role?.toLowerCase();

    return (
        <nav className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <Link href="/" className="flex-shrink-0 flex items-center">
                            <Hexagon className="h-8 w-8 text-teal-600 mr-2" />
                            <span className="font-bold text-xl text-slate-900 dark:text-white">ChemSphere</span>
                        </Link>
                        <div className="hidden sm:ml-6 sm:flex sm:gap-6 items-center">
                            {/* Common Links - Always Visible */}
                            <Link
                                href="/product/sourcing"
                                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${pathname === '/product/sourcing' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}
                            >
                                Sourcing
                            </Link>
                            <Link
                                href="/marketplace"
                                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${pathname === '/marketplace' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}
                            >
                                Marketplace
                            </Link>

                            {/* Buyer Links */}
                            {role === 'buyer' && (
                                <>
                                    <Link
                                        href="/buyer/dashboard"
                                        className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${pathname === '/buyer/dashboard' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}
                                    >
                                        My Dashboard
                                    </Link>
                                    <Link
                                        href="/buyer/my-rfx"
                                        className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${pathname === '/buyer/my-rfx' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}
                                    >
                                        My RFXs
                                    </Link>
                                </>
                            )}

                            {/* Seller Links */}
                            {role === 'seller' && (
                                <>
                                    <Link
                                        href="/seller/dashboard"
                                        className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${pathname === '/seller/dashboard' ? 'border-b-2 border-green-600 text-green-600' : 'text-slate-600 hover:text-green-600'}`}
                                    >
                                        My Dashboard
                                    </Link>
                                    <Link
                                        href="/seller/listings/new"
                                        className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${pathname === '/seller/listings/new' ? 'border-b-2 border-green-600 text-green-600' : 'text-slate-600 hover:text-green-600'}`}
                                    >
                                        Add Product
                                    </Link>
                                    <Link
                                        href="/seller/incoming"
                                        className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${pathname === '/seller/incoming' ? 'border-b-2 border-green-600 text-green-600' : 'text-slate-600 hover:text-green-600'}`}
                                    >
                                        Incoming Opportunities
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
                        {user ? (
                            <>
                                <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${role === 'seller' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                                    {role || 'User'}
                                </span>
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
                                    className="text-sm font-medium text-black dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
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
