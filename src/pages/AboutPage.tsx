import React from 'react';
import { ArrowRight, Code2, Cpu, Globe, CheckCircle2, MessageCircle, Terminal, Layers } from 'lucide-react';
import { BUSINESS_INFO, getWhatsAppEnquiryUrl } from '../utils/constants';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Intro Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#38BDF8] py-1 px-3.5 rounded-full bg-blue-500/10 border border-blue-500/20">
          About Abidi Web Studio
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Modern Digital Experiences Built With Engineering Discipline
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Combining thoughtful aesthetics, resilient frontend engineering, and transparent international communication.
        </p>
      </div>

      {/* Core Business Statement (Required Draft Copy) */}
      <div className="p-8 sm:p-10 rounded-2xl bg-[#080D1A] border border-white/10 space-y-6">
        <h2 className="text-xs uppercase tracking-widest font-semibold text-[#38BDF8]">
          Our Mission & Philosophy
        </h2>
        <div className="space-y-4 text-sm sm:text-base text-slate-200 leading-relaxed">
          <p>
            Abidi Web Studio focuses on building modern digital experiences that help businesses establish a stronger online presence. From professional business websites and e-commerce stores to frontend interfaces and custom web applications, our goal is to create digital products that combine thoughtful design with practical functionality.
          </p>
          <p>
            We believe a successful website should be visually appealing, easy to navigate, responsive across devices, and built around the needs of its business.
          </p>
          <p>
            Every project begins with understanding the client&apos;s goals, requirements, audience, and budget.
          </p>
        </div>
      </div>

      {/* Founder & Lead Developer Spotlight */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center p-8 rounded-2xl bg-gradient-to-r from-[#0B1222] to-[#080D1A] border border-white/10">
        <div className="md:col-span-1 flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#38BDF8] flex items-center justify-center text-white text-3xl font-extrabold shadow-xl shadow-blue-600/20 mb-4">
            HA
          </div>
          <h3 className="text-lg font-bold text-white">{BUSINESS_INFO.founder}</h3>
          <p className="text-xs text-[#38BDF8] font-mono mt-0.5">Founder & Full-Stack Developer</p>
          <p className="text-xs text-slate-400 mt-2">
            Directly oversees design systems, code architecture, and client delivery.
          </p>
        </div>
        <div className="md:col-span-2 space-y-3 text-xs sm:text-sm text-slate-300">
          <p>
            Abidi Web Studio is run with direct developer accountability. Rather than dealing with non-technical account representatives or multiple subcontracted layers, clients collaborate directly with founder and engineer Syed Hadi Abidi.
          </p>
          <p>
            We focus on international clients in the <strong>United States</strong>, <strong>United Kingdom</strong>, <strong>Canada</strong>, <strong>Australia</strong>, and <strong>Pakistan</strong>, bridging regional business requirements with clean, scalable web engineering.
          </p>
          <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono">
            <span className="text-emerald-400 flex items-center gap-1.5">
              <span>WhatsApp:</span>
              <a href={BUSINESS_INFO.whatsappChatUrl} target="_blank" rel="noopener noreferrer" className="underline">
                {BUSINESS_INFO.whatsappNumber}
              </a>
            </span>
            <span className="text-sky-400 flex items-center gap-1.5">
              <span>Email:</span>
              <a href={`mailto:${BUSINESS_INFO.email}`} className="underline">
                {BUSINESS_INFO.email}
              </a>
            </span>
          </div>
        </div>
      </div>

      {/* 4 Pillars: Approach, Development Principles, Client Expectations, Technologies */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Our Approach */}
        <div className="p-6 rounded-2xl bg-[#080D1A] border border-white/10 space-y-4">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-[#38BDF8] flex items-center justify-center">
            <Terminal className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Our Approach</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            We avoid cookie-cutter templates that look bloated and perform sluggishly. Every project starts with a discovery conversation to establish clear functional needs, sitemap hierarchy, and brand aesthetics. From there, we prototype the interface with intentional typography and clean mobile ergonomics before coding modular, maintainable React components.
          </p>
        </div>

        {/* Development Principles */}
        <div className="p-6 rounded-2xl bg-[#080D1A] border border-white/10 space-y-4">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-[#38BDF8] flex items-center justify-center">
            <Code2 className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Development Principles</h3>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
              <span><strong>Performance First:</strong> Fast load times with zero unneeded third-party libraries.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
              <span><strong>Mobile-Native UX:</strong> Thumb-zone friendly interactions with zero horizontal scrolling.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
              <span><strong>Defensive Validation:</strong> Input sanitization and error boundaries on all forms.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
              <span><strong>Accessible Contrast:</strong> Strict WCAG color ratios for readable text across all devices.</span>
            </li>
          </ul>
        </div>

        {/* What Clients Can Expect */}
        <div className="p-6 rounded-2xl bg-[#080D1A] border border-white/10 space-y-4">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-[#38BDF8] flex items-center justify-center">
            <Globe className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">What Clients Can Expect</h3>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Direct communication with founder Syed Hadi Abidi via WhatsApp & email.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Transparent milestone schedule agreed upon before writing a single line of code.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Rigorous cross-browser and cross-device testing across iOS and Android.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Complete handover of clean source code and deployment assistance.</span>
            </li>
          </ul>
        </div>

        {/* Technologies We Work With */}
        <div className="p-6 rounded-2xl bg-[#080D1A] border border-white/10 space-y-4">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-[#38BDF8] flex items-center justify-center">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Technologies We Work With</h3>
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="p-2 rounded bg-black/40 border border-white/5 text-slate-300">React 19 & Next.js</div>
            <div className="p-2 rounded bg-black/40 border border-white/5 text-slate-300">TypeScript</div>
            <div className="p-2 rounded bg-black/40 border border-white/5 text-slate-300">Tailwind CSS v4</div>
            <div className="p-2 rounded bg-black/40 border border-white/5 text-slate-300">Node.js & Express</div>
            <div className="p-2 rounded bg-black/40 border border-white/5 text-slate-300">PostgreSQL / SQL</div>
            <div className="p-2 rounded bg-black/40 border border-white/5 text-slate-300">RESTful APIs</div>
            <div className="p-2 rounded bg-black/40 border border-white/5 text-slate-300">HTML5 Semantic SEO</div>
            <div className="p-2 rounded bg-black/40 border border-white/5 text-slate-300">Cloud Run / Vercel</div>
          </div>
        </div>
      </div>

      {/* CTA Bottom Banner */}
      <div className="text-center p-8 rounded-2xl bg-blue-950/30 border border-blue-500/20 space-y-4">
        <h3 className="text-xl font-bold text-white">Let&apos;s Discuss Your Project</h3>
        <p className="text-xs text-slate-300 max-w-lg mx-auto">
          Whether you need a sleek landing page, an e-commerce storefront, or a custom full-stack web application, we are ready to help.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={() => onNavigate('/contact')}
            className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-colors cursor-pointer"
          >
            Start Project Enquiry
          </button>
          <a
            href={getWhatsAppEnquiryUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/40 hover:bg-emerald-900/40 border border-emerald-500/20 rounded-xl transition-colors"
          >
            Message on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};
