import React from 'react';
import {
  ShoppingBag,
  Sparkles,
  Building,
  Utensils,
  HeartPulse,
  GraduationCap,
  Briefcase,
  TrendingUp,
  Rocket,
  Cpu,
  Compass,
  Wrench,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { INDUSTRIES_LIST } from '../data/industriesData';

interface IndustriesPageProps {
  onNavigate: (path: string) => void;
}

export const IndustriesPage: React.FC<IndustriesPageProps> = ({ onNavigate }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShoppingBag':
        return <ShoppingBag className="w-5 h-5" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5" />;
      case 'Building':
        return <Building className="w-5 h-5" />;
      case 'Utensils':
        return <Utensils className="w-5 h-5" />;
      case 'HeartPulse':
        return <HeartPulse className="w-5 h-5" />;
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5" />;
      case 'Briefcase':
        return <Briefcase className="w-5 h-5" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5" />;
      case 'Rocket':
        return <Rocket className="w-5 h-5" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5" />;
      case 'Compass':
        return <Compass className="w-5 h-5" />;
      case 'Wrench':
        return <Wrench className="w-5 h-5" />;
      default:
        return <Building className="w-5 h-5" />;
    }
  };

  const handleBuildForIndustry = (industryName: string, recommendedType: string) => {
    sessionStorage.setItem('prefill_industry', industryName);
    sessionStorage.setItem('prefill_website_type', recommendedType);
    onNavigate('/contact');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#38BDF8] py-1 px-3.5 rounded-full bg-blue-500/10 border border-blue-500/20">
          Industry Solutions
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Tailored Digital Architecture for Your Sector
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Every industry has distinct customer conversion pathways, trust requirements, and operational workflows. Discover how a purpose-built website drives tangible results for your specific business.
        </p>
      </div>

      {/* Grid of 12 Industries */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {INDUSTRIES_LIST.map((ind) => (
          <div
            key={ind.id}
            className="p-7 rounded-2xl bg-[#080D1A] border border-white/10 hover:border-blue-500/40 transition-all duration-200 flex flex-col justify-between group"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 text-[#38BDF8] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                {getIcon(ind.iconName)}
              </div>

              <h2 className="text-xl font-bold text-white mb-2 group-hover:text-[#38BDF8] transition-colors">
                {ind.name}
              </h2>

              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                {ind.summary}
              </p>

              <div className="space-y-2 mb-6">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 block mb-1">
                  How a Modern Site Helps:
                </span>
                {ind.benefits.map((b, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-2">
              <span className="text-[11px] font-mono text-slate-400 block">
                Recommended Type: <strong className="text-white">{ind.recommendedType}</strong>
              </span>
              <button
                onClick={() => handleBuildForIndustry(ind.name, ind.recommendedType)}
                className="w-full py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Build a Website for My Business</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
