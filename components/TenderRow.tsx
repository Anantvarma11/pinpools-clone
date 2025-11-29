import { Tender, TenderStatus, TenderType } from '@prisma/client';
import { Calendar, FileText, Users } from 'lucide-react';

interface TenderRowProps {
    tender: Tender;
}

export function TenderRow({ tender }: TenderRowProps) {
    const statusColors = {
        [TenderStatus.DRAFT]: 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200',
        [TenderStatus.OPEN]: 'bg-green-100 text-green-800',
        [TenderStatus.REVIEW]: 'bg-yellow-100 text-yellow-800',
        [TenderStatus.AWARDED]: 'bg-blue-100 text-blue-800',
    };

    return (
        <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <div className="flex items-center gap-4">
                <div className="p-2 bg-teal-50 rounded-lg">
                    <FileText className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                    <h4 className="font-medium text-slate-900 dark:text-slate-100">RFQ #{tender.id.slice(0, 8)}</h4>
                    <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mt-1">
                        <span className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {new Date(tender.createdAt).toLocaleDateString()}
                        </span>
                        <span className="flex items-center">
                            <Users className="w-3 h-3 mr-1" />
                            {tender.invited_suppliers.split(',').length} Suppliers
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[tender.status]}`}>
                    {tender.status}
                </span>
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    {tender.type}
                </span>
                <button className="text-sm text-teal-600 hover:text-teal-700 font-medium">
                    Manage
                </button>
            </div>
        </div>
    );
}
