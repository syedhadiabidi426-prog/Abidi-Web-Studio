import React from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, MessageCircle, ShieldCheck, Clock } from 'lucide-react';
import { SERVICES_LIST } from '../data/servicesData';
import { getServiceWhatsAppUrl } from '../utils/constants';

interface ServiceDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ slug, onNavigate }) => {
  const service = SERVICES_LIST.find((s) => s.slug === slug) || SERVICES_LIST[0];

  const handleStartProject = () => {
    sessionStorage.setItem('prefill_service', service.title);
    onNavigate('/contact');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Back button */}
      <div>
        <button
          onClick={() => onNavigate('/services')}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Services</span>
        </button>
      </div>

      {/* Hero Headline */}
      <div className="space-y-4">
        <div className="text-xs font-mono uppercase tracking-widest text-[#38BDF8]">
          Service Specification
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
          {service.title}
        </h1>
        <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
          {service.shortDesc}
        </p>
      </div>

      {/* Target Clients & Scope */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-2xl bg-[#080D1A] border border-white/10 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-white">
            Who This Service Is For
          </h2>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
            {service.targetAudience.map((aud, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                <span>{aud}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-8 rounded-2xl bg-[#080D1A] border border-white/10 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-white">
            Guaranteed Deliverables
          </h2>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
            {service.deliverables.map((del, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{del}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Key Features & Architecture Details */}
      <div className="p-8 sm:p-10 rounded-2xl bg-[#0B1222] border border-white/10 space-y-6">
        <h2 className="text-sm font-bold uppercase tracking-wider text-[#38BDF8]">
          Complete Technical Scope & Features Included
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {service.keyFeatures.map((feat, i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-black/40 border border-white/5 flex items-start gap-3"
            >
              <div className="w-5 h-5 rounded-full bg-blue-500/20 text-[#38BDF8] flex items-center justify-center shrink-0 mt-0.5 text-xs font-mono">
                {i + 1}
              </div>
              <span className="text-xs text-slate-200 leading-relaxed">{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Consultation Action Box */}
      <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-blue-950/40 via-[#080D1A] to-blue-950/40 border border-blue-500/20 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">
            Discuss {service.title} With Syed Hadi Abidi
          </h3>
          <p className="text-xs text-slate-300 max-w-xl">
            Get an itemized quotation tailored to your region and specific technical scope.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={getServiceWhatsAppUrl(service.title)}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/40 hover:bg-emerald-900/40 border border-emerald-500/20 rounded-xl transition-colors flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Enquiry</span>
          </a>
          <button
            onClick={handleStartProject}
            className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
          >
            <span>Submit Enquiry</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
