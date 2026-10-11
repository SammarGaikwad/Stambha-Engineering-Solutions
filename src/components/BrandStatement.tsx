import React from 'react';
import { Ruler, Shield, GitCommit, ArrowRight } from 'lucide-react';

export const BrandStatement: React.FC = () => {
  return (
    <section
      id="about"
      className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-[#232A2F]/80"
    >
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 -z-10 bg-cad-grid opacity-20 pointer-events-none" />

      {/* Section Code Tag */}
      <div className="flex items-center gap-4 mb-8 sm:mb-12 md:mb-16">
        <span className="font-technical text-xs uppercase tracking-[0.25em] text-[#C49A62]">
          [ 02 // PHILOSOPHY ]
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-[#2E373E] to-transparent" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-start">
        {/* Left Column: Bold Typographic Statement */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div>
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl lg:text-5xl xl:text-6xl uppercase tracking-tight text-[#F3F1EB] leading-[1.08] sm:leading-[1.05] break-words">
              EVERY STRUCTURE STARTS WITH A{' '}
              <span className="text-[#C49A62]">STRONG FOUNDATION.</span>
            </h2>

            <div className="my-6 sm:my-8 h-px w-20 sm:w-24 bg-[#C49A62]" />

            <p className="text-base sm:text-lg lg:text-xl text-[#F3F1EB]/90 leading-relaxed font-sans max-w-2xl font-light">
              At Stambha Engineering Solutions, we bring together structural design,
              technical detailing, estimation, and project coordination to support
              the built environment.
            </p>

            <p className="mt-4 text-xs sm:text-sm md:text-base text-[#A7ACAE] leading-relaxed max-w-2xl">
              From heavy industrial steel sheds to multi-storey reinforced concrete
              complexes, our engineering approach emphasizes rigorous analytical
              verification, constructability, and seamless coordination between
              drawing board and construction site.
            </p>
          </div>

          {/* Core Technical Disciplines Grid */}
          <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-[#232A2F] grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
            <div className="space-y-1.5 sm:space-y-2">
              <div className="flex items-center gap-2 text-[#C49A62]">
                <Ruler size={16} className="shrink-0" />
                <span className="font-technical text-xs uppercase tracking-wider font-semibold">
                  Precision
                </span>
              </div>
              <p className="text-xs text-[#A7ACAE] leading-relaxed">
                Calculations and member detailing aligned strictly with structural safety parameters.
              </p>
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <div className="flex items-center gap-2 text-[#C49A62]">
                <GitCommit size={16} className="shrink-0" />
                <span className="font-technical text-xs uppercase tracking-wider font-semibold">
                  Alignment
                </span>
              </div>
              <p className="text-xs text-[#A7ACAE] leading-relaxed">
                Harmonizing design drawings, material estimation, and fabrication tolerances.
              </p>
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <div className="flex items-center gap-2 text-[#C49A62]">
                <Shield size={16} className="shrink-0" />
                <span className="font-technical text-xs uppercase tracking-wider font-semibold">
                  Durability
                </span>
              </div>
              <p className="text-xs text-[#A7ACAE] leading-relaxed">
                Engineering frameworks detailed to withstand load combinations and climatic forces.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Architectural Drawing Showcase & Technical Schematic */}
        <div className="lg:col-span-5 space-y-4 sm:space-y-6">
          <div className="relative group rounded border border-[#232A2F] bg-[#14181B] p-2 overflow-hidden shadow-2xl">
            {/* Architectural Crosshair Corners */}
            <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#C49A62]" />
            <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#C49A62]" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#C49A62]" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#C49A62]" />

            <div className="relative overflow-hidden aspect-[4/3] rounded bg-[#101315]">
              <img
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop"
                alt="Technical CAD drawing and architectural blueprint schematics"
                loading="lazy"
                className="w-full h-full object-cover filter contrast-125 brightness-[0.6] group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              
              {/* Overlay Dimension Vector Graphics */}
              <div className="absolute inset-0 p-3 sm:p-5 flex flex-col justify-between pointer-events-none">
                <div className="flex justify-between items-start font-technical text-[9px] sm:text-[10px] tracking-widest text-[#C49A62] bg-[#101315]/85 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded w-fit border border-[#C49A62]/30">
                  REF // SEC-A01 STRUCTURAL DETAILING
                </div>

                <div className="bg-[#101315]/90 border border-[#232A2F] p-3 sm:p-4 rounded backdrop-blur-sm space-y-1.5 sm:space-y-2">
                  <div className="flex justify-between font-technical text-[10px] sm:text-[11px] text-[#F3F1EB]">
                    <span>DESIGN VERIFICATION</span>
                    <span className="text-[#C49A62]">VERIFIED</span>
                  </div>
                  <div className="w-full bg-[#232A2F] h-1 rounded-full overflow-hidden">
                    <div className="bg-[#C49A62] h-full w-full" />
                  </div>
                  <p className="font-technical text-[9px] sm:text-[10px] text-[#A7ACAE] leading-normal">
                    Analytical 3D models integrated across estimation and construction phases.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Anchor Link */}
          <div className="flex justify-end">
            <a
              href="#services"
              className="group inline-flex items-center gap-2 font-technical text-xs uppercase tracking-[0.2em] text-[#C49A62] hover:text-[#D6AF79] transition-colors min-h-[44px] py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C49A62] rounded"
            >
              <span>Explore All Engineering Services</span>
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
