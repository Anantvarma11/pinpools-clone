export default function TenderManagementPage() {
    return (
        <div className="bg-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">Supplier Tender Management</h1>
                    <p className="text-xl text-black max-w-3xl mx-auto">
                        A dedicated workspace for suppliers to manage quotes, contracts, and customer relationships.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="bg-slate-50 p-8 rounded-xl">
                        <h3 className="text-2xl font-bold text-slate-900 mb-4">Streamlined Quoting</h3>
                        <p className="text-black">Respond to RFQs with a single click. Our templates make it easy to submit complex bids with Incoterms and volume tiers.</p>
                    </div>
                    <div className="bg-slate-50 p-8 rounded-xl">
                        <h3 className="text-2xl font-bold text-slate-900 mb-4">Order Management</h3>
                        <p className="text-black">Track awarded contracts and spot orders in one unified dashboard. Integrate with your ERP for seamless fulfillment.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
