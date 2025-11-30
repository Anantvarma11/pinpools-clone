import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { canAccessRfx } from '@/lib/permissions';

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const user = await getCurrentUser();
        if (!user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;

        // @ts-ignore
        const rfx = await prisma.rFX.findUnique({
            where: { id },
            include: {
                invites: true,
                bids: {
                    include: {
                        author: {
                            select: { name: true, email: true },
                        },
                    },
                },
                product: true,
                owner: {
                    select: { name: true, kycStatus: true, creditLine: true },
                },
            },
        });

        if (!rfx) {
            return NextResponse.json({ error: 'RFX not found' }, { status: 404 });
        }

        if (!canAccessRfx({ id: user.id, email: user.email }, rfx)) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        return NextResponse.json(rfx);
    } catch (error) {
        console.error('Error fetching RFX:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
