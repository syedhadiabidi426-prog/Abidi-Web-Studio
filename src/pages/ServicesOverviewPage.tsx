import React from 'react';
import {
  Layout,
  ShoppingBag,
  Code2,
  Server,
  Layers,
  Sparkles,
  Sliders,
  RefreshCw,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
} from 'lucide-react';
import { SERVICES_LIST } from '../data/servicesData';
import { getServiceWhatsAppUrl } from '../utils/constants';

interface ServicesOverviewPageProps {
  onNavigate: (path: string) => void;
}

export const ServicesOverviewPage: React.FC<ServicesOverviewPageProps> = ({ onNavigate }) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'web-design':
        return <Layout className="w-5 h-5" />;
      case 'ecommerce':
        return <ShoppingBag className="w-5 h-5" />;
      case 'frontend':
        return <Code2 className="w-5 h-5" />;
      case 'backend':
        return <Server className="w-5 h-5" />;
      case 'fullstack':
        return <Layers className="w-5 h-5" />;
      case 'react-nextjs':
        return <Sparkles className="w-5 h-5" />;
      case 'custom-apps':
        return <Sliders className="w-5 h-5" />;
      case 'redesign':
        return <RefreshCw className="w-5 h-5" />;
      case 'maintenance':
        return <ShieldCheck className="w-5 h-5" />;
      default:
        return <Code2 className="w-5 h-5" />;
    }
  };

  const handleDiscuss = (serviceTitle: string) => {
    sessionStorage.setItem('prefill_service', serviceTitle);
    onNavigate('/contact');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#38BDF8] py-1 px-3.5 rounded-full bg-blue-500/10 border border-blue-500/20">
          Our Full Capabilities
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
          Digital Web Engineering & Design Services
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          From corporate presence websites and e-commerce stores to high-performance React frontends and custom full-stack web applications.
        </p>
      </div>

      {/* Services Grid (All 9 requested services) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES_LIST.map((service, index) => (
          <div
            key={service.id}
            className="p-7 rounded-2xl bg-[#080D1A] border border-white/10 hover:border-blue-500/40 transition-all duration-200 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 text-[#38BDF8] flex items-center justify-center group-hover:scale-105 transition-transform">
                  {getIcon(service.id)}
                </div>
                <span className="text-xs font-mono text-slate-500">
                  0{index + 1}
                </span>
              </div>

              <h2 className="text-xl font-bold text-white mb-2 group-hover:text-[#38BDF8] transition-colors">
                {service.title}
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                {service.shortDesc}
              </p>

              {/* Target audience */}
              <div className="mb-4">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 block mb-1">
                  Ideal For:
                </span>
                <p className="text-xs text-slate-300">
                  {service.targetAudience.slice(0, 2).join(' · ')}
                </p>
              </div>

              {/* Key Features */}
              <div className="space-y-1.5 mb-6">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 block mb-1">
                  Key Inclusions:
                </span>
                {service.keyFeatures.slice(0, 3).map((f, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#38BDF8] shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-5 border-t border-white/10 flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => onNavigate(`/services/${service.slug}`)}
                  className="text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Full Specifications &rarr;
                </button>
                <a
                  href={getServiceWhatsAppUrl(service.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg border border-white/10 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-colors"
                  title="WhatsApp Quotation Link"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
              <button
                onClick={() => handleDiscuss(service.title)}
                className="w-full py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-colors text-center cursor-pointer"
              >
                Discuss Your Project
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Consultation Banner */}
      <div className="p-8 sm:p-10 rounded-2xl bg-[#0B1222] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">Not sure which service fits your requirements?</h3>
          <p className="text-xs text-slate-400 max-w-xl">
            We offer transparent project scoping sessions to understand your business objectives and recommend the most cost-effective architecture.
          </p>
        </div>
        <button
          onClick={() => onNavigate('/contact')}
          className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-colors whitespace-nowrap cursor-pointer"
        >
          Request Scoping Session
        </button>
      </div>
    </div>
  );
};
