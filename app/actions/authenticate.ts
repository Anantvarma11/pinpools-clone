'use server';

import { signIn, signOut } from '@/auth';

import { AuthError } from 'next-auth';

export async function logout() {
    await signOut({ redirectTo: "/" });
}

export async function loginWithGithub() {
    await signIn("github", { redirectTo: "/dashboard/tenders" });
}

export async function loginWithCredentials(formData: FormData) {
    try {
        await signIn("credentials", {
            ...Object.fromEntries(formData),
            redirectTo: "/dashboard/tenders",
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}
