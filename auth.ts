import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import { authConfig } from './auth.config';

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    adapter: PrismaAdapter(prisma),
    session: { strategy: 'jwt' },
    providers: [
        {
            id: 'github',
            name: 'GitHub',
            type: 'oauth',
            authorization: 'https://github.com/login/oauth/authorize',
            token: 'https://github.com/login/oauth/access_token',
            userinfo: 'https://api.github.com/user',
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        },
        Credentials({
            async authorize(credentials) {
                console.log("Checking credentials:", credentials); // Debug log

                if (credentials.email === "buyer@chem.com" && credentials.password === "secure123") {
                    return {
                        id: "1",
                        name: "Test Buyer",
                        email: "buyer@chem.com",
                        role: "buyer",
                    };
                }

                if (credentials.email === "seller@chem.com" && credentials.password === "secure123") {
                    return {
                        id: "2",
                        name: "Test Seller",
                        email: "seller@chem.com",
                        role: "seller",
                    };
                }
                return null;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user && token.role) {
                session.user.role = token.role as string;
            }
            return session;
        },
    },
});
