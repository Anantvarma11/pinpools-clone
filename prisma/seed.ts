import { PrismaClient, UserRole, CompanyType, Grade } from '@prisma/client';
import { hash } from 'crypto'; // Mock hash for password

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding database...');

    // 1. Create or Find Supplier Company
    let company = await prisma.company.findFirst({ where: { name: 'ChemCorp Global' } });
    if (!company) {
        company = await prisma.company.create({
            data: {
                name: 'ChemCorp Global',
                type: CompanyType.SUPPLIER,
            },
        });
        console.log('Created Supplier Company:', company.name);
    }

    // 2. Create or Update Seller
    const seller = await prisma.user.upsert({
        where: { email: 'seller@chem.com' },
        update: {},
        create: {
            email: 'seller@chem.com',
            name: 'Test Seller',
            password: 'secure123',
            role: UserRole.SELLER,
            companyId: company.id,
        },
    });
    console.log('Ensured Seller:', seller.email);

    // 3. Create or Find Buyer Company
    let buyerCompany = await prisma.company.findFirst({ where: { name: 'Buyer Inc.' } });
    if (!buyerCompany) {
        buyerCompany = await prisma.company.create({
            data: {
                name: 'Buyer Inc.',
                type: CompanyType.BUYER,
            },
        });
        console.log('Created Buyer Company:', buyerCompany.name);
    }

    // 4. Create or Update Buyer
    const buyer = await prisma.user.upsert({
        where: { email: 'buyer@chem.com' },
        update: {},
        create: {
            email: 'buyer@chem.com',
            name: 'Test Buyer',
            password: 'secure123',
            role: UserRole.BUYER,
            companyId: buyerCompany.id,
        },
    });
    console.log('Ensured Buyer:', buyer.email);

    // 5. Create Product if not exists
    const existingProduct = await prisma.product.findFirst({ where: { cas_number: '67-56-1' } });
    if (!existingProduct) {
        await prisma.product.create({
            data: {
                cas_number: '67-56-1',
                iupac_name: 'Methanol',
                synonyms: 'Methyl Alcohol',
                purity_percentage: 99.8,
                grade: Grade.TECHNICAL,
                sustainability_rating: 85,
                companyId: company.id,
            },
        });
        console.log('Created Product: Methanol');
    } else {
        console.log('Product Methanol already exists');
    }

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
