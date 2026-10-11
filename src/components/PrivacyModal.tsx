import React, { useEffect } from 'react';
import { X, Shield } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 xs:p-3 sm:p-6 bg-[#101315]/90 backdrop-blur-md"
    >
      <div className="relative w-full max-w-2xl bg-[#161B1E] border border-[#2E373E] rounded-lg shadow-2xl overflow-hidden max-h-[88vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-[#232A2F] bg-[#14181B]">
          <div className="flex items-center gap-2.5 min-w-0 pr-2">
            <Shield size={18} className="text-[#C49A62] shrink-0" />
            <h3
              id="privacy-modal-title"
              className="font-display font-bold text-base sm:text-lg text-[#F3F1EB] uppercase tracking-wide truncate"
            >
              PRIVACY POLICY & DATA NOTICE
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close privacy modal"
            className="w-11 h-11 sm:w-10 sm:h-10 flex items-center justify-center rounded text-[#A7ACAE] hover:text-[#F3F1EB] hover:bg-[#232A2F] focus:outline-none focus:ring-2 focus:ring-[#C49A62] transition-colors shrink-0"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 md:p-8 overflow-y-auto space-y-4 text-xs sm:text-sm text-[#A7ACAE] leading-relaxed">
          <p>
            <strong className="text-[#F3F1EB]">1. Scope & Objective:</strong> This policy outlines how
            Stambha Engineering Solutions processes and protects information submitted through this website.
          </p>

          <p>
            <strong className="text-[#F3F1EB]">2. Enquiry Data:</strong> Information submitted via our
            project consultation form (including name, company, email, telephone number, and architectural
            scope notes) is collected strictly for engineering assessment, communication, and proposal
            preparation.
          </p>

          <p>
            <strong className="text-[#F3F1EB]">3. Non-Disclosure & Integrity:</strong> Proprietary client
            drawings, preliminary layouts, or structural specifications transmitted for review are treated
            with strict engineering confidentiality. We do not sell, rent, or trade your contact information.
          </p>

          <p>
            <strong className="text-[#F3F1EB]">4. Third-Party Hosting:</strong> Form inquiries may be routed
            through verified transactional email infrastructure solely to ensure dependable message delivery
            to our engineering desk.
          </p>

          <p>
            <strong className="text-[#F3F1EB]">5. Queries & Updates:</strong> For inquiries regarding your
            stored consultation data, please contact the engineering desk at the designated address.
          </p>
        </div>

        {/* Footer */}
        <div className="p-3.5 sm:px-6 sm:py-4 border-t border-[#232A2F] bg-[#14181B] flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 text-xs font-technical uppercase tracking-wider bg-[#C49A62] text-[#101315] font-semibold rounded hover:bg-[#D6AF79] transition-colors"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};
