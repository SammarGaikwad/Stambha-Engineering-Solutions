import React from 'react';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BrandStatement } from './components/BrandStatement';
import { Services } from './components/Services';
import { Process } from './components/Process';
import { ProjectGallery } from './components/ProjectGallery';
import { StructuralPlanning } from './components/StructuralPlanning';
import { CallToAction } from './components/CallToAction';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[#101315] text-[#F3F1EB] selection:bg-[#C49A62] selection:text-[#101315]">
      {/* Subtle Architectural Reticle Cursor (Desktop non-touch) */}
      <CustomCursor />

      {/* Main Top Navigation */}
      <Navbar />

      {/* Main Content Layout */}
      <main id="main-content" className="relative z-10">
        {/* SECTION 1 — Cinematic Hero */}
        <Hero />

        {/* SECTION 2 — Brand Statement / Introduction */}
        <BrandStatement />

        {/* SECTION 3 — Core Engineering Services */}
        <Services />

        {/* SECTION 4 — Our Approach */}
        <Process />

        {/* SECTION 5 — Structural Project Portfolio */}
        <ProjectGallery />

        {/* SECTION 6 — Why Structural Planning Matters & 3D Truss Inspector */}
        <StructuralPlanning />

        {/* SECTION 7 — Dramatic Call to Action */}
        <CallToAction />

        {/* SECTION 8 — Contact & Project Enquiry Desk */}
        <ContactForm />
      </main>

      {/* SECTION 9 — Engineering Consultancy Footer */}
      <Footer />
    </div>
  );
};

export default App;
