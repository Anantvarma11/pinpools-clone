'use server';

import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const productSchema = z.object({
    cas_number: z.string().min(1, "CAS Number is required"),
    iupac_name: z.string().min(1, "Product Name is required"),
    description: z.string().optional(),
    moq: z.coerce.number().positive("MOQ must be positive"),
    priceHint: z.coerce.number().positive("Price Hint must be positive"),
    purity_percentage: z.coerce.number().min(0).max(100),
    grade: z.enum(['TECHNICAL', 'PHARMA', 'FOOD']),
});

export async function createProduct(formData: FormData) {
    console.log("createProduct action started");
    const session = await auth();
    console.log("Session:", JSON.stringify(session, null, 2));

    if (!session?.user?.id || session.user.role !== 'seller') {
        console.error("Unauthorized access attempt");
        throw new Error("Unauthorized");
    }

    // In a real app, we'd fetch the user's company ID properly.
    // For MVP, we'll assume the user has a companyId or fetch it.
    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { companyId: true }
    });
    console.log("User found:", user);

    if (!user?.companyId) {
        console.error("User has no company ID");
        throw new Error("User does not belong to a company");
    }

    const rawData = {
        cas_number: formData.get('cas_number'),
        iupac_name: formData.get('iupac_name'),
        description: formData.get('description'),
        moq: formData.get('moq'),
        priceHint: formData.get('priceHint'),
        purity_percentage: formData.get('purity_percentage'),
        grade: formData.get('grade'),
    };
    console.log("Raw form data:", rawData);

    try {
        const validatedData = productSchema.parse(rawData);
        console.log("Validation successful");

        const newProduct = await prisma.product.create({
            data: {
                ...validatedData,
                synonyms: validatedData.iupac_name, // Default synonym
                sustainability_rating: 0, // Default
                companyId: user.companyId,
            },
        });
        console.log("Product created:", newProduct);

        revalidatePath('/seller/dashboard');
        return { success: true };
    } catch (error) {
        console.error("Error creating product:", error);
        throw error; // Re-throw to be caught by client
    }
}
