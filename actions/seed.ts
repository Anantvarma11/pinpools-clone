'use server';

import { prisma } from '@/lib/prisma';
import { UserRole, CompanyType, Grade } from '@prisma/client';
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
            where: { role: UserRole.SELLER },
            include: { company: true }
        });

        if (!seller) {
            // Create a demo seller if none exists
            const company = await prisma.company.create({
                data: {
                    name: 'ChemCorp International',
                    type: CompanyType.SUPPLIER,
                }
            });

            seller = await prisma.user.create({
                data: {
                    email: 'seller@chem.com',
                    password: '$2b$10$epWg/y.QdZ.QdZ.QdZ.QdZ.QdZ.QdZ.QdZ.QdZ.QdZ.QdZ.QdZ', // Dummy hash
                    name: 'Demo Seller',
                    role: UserRole.SELLER,
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
                grade: Grade.TECHNICAL,
                moq: 10,
                description: 'High purity acetone for industrial use.',
                priceHint: 850
            },
            {
                iupac_name: 'Sulfuric Acid',
                cas_number: '7664-93-9',
                purity_percentage: 98.0,
                grade: Grade.TECHNICAL,
                moq: 20,
                description: 'Concentrated sulfuric acid.',
                priceHint: 120
            },
            {
                iupac_name: 'Methanol',
                cas_number: '67-56-1',
                purity_percentage: 99.9,
                grade: Grade.PHARMA,
                moq: 5,
                description: 'Pharmaceutical grade methanol.',
                priceHint: 450
            },
            {
                iupac_name: 'Sodium Hydroxide',
                cas_number: '1310-73-2',
                purity_percentage: 50.0,
                grade: Grade.TECHNICAL,
                moq: 25,
                description: 'Caustic soda solution 50%.',
                priceHint: 300
            },
            {
                iupac_name: 'Ethanol',
                cas_number: '64-17-5',
                purity_percentage: 96.0,
                grade: Grade.FOOD,
                moq: 1,
                description: 'Food grade ethanol.',
                priceHint: 900
            }
        ];

        for (const p of products) {
            await prisma.product.create({
                data: {
                    iupac_name: p.iupac_name,
                    cas_number: p.cas_number,
                    purity_percentage: p.purity_percentage,
                    grade: p.grade,
                    moq: p.moq,
                    description: p.description,
                    priceHint: p.priceHint,
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
