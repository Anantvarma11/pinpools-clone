'use client';

import { useState, useEffect } from 'react';
import { BenchmarkChart } from '@/components/BenchmarkChart';
import { getMarketData, getProductList } from '@/app/actions/analytics';
import { Bell, TrendingDown, TrendingUp, Minus } from 'lucide-react';

interface ProductOption {
    id: string;
    iupac_name: string;
    cas_number: string;
}

export default function AnalyticsPage() {
    const [products, setProducts] = useState<ProductOption[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<ProductOption | null>(null);
    const [chartData, setChartData] = useState<{ date: string; price: number }[]>([]);
    const [isAlertSet, setIsAlertSet] = useState(false);

    useEffect(() => {
        getProductList().then(list => {
            setProducts(list);
            if (list.length > 0) {
                setSelectedProduct(list[0]);
            }
        });
    }, []);

    useEffect(() => {
        if (selectedProduct) {
            getMarketData(selectedProduct.cas_number).then(setChartData);
            setIsAlertSet(false);
        }
    }, [selectedProduct]);

    const currentPrice = chartData.length > 0 ? chartData[chartData.length - 1].price : 0;
    const previousPrice = chartData.length > 1 ? chartData[chartData.length - 2].price : 0;
    const priceChange = currentPrice - previousPrice;
    const percentChange = previousPrice ? (priceChange / previousPrice) * 100 : 0;

    return (
        <div className="min-h-screen bg-slate-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">Market Intelligence</h1>
                    <p className="mt-2 text-black">Real-time price benchmarking and trend analysis.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Controls & Summary */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                            <label className="block text-sm font-medium text-slate-700 mb-2">Select Chemical</label>
                            <select
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                                onChange={(e) => {
                                    const prod = products.find(p => p.id === e.target.value);
                                    if (prod) setSelectedProduct(prod);
                                }}
                                value={selectedProduct?.id || ''}
                            >
                                {products.map(p => (
                                    <option key={p.id} value={p.id}>{p.iupac_name} ({p.cas_number})</option>
                                ))}
                            </select>
                        </div>

                        {selectedProduct && (
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                                <h3 className="text-sm font-medium text-black mb-1">Current Market Price</h3>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-bold text-slate-900">€{currentPrice.toFixed(2)}</span>
                                    <span className="text-sm text-black">/ MT</span>
                                </div>

                                <div className={`flex items-center mt-2 text-sm font-medium ${priceChange > 0 ? 'text-red-600' : priceChange < 0 ? 'text-green-600' : 'text-black'}`}>
                                    {priceChange > 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : priceChange < 0 ? <TrendingDown className="w-4 h-4 mr-1" /> : <Minus className="w-4 h-4 mr-1" />}
                                    {Math.abs(percentChange).toFixed(2)}% vs last month
                                </div>

                                <div className="mt-6 pt-6 border-t border-slate-100">
                                    <button
                                        onClick={() => setIsAlertSet(!isAlertSet)}
                                        className={`w-full flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-colors ${isAlertSet
                                                ? 'bg-teal-50 text-teal-700 border border-teal-200'
                                                : 'bg-slate-900 text-white hover:bg-slate-800'
                                            }`}
                                    >
                                        <Bell className={`w-4 h-4 mr-2 ${isAlertSet ? 'fill-teal-700' : ''}`} />
                                        {isAlertSet ? 'Alert Active' : 'Set Price Alert'}
                                    </button>
                                    {isAlertSet && (
                                        <p className="text-xs text-center text-teal-600 mt-2">
                                            You'll be notified if price drops below €{(currentPrice * 0.95).toFixed(2)}
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Chart */}
                    <div className="lg:col-span-2">
                        {selectedProduct && (
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-full min-h-[400px]">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-lg font-semibold text-slate-900">{selectedProduct.iupac_name} Price Trend</h2>
                                    <div className="flex gap-2">
                                        {['3M', '6M', '1Y', 'YTD'].map(range => (
                                            <button key={range} className="px-3 py-1 text-xs font-medium text-black hover:bg-slate-100 rounded-full">
                                                {range}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="h-[350px]">
                                    <BenchmarkChart data={chartData} currency="€" />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
