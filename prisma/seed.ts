import { PrismaClient } from '@prisma/client';
import { hash } from 'crypto'; // Mock hash for password

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding database...');

    // Create Company
    const company = await prisma.company.create({
        data: {
            name: 'ChemCorp Global',
            type: 'SUPPLIER',
        },
    });

    // Create Seller
    const seller = await prisma.user.upsert({
        where: { email: 'seller@chem.com' },
        update: {},
        create: {
            email: 'seller@chem.com',
            name: 'Test Seller',
            password: 'secure123', // In real app, hash this
            role: 'USER',
            companyId: company.id,
        },
    });

    // Create Buyer Company
    const buyerCompany = await prisma.company.create({
        data: {
            name: 'Buyer Inc.',
            type: 'BUYER',
        },
    });

    // Create Buyer
    const buyer = await prisma.user.upsert({
        where: { email: 'buyer@chem.com' },
        update: {},
        create: {
            email: 'buyer@chem.com',
            name: 'Test Buyer',
            password: 'secure123',
            role: 'USER',
            companyId: buyerCompany.id,
        },
    });

    // Create Product
    const product = await prisma.product.create({
        data: {
            cas_number: '67-56-1',
            iupac_name: 'Methanol',
            synonyms: 'Methyl Alcohol',
            purity_percentage: 99.8,
            grade: 'TECHNICAL',
            sustainability_rating: 85,
            companyId: company.id,
        },
    });

    console.log({ seller, buyer, product });
    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
