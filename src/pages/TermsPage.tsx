import React from 'react';
import { BUSINESS_INFO } from '../utils/constants';

interface TermsPageProps {
  onNavigate: (path: string) => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
      <div className="space-y-3">
        <div className="text-xs font-mono uppercase tracking-widest text-[#38BDF8]">
          Legal & Agreements
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Terms & Conditions
        </h1>
        <p className="text-xs text-slate-400">
          Last updated: October 2026 · Abidi Web Studio
        </p>
      </div>

      <div className="p-8 rounded-2xl bg-[#080D1A] border border-white/10 space-y-8 text-xs sm:text-sm text-slate-300 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-base font-bold text-white">1. Scope of Engagement</h2>
          <p>
            These Terms & Conditions govern web design, frontend engineering, e-commerce development, and custom web application services provided by Abidi Web Studio (lead by Syed Hadi Abidi) to client businesses. Specific project deliverables, milestone deadlines, and final pricing are formalized in written project agreements prior to kickoff.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white">2. Quotations & Indicative Pricing</h2>
          <p>
            All prices displayed on this website are indicative starting prices in respective local currencies (USD, GBP, CAD, AUD, and PKR). They do not constitute guaranteed binding offers for arbitrary project scopes. A definitive binding quotation is issued only after review and mutual sign-off of the functional requirements.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white">3. Third-Party Costs & Infrastructure</h2>
          <p>
            Domain name registrations, cloud hosting (e.g., Cloud Run, Vercel, VPS), third-party payment gateway transaction fees, external API subscriptions, and paid font or plugin licenses are separate from Abidi Web Studio&apos;s development charges and remain the direct financial and legal responsibility of the client.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white">4. Intellectual Property & Code Ownership</h2>
          <p>
            Upon full settlement of all agreed project milestone invoices, full intellectual property and ownership rights of the custom application source code, assets, and design files produced specifically for the client are irrevocably transferred to the client.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white">5. Client Responsibilities & Feedback</h2>
          <p>
            Project delivery milestones depend on the timely provision of necessary copy, logos, branding assets, credentials, and feedback by the client. Delays in client feedback may adjust the scheduled completion date proportionally.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white">6. Warranties & Maintenance</h2>
          <p>
            We provide testing and bug-fix verification for all agreed deliverables upon delivery. Post-launch bug fixes, continuous security updates, and operational monitoring are covered under optional monthly maintenance retainers.
          </p>
        </section>

        <section className="space-y-3 pt-4 border-t border-white/10">
          <h2 className="text-base font-bold text-white">7. Governing Law & Contact</h2>
          <p>
            For any contractual clarifications or project inquiries, please reach out to:
          </p>
          <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1 font-mono text-xs">
            <div>Contact: Syed Hadi Abidi</div>
            <div>Email: <a href={`mailto:${BUSINESS_INFO.email}`} className="text-[#38BDF8] underline">{BUSINESS_INFO.email}</a></div>
            <div>WhatsApp: <a href={BUSINESS_INFO.whatsappChatUrl} className="text-emerald-400 underline">{BUSINESS_INFO.whatsappNumber}</a></div>
          </div>
        </section>
      </div>
    </div>
  );
};
