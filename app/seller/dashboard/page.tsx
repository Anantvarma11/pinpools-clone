import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Plus, TrendingUp, Package, AlertCircle } from 'lucide-react';
import { OfferModal } from '@/components/OfferModal';

export default async function SellerDashboardPage() {
    const session = await auth();
    if (!session?.user) return null;

    // Fetch Stats
    const productsCount = await prisma.product.count({
        where: {
            company: { users: { some: { id: session.user.id } } }
        }
    });

    // Fetch Public RFXs (Live Opportunities)
    const publicRfxs = await prisma.RFX.findMany({
        where: { mode: 'PUBLIC' },
        include: {
            product: true,
            owner: { select: { name: true } }
        },
        orderBy: { createdAt: 'desc' }
    });

    const pendingBidsCount = publicRfxs.length; // Simplified for now

    return (
        <div className="min-h-screen bg-slate-50/50">
            <div className="container mx-auto py-8 px-4 space-y-8">
                {/* Header & Quick Actions */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-green-900">Supplier Portal</h1>
                        <p className="text-slate-600">Welcome back, {session.user.name}</p>
                    </div>
                    <Link href="/seller/listings/new">
                        <Button className="bg-green-600 hover:bg-green-700 text-white shadow-sm">
                            <Plus className="w-4 h-4 mr-2" />
                            List New Item
                        </Button>
                    </Link>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="border-green-100 bg-white shadow-sm">
                        <CardContent className="p-6 flex items-center gap-4">
                            <div className="p-3 bg-green-100 rounded-full text-green-600">
                                <Package className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-500">Active Listings</p>
                                <h3 className="text-2xl font-bold text-slate-900">{productsCount}</h3>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-blue-100 bg-white shadow-sm">
                        <CardContent className="p-6 flex items-center gap-4">
                            <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                                <TrendingUp className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-500">Live Opportunities</p>
                                <h3 className="text-2xl font-bold text-slate-900">{pendingBidsCount}</h3>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-amber-100 bg-white shadow-sm">
                        <CardContent className="p-6 flex items-center gap-4">
                            <div className="p-3 bg-amber-100 rounded-full text-amber-600">
                                <AlertCircle className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-500">Pending Actions</p>
                                <h3 className="text-2xl font-bold text-slate-900">0</h3>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Live Opportunities Section */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                        Live Opportunities
                        <span className="text-sm font-normal text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                            {publicRfxs.length}
                        </span>
                    </h2>

                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        {publicRfxs.length === 0 ? (
                            <div className="text-center py-16 px-4">
                                <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Package className="w-8 h-8 text-slate-400" />
                                </div>
                                <h3 className="text-lg font-medium text-slate-900 mb-1">No active requests</h3>
                                <p className="text-slate-500">Check back later for new opportunities from buyers.</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-slate-50 border-b border-slate-200">
                                        <tr>
                                            <th className="px-6 py-4 font-semibold text-slate-700">Product Name</th>
                                            <th className="px-6 py-4 font-semibold text-slate-700">Quantity</th>
                                            <th className="px-6 py-4 font-semibold text-slate-700">Delivery Date</th>
                                            <th className="px-6 py-4 font-semibold text-slate-700">Status</th>
                                            <th className="px-6 py-4 font-semibold text-slate-700 text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {publicRfxs.map((rfx) => (
                                            <tr key={rfx.id} className="hover:bg-slate-50/50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="font-medium text-slate-900">{rfx.product.iupac_name}</div>
                                                    <div className="text-xs text-slate-500">{rfx.title}</div>
                                                </td>
                                                <td className="px-6 py-4 text-slate-600">
                                                    {rfx.quantity} {rfx.unit}
                                                </td>
                                                <td className="px-6 py-4 text-slate-600">
                                                    {new Date(rfx.deadline).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                        Open
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Link href={`/buyer/rfx/${rfx.id}`}>
                                                            <Button size="sm" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                                                                View Details
                                                            </Button>
                                                        </Link>
                                                        <OfferModal
                                                            rfxId={rfx.id}
                                                            trigger={
                                                                <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white shadow-sm">
                                                                    Open Bid
                                                                </Button>
                                                            }
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}
