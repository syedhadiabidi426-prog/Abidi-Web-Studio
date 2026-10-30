import React, { useState } from 'react';
import { ArrowRight, Sparkles, Code2, ExternalLink, CheckCircle2 } from 'lucide-react';
import { DEMO_PROJECTS } from '../data/portfolioData';
import { DemoProject } from '../types';
import { DemoProjectModal } from '../components/DemoProjectModal';

interface PortfolioPageProps {
  onNavigate: (path: string) => void;
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({ onNavigate }) => {
  const [selectedDemo, setSelectedDemo] = useState<DemoProject | null>(null);

  const handleStartSimilar = (projectName: string) => {
    sessionStorage.setItem('prefill_service', `Similar to ${projectName}`);
    onNavigate('/contact');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400 py-1 px-3.5 rounded-full bg-amber-400/10 border border-amber-400/20">
          Sample Demonstration Interfaces
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Portfolio & Architectural Demonstrations
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          The projects below are sample concept interfaces created to demonstrate our frontend styling, responsive design, component architecture, and interaction standards.
        </p>
      </div>

      {/* Honest Business Disclosure Banner */}
      <div className="p-6 rounded-2xl bg-[#080D1A] border border-amber-500/20 flex items-start gap-4">
        <div className="p-2.5 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 shrink-0">
          <Sparkles className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Important Business Transparency Notice
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Abidi Web Studio values integrity above all. Every item in this portfolio is an in-house developed <strong>sample demonstration project</strong>. We do not claim these as past commercial client contracts or multi-million dollar corporate deployments. You can test and inspect our interactive frontend implementations by clicking &quot;View Demo&quot; on any card.
          </p>
        </div>
      </div>

      {/* Demo Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {DEMO_PROJECTS.map((demo) => (
          <div
            key={demo.id}
            className="rounded-2xl bg-[#080D1A] border border-white/10 overflow-hidden hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              {/* Image Preview with Badge */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-black/60">
                <img
                  src={demo.imagePath}
                  alt={demo.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-300 bg-black/85 px-3 py-1 rounded-md border border-amber-400/40 backdrop-blur-sm">
                    DEMO PROJECT
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-8 space-y-4">
                <div>
                  <span className="text-xs font-mono text-[#38BDF8] uppercase tracking-wider block mb-1">
                    {demo.category}
                  </span>
                  <h2 className="text-2xl font-bold text-white group-hover:text-[#38BDF8] transition-colors">
                    {demo.title}
                  </h2>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {demo.description}
                </p>

                {/* Highlights */}
                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 block">
                    Interactive Features Included:
                  </span>
                  {demo.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Tags */}
                <div className="pt-2 flex flex-wrap gap-2">
                  {demo.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-8 pt-0 border-t border-white/10 mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 pt-6">
              <button
                onClick={() => setSelectedDemo(demo)}
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>View Demo Simulation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => handleStartSimilar(demo.title)}
                className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors cursor-pointer text-center"
              >
                Build Similar Website
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Modal */}
      <DemoProjectModal
        project={selectedDemo}
        onClose={() => setSelectedDemo(null)}
        onStartProject={(name) => handleStartSimilar(name || 'Custom Project')}
      />
    </div>
  );
};
