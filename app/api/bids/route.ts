import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

// GET: List all PUBLIC RFXs
export async function GET(request: Request) {
    try {
        const rfqs = await prisma.RFX.findMany({
            where: { mode: "PUBLIC" },
            orderBy: { createdAt: "desc" },
            include: {
                owner: { select: { name: true, email: true } },
                _count: { select: { bids: true } },
            },
        });
        return NextResponse.json({ ok: true, data: rfqs });
    } catch (error) {
        console.error("Error fetching RFXs:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// POST: Create a new RFX
export async function POST(request: Request) {
    try {
        const session = await auth();
        if (!session || !session.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { productId, quantity, mode, deadline, unit } = body;

        if (!productId || !quantity || !deadline) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const newRfx = await prisma.RFX.create({
            data: {
                productId,
                ownerId: user.id,
                quantity: Number(quantity),
                unit: unit || "MT",
                mode: mode || "PUBLIC",
                deadline: new Date(deadline),
                title: `Request for ${quantity} ${unit || 'MT'}`,
            },
        });

        return NextResponse.json({ ok: true, rfx: newRfx });
    } catch (error) {
        console.error("Error creating bid:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
