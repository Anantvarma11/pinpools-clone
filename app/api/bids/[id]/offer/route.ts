import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { z } from 'zod';
import { recordBidHash } from '@/lib/onchain';
import crypto from 'crypto';
import { canAccessRfx } from '@/lib/permissions';

const createBidSchema = z.object({
    amount: z.number().positive(),
    termsJson: z.any(),
});

export async function POST(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id: rfxId } = await params;
        const body = await req.json();
        const validatedData = createBidSchema.parse(body);

        // Check if RFX exists and is active
        // @ts-ignore
        const rfx = await prisma.rFX.findUnique({
            where: { id: rfxId },
            include: { invites: true },
        });

        if (!rfx) {
            return NextResponse.json({ error: 'RFX not found' }, { status: 404 });
        }

        if (!canAccessRfx({ id: session.user.id, email: session.user.email }, rfx)) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        if (new Date() > rfx.deadline) {
            return NextResponse.json({ error: 'Bidding closed' }, { status: 400 });
        }

        // Create BidVersion
        // @ts-ignore
        const bid = await prisma.bidVersion.create({
            data: {
                rfxId,
                authorId: session.user.id,
                amount: validatedData.amount,
                termsJson: validatedData.termsJson || {},
                status: 'SUBMITTED',
            },
        });

        // Hash and record on-chain
        const salt = Math.random().toString(36).substring(7); // Simple salt for MVP
        const bidHash = crypto
            .createHash('sha256')
            .update(JSON.stringify({ amount: bid.amount, salt }))
            .digest('hex');

        // Fire and forget on-chain recording, but try to update DB if successful
        recordBidHash(bid.id, bidHash).then(async (txHash) => {
            if (txHash) {
                await prisma.bidVersion.update({
                    where: { id: bid.id },
                    data: { txHash },
                });
            }
        }).catch(console.error);

        return NextResponse.json(bid, { status: 201 });
    } catch (error) {
        console.error('Error creating bid:', error);
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.issues }, { status: 400 });
        }
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
