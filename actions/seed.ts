'use server';

import { prisma } from '@/lib/prisma';
import { UserRole, CompanyType, Grade } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export async function seedProducts() {
    try {
        console.log('Starting seed process...');

        // 1. Ensure Users (Admin, Seller, Buyer) exist

        // Admin
        let admin = await prisma.user.findFirst({ where: { role: UserRole.ADMIN } });
        if (!admin) {
            admin = await prisma.user.create({
                data: {
                    name: 'Admin User',
                    email: 'admin@example.com',
                    password: '$2b$10$epWg/y.QdZ.QdZ.QdZ.QdZ.QdZ.QdZ.QdZ.QdZ.QdZ.QdZ.QdZ', // Dummy hash
                    role: UserRole.ADMIN,
                    company: { create: { name: 'Admin Corp', type: CompanyType.BUYER } } // Admin needs company? Schema says yes (companyId is required)
                }
            });
            console.log('Created admin user:', admin);
        }

        // Seller
        let seller = await prisma.user.findFirst({ where: { role: UserRole.SELLER }, include: { company: true } });
        if (!seller) {
            seller = await prisma.user.create({
                data: {
                    name: 'Seller User',
                    email: 'seller@example.com',
                    password: '$2b$10$epWg/y.QdZ.QdZ.QdZ.QdZ.QdZ.QdZ.QdZ.QdZ.QdZ.QdZ.QdZ',
                    role: UserRole.SELLER,
                    company: { create: { name: 'Sample Seller Company', type: CompanyType.SUPPLIER } }
                },
                include: { company: true }
            });
            console.log('Created seller user:', seller);
        }

        // Buyer
        let buyer = await prisma.user.findFirst({ where: { role: UserRole.BUYER } });
        if (!buyer) {
            buyer = await prisma.user.create({
                data: {
                    name: 'Buyer User',
                    email: 'buyer@example.com',
                    password: '$2b$10$epWg/y.QdZ.QdZ.QdZ.QdZ.QdZ.QdZ.QdZ.QdZ.QdZ.QdZ.QdZ',
                    role: UserRole.BUYER,
                    company: { create: { name: 'Sample Buyer Company', type: CompanyType.BUYER } }
                }
            });
            console.log('Created buyer user:', buyer);
        }

        // 2. Seed Products (if not already present)
        const productCount = await prisma.product.count();
        if (productCount > 0) {
            console.log('Products already exist, skipping product seed.');
            return { success: true, message: 'Users seeded. Products already exist.' };
        }

        if (!seller || !seller.companyId) {
            // Should not happen as we created it above
            return { success: false, message: 'Seller not found for product seeding' };
        }

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
        console.log('Seeding complete!');
        return { success: true, message: 'Seeded users and 5 products' };
    } catch (error) {
        console.error('Seeding failed:', error);
        return { success: false, message: 'Seeding failed' };
    }
}
