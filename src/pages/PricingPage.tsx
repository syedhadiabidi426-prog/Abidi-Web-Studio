import React from 'react';
import { CheckCircle2, ArrowRight, MessageCircle, AlertCircle, HelpCircle } from 'lucide-react';
import { REGIONS, INITIAL_SERVICE_PRICES, INITIAL_PACKAGES, PRICING_DISCLAIMER } from '../data/pricingData';
import { RegionCode } from '../types';
import { getWhatsAppEnquiryUrl } from '../utils/constants';

interface PricingPageProps {
  onNavigate: (path: string) => void;
  selectedRegion: RegionCode;
  onSelectRegion: (reg: RegionCode) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({
  onNavigate,
  selectedRegion,
  onSelectRegion,
}) => {
  const currentRegion = REGIONS[selectedRegion];

  const handleSelectPackage = (packageName: string) => {
    sessionStorage.setItem('prefill_service', packageName);
    onNavigate('/contact');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#38BDF8] py-1 px-3.5 rounded-full bg-blue-500/10 border border-blue-500/20">
          International Transparency
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Clear, Indicative Starting Rates by Region
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          We configure independent pricing tailored to our core markets: United States, United Kingdom, Canada, Australia, and Pakistan. Select your country below to view local currency rates.
        </p>

        {/* Region Selector Pills */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
          {(Object.keys(REGIONS) as RegionCode[]).map((code) => {
            const reg = REGIONS[code];
            const isSelected = selectedRegion === code;
            return (
              <button
                key={code}
                onClick={() => onSelectRegion(code)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-[#2563EB] text-white shadow-lg shadow-blue-600/30 ring-1 ring-[#38BDF8]'
                    : 'bg-[#080D1A] text-slate-300 hover:text-white hover:bg-white/5 border border-white/10'
                }`}
              >
                <span className="text-base">{reg.flag}</span>
                <span className="font-semibold">{reg.name}</span>
                <span className="font-mono text-slate-400">({reg.currency})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3 Main Website Packages */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-xs uppercase tracking-widest text-[#38BDF8] font-bold">
            Curated Packages
          </h2>
          <p className="text-2xl font-bold text-white tracking-tight mt-1">
            Choose the Foundation That Fits Your Goals
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {INITIAL_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`p-8 rounded-2xl flex flex-col justify-between border transition-all ${
                pkg.popular
                  ? 'bg-gradient-to-b from-[#0B152B] to-[#080D1A] border-[#38BDF8]/50 shadow-2xl shadow-blue-950/40 ring-1 ring-blue-500/20'
                  : 'bg-[#080D1A] border-white/10'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    {pkg.badge}
                  </span>
                  {pkg.popular && (
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-blue-500/20 text-[#38BDF8] border border-blue-500/30">
                      Most Selected
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-6">{pkg.description}</p>

                <div className="mb-6 p-4 rounded-xl bg-black/40 border border-white/5">
                  <span className="text-xs text-slate-400 block mb-0.5">Indicative Starting Price:</span>
                  <div className="text-3xl font-extrabold text-white font-mono tabular-nums">
                    {pkg.prices[selectedRegion]}
                  </div>
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    {currentRegion.name} Market Configuration
                  </span>
                </div>

                <div className="space-y-2.5 mb-8">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2">
                    Package Inclusions:
                  </span>
                  {pkg.inclusions.map((inc, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => handleSelectPackage(pkg.name)}
                  className={`w-full py-3.5 px-4 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer ${
                    pkg.popular
                      ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30'
                      : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
                  }`}
                >
                  Request {pkg.name}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Complete Service A-la-Carte Starting Price Table */}
      <div className="p-8 sm:p-10 rounded-2xl bg-[#080D1A] border border-white/10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white">Full Services Starting Price Matrix</h2>
            <p className="text-xs text-slate-400 mt-1">
              Showing indicative starting rates in <strong>{currentRegion.currency} ({currentRegion.symbol})</strong> for {currentRegion.name}.
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950/40 px-3 py-1 rounded-lg border border-emerald-500/20">
            Current Region: {currentRegion.name}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 font-mono">
                <th className="py-3 px-4 font-semibold uppercase tracking-wider">Service</th>
                <th className="py-3 px-4 font-semibold uppercase tracking-wider hidden sm:table-cell">Category</th>
                <th className="py-3 px-4 font-semibold uppercase tracking-wider">Starting At ({currentRegion.currency})</th>
                <th className="py-3 px-4 font-semibold uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {INITIAL_SERVICE_PRICES.map((item) => (
                <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-white block">{item.name}</span>
                    <span className="text-[11px] text-slate-400 max-w-md line-clamp-1">
                      {item.description}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-400 hidden sm:table-cell font-mono">
                    {item.category}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-white tabular-nums">
                    {item.prices[selectedRegion]}
                    {item.isRecurring && (
                      <span className="text-[10px] text-amber-400 ml-1 font-sans font-normal">(recurring)</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleSelectPackage(item.name)}
                      className="px-3 py-1 text-[11px] font-semibold text-blue-400 hover:text-white bg-blue-500/10 hover:bg-blue-600 rounded transition-colors cursor-pointer"
                    >
                      Enquire
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mandatory Transparent Pricing Disclaimer */}
      <div className="p-6 rounded-2xl bg-[#0B1222] border border-blue-500/20 flex items-start gap-4">
        <div className="p-2 rounded-lg bg-blue-500/10 text-[#38BDF8] shrink-0 mt-0.5">
          <AlertCircle className="w-5 h-5" />
        </div>
        <div className="space-y-1.5 text-xs text-slate-300">
          <span className="font-bold text-white uppercase tracking-wider block">
            Pricing Disclaimer & Third-Party Clarification
          </span>
          <p className="leading-relaxed text-slate-300">
            {PRICING_DISCLAIMER}
          </p>
        </div>
      </div>

      {/* Custom Quotation CTA */}
      <div className="text-center max-w-xl mx-auto space-y-4">
        <h3 className="text-xl font-bold text-white">Require a Bespoke Quotation?</h3>
        <p className="text-xs text-slate-400">
          Have specialized requirements, third-party API dependencies, or an enterprise application? Submit your brief for an exact quotation.
        </p>
        <button
          onClick={() => onNavigate('/contact')}
          className="px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-colors cursor-pointer"
        >
          Request Custom Project Quotation
        </button>
      </div>
    </div>
  );
};
