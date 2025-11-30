import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Plus, ArrowRight } from 'lucide-react';

export default async function BuyerDashboardPage() {
    const session = await auth();
    if (!session?.user) return null;

    // Fetch My Active Requests
    const myRfxs = await prisma.RFX.findMany({
        where: {
            ownerId: session.user.id
        },
        include: {
            product: true,
            _count: {
                select: { bids: true }
            }
        },
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="container mx-auto py-8 px-4 space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-blue-800">Buyer Dashboard</h1>
                <Link href="/marketplace">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                        <Plus className="w-4 h-4 mr-2" />
                        New Request
                    </Button>
                </Link>
            </div>

            {/* My Active Requests */}
            <section>
                <h2 className="text-xl font-semibold mb-4 text-slate-800">My Active Requests</h2>
                <div className="grid gap-4">
                    {myRfxs.length === 0 ? (
                        <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-lg">
                            <p className="text-slate-500 mb-4">You haven't created any requests yet.</p>
                            <Link href="/marketplace">
                                <Button variant="outline">Browse Marketplace</Button>
                            </Link>
                        </div>
                    ) : (
                        myRfxs.map((rfx) => (
                            <Card key={rfx.id} className="hover:shadow-md transition-shadow">
                                <CardContent className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-semibold text-lg">{rfx.title}</h3>
                                            <Badge variant={rfx.mode === 'PUBLIC' ? 'secondary' : 'outline'}>
                                                {rfx.mode}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-slate-600">
                                            Product: <span className="font-medium">{rfx.product.iupac_name}</span>
                                        </p>
                                        <p className="text-sm text-slate-600">
                                            Qty: {rfx.quantity} {rfx.unit} | Deadline: {new Date(rfx.deadline).toLocaleDateString()}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-4 w-full md:w-auto">
                                        <div className="text-center px-4">
                                            <div className="text-2xl font-bold text-blue-600">{rfx._count.bids}</div>
                                            <div className="text-xs text-slate-500 uppercase font-semibold">Offers</div>
                                        </div>
                                        <Link href={`/buyer/rfx/${rfx.id}`} className="w-full md:w-auto">
                                            <Button className="w-full md:w-auto">
                                                View Offers
                                                <ArrowRight className="w-4 h-4 ml-2" />
                                            </Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            </section>

            {/* Order History Placeholder */}
            <section>
                <h2 className="text-xl font-semibold mb-4 text-slate-800">Order History</h2>
                <Card>
                    <CardContent className="p-8 text-center text-slate-500">
                        No completed orders yet.
                    </CardContent>
                </Card>
            </section>
        </div>
    );
}
