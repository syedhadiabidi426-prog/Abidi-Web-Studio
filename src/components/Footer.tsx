import React from 'react';
import { ArrowUpRight, MessageCircle, Mail, Instagram, Facebook, Shield, Lock } from 'lucide-react';
import { BUSINESS_INFO, getWhatsAppEnquiryUrl } from '../utils/constants';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  const handleLink = (path: string) => {
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#05070D] border-t border-white/[0.08] text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Column 1: Brand & Overview */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2563EB] to-[#38BDF8] flex items-center justify-center font-bold text-white tracking-wider">
                A
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Abidi Web Studio
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Independent digital agency founded by Syed Hadi Abidi. We engineer modern, responsive websites, e-commerce storefronts, and custom full-stack web applications for ambitious international and local businesses.
            </p>
            <div className="pt-2 text-xs text-slate-500 space-y-1">
              <div>Founder & Lead Engineer: <span className="text-slate-300">Syed Hadi Abidi</span></div>
              <div>Target Markets: <span className="text-slate-300">USA, UK, Canada, Australia, Pakistan</span></div>
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Services
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => handleLink('/services/web-design')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Business Website Development
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('/services/ecommerce')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  E-commerce Development
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('/services/frontend')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Frontend Development
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('/services/backend')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Backend Development
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('/services/fullstack')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Full-Stack Development
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('/services/custom-apps')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Custom Web Applications
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Company
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => handleLink('/about')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  About Studio
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('/portfolio')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Portfolio Demonstrations
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('/pricing')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  International Pricing
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('/industries')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Industries We Serve
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('/process')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Development Process
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('/faq')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('/contact')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Contact & Project Inquiries
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Connect */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Connect With Us
            </h3>
            <div className="space-y-3 text-xs">
              <a
                href={BUSINESS_INFO.whatsappChatUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-slate-300 hover:text-emerald-400 transition-colors group"
                aria-label="Direct WhatsApp chat"
              >
                <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 group-hover:bg-emerald-500/20">
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <span className="block font-medium">WhatsApp Direct</span>
                  <span className="text-[11px] font-mono text-slate-400">{BUSINESS_INFO.whatsappNumber}</span>
                </div>
              </a>

              <a
                href={`mailto:${BUSINESS_INFO.email}`}
                className="flex items-center gap-2.5 text-slate-300 hover:text-[#38BDF8] transition-colors group"
                aria-label="Official Email address"
              >
                <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 group-hover:bg-blue-500/20">
                  <Mail className="w-4 h-4 text-[#38BDF8]" />
                </div>
                <div>
                  <span className="block font-medium">Official Email</span>
                  <span className="text-[11px] font-mono text-slate-400">{BUSINESS_INFO.email}</span>
                </div>
              </a>

              <a
                href={BUSINESS_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-slate-300 hover:text-pink-400 transition-colors group"
                aria-label="Instagram profile"
              >
                <div className="p-2 rounded-lg bg-pink-500/10 border border-pink-500/20 group-hover:bg-pink-500/20">
                  <Instagram className="w-4 h-4 text-pink-400" />
                </div>
                <div>
                  <span className="block font-medium">Instagram</span>
                  <span className="text-[11px] text-slate-400">@abidiweb_studio</span>
                </div>
              </a>

              <a
                href={BUSINESS_INFO.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-slate-300 hover:text-blue-400 transition-colors group"
                aria-label="Facebook page"
              >
                <div className="p-2 rounded-lg bg-blue-600/10 border border-blue-600/20 group-hover:bg-blue-600/20">
                  <Facebook className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <span className="block font-medium">Facebook</span>
                  <span className="text-[11px] text-slate-400">Abidi Web Studio</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="mt-16 pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {currentYear} Abidi Web Studio. All rights reserved. Founded by Syed Hadi Abidi.
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => handleLink('/privacy')}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => handleLink('/terms')}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Terms & Conditions
            </button>
            <button
              onClick={() => handleLink('/admin')}
              className="flex items-center gap-1.5 text-slate-500 hover:text-[#38BDF8] transition-colors cursor-pointer"
              title="Authorized Studio Admin Portal"
            >
              <Lock className="w-3 h-3" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
