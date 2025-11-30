import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { BidTimeline } from '@/components/BidTimeline';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';

export default async function RfxDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session?.user) return null;

    const { id } = await params;

    const rfx = await prisma.RFX.findUnique({
        where: { id },
        include: {
            product: true,
            bids: {
                include: {
                    author: {
                        include: {
                            company: true
                        }
                    }
                },
                orderBy: { createdAt: 'desc' }
            }
        }
    });

    if (!rfx) return notFound();

    // Transform bids for BidTimeline
    const timelineItems = rfx.bids.map(bid => ({
        id: bid.id,
        bidderName: bid.author.company.name || bid.author.name || "Unknown Supplier",
        amount: Number(bid.amount),
        currency: "USD", // Assuming USD for now
        submittedAt: bid.createdAt.toISOString(),
        status: bid.status,
        terms: bid.termsJson ? JSON.stringify(bid.termsJson) : undefined
    }));

    return (
        <div className="container mx-auto py-8 px-4">
            <Link href="/buyer/dashboard" className="inline-flex items-center text-sm text-muted-foreground hover:text-blue-600 mb-6">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content - Timeline */}
                <div className="lg:col-span-2 space-y-6">
                    <h1 className="text-2xl font-bold text-slate-900">Offers Timeline</h1>
                    <BidTimeline items={timelineItems} />
                </div>

                {/* Sidebar - RFX Details */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Request Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h3 className="font-semibold text-lg">{rfx.title}</h3>
                                <Badge variant="outline" className="mt-1">{rfx.mode}</Badge>
                            </div>

                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Product</span>
                                    <span className="font-medium">{rfx.product.iupac_name}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Quantity</span>
                                    <span className="font-medium">{rfx.quantity} {rfx.unit}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Deadline</span>
                                    <span className="font-medium">{new Date(rfx.deadline).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
