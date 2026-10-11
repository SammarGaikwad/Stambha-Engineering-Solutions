import React, { useState, useEffect } from 'react';
import { ArrowUpRight, CheckCircle2, X } from 'lucide-react';
import type { ServiceItem } from '../types';

interface ServiceCardProps {
  service: ServiceItem;
  index: number;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const [modalOpen, setModalOpen] = useState(false);

  // Lock body scroll and handle Escape key when modal is open
  useEffect(() => {
    if (modalOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setModalOpen(false);
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [modalOpen]);

  return (
    <>
      <div className="group relative flex flex-col justify-between bg-[#14181B] border border-[#232A2F] hover:border-[#C49A62]/60 rounded p-5 sm:p-6 lg:p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-[#C49A62]/5 hover:-translate-y-1">
        {/* Card Header & Code */}
        <div>
          <div className="flex items-center justify-between pb-4 sm:pb-6 border-b border-[#232A2F]">
            <span className="font-technical text-xs uppercase tracking-[0.22em] text-[#C49A62] font-semibold">
              {service.code}
            </span>
            <span className="font-technical text-[9px] sm:text-[10px] uppercase tracking-widest text-[#A7ACAE]/60">
              STRUCTURAL DISCIPLINE
            </span>
          </div>

          {/* Service Title */}
          <h3 className="mt-5 sm:mt-6 font-display font-bold text-lg sm:text-xl lg:text-2xl text-[#F3F1EB] uppercase tracking-tight group-hover:text-white transition-colors leading-tight break-words">
            {service.title}
          </h3>

          {/* Description */}
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-[#A7ACAE] leading-relaxed font-sans">
            {service.shortDesc}
          </p>

          {/* Image Thumbnail with Overlay */}
          <div className="relative mt-5 sm:mt-6 aspect-[16/9] overflow-hidden rounded bg-[#101315] border border-[#232A2F]/80">
            <img
              src={service.image}
              alt={service.imageAlt}
              loading="lazy"
              className="w-full h-full object-cover filter brightness-[0.65] contrast-110 group-hover:scale-105 group-hover:brightness-75 transition-all duration-500 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#14181B] via-transparent to-transparent" />
          </div>

          {/* Deliverables Preview List */}
          <div className="mt-5 sm:mt-6 space-y-2">
            <div className="font-technical text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-[#F3F1EB]/80 font-medium">
              Potential Deliverables:
            </div>
            <ul className="space-y-1.5 sm:space-y-2">
              {service.deliverables.slice(0, 3).map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-xs text-[#A7ACAE] leading-normal"
                >
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#C49A62] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer & Actions */}
        <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-[#232A2F] flex items-center justify-between gap-2">
          <span className="font-technical text-[9px] sm:text-[10px] text-[#A7ACAE]/70 tracking-wider">
            Available per scope
          </span>

          <button
            onClick={() => setModalOpen(true)}
            className="min-h-[44px] px-2 py-2 inline-flex items-center gap-1.5 font-technical text-xs uppercase tracking-[0.18em] text-[#C49A62] group-hover:text-[#D6AF79] hover:underline focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C49A62] rounded"
          >
            <span>View Scope</span>
            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>

      {/* Scope Details Modal */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={`modal-title-${service.id}`}
          className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 md:p-6 bg-[#101315]/90 backdrop-blur-md overflow-y-auto"
        >
          <div className="relative w-full max-w-2xl bg-[#161B1E] border border-[#2E373E] rounded-lg shadow-2xl p-4 sm:p-6 md:p-8 overflow-y-auto max-h-[92vh]">
            {/* Close Button - 44px touch target */}
            <button
              onClick={() => setModalOpen(false)}
              aria-label="Close service scope dialog"
              className="absolute top-3 right-3 sm:top-5 sm:right-5 w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded text-[#A7ACAE] hover:text-[#F3F1EB] hover:bg-[#232A2F] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C49A62]"
            >
              <X size={20} />
            </button>

            {/* Modal Header */}
            <div className="font-technical text-[10px] sm:text-xs uppercase tracking-[0.22em] text-[#C49A62] pr-10">
              {service.code} // SCOPE SPECIFICATION
            </div>
            <h4
              id={`modal-title-${service.id}`}
              className="mt-2 font-display font-extrabold text-xl sm:text-2xl md:text-3xl text-[#F3F1EB] uppercase break-words pr-8"
            >
              {service.title}
            </h4>

            {/* Full Description */}
            <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-[#D9D7D0] leading-relaxed">
              {service.fullDesc}
            </p>

            {/* Scope Image */}
            <div className="mt-4 sm:mt-6 aspect-[21/9] rounded overflow-hidden border border-[#232A2F]">
              <img
                src={service.image}
                alt={service.imageAlt}
                className="w-full h-full object-cover filter brightness-[0.7]"
              />
            </div>

            {/* Complete Deliverables List */}
            <div className="mt-5 sm:mt-6">
              <h5 className="font-technical text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#C49A62] mb-3">
                Scope Deliverables & Engineering Outputs
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                {service.deliverables.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-2.5 sm:p-3 rounded bg-[#101315] border border-[#232A2F]"
                  >
                    <CheckCircle2 size={16} className="text-[#C49A62] shrink-0 mt-0.5" />
                    <span className="text-xs text-[#F3F1EB] leading-normal">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Important Contract Scope Disclaimer */}
            <div className="mt-5 sm:mt-6 p-3 sm:p-4 rounded bg-[#101315]/60 border border-white/[0.06] text-xs text-[#A7ACAE] leading-relaxed">
              <strong className="text-[#F3F1EB]">Scope Notice:</strong> Specific deliverables,
              drawings, and schedules are agreed upon during contract definition according to project
              requirements, local jurisdictions, and site parameters.
            </div>

            {/* Modal Actions */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-end gap-3 sm:gap-4 pt-4 border-t border-[#232A2F]">
              <button
                onClick={() => setModalOpen(false)}
                className="w-full sm:w-auto px-5 py-3 min-h-[44px] text-xs font-technical uppercase tracking-widest text-[#A7ACAE] hover:text-[#F3F1EB] transition-colors rounded"
              >
                Close
              </button>
              <a
                href="#contact"
                onClick={() => setModalOpen(false)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] text-xs font-technical uppercase tracking-[0.2em] font-semibold bg-[#C49A62] text-[#101315] hover:bg-[#D6AF79] rounded transition-colors active:scale-98"
              >
                <span>Request Scope Consultation</span>
                <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
