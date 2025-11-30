import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Prisma Client keys:', Object.keys(prisma));
    // Also check if we can access the models
    // @ts-ignore
    if (prisma.RFX) console.log('prisma.RFX exists');
    // @ts-ignore
    if (prisma.rFX) console.log('prisma.rFX exists');
    // @ts-ignore
    if (prisma.rfx) console.log('prisma.rfx exists');

    // @ts-ignore
    if (prisma.BidVersion) console.log('prisma.BidVersion exists');
    // @ts-ignore
    if (prisma.bidVersion) console.log('prisma.bidVersion exists');
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
