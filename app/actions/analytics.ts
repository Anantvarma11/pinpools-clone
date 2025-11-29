'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getMarketData(casNumber: string) {
    const data = await prisma.market_Data.findMany({
        where: { cas_number: casNumber },
        orderBy: { transaction_date: 'asc' },
    });

    return data.map(item => ({
        date: item.transaction_date.toISOString(),
        price: Number(item.unit_price),
    }));
}

export async function getProductList() {
    return await prisma.product.findMany({
        select: { id: true, iupac_name: true, cas_number: true },
        orderBy: { iupac_name: 'asc' },
    });
}
