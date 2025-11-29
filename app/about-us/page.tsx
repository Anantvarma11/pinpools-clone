export default function AboutPage() {
    return (
        <div className="bg-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">About ChemSphere Nexus</h1>
                    <p className="text-xl text-black max-w-3xl mx-auto">
                        We are on a mission to digitize the $5 trillion chemical industry, making procurement transparent, efficient, and sustainable.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Story</h2>
                        <p className="text-black mb-4">
                            Founded in 2024, ChemSphere Nexus emerged from a simple observation: while the world has gone digital, chemical procurement remained stuck in emails, spreadsheets, and opaque phone calls.
                        </p>
                        <p className="text-black">
                            We built a platform that brings the ease of consumer e-commerce to complex B2B industrial supply chains, without compromising on the rigorous compliance and quality standards the industry demands.
                        </p>
                    </div>
                    <div className="bg-slate-100 rounded-2xl h-80 flex items-center justify-center">
                        <span className="text-slate-400 font-medium">Office Image Placeholder</span>
                    </div>
                </div>

                <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">Leadership Team</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="text-center">
                            <div className="w-32 h-32 bg-slate-200 rounded-full mx-auto mb-4"></div>
                            <h3 className="text-lg font-bold text-slate-900">Executive Name</h3>
                            <p className="text-teal-600">Position Title</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
