export default function ImprintPage() {
    return (
        <div className="bg-white py-20">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-8">Imprint</h1>
                <div className="prose prose-slate">
                    <p><strong>ChemSphere Nexus GmbH</strong></p>
                    <p>Chemical Innovation Park 1<br />10115 Berlin, Germany</p>
                    <p><strong>Represented by:</strong><br />Jane Doe, CEO<br />John Smith, CTO</p>
                    <p><strong>Contact:</strong><br />Phone: +49 30 12345678<br />Email: info@chemsphere-nexus.com</p>
                    <p><strong>Register Entry:</strong><br />Entry in the Handelsregister.<br />Register Court: Amtsgericht Charlottenburg<br />Register Number: HRB 123456</p>
                    <p><strong>VAT ID:</strong><br />Sales tax identification number according to Sect. 27 a of the Sales Tax Law:<br />DE 123 456 789</p>
                </div>
            </div>
        </div>
    );
}
