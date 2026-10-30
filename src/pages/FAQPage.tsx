import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, HelpCircle, MessageCircle } from 'lucide-react';
import { FAQ_LIST } from '../data/faqData';
import { getWhatsAppEnquiryUrl } from '../utils/constants';

interface FAQPageProps {
  onNavigate: (path: string) => void;
}

export const FAQPage: React.FC<FAQPageProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'general', label: 'General & Scope' },
    { id: 'pricing', label: 'Pricing & Payments' },
    { id: 'technical', label: 'Technical & Stack' },
    { id: 'process', label: 'Process & Support' },
  ];

  const filteredFaqs = FAQ_LIST.filter((faq) => {
    const matchesCat = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#38BDF8] py-1 px-3.5 rounded-full bg-blue-500/10 border border-blue-500/20">
          Straightforward Answers
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
          Transparent, honest answers regarding our web development workflow, international clients, pricing policies, and technologies.
        </p>
      </div>

      {/* Controls: Search and Categories */}
      <div className="space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions (e.g., e-commerce, international clients, payments)..."
            className="w-full pl-11 pr-4 py-3 bg-[#080D1A] border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#38BDF8] transition-colors"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                activeCategory === c.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-[#080D1A] text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12 p-6 rounded-2xl bg-[#080D1A] border border-white/10 text-slate-400 text-sm">
            No questions found matching your search term. Feel free to ask us directly via WhatsApp.
          </div>
        ) : (
          filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="rounded-2xl bg-[#080D1A] border border-white/10 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-white leading-snug">
                    {faq.question}
                  </span>
                  <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Direct Contact Prompt */}
      <div className="p-8 rounded-2xl bg-[#0B1222] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div>
          <h3 className="text-lg font-bold text-white">Have a specific question not listed here?</h3>
          <p className="text-xs text-slate-400 mt-1">
            Send a direct message to founder Syed Hadi Abidi on WhatsApp for an immediate response.
          </p>
        </div>
        <a
          href={getWhatsAppEnquiryUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/40 hover:bg-emerald-900/40 border border-emerald-500/30 rounded-xl transition-colors whitespace-nowrap flex items-center gap-2"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Ask on WhatsApp</span>
        </a>
      </div>
    </div>
  );
};
