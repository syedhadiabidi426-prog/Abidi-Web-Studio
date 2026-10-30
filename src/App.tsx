import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesOverviewPage } from './pages/ServicesOverviewPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { PricingPage } from './pages/PricingPage';
import { IndustriesPage } from './pages/IndustriesPage';
import { ProcessPage } from './pages/ProcessPage';
import { FAQPage } from './pages/FAQPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

import { RegionCode } from './types';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  const [selectedRegion, setSelectedRegion] = useState<RegionCode>('USA');

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    if (path !== currentPath) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Update dynamic page title for SEO and browser tabs
  useEffect(() => {
    let title = 'Abidi Web Studio | Website Design & Full-Stack Development';

    if (currentPath === '/about') {
      title = 'About Us | Abidi Web Studio - Modern Digital Experiences';
    } else if (currentPath === '/services') {
      title = 'Web Development Services | Abidi Web Studio';
    } else if (currentPath.startsWith('/services/')) {
      const slug = currentPath.replace('/services/', '');
      const formatted = slug.replace('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase());
      title = `${formatted} Services | Abidi Web Studio`;
    } else if (currentPath === '/portfolio') {
      title = 'Portfolio Demonstrations | Abidi Web Studio';
    } else if (currentPath === '/pricing') {
      title = 'International Pricing (USA, UK, Canada, Australia, Pakistan) | Abidi Web Studio';
    } else if (currentPath === '/industries') {
      title = 'Industries We Serve | Abidi Web Studio';
    } else if (currentPath === '/process') {
      title = 'Our 7-Step Development Process | Abidi Web Studio';
    } else if (currentPath === '/faq') {
      title = 'Frequently Asked Questions | Abidi Web Studio';
    } else if (currentPath === '/contact') {
      title = 'Start Your Project & Contact | Abidi Web Studio';
    } else if (currentPath === '/privacy') {
      title = 'Privacy Policy | Abidi Web Studio';
    } else if (currentPath === '/terms') {
      title = 'Terms & Conditions | Abidi Web Studio';
    } else if (currentPath === '/admin') {
      title = 'Admin Management Console | Abidi Web Studio';
    }

    document.title = title;
  }, [currentPath]);

  // Route Resolver
  const renderCurrentPage = () => {
    // 1. Home
    if (currentPath === '/' || currentPath === '') {
      return (
        <HomePage
          onNavigate={navigateTo}
          selectedRegion={selectedRegion}
          onSelectRegion={setSelectedRegion}
        />
      );
    }

    // 2. About
    if (currentPath === '/about') {
      return <AboutPage onNavigate={navigateTo} />;
    }

    // 3. Services Directory
    if (currentPath === '/services') {
      return <ServicesOverviewPage onNavigate={navigateTo} />;
    }

    // 4-10. Service Deep-Dives
    if (currentPath.startsWith('/services/')) {
      const slug = currentPath.replace('/services/', '');
      return <ServiceDetailPage slug={slug} onNavigate={navigateTo} />;
    }

    // 11. Portfolio
    if (currentPath === '/portfolio') {
      return <PortfolioPage onNavigate={navigateTo} />;
    }

    // 12. Pricing
    if (currentPath === '/pricing') {
      return (
        <PricingPage
          onNavigate={navigateTo}
          selectedRegion={selectedRegion}
          onSelectRegion={setSelectedRegion}
        />
      );
    }

    // 13. Industries
    if (currentPath === '/industries') {
      return <IndustriesPage onNavigate={navigateTo} />;
    }

    // 14. Process
    if (currentPath === '/process') {
      return <ProcessPage onNavigate={navigateTo} />;
    }

    // 15. FAQ
    if (currentPath === '/faq') {
      return <FAQPage onNavigate={navigateTo} />;
    }

    // 16. Contact
    if (currentPath === '/contact') {
      return <ContactPage onNavigate={navigateTo} />;
    }

    // 17. Privacy Policy
    if (currentPath === '/privacy') {
      return <PrivacyPolicyPage onNavigate={navigateTo} />;
    }

    // 18. Terms & Conditions
    if (currentPath === '/terms') {
      return <TermsPage onNavigate={navigateTo} />;
    }

    // 19. Admin Console
    if (currentPath === '/admin') {
      return <AdminDashboardPage onNavigate={navigateTo} />;
    }

    // Fallback: 404 / Home
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-4">
        <h1 className="text-4xl font-bold text-white">404 - Page Not Found</h1>
        <p className="text-xs text-slate-400">
          The requested page does not exist. Explore our agency services or return to the home page.
        </p>
        <button
          onClick={() => navigateTo('/')}
          className="px-6 py-2.5 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 cursor-pointer"
        >
          Return to Homepage
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#05070D] text-[#F8FAFC]">
      {/* Navigation Header */}
      <Navbar currentPath={currentPath} onNavigate={navigateTo} />

      {/* Main Page Area */}
      <main className="flex-1 pb-16">{renderCurrentPage()}</main>

      {/* Persistent Floating WhatsApp Action */}
      <FloatingWhatsApp />

      {/* Footer */}
      <Footer onNavigate={navigateTo} />
    </div>
  );
}
