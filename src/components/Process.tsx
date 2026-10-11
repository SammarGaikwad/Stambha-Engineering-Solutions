import React, { useState } from 'react';
import { approachStages } from '../data/approach';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export const Process: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section
      id="process"
      className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-[#232A2F]/80"
    >
      {/* Background CAD grid */}
      <div className="absolute inset-0 -z-10 bg-cad-grid opacity-20 pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-10 sm:mb-16">
        <div>
          <div className="flex items-center gap-4 mb-3 sm:mb-4">
            <span className="font-technical text-xs uppercase tracking-[0.25em] text-[#C49A62]">
              [ 04 // METHODOLOGY ]
            </span>
            <div className="h-px w-16 sm:w-20 bg-[#C49A62]/40" />
          </div>

          <h2 className="font-display font-extrabold text-2xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-[#F3F1EB] break-words">
            OUR APPROACH.
          </h2>
        </div>

        <p className="max-w-md text-xs sm:text-sm text-[#A7ACAE] leading-relaxed">
          From initial soil and structural criteria to fabrication drawings, quantity take-offs,
          and final site handover—each phase is executed with coordinated precision.
        </p>
      </div>

      {/* Desktop Interactive Step Selector Bar (Visible on lg 1024px+) */}
      <div className="hidden lg:grid grid-cols-5 gap-3 xl:gap-4 mb-12 border-b border-[#232A2F] pb-6">
        {approachStages.map((stage, idx) => {
          const isSelected = activeStep === idx;
          return (
            <button
              key={stage.step}
              onClick={() => setActiveStep(idx)}
              className={`group text-left transition-all p-3 rounded border focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C49A62] ${
                isSelected
                  ? 'border-[#C49A62] bg-[#161B1E]'
                  : 'border-transparent hover:border-[#2E373E] hover:bg-[#14181B]/60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`font-technical text-xs font-bold ${
                    isSelected ? 'text-[#C49A62]' : 'text-[#A7ACAE]'
                  }`}
                >
                  STAGE {stage.step}
                </span>
                <span
                  className={`w-2 h-2 rounded-full transition-all ${
                    isSelected ? 'bg-[#C49A62] scale-125' : 'bg-[#2E373E]'
                  }`}
                />
              </div>
              <div
                className={`font-display text-sm font-bold uppercase tracking-wider ${
                  isSelected ? 'text-[#F3F1EB]' : 'text-[#A7ACAE]'
                }`}
              >
                {stage.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Stage Detailed Spotlight (Desktop Interactive) */}
      <div className="hidden lg:block mb-16">
        <div className="rounded-lg border border-[#2E373E] bg-[#14181B] p-8 xl:p-10 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[#C49A62]/10 to-transparent pointer-events-none" />
          <div className="absolute top-4 right-4 font-technical text-5xl font-extrabold text-white/[0.04]">
            {approachStages[activeStep].step}
          </div>

          <div className="max-w-3xl">
            <div className="inline-block px-3 py-1 rounded bg-[#101315] border border-[#C49A62]/30 text-[#C49A62] font-technical text-xs uppercase tracking-widest mb-4">
              STAGE {approachStages[activeStep].step} // {approachStages[activeStep].subtitle}
            </div>

            <h3 className="font-display font-bold text-2xl xl:text-3xl text-[#F3F1EB] uppercase tracking-tight">
              {approachStages[activeStep].title}
            </h3>

            <p className="mt-4 text-sm xl:text-base text-[#D9D7D0] leading-relaxed">
              {approachStages[activeStep].description}
            </p>

            <div className="mt-8 pt-8 border-t border-[#232A2F]">
              <h4 className="font-technical text-xs uppercase tracking-[0.2em] text-[#C49A62] mb-4">
                Core Execution Deliverables & Activities:
              </h4>

              <div className="grid grid-cols-2 gap-4">
                {approachStages[activeStep].focusAreas.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-[#C49A62] shrink-0 mt-0.5" />
                    <span className="text-sm text-[#F3F1EB]">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sequential Stacked List (Optimized for Mobile, Tablet, and Full Flow) */}
      <div className="space-y-4 sm:space-y-6 lg:space-y-8">
        <div className="text-[11px] font-technical uppercase tracking-[0.2em] text-[#A7ACAE]/80 mb-3 lg:hidden">
          // COMPLETE WORKFLOW TIMELINE
        </div>

        {approachStages.map((stage, idx) => (
          <div
            key={stage.step}
            className="group relative rounded border border-[#232A2F] bg-[#14181B] hover:border-[#C49A62]/50 p-4 sm:p-6 lg:p-8 transition-all duration-300"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
              <div className="flex items-start gap-3 sm:gap-5">
                {/* Number Badge */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded border border-[#C49A62]/40 bg-[#101315] flex items-center justify-center shrink-0">
                  <span className="font-technical text-sm sm:text-base font-bold text-[#C49A62]">
                    {stage.step}
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="font-technical text-[9px] sm:text-xs uppercase tracking-widest text-[#C49A62] mb-0.5 sm:mb-1 truncate">
                    {stage.subtitle}
                  </div>
                  <h3 className="font-display font-bold text-lg sm:text-xl lg:text-2xl text-[#F3F1EB] uppercase tracking-tight break-words">
                    {stage.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#A7ACAE] leading-relaxed max-w-3xl">
                    {stage.description}
                  </p>
                </div>
              </div>

              <div className="hidden sm:block shrink-0">
                <span className="text-xs font-technical text-[#A7ACAE]/40 group-hover:text-[#C49A62] transition-colors">
                  0{idx + 1} / 05
                </span>
              </div>
            </div>

            {/* Focus bullet points */}
            <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-[#232A2F]/60 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
              {stage.focusAreas.map((point, pIdx) => (
                <div key={pIdx} className="flex items-start gap-2 text-xs text-[#D9D7D0]">
                  <ArrowRight size={12} className="text-[#C49A62] shrink-0 mt-0.5" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
