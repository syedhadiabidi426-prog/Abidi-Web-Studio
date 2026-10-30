import React, { useState } from 'react';
import { Menu, X, ArrowUpRight, MessageCircle } from 'lucide-react';
import { BUSINESS_INFO, getWhatsAppEnquiryUrl } from '../utils/constants';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Services', path: '/services' },
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Industries', path: '/industries' },
    { label: 'Process', path: '/process' },
    { label: 'About', path: '/about' },
    { label: 'FAQ', path: '/faq' },
  ];

  const handleLinkClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#05070D]/90 backdrop-blur-md border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => handleLinkClick('/')}
          className="group flex items-center gap-3 text-left shrink-0 cursor-pointer focus:outline-none"
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#2563EB] to-[#38BDF8] flex items-center justify-center font-bold text-white tracking-wider shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
            A
          </div>
          <span className="text-xl font-bold tracking-tight text-white whitespace-nowrap shrink-0 group-hover:text-[#38BDF8] transition-colors">
            Abidi Web Studio
          </span>
        </button>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path || currentPath.startsWith(link.path + '/');
            return (
              <button
                key={link.path}
                onClick={() => handleLinkClick(link.path)}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer focus:outline-none ${
                  isActive
                    ? 'text-[#38BDF8] border-b-2 border-[#38BDF8]'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <a
            href={getWhatsAppEnquiryUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-lg border border-white/10 text-slate-300 hover:text-[#38BDF8] hover:border-[#38BDF8]/40 hover:bg-white/[0.04] transition-all focus:outline-none"
            title="Chat on WhatsApp"
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
          </a>
          <button
            onClick={() => handleLinkClick('/contact')}
            className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#2563EB] rounded-lg shadow-md shadow-blue-600/20 hover:shadow-blue-600/40 transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer focus:outline-none"
          >
            <span>Start Project</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => handleLinkClick('/contact')}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#2563EB] rounded-md sm:hidden whitespace-nowrap cursor-pointer"
          >
            Start
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors focus:outline-none cursor-pointer"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-white/10 bg-[#080D1A] px-5 py-6 space-y-4">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path || currentPath.startsWith(link.path + '/');
              return (
                <button
                  key={link.path}
                  onClick={() => handleLinkClick(link.path)}
                  className={`text-left px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                    isActive ? 'bg-blue-600/20 text-[#38BDF8]' : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
            <button
              onClick={() => handleLinkClick('/contact')}
              className="text-left px-3 py-2.5 rounded-lg text-base font-semibold text-white bg-[#2563EB] hover:bg-blue-700 transition-colors mt-2"
            >
              Start Your Project
            </button>
          </nav>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-3 text-xs text-slate-400">
            <div className="flex items-center justify-between">
              <span>Direct WhatsApp:</span>
              <a
                href={BUSINESS_INFO.whatsappChatUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 font-mono font-medium hover:underline"
              >
                {BUSINESS_INFO.whatsappNumber}
              </a>
            </div>
            <div className="flex items-center justify-between">
              <span>Official Email:</span>
              <a
                href={`mailto:${BUSINESS_INFO.email}`}
                className="text-[#38BDF8] font-mono hover:underline"
              >
                {BUSINESS_INFO.email}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
