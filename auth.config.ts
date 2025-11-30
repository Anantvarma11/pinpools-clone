import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/auth/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            const isOnBuyerDashboard = nextUrl.pathname.startsWith('/buyer');
            const isOnSellerDashboard = nextUrl.pathname.startsWith('/seller');
            const isOnSourcing = nextUrl.pathname.startsWith('/sourcing');
            const isOnAnalytics = nextUrl.pathname.startsWith('/analytics');
            const isOnAuth = nextUrl.pathname.startsWith('/auth');

            if (isOnDashboard || isOnSourcing || isOnAnalytics || isOnBuyerDashboard || isOnSellerDashboard) {
                if (isLoggedIn) {
                    // Role-based protection
                    // Note: auth.user.role might not be available here in all NextAuth versions in middleware
                    // but we added it to the session type.
                    // However, in middleware, we might need to rely on the token if session callback isn't run.
                    // For now, let's assume basic login check is enough for MVP, 
                    // or check if we can access role.
                    // Actually, let's just ensure they are logged in for now.
                    // Strict role checking in middleware can be tricky without database access.
                    // We'll rely on the page-level redirect in /dashboard/page.tsx for the main entry point,
                    // and here just ensure they are logged in.
                    return true;
                }
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn && isOnAuth) {
                return Response.redirect(new URL('/dashboard', nextUrl));
            }
            return true;
        },
    },
    providers: [], // Providers are added in auth.ts
} satisfies NextAuthConfig;
