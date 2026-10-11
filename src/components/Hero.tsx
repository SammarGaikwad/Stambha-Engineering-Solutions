import React, { useEffect, useRef } from 'react';
import { ArrowDown, ArrowUpRight, Compass, ShieldCheck, Layers } from 'lucide-react';
import gsap from 'gsap';

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if user prefers reduced motion or is on narrow mobile
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(badgeRef.current, {
        opacity: 0,
        y: 15,
        duration: 0.7,
        delay: 0.1,
      })
        .from(
          headlineRef.current?.querySelectorAll('.reveal-line') || [],
          {
            y: 35,
            opacity: 0,
            duration: 0.9,
            stagger: 0.12,
          },
          '-=0.3'
        )
        .from(
          subtextRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.8,
          },
          '-=0.4'
        )
        .from(
          ctaRef.current?.children ? Array.from(ctaRef.current.children) : [],
          {
            opacity: 0,
            y: 15,
            duration: 0.6,
            stagger: 0.08,
          },
          '-=0.4'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[auto] sm:min-h-[90vh] lg:min-h-screen flex flex-col justify-between pt-24 xs:pt-28 sm:pt-32 lg:pt-36 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full overflow-hidden"
    >
      {/* Background Cinematic Visual with Dark Gradients & Blueprint Overlay */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none select-none">
        {/* Replaceable Background Image / Poster */}
        <img
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2000&auto=format&fit=crop"
          alt="Structural Steel Framing and Industrial Truss Architecture"
          fetchPriority="high"
          className="w-full h-full object-cover object-center scale-105 filter brightness-[0.28] contrast-125 transition-transform duration-1000 ease-out will-change-transform"
        />

        {/* Cinematic Vignette and Dark Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#101315]/85 via-[#101315]/75 to-[#101315]" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#101315]/40 to-[#101315]" />

        {/* CAD Drafting Grid Overlay */}
        <div className="absolute inset-0 bg-cad-grid opacity-20 sm:opacity-25" />

        {/* Hairline Structural Framing Border (hidden on smallest screens) */}
        <div className="hidden sm:block absolute inset-6 sm:inset-10 border border-white/[0.04] pointer-events-none" />
      </div>

      {/* Hero Header Meta Label */}
      <div ref={badgeRef} className="pt-2 sm:pt-4">
        <div className="inline-flex items-center gap-2 sm:gap-3 px-3 py-1.5 rounded border border-[#C49A62]/30 bg-[#161B1E]/90 backdrop-blur-sm max-w-full">
          <div className="w-1.5 h-1.5 rounded-full bg-[#C49A62] animate-pulse shrink-0" />
          <span className="font-technical text-[9px] xs:text-[10px] sm:text-xs uppercase tracking-[0.16em] sm:tracking-[0.25em] text-[#F3F1EB] truncate">
            DISCIPLINE // STRUCTURAL ENGINEERING & MANAGEMENT
          </span>
        </div>
      </div>

      {/* Main Editorial Headline & Supporting Copy */}
      <div className="my-auto py-8 sm:py-10 lg:py-14 max-w-5xl">
        <h1
          ref={headlineRef}
          className="font-display font-extrabold text-[clamp(1.85rem,7vw,5.5rem)] tracking-tight text-[#F3F1EB] uppercase leading-[1.02] sm:leading-[0.95] break-words"
        >
          <span className="block overflow-hidden">
            <span className="reveal-line block text-[#F3F1EB]">
              BUILT ON PRECISION.
            </span>
          </span>
          <span className="block overflow-hidden mt-1 sm:mt-2">
            <span className="reveal-line block text-transparent bg-clip-text bg-gradient-to-r from-[#C49A62] via-[#E2C394] to-[#C49A62]">
              ENGINEERED TO LAST.
            </span>
          </span>
        </h1>

        <p
          ref={subtextRef}
          className="mt-5 sm:mt-8 max-w-2xl text-sm xs:text-base sm:text-lg lg:text-xl text-[#A7ACAE] font-normal leading-relaxed font-sans"
        >
          Structural engineering, steel and RCC design, estimation, and
          construction management—integrated to support your project from concept
          to execution.
        </p>

        {/* CTAs with >= 48px touch targets */}
        <div
          ref={ctaRef}
          className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-5"
        >
          <a
            href="#contact"
            className="group inline-flex items-center justify-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 min-h-[48px] text-xs font-technical uppercase tracking-[0.2em] font-semibold bg-[#C49A62] text-[#101315] hover:bg-[#D6AF79] transition-all rounded duration-200 shadow-lg shadow-[#C49A62]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C49A62] active:scale-98"
          >
            <span>Discuss Your Project</span>
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>

          <a
            href="#services"
            className="group inline-flex items-center justify-center gap-3 px-6 sm:px-7 py-3.5 sm:py-4 min-h-[48px] text-xs font-technical uppercase tracking-[0.2em] font-medium text-[#F3F1EB] border border-[#2E373E] hover:border-[#C49A62]/60 hover:bg-[#161B1E] transition-all rounded duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C49A62] active:scale-98"
          >
            <span>Explore Our Expertise</span>
            <Layers size={15} className="text-[#A7ACAE] group-hover:text-[#C49A62] transition-colors" />
          </a>
        </div>
      </div>

      {/* Bottom Technical Indicators & Animated Scroll Cue */}
      <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
        {/* Core Pillars Overview */}
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-2.5 xs:gap-4 sm:gap-8 text-xs font-technical tracking-wider text-[#A7ACAE] w-full sm:w-auto">
          <div className="flex items-center gap-2">
            <Compass size={14} className="text-[#C49A62] shrink-0" />
            <span className="uppercase text-[10px] sm:text-[11px]">PEB & Steel Detailing</span>
          </div>
          <div className="flex items-center gap-2">
            <Layers size={14} className="text-[#C49A62] shrink-0" />
            <span className="uppercase text-[10px] sm:text-[11px]">RCC Structural Systems</span>
          </div>
          <div className="flex items-center gap-2 xs:col-span-2 md:col-span-1">
            <ShieldCheck size={14} className="text-[#C49A62] shrink-0" />
            <span className="uppercase text-[10px] sm:text-[11px]">Estimation & Execution</span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <a
          href="#about"
          aria-label="Scroll to about section"
          className="hidden sm:inline-flex items-center gap-3 text-xs font-technical uppercase tracking-[0.2em] text-[#A7ACAE] hover:text-[#C49A62] transition-colors py-1 shrink-0"
        >
          <span className="text-[10px]">SCROLL DOWN</span>
          <div className="w-7 h-7 rounded border border-[#2E373E] hover:border-[#C49A62] flex items-center justify-center transition-colors">
            <ArrowDown
              size={13}
              className="text-[#C49A62] animate-bounce transition-transform"
            />
          </div>
        </a>
      </div>
    </section>
  );
};
