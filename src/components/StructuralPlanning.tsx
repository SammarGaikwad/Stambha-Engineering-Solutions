import React from 'react';
import { Crosshair, GitMerge, CheckSquare } from 'lucide-react';
import { StructuralTrussViewer } from './StructuralTrussViewer';

export const StructuralPlanning: React.FC = () => {
  return (
    <section
      id="planning"
      className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-[#232A2F]/80"
    >
      {/* Background drafting pattern */}
      <div className="absolute inset-0 -z-10 bg-cad-grid opacity-20 pointer-events-none" />

      {/* Section Tag */}
      <div className="flex items-center gap-3 sm:gap-4 mb-10 sm:mb-16">
        <span className="font-technical text-xs uppercase tracking-[0.25em] text-[#C49A62]">
          [ 06 // PRINCIPLES ]
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-[#2E373E] to-transparent" />
      </div>

      {/* Section Header */}
      <div className="max-w-3xl mb-10 sm:mb-16">
        <h2 className="font-display font-extrabold text-2xl xs:text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-[#F3F1EB] leading-tight">
          WHY STRUCTURAL PLANNING MATTERS.
        </h2>
        <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-[#A7ACAE] leading-relaxed">
          In both steel and concrete construction, discrepancies discovered on the job site
          lead to delays and rework. Coordinated structural engineering bridges analysis,
          detailing, and site realities into an integrated technical workflow.
        </p>
      </div>

      {/* The Three Core Principles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 mb-10 sm:mb-16">
        {/* 01 PRECISION */}
        <div className="p-5 sm:p-6 lg:p-8 rounded border border-[#232A2F] bg-[#14181B] relative overflow-hidden flex flex-col justify-between hover:border-[#C49A62]/40 transition-colors">
          <div>
            <div className="flex items-center justify-between pb-4 sm:pb-6 border-b border-[#232A2F]">
              <span className="font-technical text-xs uppercase tracking-widest text-[#C49A62]">
                PRINCIPLE 01
              </span>
              <Crosshair size={18} className="text-[#C49A62]" />
            </div>

            <h3 className="mt-4 sm:mt-6 font-display font-bold text-xl sm:text-2xl text-[#F3F1EB] uppercase tracking-tight">
              PRECISION
            </h3>

            <p className="mt-3 sm:mt-4 text-sm text-[#A7ACAE] leading-relaxed">
              Engineering calculations and detailing appropriate to project requirements.
              From load combinations and wind velocity calculations to exact bolt-hole
              spacings and rebar curtailments, technical precision governs every sheet.
            </p>
          </div>

          <div className="mt-6 pt-4 sm:pt-6 border-t border-[#232A2F]/60 font-technical text-[10px] sm:text-[11px] text-[#A7ACAE]/80 uppercase">
            // FINITE ELEMENT CHECKS & CODE VERIFICATION
          </div>
        </div>

        {/* 02 COORDINATION */}
        <div className="p-5 sm:p-6 lg:p-8 rounded border border-[#232A2F] bg-[#14181B] relative overflow-hidden flex flex-col justify-between hover:border-[#C49A62]/40 transition-colors">
          <div>
            <div className="flex items-center justify-between pb-4 sm:pb-6 border-b border-[#232A2F]">
              <span className="font-technical text-xs uppercase tracking-widest text-[#C49A62]">
                PRINCIPLE 02
              </span>
              <GitMerge size={18} className="text-[#C49A62]" />
            </div>

            <h3 className="mt-4 sm:mt-6 font-display font-bold text-xl sm:text-2xl text-[#F3F1EB] uppercase tracking-tight">
              COORDINATION
            </h3>

            <p className="mt-3 sm:mt-4 text-sm text-[#A7ACAE] leading-relaxed">
              Alignment between structural design, estimation, construction, and project
              stakeholders. Ensuring that architectural clearances, mechanical openings,
              and structural steel clearances are coordinated before fabrication begins.
            </p>
          </div>

          <div className="mt-6 pt-4 sm:pt-6 border-t border-[#232A2F]/60 font-technical text-[10px] sm:text-[11px] text-[#A7ACAE]/80 uppercase">
            // MULTI-DISCIPLINE & STAKEHOLDER SYNCHRONIZATION
          </div>
        </div>

        {/* 03 EXECUTION */}
        <div className="p-5 sm:p-6 lg:p-8 rounded border border-[#232A2F] bg-[#14181B] relative overflow-hidden flex flex-col justify-between hover:border-[#C49A62]/40 transition-colors">
          <div>
            <div className="flex items-center justify-between pb-4 sm:pb-6 border-b border-[#232A2F]">
              <span className="font-technical text-xs uppercase tracking-widest text-[#C49A62]">
                PRINCIPLE 03
              </span>
              <CheckSquare size={18} className="text-[#C49A62]" />
            </div>

            <h3 className="mt-4 sm:mt-6 font-display font-bold text-xl sm:text-2xl text-[#F3F1EB] uppercase tracking-tight">
              EXECUTION
            </h3>

            <p className="mt-3 sm:mt-4 text-sm text-[#A7ACAE] leading-relaxed">
              Planning, documentation, and project monitoring aligned with agreed deliverables.
              Translating engineering drawings into orderly site sequences, erection
              markings, and clear quality checklists during actual structural assembly.
            </p>
          </div>

          <div className="mt-6 pt-4 sm:pt-6 border-t border-[#232A2F]/60 font-technical text-[10px] sm:text-[11px] text-[#A7ACAE]/80 uppercase">
            // DOCUMENTATION & AS-BUILT ALIGNMENT
          </div>
        </div>
      </div>

      {/* Interactive 3D Engineering Space Frame / Truss Viewer */}
      <div className="mt-8 sm:mt-12">
        <StructuralTrussViewer />
      </div>
    </section>
  );
};
