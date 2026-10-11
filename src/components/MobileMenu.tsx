import React, { useEffect, useRef } from 'react';
import { X, ArrowUpRight } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: { name: string; href: string }[];
  activeSection: string;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  navLinks,
  activeSection,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);

  // Lock body scroll and trap ESC key
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      // Focus the close button when opened
      const timer = setTimeout(() => {
        firstFocusableRef.current?.focus();
      }, 50);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => {
        clearTimeout(timer);
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      id="mobile-navigation"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
      ref={menuRef}
      className="fixed inset-0 z-50 flex flex-col bg-[#101315]/98 backdrop-blur-2xl transition-all duration-300 lg:hidden overflow-y-auto"
    >
      {/* Top bar with wordmark & close button */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-[#232A2F] shrink-0 sticky top-0 bg-[#101315]/90 backdrop-blur-md z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded border border-[#C49A62]/40 bg-[#14181B] flex items-center justify-center p-1.5 shrink-0">
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
              <path d="M4 4h16v3H4zM4 17h16v3H4z" fill="#C49A62" />
              <path d="M7 7v10M12 7v10M17 7v10" stroke="#F3F1EB" strokeWidth="1.5" />
              <path d="M7 8l10 8M17 8L7 16" stroke="#C49A62" strokeWidth="1" strokeOpacity="0.6" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-display text-base sm:text-lg font-bold tracking-tight text-[#F3F1EB] leading-none">
              STAMBHA
            </span>
            <span className="font-technical text-[8px] uppercase tracking-[0.2em] text-[#C49A62] mt-0.5 font-medium leading-none">
              ENGINEERING SOLUTIONS
            </span>
          </div>
        </div>

        {/* 44px min touch target close button */}
        <button
          ref={firstFocusableRef}
          onClick={onClose}
          aria-label="Close navigation menu"
          className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded border border-[#232A2F] text-[#F3F1EB] hover:text-[#C49A62] hover:border-[#C49A62] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C49A62] active:scale-95"
        >
          <X size={22} />
        </button>
      </div>

      {/* Navigation Links (Scrollable if height is constrained) */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-8 py-8 sm:py-12 space-y-3 sm:space-y-4 min-h-[320px]">
        <div className="text-[10px] font-technical uppercase tracking-[0.25em] text-[#A7ACAE]/70 mb-2">
          // NAVIGATION INDEX
        </div>

        {navLinks.map((link, idx) => {
          const isActive = activeSection === link.href.replace('#', '');
          return (
            <a
              key={link.name}
              href={link.href}
              onClick={onClose}
              className={`group flex items-center justify-between text-xl sm:text-2xl font-display uppercase tracking-wider transition-colors py-3 px-2 min-h-[48px] rounded border-b border-[#232A2F]/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C49A62] ${
                isActive ? 'text-[#C49A62] bg-[#161B1E]/40' : 'text-[#F3F1EB] hover:text-[#C49A62]'
              }`}
            >
              <span className="flex items-center gap-3 sm:gap-4">
                <span className="font-technical text-xs text-[#A7ACAE]/60">
                  0{idx + 1}
                </span>
                <span>{link.name}</span>
              </span>
              <ArrowUpRight
                size={18}
                className="opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-[#C49A62]"
              />
            </a>
          );
        })}
      </div>

      {/* Bottom Action Section */}
      <div className="p-6 sm:p-8 border-t border-[#232A2F] bg-[#14181B]/80 shrink-0">
        <a
          href="#contact"
          onClick={onClose}
          className="flex items-center justify-center gap-2 w-full py-3.5 sm:py-4 min-h-[48px] text-xs font-technical uppercase tracking-[0.2em] font-semibold bg-[#C49A62] text-[#101315] hover:bg-[#D6AF79] transition-colors rounded shadow-lg shadow-[#C49A62]/10 active:scale-98"
        >
          <span>Discuss Your Project</span>
          <ArrowUpRight size={16} />
        </a>
        <p className="mt-3 text-center font-technical text-[10px] text-[#A7ACAE]/60 uppercase tracking-widest">
          Structural Engineering & Management
        </p>
      </div>
    </div>
  );
};
