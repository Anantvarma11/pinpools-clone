'use client';

import { Product } from '@prisma/client';
import { BadgeCheck, Leaf, FlaskConical } from 'lucide-react';

interface ProductCardProps {
    product: Product;
    onSelect?: (product: Product) => void;
    isSelected?: boolean;
}

export function ProductCard({ product, onSelect, isSelected }: ProductCardProps) {
    return (
        <div
            className={`bg-white dark:bg-slate-900 rounded-xl shadow-sm border p-6 transition-all ${isSelected
                ? 'border-teal-500 ring-2 ring-teal-500 ring-opacity-50'
                : 'border-slate-200 dark:border-slate-800 hover:shadow-md'
                }`}
            onClick={() => onSelect && onSelect(product)}
        >
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{product.iupac_name}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-mono">CAS: {product.cas_number}</p>
                </div>
                <div className="flex gap-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
                        {product.grade}
                    </span>
                </div>
            </div>

            <div className="space-y-3">
                <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                    <FlaskConical className="w-4 h-4 mr-2 text-slate-400 dark:text-slate-500" />
                    <span>Purity: {product.purity_percentage}%</span>
                </div>

                <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                    <Leaf className="w-4 h-4 mr-2 text-green-500" />
                    <span>Sustainability Score: {product.sustainability_rating}/100</span>
                </div>

                {product.ec_number && (
                    <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                        <BadgeCheck className="w-4 h-4 mr-2 text-blue-500" />
                        <span>EC: {product.ec_number}</span>
                    </div>
                )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <div className="text-xs text-slate-400 dark:text-slate-500">
                    Synonyms: {product.synonyms.split(', ').slice(0, 2).join(', ')}...
                </div>
                {onSelect ? (
                    <button
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${isSelected
                            ? 'bg-teal-600 text-white hover:bg-teal-700'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                            }`}
                    >
                        {isSelected ? 'Selected' : 'Select'}
                    </button>
                ) : (
                    <button className="px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors">
                        View Details
                    </button>
                )}
            </div>
        </div>
    );
}
