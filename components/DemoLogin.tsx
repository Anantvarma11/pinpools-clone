'use client';

import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';

export function DemoLogin() {
    return (
        <div className="mt-6">
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-300 dark:border-slate-700" />
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white dark:bg-slate-900 text-slate-500">Demo Access</span>
                </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
                <Button
                    type="button"
                    variant="outline"
                    className="w-full border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800"
                    onClick={() => signIn("credentials", {
                        email: "buyer@chem.com",
                        password: "secure123",
                        callbackUrl: "/buyer/dashboard"
                    })}
                >
                    Buyer Demo
                </Button>

                <Button
                    type="button"
                    variant="outline"
                    className="w-full border-green-200 bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800"
                    onClick={() => signIn("credentials", {
                        email: "seller@chem.com",
                        password: "secure123",
                        callbackUrl: "/seller/dashboard"
                    })}
                >
                    Seller Demo
                </Button>
            </div>
        </div>
    );
}
