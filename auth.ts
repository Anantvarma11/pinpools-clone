import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import { authConfig } from './auth.config';

const prisma = new PrismaClient();

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
                return null;
            },
        }),
    ],
});
