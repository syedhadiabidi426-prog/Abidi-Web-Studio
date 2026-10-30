import React, { useState, useEffect } from 'react';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  Mail,
  Instagram,
  Facebook,
  Shield,
  ArrowRight,
  Clock,
  Sparkles,
} from 'lucide-react';
import { BUSINESS_INFO, getWhatsAppEnquiryUrl } from '../utils/constants';
import { EnquiryFormData } from '../types';

interface ContactPageProps {
  onNavigate?: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState<EnquiryFormData>({
    fullName: '',
    businessName: '',
    email: '',
    country: 'United States',
    preferredContact: 'email',
    whatsappNumber: '',
    websiteType: 'Business website',
    industry: 'Professional services',
    requiredServices: ['Responsive Frontend UI', 'Contact Forms & Lead Routing'],
    projectBudget: '$500 - $1,000',
    desiredCompletionDate: 'Within 3-4 Weeks',
    existingWebsiteUrl: '',
    projectDescription: '',
    additionalRequirements: '',
    privacyConsent: false,
    _website_hp: '', // Honeypot field
  });

  const [loading, setLoading] = useState(false);
  const [successResponse, setSuccessResponse] = useState<{
    enquiryId: string;
    message: string;
    emailServiceConfigured: boolean;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Check for prefilled values from other pages
  useEffect(() => {
    const prefillService = sessionStorage.getItem('prefill_service');
    const prefillIndustry = sessionStorage.getItem('prefill_industry');
    const prefillWebsiteType = sessionStorage.getItem('prefill_website_type');

    if (prefillService) {
      setFormData((prev) => ({
        ...prev,
        projectDescription: `I am interested in discussing: ${prefillService}.\n`,
      }));
      sessionStorage.removeItem('prefill_service');
    }

    if (prefillIndustry) {
      setFormData((prev) => ({
        ...prev,
        industry: prefillIndustry,
      }));
      sessionStorage.removeItem('prefill_industry');
    }

    if (prefillWebsiteType) {
      setFormData((prev) => ({
        ...prev,
        websiteType: prefillWebsiteType,
      }));
      sessionStorage.removeItem('prefill_website_type');
    }
  }, []);

  // Adaptive Budget Options based on selected Country
  const getBudgetOptions = (country: string) => {
    switch (country) {
      case 'United Kingdom':
        return ['Under £400', '£400 - £800', '£800 - £1,500', '£1,500 - £3,000', '£3,000+ (Custom Scope)'];
      case 'Canada':
        return ['Under C$700', 'C$700 - C$1,400', 'C$1,400 - C$2,800', 'C$2,800 - C$5,000', 'C$5,000+ (Custom Scope)'];
      case 'Australia':
        return ['Under A$700', 'A$700 - A$1,400', 'A$1,400 - A$2,800', 'A$2,800 - A$5,000', 'A$5,000+ (Custom Scope)'];
      case 'Pakistan':
        return ['Rs. 20,000 - Rs. 40,000', 'Rs. 40,000 - Rs. 80,000', 'Rs. 80,000 - Rs. 150,000', 'Rs. 150,000 - Rs. 300,000', 'Rs. 300,000+ (Custom Scope)'];
      default: // United States and Other (USD)
        return ['Under $500', '$500 - $1,000', '$1,000 - $2,000', '$2,000 - $4,000', '$4,000+ (Custom Scope)'];
    }
  };

  const handleCountryChange = (country: string) => {
    const newBudgets = getBudgetOptions(country);
    setFormData((prev) => ({
      ...prev,
      country,
      projectBudget: newBudgets[1] || newBudgets[0],
    }));
  };

  const toggleServiceCheckbox = (service: string) => {
    setFormData((prev) => {
      const exists = prev.requiredServices.includes(service);
      return {
        ...prev,
        requiredServices: exists
          ? prev.requiredServices.filter((s) => s !== service)
          : [...prev.requiredServices, service],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessResponse(null);

    // Frontend validation
    if (!formData.fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!formData.projectDescription.trim() || formData.projectDescription.trim().length < 10) {
      setErrorMessage('Please provide at least a brief summary of your project requirements (10+ characters).');
      return;
    }
    if (!formData.privacyConsent) {
      setErrorMessage('Please accept the privacy policy consent checkbox to proceed.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit enquiry. Please try again or reach out on WhatsApp.');
      }

      setSuccessResponse({
        enquiryId: data.enquiryId,
        message: data.message,
        emailServiceConfigured: data.emailServiceConfigured,
      });

      // Clear sensitive form fields but keep contact details
      setFormData((prev) => ({
        ...prev,
        projectDescription: '',
        additionalRequirements: '',
        existingWebsiteUrl: '',
        privacyConsent: false,
      }));
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred. Please contact us directly on WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  // Generate customized WhatsApp click-to-chat link from form inputs
  const dynamicWhatsAppMessage = `Hello Abidi Web Studio, my name is ${formData.fullName || 'Client'}. I am interested in a ${formData.websiteType} for my business in the ${formData.industry} sector. Budget: ${formData.projectBudget}.`;
  const dynamicWhatsAppUrl = `https://wa.me/${BUSINESS_INFO.whatsappRaw}?text=${encodeURIComponent(dynamicWhatsAppMessage)}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#38BDF8] py-1 px-3.5 rounded-full bg-blue-500/10 border border-blue-500/20">
          Direct Client Communication
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Start Your Project With Abidi Web Studio
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Submit your requirements using the form below or chat directly on WhatsApp with founder Syed Hadi Abidi. We review all submissions and respond promptly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Direct Connect & Info */}
        <div className="lg:col-span-4 space-y-8">
          {/* Direct channels card */}
          <div className="p-7 rounded-2xl bg-[#080D1A] border border-white/10 space-y-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              Connect With Us Directly
            </h2>

            <div className="space-y-4 text-xs">
              <a
                href={BUSINESS_INFO.whatsappChatUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-slate-300 hover:text-white transition-colors group"
              >
                <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="block font-bold text-white text-sm">WhatsApp Chat</span>
                  <span className="font-mono text-emerald-400">{BUSINESS_INFO.whatsappNumber}</span>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Fastest channel for project discussion & quotations.
                  </p>
                </div>
              </a>

              <a
                href={`mailto:${BUSINESS_INFO.email}`}
                className="flex items-start gap-3 p-3 rounded-xl bg-blue-950/30 border border-blue-500/20 text-slate-300 hover:text-white transition-colors group"
              >
                <div className="p-2 rounded-lg bg-blue-500/20 text-[#38BDF8] shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="block font-bold text-white text-sm">Official Email</span>
                  <span className="font-mono text-[#38BDF8]">{BUSINESS_INFO.email}</span>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    For detailed project briefs, RFP documents & wireframes.
                  </p>
                </div>
              </a>

              <a
                href={BUSINESS_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-3 rounded-xl bg-pink-950/20 border border-pink-500/20 text-slate-300 hover:text-white transition-colors group"
              >
                <div className="p-2 rounded-lg bg-pink-500/20 text-pink-400 shrink-0">
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <span className="block font-bold text-white text-sm">Instagram</span>
                  <span className="text-slate-400">@abidiweb_studio</span>
                  <p className="text-[11px] text-slate-400 mt-0.5">Design showcase & visual reels.</p>
                </div>
              </a>

              <a
                href={BUSINESS_INFO.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-3 rounded-xl bg-blue-950/20 border border-blue-600/20 text-slate-300 hover:text-white transition-colors group"
              >
                <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400 shrink-0">
                  <Facebook className="w-5 h-5" />
                </div>
                <div>
                  <span className="block font-bold text-white text-sm">Facebook</span>
                  <span className="text-slate-400">Abidi Web Studio</span>
                  <p className="text-[11px] text-slate-400 mt-0.5">Agency updates & articles.</p>
                </div>
              </a>
            </div>
          </div>

          {/* Quick WhatsApp Link generator */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0B1222] to-[#080D1A] border border-emerald-500/20 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
              <Sparkles className="w-4 h-4" />
              <span>Prefer Instant WhatsApp?</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Skip typing the full form and open a prefilled chat message with founder Syed Hadi Abidi directly:
            </p>
            <a
              href={dynamicWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 w-full py-2.5 px-4 text-xs font-bold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-colors flex items-center justify-center gap-2 text-center"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Launch Prefilled Chat</span>
            </a>
          </div>

          {/* Trust box */}
          <div className="p-6 rounded-2xl bg-[#080D1A] border border-white/5 space-y-2 text-xs text-slate-400">
            <span className="font-semibold text-white block">Response Expectation</span>
            <p>
              We reply within a few hours across all time zones (Eastern Time, GMT, AEST, and PKT). All submitted data is stored strictly for project correspondence.
            </p>
          </div>
        </div>

        {/* Right Column: 15-Field Comprehensive Project Enquiry Form */}
        <div className="lg:col-span-8">
          <div className="p-8 sm:p-10 rounded-3xl bg-[#080D1A] border border-white/10 shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-1">Project Enquiry Form</h2>
            <p className="text-xs text-slate-400 mb-8">
              Complete these details so we can understand your business needs and provide an accurate starting quotation.
            </p>

            {/* Submission Alerts */}
            {successResponse && (
              <div className="mb-8 p-5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 text-xs sm:text-sm space-y-2">
                <div className="flex items-center gap-2 font-bold text-white text-base">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>Enquiry Successfully Submitted!</span>
                </div>
                <p className="leading-relaxed">{successResponse.message}</p>
                <div className="text-[11px] font-mono text-slate-400 pt-1">
                  Reference ID: <span className="text-emerald-300">{successResponse.enquiryId}</span>
                </div>
              </div>
            )}

            {errorMessage && (
              <div className="mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-200 text-xs sm:text-sm flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block mb-0.5">Please check your inputs:</span>
                  <span>{errorMessage}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Hidden Honeypot Field */}
              <input
                type="text"
                name="_website_hp"
                value={formData._website_hp || ''}
                onChange={(e) => setFormData({ ...formData, _website_hp: e.target.value })}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              {/* Row 1: Full Name & Business Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    1. Full Name <span className="text-blue-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g., Alexander Wright"
                    className="w-full px-4 py-3 bg-[#05070D] border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#38BDF8] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    2. Business Name <span className="text-slate-500 text-[10px] lowercase">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    placeholder="e.g., Wright Capital Partners"
                    className="w-full px-4 py-3 bg-[#05070D] border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#38BDF8] transition-colors"
                  />
                </div>
              </div>

              {/* Row 2: Email & Country */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    3. Email Address <span className="text-blue-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alexander@domain.com"
                    className="w-full px-4 py-3 bg-[#05070D] border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#38BDF8] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    4. Country / Region <span className="text-blue-400">*</span>
                  </label>
                  <select
                    value={formData.country}
                    onChange={(e) => handleCountryChange(e.target.value)}
                    className="w-full px-4 py-3 bg-[#05070D] border border-white/10 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-[#38BDF8] transition-colors"
                  >
                    <option value="United States">United States (USD - $)</option>
                    <option value="United Kingdom">United Kingdom (GBP - £)</option>
                    <option value="Canada">Canada (CAD - C$)</option>
                    <option value="Australia">Australia (AUD - A$)</option>
                    <option value="Pakistan">Pakistan (PKR - Rs.)</option>
                    <option value="Other">Other International</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Preferred Contact Method & WhatsApp Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    5. Preferred Contact Method
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['email', 'whatsapp', 'phone'] as const).map((method) => (
                      <button
                        type="button"
                        key={method}
                        onClick={() => setFormData({ ...formData, preferredContact: method })}
                        className={`py-2.5 px-3 text-xs font-medium rounded-xl border transition-colors capitalize ${
                          formData.preferredContact === method
                            ? 'bg-[#2563EB] text-white border-blue-400'
                            : 'bg-[#05070D] text-slate-400 border-white/10 hover:text-white'
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    6. WhatsApp Number <span className="text-slate-500 text-[10px] lowercase">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.whatsappNumber}
                    onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                    placeholder="+1 (555) 000-0000 or +92 300 0000000"
                    className="w-full px-4 py-3 bg-[#05070D] border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#38BDF8] transition-colors"
                  />
                </div>
              </div>

              {/* Row 4: Website Type & Industry */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    7. Website Type <span className="text-blue-400">*</span>
                  </label>
                  <select
                    value={formData.websiteType}
                    onChange={(e) => setFormData({ ...formData, websiteType: e.target.value })}
                    className="w-full px-4 py-3 bg-[#05070D] border border-white/10 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-[#38BDF8] transition-colors"
                  >
                    <option value="Landing page">Landing page</option>
                    <option value="Business website">Business website</option>
                    <option value="Corporate website">Corporate website</option>
                    <option value="E-commerce website">E-commerce website</option>
                    <option value="React / Next.js website">React / Next.js website</option>
                    <option value="Custom web application">Custom web application</option>
                    <option value="Booking website">Booking website</option>
                    <option value="Website redesign">Website redesign</option>
                    <option value="Website maintenance">Website maintenance</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    8. Industry
                  </label>
                  <select
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className="w-full px-4 py-3 bg-[#05070D] border border-white/10 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-[#38BDF8] transition-colors"
                  >
                    <option value="E-commerce and retail">E-commerce and retail</option>
                    <option value="Fashion and apparel">Fashion and apparel</option>
                    <option value="Real estate">Real estate</option>
                    <option value="Restaurants and food businesses">Restaurants and food businesses</option>
                    <option value="Healthcare and clinics">Healthcare and clinics</option>
                    <option value="Education and training">Education and training</option>
                    <option value="Professional services">Professional services</option>
                    <option value="Consulting businesses">Consulting businesses</option>
                    <option value="Startups">Startups</option>
                    <option value="Technology companies">Technology companies</option>
                    <option value="Travel and hospitality">Travel and hospitality</option>
                    <option value="Local service businesses">Local service businesses</option>
                    <option value="Other">Other Industry</option>
                  </select>
                </div>
              </div>

              {/* 9. Required Services Multi-select */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  9. Required Services (Select all that apply)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {[
                    'Responsive Frontend UI',
                    'E-commerce Storefront',
                    'Backend REST API',
                    'Database Integration',
                    'Admin Management Panel',
                    'Contact Forms & Lead Routing',
                    'Technical SEO & OpenGraph',
                    'Speed & Performance Optimization',
                    'Monthly Maintenance Retainer',
                  ].map((srv) => {
                    const isChecked = formData.requiredServices.includes(srv);
                    return (
                      <button
                        type="button"
                        key={srv}
                        onClick={() => toggleServiceCheckbox(srv)}
                        className={`p-2.5 text-left rounded-xl border text-xs transition-colors flex items-center justify-between ${
                          isChecked
                            ? 'bg-blue-600/20 border-[#38BDF8] text-white'
                            : 'bg-[#05070D] border-white/10 text-slate-400 hover:text-white'
                        }`}
                      >
                        <span className="truncate pr-1">{srv}</span>
                        {isChecked && <CheckCircle2 className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row 5: Adaptive Project Budget & Desired Completion Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    10. Estimated Project Budget ({formData.country})
                  </label>
                  <select
                    value={formData.projectBudget}
                    onChange={(e) => setFormData({ ...formData, projectBudget: e.target.value })}
                    className="w-full px-4 py-3 bg-[#05070D] border border-white/10 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-[#38BDF8] transition-colors"
                  >
                    {getBudgetOptions(formData.country).map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    11. Desired Completion Date
                  </label>
                  <select
                    value={formData.desiredCompletionDate}
                    onChange={(e) => setFormData({ ...formData, desiredCompletionDate: e.target.value })}
                    className="w-full px-4 py-3 bg-[#05070D] border border-white/10 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-[#38BDF8] transition-colors"
                  >
                    <option value="Urgent (1-2 Weeks)">Urgent (1-2 Weeks)</option>
                    <option value="Within 3-4 Weeks">Standard (3-4 Weeks)</option>
                    <option value="Within 2 Months">Flexible (Within 2 Months)</option>
                    <option value="Planning Phase / No Rush">Planning Phase / No Rush</option>
                  </select>
                </div>
              </div>

              {/* 12. Existing Website URL */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  12. Existing Website URL <span className="text-slate-500 text-[10px] lowercase">(optional if redesigning)</span>
                </label>
                <input
                  type="url"
                  value={formData.existingWebsiteUrl}
                  onChange={(e) => setFormData({ ...formData, existingWebsiteUrl: e.target.value })}
                  placeholder="https://example.com"
                  className="w-full px-4 py-3 bg-[#05070D] border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#38BDF8] transition-colors"
                />
              </div>

              {/* 13. Project Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  13. Project Description & Objectives <span className="text-blue-400">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.projectDescription}
                  onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                  placeholder="Describe your business goals, target audience, preferred visual aesthetic, and key functionality required..."
                  className="w-full px-4 py-3 bg-[#05070D] border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#38BDF8] transition-colors resize-y"
                />
              </div>

              {/* 14. Additional Requirements */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  14. Additional Requirements or Notes <span className="text-slate-500 text-[10px] lowercase">(optional)</span>
                </label>
                <input
                  type="text"
                  value={formData.additionalRequirements}
                  onChange={(e) => setFormData({ ...formData, additionalRequirements: e.target.value })}
                  placeholder="e.g., Specific payment provider preference, multilingual support, branding assets ready"
                  className="w-full px-4 py-3 bg-[#05070D] border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#38BDF8] transition-colors"
                />
              </div>

              {/* 15. Privacy Consent Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={formData.privacyConsent}
                    onChange={(e) => setFormData({ ...formData, privacyConsent: e.target.checked })}
                    className="mt-1 w-4 h-4 rounded border-white/20 bg-[#05070D] text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                  />
                  <span className="text-xs text-slate-400 leading-relaxed">
                    15. I consent to Abidi Web Studio collecting and storing the information provided above solely to evaluate and respond to my web development project enquiry in accordance with the{' '}
                    <button
                      type="button"
                      onClick={() => onNavigate?.('/privacy')}
                      className="text-[#38BDF8] underline hover:text-white cursor-pointer"
                    >
                      Privacy Policy
                    </button>
                    .
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 px-6 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#2563EB] rounded-xl shadow-lg shadow-blue-600/30 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <span>Submitting Enquiry...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Project Enquiry</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
