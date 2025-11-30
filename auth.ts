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

                if (!credentials?.email || !credentials?.password) return null;

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email as string }
                });

                if (!user) return null;

                // Mock password check
                if (credentials.password === "secure123") {
                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
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
