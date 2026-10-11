import React, { useState } from 'react';
import { ArrowUp, Mail, Phone } from 'lucide-react';
import { companyConfig } from '../data/company';
import { servicesData } from '../data/services';
import { PrivacyModal } from './PrivacyModal';

const CURRENT_YEAR = new Date().getFullYear();

export const Footer: React.FC = () => {
  const [privacyOpen, setPrivacyOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer className="relative bg-[#0B0D0E] border-t border-[#232A2F] text-[#A7ACAE] pt-14 sm:pt-16 md:pt-20 pb-10 sm:pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 pb-12 sm:pb-16 border-b border-[#232A2F]/80">
            {/* Column 1: Brand Wordmark & Summary (5 cols) */}
            <div className="lg:col-span-5 space-y-5 sm:space-y-6">
              <a href="#hero" className="inline-block group focus:outline-none">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded border border-[#C49A62]/40 bg-[#14181B] flex items-center justify-center p-1.5">
                    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                      <path d="M4 4h16v3H4zM4 17h16v3H4z" fill="#C49A62" />
                      <path d="M7 7v10M12 7v10M17 7v10" stroke="#F3F1EB" strokeWidth="1.5" />
                      <path d="M7 8l10 8M17 8L7 16" stroke="#C49A62" strokeWidth="1" strokeOpacity="0.6" />
                    </svg>
                  </div>

                  <div className="flex flex-col">
                    <span className="font-display font-bold text-xl tracking-tight text-[#F3F1EB] group-hover:text-white transition-colors leading-none">
                      STAMBHA
                    </span>
                    <span className="font-technical text-[9px] uppercase tracking-[0.24em] text-[#C49A62] mt-1 font-medium leading-none">
                      ENGINEERING SOLUTIONS
                    </span>
                  </div>
                </div>
              </a>

              <p className="text-xs sm:text-sm text-[#A7ACAE] leading-relaxed max-w-sm font-sans">
                {companyConfig.description}
              </p>

              {/* Verified Contact Details */}
              <div className="space-y-2.5 pt-2 text-xs">
                <a
                  href={`mailto:${companyConfig.emailPlaceholder}`}
                  className="inline-flex items-center gap-2.5 text-[#F3F1EB]/90 hover:text-[#C49A62] transition-colors group min-h-[36px]"
                >
                  <Mail size={15} className="text-[#C49A62] shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="font-technical tracking-wide break-all">{companyConfig.emailPlaceholder}</span>
                </a>
                <br />
                <a
                  href={`tel:${companyConfig.phonePlaceholder.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-2.5 text-[#F3F1EB]/90 hover:text-[#C49A62] transition-colors group min-h-[36px]"
                >
                  <Phone size={15} className="text-[#C49A62] shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="font-technical tracking-wide">{companyConfig.phonePlaceholder}</span>
                </a>
              </div>
            </div>

            {/* Column 2: Core Engineering Services (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="font-technical text-xs uppercase tracking-[0.2em] text-[#F3F1EB] font-semibold">
                ENGINEERING SERVICES
              </div>
              <ul className="space-y-2.5 text-xs">
                {servicesData.map((svc) => (
                  <li key={svc.id}>
                    <a
                      href="#services"
                      className="hover:text-[#C49A62] transition-colors flex items-center gap-2 group py-1"
                    >
                      <span className="w-1 h-1 rounded-full bg-[#2E373E] group-hover:bg-[#C49A62] transition-colors" />
                      <span>{svc.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Navigation Index & Legal (3 cols) */}
            <div className="lg:col-span-3 space-y-4">
              <div className="font-technical text-xs uppercase tracking-[0.2em] text-[#F3F1EB] font-semibold">
                NAVIGATION INDEX
              </div>
              <ul className="space-y-2 text-xs">
                <li>
                  <a href="#hero" className="hover:text-[#C49A62] transition-colors inline-block py-1">
                    Home // Overview
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-[#C49A62] transition-colors inline-block py-1">
                    About // Philosophy
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-[#C49A62] transition-colors inline-block py-1">
                    Services // Capabilities
                  </a>
                </li>
                <li>
                  <a href="#process" className="hover:text-[#C49A62] transition-colors inline-block py-1">
                    Process // Methodology
                  </a>
                </li>
                <li>
                  <a href="#projects" className="hover:text-[#C49A62] transition-colors inline-block py-1">
                    Projects // Sample Archive
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-[#C49A62] transition-colors inline-block py-1">
                    Contact // Enquiry Desk
                  </a>
                </li>
                <li className="pt-2">
                  <button
                    onClick={() => setPrivacyOpen(true)}
                    className="min-h-[40px] text-[#C49A62] hover:underline transition-colors text-left font-technical uppercase tracking-wider text-[11px] py-1"
                  >
                    Privacy Policy & Data Notice
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar: Copyright & Scroll to Top */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-technical">
            <div className="text-center sm:text-left text-[#A7ACAE]/80 tracking-wide text-[10px] sm:text-[11px]">
              © {CURRENT_YEAR} STAMBHA ENGINEERING SOLUTIONS. ALL RIGHTS RESERVED.
            </div>

            <button
              onClick={scrollToTop}
              className="group min-h-[44px] inline-flex items-center gap-2 text-[#A7ACAE] hover:text-[#C49A62] transition-colors text-[11px] uppercase tracking-widest px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-[#C49A62]"
            >
              <span>Back to Top</span>
              <div className="w-6 h-6 rounded border border-[#232A2F] group-hover:border-[#C49A62] flex items-center justify-center transition-colors">
                <ArrowUp size={12} className="transition-transform group-hover:-translate-y-0.5" />
              </div>
            </button>
          </div>
        </div>
      </footer>

      {/* Privacy Policy Modal */}
      <PrivacyModal isOpen={privacyOpen} onClose={() => setPrivacyOpen(false)} />
    </>
  );
};
