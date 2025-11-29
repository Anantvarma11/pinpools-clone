import Link from 'next/link';
import { ArrowRight, BarChart3, Globe2, ShieldCheck, Users } from 'lucide-react';

export default function SuppliersPage() {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* Hero Section */}
            <section className="bg-slate-900 text-white py-20 lg:py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                        Grow Your Business with <span className="text-teal-400">ChemSphere Nexus</span>
                    </h1>
                    <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-10">
                        Connect with verified buyers, manage RFQs efficiently, and expand your market reach globally.
                    </p>
                    <div className="flex justify-center">
                        <Link
                            href="/auth/register?role=supplier"
                            className="px-8 py-4 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors flex items-center"
                        >
                            Register as Supplier <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900">Why Join ChemSphere?</h2>
                        <p className="mt-4 text-lg text-black">Built for modern chemical suppliers.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
                            <Globe2 className="w-10 h-10 text-teal-600 mb-4" />
                            <h3 className="text-xl font-semibold text-slate-900 mb-2">Global Reach</h3>
                            <p className="text-black">Access a worldwide network of verified buyers actively looking for your products.</p>
                        </div>
                        <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
                            <BarChart3 className="w-10 h-10 text-blue-600 mb-4" />
                            <h3 className="text-xl font-semibold text-slate-900 mb-2">Market Insights</h3>
                            <p className="text-black">Get real-time data on pricing trends and demand to optimize your sales strategy.</p>
                        </div>
                        <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
                            <Users className="w-10 h-10 text-purple-600 mb-4" />
                            <h3 className="text-xl font-semibold text-slate-900 mb-2">Qualified Leads</h3>
                            <p className="text-black">Receive high-quality RFQs directly to your dashboard. No more cold calling.</p>
                        </div>
                        <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
                            <ShieldCheck className="w-10 h-10 text-green-600 mb-4" />
                            <h3 className="text-xl font-semibold text-slate-900 mb-2">Secure Trading</h3>
                            <p className="text-black">Benefit from our secure platform with verified counterparties and transparent processes.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">Ready to expand your business?</h2>
                    <p className="text-lg text-black mb-8">
                        Join hundreds of leading suppliers already trading on ChemSphere Nexus.
                    </p>
                    <Link
                        href="/auth/register?role=supplier"
                        className="inline-flex px-8 py-4 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-colors items-center"
                    >
                        Get Started Now <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                </div>
            </section>
        </div>
    );
}
