export default function CustomersPage() {
    return (
        <div className="bg-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">Customer Success Stories</h1>
                    <p className="text-xl text-black max-w-3xl mx-auto">
                        See how leading chemical companies are transforming their supply chains with ChemSphere Nexus.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="h-48 bg-slate-100 flex items-center justify-center">
                                <span className="text-slate-400 font-medium">Case Study Image {i}</span>
                            </div>
                            <div className="p-6">
                                <div className="text-sm text-teal-600 font-semibold mb-2">Pharma Industry</div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">Reducing Sourcing Time by 50%</h3>
                                <p className="text-black mb-4">
                                    How a leading pharmaceutical manufacturer streamlined their raw material procurement using our automated RFQ engine.
                                </p>
                                <a href="#" className="text-teal-600 font-medium hover:underline">Read Story &rarr;</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
