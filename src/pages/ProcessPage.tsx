import React from 'react';
import { Compass, FileCode, Palette, Code2, CheckCircle2, Rocket, ShieldCheck, ArrowRight } from 'lucide-react';

interface ProcessPageProps {
  onNavigate: (path: string) => void;
}

export const ProcessPage: React.FC<ProcessPageProps> = ({ onNavigate }) => {
  const steps = [
    {
      num: '01',
      title: 'Discovery & Requirements',
      icon: <Compass className="w-5 h-5" />,
      tagline: 'Understand the business, audience, requirements, and commercial goals.',
      description:
        'We begin with an in-depth consultation directly with founder Syed Hadi Abidi. We examine your target audience (USA, UK, Canada, Australia, Pakistan, or international), competitive positioning, mandatory integrations (WhatsApp, CRM, payment systems), and aesthetic expectations.',
      deliverables: ['Discovery notes & technical objectives', 'Target audience definition', 'Initial timeline and milestone plan'],
    },
    {
      num: '02',
      title: 'Planning & Scope Definition',
      icon: <FileCode className="w-5 h-5" />,
      tagline: 'Define the sitemap, features, project scope, timeline, and budget.',
      description:
        'We formalize the exact page structure, content strategy, user flow hierarchy, and database requirements. Every inclusion is documented in an itemized project scope with a transparent fixed quotation and payment schedule before any coding begins.',
      deliverables: ['Architectural sitemap', 'Technical specification sheet', 'Binding fixed-price quotation & milestone dates'],
    },
    {
      num: '03',
      title: 'Design & Visual Direction',
      icon: <Palette className="w-5 h-5" />,
      tagline: 'Create the interface and agree on the luxury visual direction.',
      description:
        'We design the bespoke visual identity: typography pairing, luxury color palettes, spacing rhythm, card elevation, and responsive mobile mockups. We present the visual concept for your review and refine it until you are completely satisfied with the aesthetic.',
      deliverables: ['Visual design mockup', 'Typography & color system', 'Approved mobile & desktop artboards'],
    },
    {
      num: '04',
      title: 'Full-Stack Development',
      icon: <Code2 className="w-5 h-5" />,
      tagline: 'Build the approved frontend and any required backend functionality.',
      description:
        'We construct clean, maintainable, modular React code styled with Tailwind CSS. If your project includes server functionality, we build secure Node.js REST API routes, database schemas, validation layers, and role-based administrative control panels.',
      deliverables: ['React frontend codebase', 'Node.js server & database endpoints', 'Secure form routing & WhatsApp click-to-chat'],
    },
    {
      num: '05',
      title: 'Rigorous Quality Testing',
      icon: <CheckCircle2 className="w-5 h-5" />,
      tagline: 'Test responsiveness, navigation, forms, functionality, and major user journeys.',
      description:
        'We verify every interactive button, validate forms with edge cases, test responsiveness across iOS and Android devices, inspect accessibility and color contrast, and audit page load speed to guarantee a frictionless visitor experience.',
      deliverables: ['Cross-browser compatibility report', 'Mobile responsiveness audit', 'Zero-broken-link verification'],
    },
    {
      num: '06',
      title: 'Deployment & Live Launch',
      icon: <Rocket className="w-5 h-5" />,
      tagline: 'Configure the domain and hosting, deploy the project, and verify the live website.',
      description:
        'We connect your custom domain name, set up SSL/HTTPS security certificates, deploy the production build to your chosen cloud hosting platform, verify live contact form delivery, and configure XML sitemaps and robots.txt for search visibility.',
      deliverables: ['Live production deployment', 'SSL certificate verification', 'Submission of XML sitemap to search engines'],
    },
    {
      num: '07',
      title: 'Support & Ongoing Handover',
      icon: <ShieldCheck className="w-5 h-5" />,
      tagline: 'Provide agreed maintenance, updates, and complete source code handover.',
      description:
        'You receive full, unrestricted ownership of your source code repository and hosting accounts. For ongoing security, backups, dependency updates, and content additions, we offer optional monthly maintenance retainers.',
      deliverables: ['Full source code repository handover', 'Deployment walkthrough guide', 'Optional monthly maintenance package'],
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#38BDF8] py-1 px-3.5 rounded-full bg-blue-500/10 border border-blue-500/20">
          Structured Methodology
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
          How We Build Your Website: 7 Clear Milestones
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Predictable timelines, zero guesswork, and transparent milestones from initial conversation to live deployment.
        </p>
      </div>

      {/* Process Timeline */}
      <div className="space-y-8 relative before:absolute before:inset-0 before:left-7 sm:before:left-9 before:w-0.5 before:bg-white/10 before:z-0">
        {steps.map((step) => (
          <div key={step.num} className="relative z-10 flex items-start gap-5 sm:gap-8 group">
            {/* Step badge */}
            <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-2xl bg-[#080D1A] border border-blue-500/30 text-[#38BDF8] flex flex-col items-center justify-center font-mono font-bold text-sm sm:text-base shrink-0 shadow-lg group-hover:border-[#38BDF8] transition-colors">
              <span className="text-[10px] text-slate-500 font-sans uppercase">Step</span>
              <span>{step.num}</span>
            </div>

            {/* Card Content */}
            <div className="flex-1 p-6 sm:p-8 rounded-2xl bg-[#080D1A] border border-white/10 space-y-4 group-hover:border-blue-500/30 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <span>{step.title}</span>
                </h2>
                <span className="text-xs font-mono text-[#38BDF8]">{step.tagline}</span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {step.description}
              </p>

              <div className="pt-3 border-t border-white/5 space-y-1.5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 block">
                  Key Deliverables:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {step.deliverables.map((del, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Schedule Disclaimer Note */}
      <div className="p-6 rounded-2xl bg-[#0B1222] border border-white/10 text-xs text-slate-400 leading-relaxed">
        <p>
          <strong>Please note:</strong> Project delivery schedules vary based on the agreed functional scope, number of custom pages, third-party API dependencies, and promptness of client feedback and assets. An accurate milestone schedule is established and agreed upon during Step 2.
        </p>
      </div>

      {/* Bottom CTA */}
      <div className="text-center p-10 rounded-2xl bg-blue-950/30 border border-blue-500/20 space-y-4">
        <h3 className="text-xl font-bold text-white">Ready to begin Step 1?</h3>
        <p className="text-xs text-slate-300 max-w-md mx-auto">
          Reach out today to discuss your vision, audience, and functional specifications with Syed Hadi Abidi.
        </p>
        <button
          onClick={() => onNavigate('/contact')}
          className="px-8 py-3 text-xs font-bold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-colors cursor-pointer"
        >
          Initiate Discovery Conversation
        </button>
      </div>
    </div>
  );
};
