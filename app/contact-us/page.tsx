export default function ContactPage() {
    return (
        <div className="bg-white py-20">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">Contact Us</h1>
                    <p className="text-xl text-slate-600">
                        Have questions? Our team is here to help you optimize your chemical procurement.
                    </p>
                </div>

                <form className="space-y-6 bg-slate-50 p-8 rounded-2xl border border-slate-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                            <input type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                            <input type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Work Email</label>
                        <input type="email" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Reason for Inquiry</label>
                        <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500">
                            <option>Sales Inquiry</option>
                            <option>Supplier Partnership</option>
                            <option>Technical Support</option>
                            <option>Press & Media</option>
                            <option>Other</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                        <textarea rows={4} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500"></textarea>
                    </div>

                    <button type="submit" className="w-full py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors">
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
}
