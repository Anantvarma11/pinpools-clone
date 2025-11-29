import Link from 'next/link';
import { ArrowRight, CheckCircle, TrendingUp, ShieldCheck } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            The Operating System for <span className="text-teal-400">Agile Chemical Procurement</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-10">
            Streamline sourcing, benchmark prices in real-time, and access verified global inventory.
            ChemSphere Nexus connects buyers and suppliers in a transparent, digital marketplace.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/register?role=buyer"
              className="px-8 py-4 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors flex items-center justify-center"
            >
              Start Sourcing <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/auth/register?role=supplier"
              className="px-8 py-4 bg-white text-slate-900 rounded-lg font-semibold hover:bg-slate-100 transition-colors flex items-center justify-center"
            >
              Become a Supplier
            </Link>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-10 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-semibold text-black uppercase tracking-wider mb-6">
            Trusted by Industry Leaders
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale">
            {['BASF', 'Dow', 'Solvay', 'Evonik', 'Lanxess'].map((brand) => (
              <span key={brand} className="text-xl font-bold text-slate-400">{brand}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Automated Sourcing</h3>
              <p className="text-black">
                Launch RFQs in minutes. Our smart matching algorithm connects you with pre-vetted suppliers instantly.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <Link href="/product/data-cube" className="hover:text-teal-600 transition-colors">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Market Intelligence</h3>
              </Link>
              <p className="text-black">
                Access real-time price benchmarks and historical data to negotiate better contracts.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Verified Quality</h3>
              <p className="text-black">
                Every supplier is audited. Ensure compliance with REACH, ISO, and sustainability standards.
              </p>
            </div>
          </div >
        </div >
      </section >

      {/* CTA Blocks */}
      < section className="py-20 bg-slate-50" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-10 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">For Buyers</h3>
              <p className="text-black mb-8">
                Reduce procurement costs by up to 15% and cut sourcing time by 70%. Access a global network of trusted chemical suppliers.
              </p>
              <Link href="/product/sourcing" className="text-teal-600 font-semibold hover:text-teal-700 flex items-center">
                Explore Sourcing Tools <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
            <div className="bg-slate-900 text-white p-10 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold mb-4">For Suppliers</h3>
              <p className="text-slate-300 mb-8">
                Expand your market reach. Receive qualified leads directly to your dashboard and manage quotes efficiently.
              </p>
              <Link href="/suppliers" className="text-teal-400 font-semibold hover:text-teal-300 flex items-center">
                Grow Your Sales <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section >
    </div >
  );
}
