import { Check } from 'lucide-react';

export default function SourcingProductPage() {
    return (
        <div className="bg-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">Intelligent Sourcing Engine</h1>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                        Automate your RFQ process and find the best suppliers in minutes, not weeks.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {['Smart Matching', 'Automated Negotiations', 'Compliance Checks'].map((feature) => (
                        <div key={feature} className="bg-slate-50 p-8 rounded-xl border border-slate-100">
                            <Check className="w-8 h-8 text-teal-600 mb-4" />
                            <h3 className="text-xl font-bold text-slate-900 mb-2">{feature}</h3>
                            <p className="text-slate-600">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
