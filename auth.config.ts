import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/auth/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            const isOnSourcing = nextUrl.pathname.startsWith('/sourcing');
            const isOnAnalytics = nextUrl.pathname.startsWith('/analytics');
            const isOnAuth = nextUrl.pathname.startsWith('/auth');

            if (isOnDashboard || isOnSourcing || isOnAnalytics) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn && isOnAuth) {
                return Response.redirect(new URL('/dashboard/tenders', nextUrl));
            }
            return true;
        },
    },
    providers: [], // Providers are added in auth.ts
} satisfies NextAuthConfig;
