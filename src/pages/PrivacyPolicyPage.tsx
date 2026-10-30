import React from 'react';
import { ShieldCheck, Mail } from 'lucide-react';
import { BUSINESS_INFO } from '../utils/constants';

interface PrivacyPolicyPageProps {
  onNavigate: (path: string) => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
      <div className="space-y-3">
        <div className="text-xs font-mono uppercase tracking-widest text-[#38BDF8]">
          Legal & Compliance
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-400">
          Last updated: October 2026 · Abidi Web Studio
        </p>
      </div>

      <div className="p-8 rounded-2xl bg-[#080D1A] border border-white/10 space-y-8 text-xs sm:text-sm text-slate-300 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-base font-bold text-white">1. Introduction & Overview</h2>
          <p>
            Abidi Web Studio (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), founded by Syed Hadi Abidi, is committed to safeguarding the privacy and confidentiality of individuals who visit our website or submit project enquiries. This policy outlines how we collect, process, and protect your information when using our services.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white">2. Information We Collect</h2>
          <p>
            When you complete an enquiry form on our website or contact us directly via WhatsApp or email, we may collect:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
            <li>Your full name and company/business name</li>
            <li>Your business email address and phone or WhatsApp contact number</li>
            <li>Your country or geographical operating region</li>
            <li>Project specifications, desired features, budget range, and timeline estimates</li>
            <li>Technical connection information (such as IP address for rate-limiting and spam deterrence)</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white">3. How We Use Your Information</h2>
          <p>
            We process your information exclusively for legitimate business purposes:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
            <li>To review your web development requirements and provide an accurate quotation</li>
            <li>To correspond with you regarding project milestones and technical consultations</li>
            <li>To enforce rate limiting, protect against spam submissions, and maintain website security</li>
            <li>We do NOT sell, rent, or monetize your contact information to any third parties or advertisers</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white">4. Data Storage & Security Measures</h2>
          <p>
            Your enquiry details are stored securely on our protected backend server. We employ industry-standard security practices, including HTTPS encryption, parameterized database models, input sanitization, and administrative session token controls to prevent unauthorized access.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white">5. Your Data Protection Rights</h2>
          <p>
            Depending on your jurisdiction (including the EU GDPR, UK GDPR, California CCPA, and Australian Privacy Principles), you have rights regarding your personal data:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
            <li>The right to request a copy of the data we hold concerning your enquiries</li>
            <li>The right to request correction or updating of inaccurate information</li>
            <li>The right to request the permanent deletion of your project enquiry records from our database</li>
          </ul>
        </section>

        <section className="space-y-3 pt-4 border-t border-white/10">
          <h2 className="text-base font-bold text-white">6. Contact for Privacy Enquiries</h2>
          <p>
            If you have questions regarding this Privacy Policy or wish to request data deletion, please contact founder Syed Hadi Abidi directly:
          </p>
          <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1 font-mono text-xs">
            <div>Email: <a href={`mailto:${BUSINESS_INFO.email}`} className="text-[#38BDF8] underline">{BUSINESS_INFO.email}</a></div>
            <div>WhatsApp: <a href={BUSINESS_INFO.whatsappChatUrl} className="text-emerald-400 underline">{BUSINESS_INFO.whatsappNumber}</a></div>
          </div>
        </section>
      </div>
    </div>
  );
};
