import React, { useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  MessageCircle,
  Code2,
  Layout,
  ShoppingBag,
  Server,
  Layers,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Globe,
  Sliders,
  DollarSign,
  ChevronRight,
} from 'lucide-react';
import { BUSINESS_INFO, getWhatsAppEnquiryUrl, getServiceWhatsAppUrl } from '../utils/constants';
import { SERVICES_LIST } from '../data/servicesData';
import { DEMO_PROJECTS } from '../data/portfolioData';
import { REGIONS, INITIAL_PACKAGES } from '../data/pricingData';
import { RegionCode, DemoProject } from '../types';
import { DemoProjectModal } from '../components/DemoProjectModal';

interface HomePageProps {
  onNavigate: (path: string) => void;
  selectedRegion: RegionCode;
  onSelectRegion: (reg: RegionCode) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  selectedRegion,
  onSelectRegion,
}) => {
  const [activeDemo, setActiveDemo] = useState<DemoProject | null>(null);

  const heroVisual = '/images/hero_web_agency_1793250776168.jpg';

  const handleStartProjectWithPrefill = (serviceTitle?: string) => {
    if (serviceTitle) {
      sessionStorage.setItem('prefill_service', serviceTitle);
    }
    onNavigate('/contact');
  };

  return (
    <div className="space-y-24 sm:space-y-32">
      {/* 1. HOMEPAGE HERO SECTION */}
      <section className="relative pt-12 pb-8 sm:pt-20 sm:pb-16 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-600/15 via-sky-500/10 to-transparent blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            {/* Small introductory label */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#38BDF8] py-1 px-3.5 rounded-full bg-blue-500/10 border border-blue-500/20">
              <span>Digital Experiences</span>
              <span>•</span>
              <span>Web Design</span>
              <span>•</span>
              <span>Development</span>
            </div>

            {/* Main headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white text-balance leading-[1.12]">
              Websites Built to Make Your Business Stand Out.
            </h1>

            {/* Supporting headline */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Abidi Web Studio creates modern, responsive websites, online stores, and custom web applications for ambitious businesses around the world.
            </p>

            {/* Actions */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => onNavigate('/contact')}
                className="flex items-center gap-2 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#2563EB] rounded-xl shadow-lg shadow-blue-600/25 transition-all duration-200 cursor-pointer"
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('/services')}
                className="flex items-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-200 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 rounded-xl transition-all duration-200 cursor-pointer"
              >
                <span>Explore Our Services</span>
                <ArrowUpRight className="w-4 h-4 text-slate-400" />
              </button>

              <a
                href={getWhatsAppEnquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/30 hover:bg-emerald-900/40 border border-emerald-500/20 rounded-xl transition-all duration-200"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Target markets trust signals */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-400">
              <span className="text-slate-500">Delivering for clients in:</span>
              <span>United States</span>
              <span>·</span>
              <span>United Kingdom</span>
              <span>·</span>
              <span>Canada</span>
              <span>·</span>
              <span>Australia</span>
              <span>·</span>
              <span>Pakistan</span>
            </div>
          </div>

          {/* Hero Visual Preview: Desktop & Mobile interface mockup */}
          <div className="mt-14 max-w-5xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#080D1A] group">
              <div className="h-9 bg-[#0B1222] border-b border-white/10 px-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <div className="text-[11px] font-mono text-slate-400 bg-black/40 px-4 py-0.5 rounded border border-white/5">
                  abidiwebstudio.com / demo-preview
                </div>
                <div className="text-[11px] font-mono text-slate-500">HTTPS Secure</div>
              </div>

              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <img
                  src={heroVisual}
                  alt="Modern website interface designed by Abidi Web Studio displayed on high-end hardware"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-500"
                />
              </div>

              <div className="p-4 bg-[#080D1A] border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3 text-slate-400">
                  <span className="font-semibold text-white">Full-Stack Craftsmanship</span>
                  <span>·</span>
                  <span>React 19 & Node.js</span>
                  <span>·</span>
                  <span>Tailwind CSS</span>
                </div>
                <button
                  onClick={() => onNavigate('/portfolio')}
                  className="text-[#38BDF8] hover:underline flex items-center gap-1 font-medium cursor-pointer"
                >
                  <span>Explore Demo Projects</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST & WHAT YOU CAN EXPECT (Honest Business Standard) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xs uppercase tracking-widest text-[#38BDF8] font-bold mb-2">
            Professional Standards
          </h2>
          <p className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            What You Can Expect Working With Us
          </p>
          <p className="text-sm text-slate-400 mt-3">
            Transparent communication, clean source code, honest pricing, and direct collaboration with founder and developer Syed Hadi Abidi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#080D1A] border border-white/10 hover:border-blue-500/30 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-[#38BDF8] flex items-center justify-center mb-4">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white mb-2">Direct Technical Oversight</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              No middle managers or outsourced handoffs. Your project architecture is planned, written, and deployed directly by Syed Hadi Abidi.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#080D1A] border border-white/10 hover:border-blue-500/30 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-[#38BDF8] flex items-center justify-center mb-4">
              <DollarSign className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white mb-2">Transparent Regional Pricing</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Clear starting rates for USA, UK, Canada, Australia, and Pakistan. No surprise markups or hidden fees—every quote is agreed upon upfront.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#080D1A] border border-white/10 hover:border-blue-500/30 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-[#38BDF8] flex items-center justify-center mb-4">
              <Layout className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white mb-2">100% Mobile Fluidity</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Engineered from the ground up to render flawlessly on iPhones, Android devices, tablets, and wide monitors with zero horizontal overflow.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#080D1A] border border-white/10 hover:border-blue-500/30 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-[#38BDF8] flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white mb-2">Clean Handover & Ownership</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              You retain 100% ownership of your source code, domain, and hosting. We configure your deployment and hand over complete access.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#080D1A] border border-white/10 hover:border-blue-500/30 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-[#38BDF8] flex items-center justify-center mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white mb-2">Honest Business Integrity</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We never fabricate client counts, fake testimonials, or fictional credentials. We let our design quality and functional codebase speak for itself.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#080D1A] border border-white/10 hover:border-blue-500/30 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-[#38BDF8] flex items-center justify-center mb-4">
              <MessageCircle className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white mb-2">Rapid WhatsApp Communication</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Direct access via WhatsApp for rapid feedback cycles, milestone updates, and prompt resolution of questions during development.
            </p>
          </div>
        </div>
      </section>

      {/* 3. CORE SERVICES SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-xs uppercase tracking-widest text-[#38BDF8] font-bold mb-2">
              Capabilities
            </h2>
            <p className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Website Design & Engineering Services
            </p>
            <p className="text-sm text-slate-400 mt-2 max-w-xl">
              From corporate brand websites and e-commerce stores to custom web applications and full-stack API architecture.
            </p>
          </div>
          <button
            onClick={() => onNavigate('/services')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#38BDF8] hover:text-white transition-colors self-start md:self-auto cursor-pointer"
          >
            <span>View All 9 Services</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_LIST.slice(0, 6).map((service) => (
            <div
              key={service.id}
              className="group p-6 rounded-2xl bg-[#080D1A] border border-white/10 hover:border-blue-500/40 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-[#38BDF8] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  {service.id === 'web-design' && <Layout className="w-5 h-5" />}
                  {service.id === 'ecommerce' && <ShoppingBag className="w-5 h-5" />}
                  {service.id === 'frontend' && <Code2 className="w-5 h-5" />}
                  {service.id === 'backend' && <Server className="w-5 h-5" />}
                  {service.id === 'fullstack' && <Layers className="w-5 h-5" />}
                  {service.id === 'react-nextjs' && <Sparkles className="w-5 h-5" />}
                  {service.id === 'custom-apps' && <Sliders className="w-5 h-5" />}
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#38BDF8] transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {service.shortDesc}
                </p>

                <ul className="space-y-1.5 text-xs text-slate-300 mb-6">
                  {service.keyFeatures.slice(0, 3).map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#38BDF8] shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                <button
                  onClick={() => onNavigate(`/services/${service.slug}`)}
                  className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Read Specifications
                </button>
                <div className="flex items-center gap-2">
                  <a
                    href={getServiceWhatsAppUrl(service.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg border border-white/10 hover:border-emerald-500/40 text-slate-400 hover:text-emerald-400 transition-colors"
                    title="Enquire on WhatsApp"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => handleStartProjectWithPrefill(service.title)}
                    className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors cursor-pointer"
                  >
                    Discuss Project
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. DEMO PORTFOLIO SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 font-bold mb-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>Sample Demonstration Interfaces</span>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Explore Our Portfolio Demonstrations
            </p>
            <p className="text-sm text-slate-400 mt-2 max-w-2xl">
              These are fully designed demonstration interfaces illustrating our frontend and e-commerce capabilities. Click any demo to interact with live feature previews.
            </p>
          </div>
          <button
            onClick={() => onNavigate('/portfolio')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#38BDF8] hover:text-white transition-colors self-start md:self-auto cursor-pointer"
          >
            <span>View All Demonstrations</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEMO_PROJECTS.slice(0, 3).map((demo) => (
            <div
              key={demo.id}
              className="rounded-2xl bg-[#080D1A] border border-white/10 overflow-hidden group hover:border-blue-500/40 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-video overflow-hidden bg-black/40">
                  <img
                    src={demo.imagePath}
                    alt={demo.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 bg-black/80 px-2 py-0.5 rounded border border-amber-400/30">
                      DEMO PROJECT
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="text-[11px] font-mono text-[#38BDF8] mb-1">{demo.category}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{demo.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {demo.tagline}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {demo.technologies.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="text-[11px] font-mono text-slate-300 bg-white/5 border border-white/10 px-2 py-0.5 rounded"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => setActiveDemo(demo)}
                  className="w-full py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Interact With Demo</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#38BDF8]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. REGIONAL PRICING SNAPSHOT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#0B1222] to-[#080D1A] border border-white/10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-10">
            <div>
              <h2 className="text-xs uppercase tracking-widest text-[#38BDF8] font-bold mb-2">
                Transparent Packages
              </h2>
              <p className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Suggested Starting Prices by Region
              </p>
              <p className="text-xs text-slate-400 mt-2 max-w-xl">
                Select your country to view indicative starting prices in your local currency. Final quotations depend on scope and feature complexity.
              </p>
            </div>

            {/* Region Selector Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-black/60 rounded-xl border border-white/10 self-stretch sm:self-auto">
              {(Object.keys(REGIONS) as RegionCode[]).map((code) => {
                const reg = REGIONS[code];
                const isSelected = selectedRegion === code;
                return (
                  <button
                    key={code}
                    onClick={() => onSelectRegion(code)}
                    className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#2563EB] text-white shadow-sm'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span>{reg.flag}</span>
                    <span>{reg.currency}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Package Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {INITIAL_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className={`p-6 rounded-2xl flex flex-col justify-between border ${
                  pkg.popular
                    ? 'bg-gradient-to-b from-blue-950/40 to-[#080D1A] border-[#38BDF8]/40 shadow-xl shadow-blue-950/20'
                    : 'bg-[#080D1A] border-white/10'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                      {pkg.badge}
                    </span>
                    {pkg.popular && (
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-blue-500/20 text-[#38BDF8] border border-blue-500/30">
                        Popular Choice
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-6">{pkg.description}</p>

                  <div className="mb-6">
                    <span className="text-[11px] text-slate-500 block">Starting at</span>
                    <span className="text-3xl font-extrabold text-white font-mono tabular-nums">
                      {pkg.prices[selectedRegion]}
                    </span>
                  </div>

                  <ul className="space-y-2 text-xs text-slate-300 mb-6">
                    {pkg.inclusions.slice(0, 5).map((inc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#38BDF8] shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handleStartProjectWithPrefill(pkg.name)}
                  className={`w-full py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer ${
                    pkg.popular
                      ? 'bg-[#2563EB] hover:bg-blue-600 text-white'
                      : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                  }`}
                >
                  Enquire For {pkg.name}
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <p>
              * Prices are suggested starting values. Third-party hosting, domains, and external APIs are billed separately.
            </p>
            <button
              onClick={() => onNavigate('/pricing')}
              className="text-[#38BDF8] hover:underline whitespace-nowrap cursor-pointer font-medium"
            >
              View Full Price Matrix & 10 Service Rates &rarr;
            </button>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION / ENQUIRY SECTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-r from-blue-950/40 via-[#080D1A] to-blue-950/40 border border-blue-500/20 space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-[#38BDF8] flex items-center justify-center mx-auto">
            <Globe className="w-6 h-6" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Ready to Build a Website That Converts?
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Share your project requirements, target market, and budget parameters. Founder Syed Hadi Abidi will review your details and provide a transparent quotation.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('/contact')}
              className="px-8 py-4 text-xs font-bold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
            >
              Submit Project Enquiry
            </button>
            <a
              href={getWhatsAppEnquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/40 hover:bg-emerald-900/40 border border-emerald-500/30 rounded-xl transition-all"
            >
              Direct WhatsApp (+92 329 3171559)
            </a>
          </div>
        </div>
      </section>

      {/* Interactive Modal preview */}
      <DemoProjectModal
        project={activeDemo}
        onClose={() => setActiveDemo(null)}
        onStartProject={(type) => handleStartProjectWithPrefill(type)}
      />
    </div>
  );
};
