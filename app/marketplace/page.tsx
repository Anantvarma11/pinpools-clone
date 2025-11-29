import { PrismaClient, Grade } from '@prisma/client';
import { ProductCard } from '@/components/ProductCard';
import { MarketplaceFilters } from '@/components/MarketplaceFilters';

const prisma = new PrismaClient();

export default async function MarketplacePage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string; grade?: string }>;
}) {
    const params = await searchParams;
    const query = params.q;
    const grade = params.grade as Grade | undefined;

    const where: any = {};

    if (query) {
        where.OR = [
            { iupac_name: { contains: query } }, // SQLite is case-insensitive by default for LIKE but Prisma might normalize
            { cas_number: { contains: query } },
            { synonyms: { contains: query } },
        ];
    }

    if (grade) {
        where.grade = grade;
    }

    const products = await prisma.product.findMany({
        where,
        orderBy: { createdAt: 'desc' },
    });

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">Global Chemical Marketplace</h1>
                    <p className="mt-2 text-black">Source verified chemicals from top global suppliers.</p>
                </div>

                <MarketplaceFilters />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {products.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-black">No products found matching your criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
