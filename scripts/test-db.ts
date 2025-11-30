import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Testing database connection...');
    try {
        const count = await prisma.user.count();
        console.log(`Successfully connected! Found ${count} users.`);
    } catch (error) {
        console.error('Connection failed:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
