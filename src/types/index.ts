export type RegionCode = 'USA' | 'UK' | 'CANADA' | 'AUSTRALIA' | 'PAKISTAN';

export interface RegionConfig {
  code: RegionCode;
  name: string;
  currency: string;
  symbol: string;
  flag: string;
}

export interface ServicePriceItem {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  prices: Record<RegionCode, string>;
  isRecurring?: boolean;
}

export interface PackageCard {
  id: 'starter' | 'professional' | 'custom';
  name: string;
  badge?: string;
  description: string;
  inclusions: string[];
  prices: Record<RegionCode, string>;
  popular?: boolean;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  iconName: string;
  targetAudience: string[];
  keyFeatures: string[];
  deliverables: string[];
  whatsappMessage: string;
}

export interface DemoProject {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  technologies: string[];
  imagePath: string;
  highlights: string[];
  demoType: 'ecommerce' | 'business' | 'realestate' | 'saas' | 'booking';
  metrics?: { label: string; value: string }[];
}

export interface IndustryItem {
  id: string;
  name: string;
  iconName: string;
  summary: string;
  benefits: string[];
  recommendedType: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'general' | 'pricing' | 'process' | 'technical';
}

export interface EnquirySubmission {
  id: string;
  createdAt: string;
  fullName: string;
  businessName?: string;
  email: string;
  country: string;
  preferredContact: 'email' | 'whatsapp' | 'phone';
  whatsappNumber?: string;
  websiteType: string;
  industry: string;
  requiredServices: string[];
  projectBudget: string;
  desiredCompletionDate: string;
  existingWebsiteUrl?: string;
  projectDescription: string;
  additionalRequirements?: string;
  privacyConsent: boolean;
  status: 'New' | 'Contacted' | 'Qualified' | 'In Progress' | 'Won' | 'Lost';
  internalNotes?: string[];
  ip?: string;
}

export interface EnquiryFormData {
  fullName: string;
  businessName: string;
  email: string;
  country: string;
  preferredContact: 'email' | 'whatsapp' | 'phone';
  whatsappNumber: string;
  websiteType: string;
  industry: string;
  requiredServices: string[];
  projectBudget: string;
  desiredCompletionDate: string;
  existingWebsiteUrl: string;
  projectDescription: string;
  additionalRequirements: string;
  privacyConsent: boolean;
  _website_hp?: string; // honeypot
}
