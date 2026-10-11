import React, { useState, useEffect } from 'react';
import { Menu, ArrowUpRight } from 'lucide-react';
import { MobileMenu } from './MobileMenu';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Process', href: '#process' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      // Section tracking for active indicator
      const sections = ['hero', 'about', 'services', 'process', 'projects', 'contact'];
      for (const sectionId of sections.slice().reverse()) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.35) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#101315]/95 backdrop-blur-md border-b border-[#232A2F] py-3 shadow-2xl'
            : 'bg-[#101315]/40 backdrop-blur-sm py-4 sm:py-6 border-b border-white/[0.05]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
          {/* Brand Wordmark with Structural Frame Glyph */}
          <a
            href="#hero"
            className="group flex items-center gap-2.5 sm:gap-3.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C49A62] rounded p-1 -ml-1 transition-transform active:scale-95"
            aria-label="Stambha Engineering Solutions - Return to Top"
          >
            {/* Geometric Structural Pillar Symbol */}
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded border border-[#C49A62]/40 bg-[#14181B] flex items-center justify-center p-1.5 shrink-0 transition-colors group-hover:border-[#C49A62] group-hover:bg-[#191D20]">
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                <path d="M4 4h16v3H4zM4 17h16v3H4z" fill="#C49A62" />
                <path d="M7 7v10M12 7v10M17 7v10" stroke="#F3F1EB" strokeWidth="1.5" />
                <path d="M7 8l10 8M17 8L7 16" stroke="#C49A62" strokeWidth="1" strokeOpacity="0.6" />
              </svg>
            </div>

            <div className="flex flex-col min-w-0">
              <span className="font-display font-bold text-base sm:text-lg lg:text-xl tracking-tight text-[#F3F1EB] group-hover:text-white transition-colors leading-none truncate">
                STAMBHA
              </span>
              <span className="font-technical text-[8px] sm:text-[9px] uppercase tracking-[0.16em] sm:tracking-[0.24em] text-[#C49A62] mt-0.5 sm:mt-1 font-medium leading-none truncate">
                ENGINEERING SOLUTIONS
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links (Visible on large screens >= 1024px) */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-7 xl:gap-8 text-xs font-technical uppercase tracking-[0.2em]"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`relative py-1 transition-colors duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C49A62] rounded ${
                    isActive
                      ? 'text-[#C49A62] font-semibold'
                      : 'text-[#A7ACAE] hover:text-[#F3F1EB]'
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C49A62] rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Direct Contact Button (Desktop and Tablet) */}
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 min-h-[44px] text-xs font-technical uppercase tracking-[0.18em] sm:tracking-[0.2em] font-medium text-[#F3F1EB] border border-[#C49A62]/60 rounded hover:border-[#C49A62] hover:bg-[#C49A62] hover:text-[#101315] transition-all duration-200 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C49A62]"
            >
              <span>Discuss Project</span>
              <ArrowUpRight
                size={14}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>

            {/* Mobile & Tablet Menu Toggle Button (Visible on screens < 1024px) */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open mobile navigation"
              aria-expanded={mobileMenuOpen}
              className="w-11 h-11 min-w-[44px] min-h-[44px] lg:hidden flex items-center justify-center text-[#F3F1EB] rounded border border-[#232A2F] bg-[#14181B] hover:text-[#C49A62] hover:border-[#C49A62] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C49A62] active:scale-95"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navLinks={navLinks}
        activeSection={activeSection}
      />
    </>
  );
};
