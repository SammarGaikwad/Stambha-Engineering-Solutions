import React, { useEffect } from 'react';
import { X, ArrowUpRight, AlertTriangle } from 'lucide-react';
import type { ProjectItem } from '../types';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 xs:p-3 sm:p-6 bg-[#101315]/90 backdrop-blur-md"
    >
      <div className="relative w-full max-w-3xl bg-[#161B1E] border border-[#2E373E] rounded-lg shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-[#232A2F] bg-[#14181B]">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 pr-2">
            <span className="font-technical text-xs uppercase tracking-widest text-[#C49A62] truncate">
              {project.category}
            </span>
            <span className="text-white/20">|</span>
            <span className="font-technical text-[10px] uppercase tracking-wider text-[#A7ACAE] hidden xs:inline truncate">
              SCOPE SPECIFICATION PREVIEW
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close project modal"
            className="w-11 h-11 sm:w-10 sm:h-10 flex items-center justify-center rounded text-[#A7ACAE] hover:text-[#F3F1EB] hover:bg-[#232A2F] focus:outline-none focus:ring-2 focus:ring-[#C49A62] transition-colors shrink-0"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 sm:p-6 md:p-8 overflow-y-auto space-y-5 sm:space-y-6">
          {/* Prominent Sample Placeholder Notice Banner */}
          <div className="flex items-start gap-2.5 sm:gap-3 p-3 sm:p-3.5 rounded bg-[#101315] border border-[#C49A62]/30 text-xs text-[#C49A62]">
            <AlertTriangle size={18} className="shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold uppercase tracking-wider">
                Sample Demonstration Project:
              </strong>{' '}
              <span className="text-[#A7ACAE]">
                This entry serves as a structural capability placeholder. Client names, exact locations,
                and budgets are deliberately unstated until company verification. Replaceable via{' '}
                <code className="text-[#F3F1EB]">src/data/projects.ts</code>.
              </span>
            </div>
          </div>

          {/* Project Title & Overview */}
          <div>
            <h3
              id="project-modal-title"
              className="font-display font-extrabold text-xl sm:text-2xl md:text-3xl text-[#F3F1EB] uppercase tracking-tight break-words"
            >
              {project.title}
            </h3>
            <p className="mt-2.5 sm:mt-3 text-sm sm:text-base text-[#D9D7D0] leading-relaxed">
              {project.scopeOverview}
            </p>
          </div>

          {/* Large Project Image */}
          <div className="aspect-[16/9] w-full rounded overflow-hidden border border-[#232A2F] bg-[#101315]">
            <img
              src={project.image}
              alt={project.imageAlt}
              loading="lazy"
              className="w-full h-full object-cover filter brightness-[0.8] contrast-110"
            />
          </div>

          {/* Engineering Specifications Matrix */}
          <div>
            <h4 className="font-technical text-xs uppercase tracking-[0.2em] text-[#C49A62] mb-3">
              Structural Technical Parameters
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              <div className="p-3 sm:p-3.5 rounded bg-[#101315] border border-[#232A2F]">
                <div className="font-technical text-[10px] text-[#A7ACAE] uppercase">
                  Structural Typology
                </div>
                <div className="text-sm font-semibold text-[#F3F1EB] mt-1 break-words">
                  {project.keyDetails.structuralType}
                </div>
              </div>

              <div className="p-3 sm:p-3.5 rounded bg-[#101315] border border-[#232A2F]">
                <div className="font-technical text-[10px] text-[#A7ACAE] uppercase">
                  Engineering Scope
                </div>
                <div className="text-sm font-semibold text-[#F3F1EB] mt-1 break-words">
                  {project.keyDetails.designScope}
                </div>
              </div>

              <div className="p-3 sm:p-3.5 rounded bg-[#101315] border border-[#232A2F]">
                <div className="font-technical text-[10px] text-[#A7ACAE] uppercase">
                  Detailing Standard
                </div>
                <div className="text-sm font-semibold text-[#F3F1EB] mt-1 break-words">
                  {project.keyDetails.detailingStandard}
                </div>
              </div>

              <div className="p-3 sm:p-3.5 rounded bg-[#101315] border border-[#232A2F]">
                <div className="font-technical text-[10px] text-[#A7ACAE] uppercase">
                  Deliverable Formats
                </div>
                <div className="text-sm font-semibold text-[#F3F1EB] mt-1 break-words">
                  {project.keyDetails.deliverableType}
                </div>
              </div>
            </div>
          </div>

          {/* Technical Notes */}
          <div className="p-3.5 sm:p-4 rounded bg-[#14181B] border border-white/[0.06] text-xs text-[#A7ACAE] leading-relaxed">
            <strong className="text-[#F3F1EB] uppercase font-technical text-[10px] tracking-wider block mb-1">
              Engineering Notes:
            </strong>
            {project.technicalNotes}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-3.5 sm:p-6 border-t border-[#232A2F] bg-[#14181B] flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <span className="font-technical text-[10px] text-[#A7ACAE] uppercase tracking-wider hidden sm:inline">
            Stambha Structural Detailing Template
          </span>

          <div className="flex items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none min-h-[44px] px-4 py-2.5 text-xs font-technical uppercase tracking-wider text-[#A7ACAE] hover:text-[#F3F1EB] rounded border border-transparent hover:border-[#2E373E] transition-colors"
            >
              Close
            </button>
            <a
              href="#contact"
              onClick={onClose}
              className="flex-1 sm:flex-none min-h-[44px] inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 text-xs font-technical uppercase tracking-[0.15em] sm:tracking-[0.2em] font-semibold bg-[#C49A62] text-[#101315] hover:bg-[#D6AF79] rounded transition-colors text-center"
            >
              <span>Consult on Scope</span>
              <ArrowUpRight size={14} className="shrink-0" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
