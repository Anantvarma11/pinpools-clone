import { BarChart } from 'lucide-react';

export default function DataCubeProductPage() {
    return (
        <div className="bg-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">Data Cube Analytics</h1>
                    <p className="text-xl text-black max-w-3xl mx-auto">
                        Make data-driven procurement decisions with real-time market intelligence.
                    </p>
                </div>

                <div className="bg-slate-900 text-white rounded-3xl p-12 md:p-20 text-center">
                    <BarChart className="w-16 h-16 text-teal-400 mx-auto mb-6" />
                    <h2 className="text-3xl font-bold mb-6">Benchmark Your Prices</h2>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
                        Stop guessing. Know exactly what the market is paying for over 500+ chemical commodities.
                    </p>
                    <button className="px-8 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors">
                        Request Demo
                    </button>
                </div>
            </div>
        </div>
    );
}
