import { PrismaClient } from '@prisma/client';
import { TenderRow } from '@/components/TenderRow';
import { Plus } from 'lucide-react';
import Link from 'next/link';

const prisma = new PrismaClient();

export default async function TendersDashboard() {
    const tenders = await prisma.tender.findMany({
        orderBy: { createdAt: 'desc' },
    });

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">My Tenders</h1>
                        <p className="mt-2 text-black">Manage your active RFQs and contracts.</p>
                    </div>
                    <Link
                        href="/sourcing/new"
                        className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-medium transition-colors"
                    >
                        <Plus className="w-5 h-5 mr-2" />
                        New Request
                    </Link>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-4 border-b border-slate-100 bg-slate-50 flex font-medium text-sm text-black">
                        <div className="flex-1">Tender Details</div>
                        <div className="w-64">Status & Type</div>
                    </div>

                    {tenders.length === 0 ? (
                        <div className="p-12 text-center">
                            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Plus className="w-8 h-8 text-slate-400" />
                            </div>
                            <h3 className="text-lg font-medium text-slate-900">No active tenders</h3>
                            <p className="text-black mt-2 mb-6">Start sourcing chemicals by creating your first tender.</p>
                            <Link
                                href="/sourcing/new"
                                className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-medium transition-colors"
                            >
                                Create Tender
                            </Link>
                        </div>
                    ) : (
                        <div>
                            {tenders.map((tender) => (
                                <TenderRow key={tender.id} tender={tender} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
