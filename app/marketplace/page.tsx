import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";

export default async function MarketplacePage() {
    const products = await prisma.product.findMany({
        include: {
            company: true,
            rfxs: true, // To count active bids
        },
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Filters - Keeping static for now as per MVP */}
                <aside className="w-full md:w-64 space-y-6">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Filters</h3>
                        <div className="space-y-4">
                            <div>
                                <h4 className="text-sm font-medium mb-2">Category</h4>
                                <div className="space-y-2">
                                    {["Solvents", "Acids", "Polymers", "Surfactants"].map((cat) => (
                                        <div key={cat} className="flex items-center space-x-2">
                                            <input type="checkbox" id={cat} className="rounded border-gray-300" />
                                            <label htmlFor={cat} className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                {cat}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="h-px bg-border" />

                            <div>
                                <h4 className="text-sm font-medium mb-2">Minimum Order</h4>
                                <div className="space-y-2">
                                    {["< 1000 L", "1000 - 5000 L", "> 5000 L"].map((moq) => (
                                        <div key={moq} className="flex items-center space-x-2">
                                            <input type="checkbox" id={moq} className="rounded border-gray-300" />
                                            <label htmlFor={moq} className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                {moq}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Product Grid */}
                <main className="flex-1">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold">Marketplace</h1>
                        <span className="text-muted-foreground">{products.length} results</span>
                    </div>

                    {products.length === 0 ? (
                        <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-lg">
                            <h3 className="text-lg font-medium text-slate-900 mb-2">No products found</h3>
                            <p className="text-slate-500 mb-6">The marketplace is currently empty.</p>
                            <form action={async () => {
                                'use server';
                                const { seedProducts } = await import('@/actions/seed');
                                await seedProducts();
                            }}>
                                <Button type="submit" size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
                                    Demo: Seed Fake Products
                                </Button>
                            </form>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                {products.map((item) => (
                                    <ProductCard
                                        key={item.id}
                                        product={{
                                            id: item.id,
                                            title: item.iupac_name,
                                            casNumber: item.cas_number,
                                            grade: item.grade,
                                            purity: item.purity_percentage,
                                        }}
                                        seller={{
                                            name: item.company?.name || "Unknown Seller",
                                            kycStatus: "VERIFIED", // Mocked for now
                                            creditLine: 85, // Mocked for now
                                        }}
                                        MOQ={item.moq ? `${item.moq} Tons` : "Negotiable"}
                                        openBidsCount={item.rfxs.length}
                                    />
                                ))}
                            </div>

                            <div className="flex justify-center">
                                <Button variant="outline" size="lg">
                                    Load More Products
                                </Button>
                            </div>
                        </>
                    )}
                </main>
            </div>
        </div>
    );
}
