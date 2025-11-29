'use server';

import { PrismaClient, TenderType, Incoterms, TenderStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const prisma = new PrismaClient();

export async function getProducts(query?: string) {
    const where: any = {};
    if (query) {
        where.OR = [
            { iupac_name: { contains: query } },
            { cas_number: { contains: query } },
            { synonyms: { contains: query } },
        ];
    }
    return await prisma.product.findMany({ where, take: 20 });
}

export async function createTender(data: {
    type: TenderType;
    incoterms: Incoterms;
    delivery_date: Date;
    region: string;
    line_items: any[];
    invited_suppliers: string[];
}) {
    const tender = await prisma.tender.create({
        data: {
            buyer_id: 'demo-buyer-id', // Placeholder for auth
            type: data.type,
            status: TenderStatus.OPEN,
            incoterms: data.incoterms,
            delivery_date: data.delivery_date,
            region: data.region,
            line_items: JSON.stringify(data.line_items),
            invited_suppliers: data.invited_suppliers.join(','),
        },
    });

    revalidatePath('/dashboard/tenders');
    redirect('/dashboard/tenders');
}
