'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Product, Incoterms, TenderType } from '@prisma/client';
import { ProductCard } from '@/components/ProductCard';
import { getProducts, createTender } from '@/app/actions/sourcing';
import { ArrowRight, ArrowLeft, Check, Search } from 'lucide-react';

const step1Schema = z.object({
    type: z.nativeEnum(TenderType),
    incoterms: z.nativeEnum(Incoterms),
    delivery_date: z.string().min(1, 'Delivery date is required'),
    region: z.string().min(1, 'Region is required'),
});

type Step1Data = z.infer<typeof step1Schema>;

export default function SourcingWizard() {
    const [step, setStep] = useState(1);
    const [step1Data, setStep1Data] = useState<Step1Data | null>(null);
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [inviteMode, setInviteMode] = useState<'ALL' | 'SPECIFIC'>('ALL');

    const { register, handleSubmit, formState: { errors } } = useForm<Step1Data>({
        resolver: zodResolver(step1Schema),
        defaultValues: {
            type: TenderType.SPOT,
            incoterms: Incoterms.DDP,
            region: 'EU',
        }
    });

    useEffect(() => {
        if (step === 2) {
            getProducts(searchQuery).then(setProducts);
        }
    }, [step, searchQuery]);

    const onStep1Submit = (data: Step1Data) => {
        setStep1Data(data);
        setStep(2);
    };

    const toggleProduct = (product: Product) => {
        if (selectedProducts.find(p => p.id === product.id)) {
            setSelectedProducts(selectedProducts.filter(p => p.id !== product.id));
        } else {
            setSelectedProducts([...selectedProducts, product]);
        }
    };

    const handleFinalSubmit = async () => {
        if (!step1Data) return;

        const lineItems = selectedProducts.map(p => ({
            product_id: p.id,
            name: p.iupac_name,
            cas: p.cas_number,
            volume: 1000, // Default volume for now, could be input per product
            target_price: 0, // Default
        }));

        await createTender({
            ...step1Data,
            delivery_date: new Date(step1Data.delivery_date),
            line_items: lineItems,
            invited_suppliers: inviteMode === 'ALL' ? ['ALL_MATCHING'] : ['SPECIFIC_IDS'],
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="max-w-4xl mx-auto px-4">
                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        {['Request Details', 'Select Products', 'Invite Suppliers'].map((label, idx) => (
                            <div key={idx} className={`flex flex-col items-center ${step > idx + 1 ? 'text-teal-600' : step === idx + 1 ? 'text-slate-900' : 'text-slate-400'}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${step > idx + 1 ? 'bg-teal-100' : step === idx + 1 ? 'bg-teal-600 text-white' : 'bg-slate-200'}`}>
                                    {step > idx + 1 ? <Check className="w-5 h-5" /> : idx + 1}
                                </div>
                                <span className="text-sm font-medium">{label}</span>
                            </div>
                        ))}
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-teal-600 transition-all duration-500 ease-in-out"
                            style={{ width: `${((step - 1) / 2) * 100}%` }}
                        />
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
                    {step === 1 && (
                        <form onSubmit={handleSubmit(onStep1Submit)} className="space-y-6">
                            <h2 className="text-2xl font-bold text-slate-900">Request Details</h2>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Tender Type</label>
                                    <select {...register('type')} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500">
                                        <option value="SPOT">Spot Buy (Fast)</option>
                                        <option value="CONTRACT">Contract (Long-term)</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Incoterms</label>
                                    <select {...register('incoterms')} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500">
                                        {Object.values(Incoterms).map(term => (
                                            <option key={term} value={term}>{term}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Delivery Date</label>
                                    <input type="date" {...register('delivery_date')} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500" />
                                    {errors.delivery_date && <p className="text-red-500 text-sm mt-1">{errors.delivery_date.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Region</label>
                                    <input type="text" {...register('region')} placeholder="e.g. EU, North America" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500" />
                                    {errors.region && <p className="text-red-500 text-sm mt-1">{errors.region.message}</p>}
                                </div>
                            </div>

                            <div className="flex justify-end pt-6">
                                <button type="submit" className="flex items-center px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-medium">
                                    Next Step <ArrowRight className="ml-2 w-4 h-4" />
                                </button>
                            </div>
                        </form>
                    )}

                    {step === 2 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-slate-900">Select Products</h2>

                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto p-1">
                                {products.map(product => (
                                    <div key={product.id} onClick={() => toggleProduct(product)} className={`cursor-pointer border-2 rounded-lg transition-all ${!!selectedProducts.find(p => p.id === product.id) ? 'border-teal-500 ring-2 ring-teal-200' : 'border-transparent'}`}>
                                        <ProductCard
                                            product={{
                                                id: product.id,
                                                title: product.iupac_name,
                                                casNumber: product.cas_number,
                                                grade: product.grade,
                                                purity: product.purity_percentage
                                            }}
                                            seller={{
                                                name: 'Verified Supplier',
                                                kycStatus: 'VERIFIED',
                                                creditLine: 50000
                                            }}
                                            MOQ={`${product.moq || 1} MT`}
                                            openBidsCount={0}
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-between pt-6 border-t border-slate-100">
                                <button onClick={() => setStep(1)} className="flex items-center px-6 py-3 text-black hover:bg-slate-50 rounded-lg font-medium">
                                    <ArrowLeft className="mr-2 w-4 h-4" /> Back
                                </button>
                                <button
                                    onClick={() => setStep(3)}
                                    disabled={selectedProducts.length === 0}
                                    className="flex items-center px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Next Step <ArrowRight className="ml-2 w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-slate-900">Invite Suppliers</h2>

                            <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                                <h3 className="font-medium text-slate-900 mb-4">Invitation Strategy</h3>
                                <div className="space-y-4">
                                    <label className="flex items-center p-4 bg-white border border-slate-200 rounded-lg cursor-pointer hover:border-teal-500 transition-colors">
                                        <input
                                            type="radio"
                                            name="invite"
                                            value="ALL"
                                            checked={inviteMode === 'ALL'}
                                            onChange={() => setInviteMode('ALL')}
                                            className="w-4 h-4 text-teal-600 focus:ring-teal-500"
                                        />
                                        <div className="ml-4">
                                            <span className="block font-medium text-slate-900">Invite All Matching Suppliers</span>
                                            <span className="block text-sm text-black">Automatically notify all verified suppliers who sell these products.</span>
                                        </div>
                                    </label>

                                    <label className="flex items-center p-4 bg-white border border-slate-200 rounded-lg cursor-pointer hover:border-teal-500 transition-colors">
                                        <input
                                            type="radio"
                                            name="invite"
                                            value="SPECIFIC"
                                            checked={inviteMode === 'SPECIFIC'}
                                            onChange={() => setInviteMode('SPECIFIC')}
                                            className="w-4 h-4 text-teal-600 focus:ring-teal-500"
                                        />
                                        <div className="ml-4">
                                            <span className="block font-medium text-slate-900">Invite Specific Suppliers</span>
                                            <span className="block text-sm text-black">Manually select from your approved supplier list.</span>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <div className="bg-teal-50 p-4 rounded-lg">
                                <h4 className="font-medium text-teal-900 mb-2">Summary</h4>
                                <ul className="text-sm text-teal-800 space-y-1">
                                    <li>• Type: {step1Data?.type}</li>
                                    <li>• Region: {step1Data?.region}</li>
                                    <li>• Products: {selectedProducts.length} items selected</li>
                                </ul>
                            </div>

                            <div className="flex justify-between pt-6 border-t border-slate-100">
                                <button onClick={() => setStep(2)} className="flex items-center px-6 py-3 text-black hover:bg-slate-50 rounded-lg font-medium">
                                    <ArrowLeft className="mr-2 w-4 h-4" /> Back
                                </button>
                                <button
                                    onClick={handleFinalSubmit}
                                    className="flex items-center px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-medium"
                                >
                                    Create Tender <Check className="ml-2 w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
