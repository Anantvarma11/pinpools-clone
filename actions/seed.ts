'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function seedProducts() {
    try {
        // Check if we already have products
        const count = await prisma.product.count();
        if (count > 0) {
            return { success: false, message: 'Products already exist' };
        }

        // Find or create a seller
        let seller = await prisma.user.findFirst({
            where: { role: 'SELLER' },
            include: { company: true }
        });

        if (!seller) {
            // Create a demo seller if none exists (should exist from seed.ts but just in case)
            const company = await prisma.company.create({
                data: {
                    name: 'ChemCorp International',
                    // taxId: 'DE123456789', // Removed as it might not be in schema
                    address: 'Chemical Valley 1, Frankfurt',
                    country: 'Germany',
                    type: 'SUPPLIER',
                    verificationStatus: 'VERIFIED'
                }
            });

            seller = await prisma.user.create({
                data: {
                    email: 'seller@chem.com',
                    passwordHash: '$2b$10$epWg/y.QdZ.QdZ.QdZ.QdZ.QdZ.QdZ.QdZ.QdZ.QdZ.QdZ.QdZ', // Dummy hash
                    name: 'Demo Seller',
                    role: 'SELLER',
                    companyId: company.id
                },
                include: { company: true }
            });
        }

        if (!seller.companyId) {
            return { success: false, message: 'Seller has no company' };
        }

        // Create sample products
        const products = [
            {
                iupac_name: 'Acetone',
                cas_number: '67-64-1',
                purity_percentage: 99.5,
                grade: 'TECHNICAL',
                moq: 10,
                description: 'High purity acetone for industrial use.',
                priceHint: 850
            },
            {
                iupac_name: 'Sulfuric Acid',
                cas_number: '7664-93-9',
                purity_percentage: 98.0,
                grade: 'TECHNICAL',
                moq: 20,
                description: 'Concentrated sulfuric acid.',
                priceHint: 120
            },
            {
                iupac_name: 'Methanol',
                cas_number: '67-56-1',
                purity_percentage: 99.9,
                grade: 'PHARMACEUTICAL',
                moq: 5,
                description: 'Pharmaceutical grade methanol.',
                priceHint: 450
            },
            {
                iupac_name: 'Sodium Hydroxide',
                cas_number: '1310-73-2',
                purity_percentage: 50.0,
                grade: 'TECHNICAL',
                moq: 25,
                description: 'Caustic soda solution 50%.',
                priceHint: 300
            },
            {
                iupac_name: 'Ethanol',
                cas_number: '64-17-5',
                purity_percentage: 96.0,
                grade: 'FOOD',
                moq: 1,
                description: 'Food grade ethanol.',
                priceHint: 900
            }
        ];

        for (const p of products) {
            await prisma.product.create({
                data: {
                    ...p,
                    // @ts-ignore - Enum handling might be tricky with strings
                    grade: p.grade,
                    companyId: seller.companyId,
                    ec_number: '000-000-0', // Placeholder
                    synonyms: p.iupac_name,
                    sustainability_rating: 0
                }
            });
        }

        revalidatePath('/marketplace');
        return { success: true, message: 'Seeded 5 products' };
    } catch (error) {
        console.error('Seeding failed:', error);
        return { success: false, message: 'Seeding failed' };
    }
}
