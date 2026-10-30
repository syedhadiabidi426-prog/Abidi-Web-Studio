import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { BUSINESS_INFO, getWhatsAppEnquiryUrl } from '../utils/constants';

export const FloatingWhatsApp: React.FC = () => {
  const [tooltipVisible, setTooltipVisible] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-end flex-col gap-2 pointer-events-auto">
      {tooltipVisible && (
        <div className="bg-[#080D1A] border border-emerald-500/30 p-3 rounded-xl shadow-2xl max-w-xs text-xs text-slate-200 animate-in fade-in slide-in-from-bottom-2 duration-200 mb-1">
          <div className="flex items-center justify-between gap-3 mb-1">
            <span className="font-semibold text-emerald-400">Direct WhatsApp Chat</span>
            <button
              onClick={() => setTooltipVisible(false)}
              className="text-slate-400 hover:text-white"
              aria-label="Close tooltip"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-[11px] text-slate-400">
            Chat directly with founder Syed Hadi Abidi about your project requirements or quotations.
          </p>
          <a
            href={getWhatsAppEnquiryUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 block text-center py-1.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-lg text-[11px] transition-colors"
          >
            Start WhatsApp Chat
          </a>
        </div>
      )}

      <a
        href={getWhatsAppEnquiryUrl()}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setTooltipVisible(true)}
        className="w-13 h-13 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-950/50 hover:scale-105 transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-[#05070D]"
        aria-label="Direct WhatsApp message to Syed Hadi Abidi"
        title="Chat with Syed Hadi Abidi on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 group-hover:rotate-6 transition-transform" />
      </a>
    </div>
  );
};
