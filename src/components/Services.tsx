import React from 'react';
import { servicesData } from '../data/services';
import { ServiceCard } from './ServiceCard';

export const Services: React.FC = () => {
  return (
    <section
      id="services"
      className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-[#232A2F]/80"
    >
      {/* Background CAD dots pattern */}
      <div className="absolute inset-0 -z-10 bg-cad-dots opacity-30 pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-10 sm:mb-16">
        <div>
          <div className="flex items-center gap-4 mb-3 sm:mb-4">
            <span className="font-technical text-xs uppercase tracking-[0.25em] text-[#C49A62]">
              [ 03 // CORE SERVICES ]
            </span>
            <div className="h-px w-16 sm:w-20 bg-[#C49A62]/40" />
          </div>

          <h2 className="font-display font-extrabold text-2xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-[#F3F1EB] break-words">
            ENGINEERING CAPABILITIES.
          </h2>
        </div>

        <p className="max-w-md text-xs sm:text-sm text-[#A7ACAE] leading-relaxed">
          Comprehensive structural design, precision detailing, quantity estimation,
          and project oversight integrated to ensure technical rigor from concept to completion.
        </p>
      </div>

      {/* Services Grid (1 col on mobile, 2 on tablet, 3 on desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
        {servicesData.map((service, index) => (
          <ServiceCard key={service.id} service={service} index={index} />
        ))}
      </div>

      {/* Scope Disclaimer Callout */}
      <div className="mt-8 sm:mt-12 p-4 sm:p-6 rounded bg-[#14181B] border border-[#232A2F] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="font-technical text-xs uppercase tracking-wider text-[#F3F1EB] font-medium">
            Project Scope Flexibility
          </div>
          <p className="text-xs text-[#A7ACAE] leading-relaxed">
            Deliverables are tailored specifically to project phase, geotechnical conditions, and owner requirements.
          </p>
        </div>

        <a
          href="#contact"
          className="shrink-0 text-xs font-technical uppercase tracking-[0.2em] text-[#C49A62] hover:text-[#D6AF79] underline underline-offset-4 min-h-[44px] inline-flex items-center focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C49A62] rounded"
        >
          Discuss Scope Parameters →
        </a>
      </div>
    </section>
  );
};
