import { PrismaClient, Grade, TenderType, TenderStatus, Incoterms, CompanyType, UserRole } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
    console.log('Starting seed...');

    // Cleanup
    await prisma.market_Data.deleteMany();
    await prisma.tender.deleteMany();
    await prisma.product.deleteMany();
    await prisma.user.deleteMany();
    await prisma.company.deleteMany();

    console.log('Cleanup finished.');

    // Create Companies
    const suppliers = [];
    for (let i = 0; i < 5; i++) {
        const company = await prisma.company.create({
            data: {
                name: `${faker.company.name()} Chemicals`,
                type: CompanyType.SUPPLIER,
            },
        });
        suppliers.push(company);

        // Create Admin User for Supplier
        await prisma.user.create({
            data: {
                email: `admin@${company.name.replace(/\s/g, '').toLowerCase()}.com`,
                name: faker.person.fullName(),
                role: UserRole.ADMIN,
                companyId: company.id,
            },
        });
    }

    const buyers = [];
    for (let i = 0; i < 5; i++) {
        const company = await prisma.company.create({
            data: {
                name: `${faker.company.name()} Manufacturing`,
                type: CompanyType.BUYER,
            },
        });
        buyers.push(company);

        // Create Admin User for Buyer
        await prisma.user.create({
            data: {
                email: `procurement@${company.name.replace(/\s/g, '').toLowerCase()}.com`,
                name: faker.person.fullName(),
                role: UserRole.ADMIN,
                companyId: company.id,
            },
        });
    }

    console.log('Companies and Users created.');

    // Create Products (assigned to Suppliers)
    const productNames = [
        'Acetone', 'Benzene', 'Toluene', 'Xylene', 'Methanol', 'Ethanol', 'Isopropanol', 'Sulfuric Acid', 'Hydrochloric Acid', 'Nitric Acid',
        'Sodium Hydroxide', 'Potassium Hydroxide', 'Ammonia', 'Urea', 'Ethylene Glycol', 'Propylene Glycol', 'Glycerin', 'Phenol', 'Formaldehyde', 'Acetic Acid',
        'Citric Acid', 'Phosphoric Acid', 'Sodium Carbonate', 'Sodium Bicarbonate', 'Calcium Carbonate', 'Magnesium Oxide', 'Titanium Dioxide', 'Zinc Oxide', 'Copper Sulfate', 'Iron Oxide',
        'Hydrogen Peroxide', 'Sodium Hypochlorite', 'Chlorine', 'Bromine', 'Iodine', 'Sulfur', 'Phosphorus', 'Potassium Chloride', 'Sodium Chloride', 'Calcium Chloride',
        'Magnesium Chloride', 'Aluminum Sulfate', 'Ferric Chloride', 'Polyethylene', 'Polypropylene', 'Polystyrene', 'PVC', 'PET', 'Nylon', 'Teflon'
    ];

    const products = [];
    for (const name of productNames) {
        // Assign to a random supplier
        const supplier = suppliers[Math.floor(Math.random() * suppliers.length)];

        // Generate variations for grades
        for (const grade of [Grade.TECHNICAL, Grade.PHARMA, Grade.FOOD]) {
            // Unique CAS for each grade variation to satisfy unique constraint
            const baseCas = faker.string.numeric(6);
            const cas = `${baseCas}-${faker.string.numeric(2)}-${faker.string.numeric(1)}`;

            const product = await prisma.product.create({
                data: {
                    cas_number: cas,
                    ec_number: `200-${faker.string.numeric(3)}-${faker.string.numeric(1)}`,
                    iupac_name: name,
                    synonyms: faker.lorem.words(3),
                    purity_percentage: 95 + Math.random() * 5,
                    grade: grade,
                    sustainability_rating: Math.floor(Math.random() * 100),
                    companyId: supplier.id,
                },
            });
            products.push(product);
        }
    }

    console.log(`Created ${products.length} products.`);

    // Create Tenders (linked to Buyers)
    // Historical (Awarded)
    for (let i = 0; i < 10; i++) {
        const buyer = buyers[Math.floor(Math.random() * buyers.length)];
        const buyerUser = await prisma.user.findFirst({ where: { companyId: buyer.id } });

        if (!buyerUser) continue;

        await prisma.tender.create({
            data: {
                buyer_id: buyerUser.id,
                type: Math.random() > 0.5 ? TenderType.SPOT : TenderType.CONTRACT,
                status: TenderStatus.AWARDED,
                incoterms: Incoterms.DDP,
                delivery_date: faker.date.future(),
                region: faker.location.country(),
                invited_suppliers: 'ALL_MATCHING',
                line_items: JSON.stringify([{
                    product: productNames[Math.floor(Math.random() * productNames.length)],
                    volume: 1000 + Math.random() * 9000,
                    target_price: 100 + Math.random() * 50
                }]),
                createdAt: faker.date.past(),
            }
        });
    }

    // Live (Open)
    for (let i = 0; i < 5; i++) {
        const buyer = buyers[Math.floor(Math.random() * buyers.length)];
        const buyerUser = await prisma.user.findFirst({ where: { companyId: buyer.id } });

        if (!buyerUser) continue;

        await prisma.tender.create({
            data: {
                buyer_id: buyerUser.id,
                type: TenderType.SPOT,
                status: TenderStatus.OPEN,
                incoterms: Incoterms.DDP,
                delivery_date: faker.date.future(),
                region: faker.location.country(),
                invited_suppliers: 'ALL_MATCHING',
                line_items: JSON.stringify([{
                    product: productNames[Math.floor(Math.random() * productNames.length)],
                    volume: 500 + Math.random() * 2000,
                    target_price: 120 + Math.random() * 30
                }]),
            }
        });
    }

    console.log('Tenders created.');

    // Market Data (12 months history for each product)
    for (const product of products) {
        let currentPrice = 100 + Math.random() * 50;

        for (let i = 0; i < 12; i++) {
            const date = new Date();
            date.setMonth(date.getMonth() - i);

            const variation = (Math.random() - 0.5) * 0.1;
            currentPrice = currentPrice * (1 + variation);

            await prisma.market_Data.create({
                data: {
                    cas_number: product.cas_number,
                    transaction_date: date,
                    unit_price: parseFloat(currentPrice.toFixed(2)),
                    currency: 'EUR',
                    volume: 1000 + Math.random() * 5000,
                },
            });
        }
    }

    console.log('Market Data created.');
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
