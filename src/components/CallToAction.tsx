import React from 'react';
import { ArrowUpRight, Layers } from 'lucide-react';

export const CallToAction: React.FC = () => {
  return (
    <section className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 border-t border-[#232A2F]/80 overflow-hidden bg-gradient-to-b from-[#101315] via-[#14181B] to-[#101315]">
      {/* Background CAD grid */}
      <div className="absolute inset-0 -z-10 bg-cad-grid opacity-25 pointer-events-none" />

      {/* Dramatic Bronze Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] xs:w-[360px] sm:w-[600px] h-[200px] sm:h-[300px] bg-[#C49A62]/10 blur-[90px] sm:blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded bg-[#161B1E] border border-[#C49A62]/30 text-[#C49A62] font-technical text-xs uppercase tracking-[0.25em] mb-6 sm:mb-8">
          <span>// INITIATE CONSULTATION</span>
        </div>

        <h2 className="font-display font-extrabold text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-tight text-[#F3F1EB] leading-[1.08] break-words">
          PLANNING A STRUCTURE?
          <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[#C49A62] via-[#E2C394] to-[#C49A62]">
            LET'S BUILD THE RIGHT FOUNDATION.
          </span>
        </h2>

        <p className="mt-5 sm:mt-8 max-w-2xl mx-auto text-sm sm:text-base md:text-xl text-[#A7ACAE] leading-relaxed font-sans font-light">
          Tell us about your project requirements and connect with Stambha Engineering Solutions.
          From preliminary estimation to detailed steel connection design, we bring coordinated rigor to your built asset.
        </p>

        {/* Action CTAs */}
        <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-5">
          <a
            href="#contact"
            className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-3 px-8 sm:px-9 py-3.5 sm:py-4 text-xs font-technical uppercase tracking-[0.22em] font-semibold bg-[#C49A62] text-[#101315] hover:bg-[#D6AF79] transition-all rounded duration-200 shadow-xl shadow-[#C49A62]/15 focus:outline-none focus:ring-2 focus:ring-[#C49A62]"
          >
            <span>DISCUSS YOUR PROJECT</span>
            <ArrowUpRight size={16} />
          </a>

          <a
            href="#services"
            className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 text-xs font-technical uppercase tracking-[0.22em] font-medium text-[#F3F1EB] border border-[#2E373E] hover:border-[#C49A62]/60 hover:bg-[#161B1E] transition-all rounded duration-200 focus:outline-none focus:ring-2 focus:ring-[#C49A62]"
          >
            <span>EXPLORE OUR SERVICES</span>
            <Layers size={15} className="text-[#A7ACAE]" />
          </a>
        </div>
      </div>
    </section>
  );
};
