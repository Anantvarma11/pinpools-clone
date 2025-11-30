import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { OfferModal } from '@/components/OfferModal';

export default async function IncomingOpportunitiesPage() {
    const session = await auth();
    if (!session?.user) return null;

    // Fetch Incoming Opportunities (RFXs on my products)
    const incomingRfxs = await prisma.RFX.findMany({
        where: {
            product: {
                company: {
                    users: {
                        some: {
                            id: session.user.id
                        }
                    }
                }
            }
        },
        include: {
            product: true,
            owner: { select: { name: true } }
        },
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-2xl font-bold text-green-800 mb-8">Incoming Opportunities</h1>

            {incomingRfxs.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-lg">
                    <p className="text-slate-500 mb-4">No active RFXs for your products yet.</p>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow overflow-hidden border border-slate-200">
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                    Opportunity
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                    Buyer
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                    Quantity
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                    Deadline
                                </th>
                                <th scope="col" className="relative px-6 py-3">
                                    <span className="sr-only">Actions</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-200">
                            {incomingRfxs.map((rfx) => (
                                <tr key={rfx.id} className="hover:bg-slate-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-slate-900">{rfx.title}</div>
                                        <div className="text-sm text-slate-500">{rfx.product.iupac_name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                        {rfx.owner.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                        {rfx.quantity} {rfx.unit}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                        {new Date(rfx.deadline).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end gap-2">
                                            <OfferModal
                                                rfxId={rfx.id}
                                                trigger={
                                                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                                                        Make Offer
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
    );
}
