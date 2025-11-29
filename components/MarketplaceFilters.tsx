'use client';

import { Search, Filter } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export function MarketplaceFilters() {
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('q', term);
        } else {
            params.delete('q');
        }
        replace(`/marketplace?${params.toString()}`);
    }, 300);

    return (
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-black w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search by CAS, Name, or Synonym..."
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100"
                        onChange={(e) => handleSearch(e.target.value)}
                        defaultValue={searchParams.get('q')?.toString()}
                    />
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-black dark:text-slate-400">
                        <Filter className="w-4 h-4 mr-2" />
                        Filters
                    </button>
                    <select
                        className="px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-950 text-black dark:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        onChange={(e) => {
                            const params = new URLSearchParams(searchParams);
                            if (e.target.value) params.set('grade', e.target.value);
                            else params.delete('grade');
                            replace(`/marketplace?${params.toString()}`);
                        }}
                        defaultValue={searchParams.get('grade')?.toString()}
                    >
                        <option value="">All Grades</option>
                        <option value="TECHNICAL">Technical</option>
                        <option value="PHARMA">Pharma</option>
                        <option value="FOOD">Food</option>
                    </select>
                </div>
            </div>
        </div>
    );
}
