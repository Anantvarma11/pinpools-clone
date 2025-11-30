import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
    const session = await auth();

    if (!session?.user) {
        redirect('/auth/login');
    }

    const role = session.user.role?.toLowerCase();

    if (role === 'seller') {
        redirect('/seller/dashboard');
    } else if (role === 'buyer') {
        redirect('/buyer/dashboard');
    } else {
        // Fallback or default
        redirect('/buyer/dashboard');
    }
}
