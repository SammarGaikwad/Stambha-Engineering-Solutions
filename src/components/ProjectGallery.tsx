import React, { useState, useMemo } from 'react';
import { projectsData } from '../data/projects';
import type { ProjectCategory, ProjectItem } from '../types';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { AlertCircle, SlidersHorizontal } from 'lucide-react';

export const ProjectGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  const categories: ProjectCategory[] = [
    'All',
    'Steel Structures',
    'PEB Sheds',
    'RCC Buildings',
    'Industrial Construction',
  ];

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') return projectsData;
    return projectsData.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section
      id="projects"
      className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-[#232A2F]/80"
    >
      {/* Background CAD grid */}
      <div className="absolute inset-0 -z-10 bg-cad-grid opacity-20 pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12 md:mb-16">
        <div>
          <div className="flex items-center gap-4 mb-3 sm:mb-4">
            <span className="font-technical text-xs uppercase tracking-[0.25em] text-[#C49A62]">
              [ 05 // PORTFOLIO ARCHIVE ]
            </span>
            <div className="h-px w-16 sm:w-20 bg-[#C49A62]/40" />
          </div>

          <h2 className="font-display font-extrabold text-2xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-[#F3F1EB] break-words">
            STRUCTURAL PORTFOLIO.
          </h2>
        </div>

        <p className="max-w-md text-xs sm:text-sm text-[#A7ACAE] leading-relaxed">
          Demonstrative structural models illustrating detailing typologies across industrial
          steel frames, pre-engineered buildings, and reinforced concrete systems.
        </p>
      </div>

      {/* Transparent Placeholder Notice Banner */}
      <div className="mb-8 sm:mb-10 p-3.5 sm:p-4 rounded bg-[#14181B] border border-[#2E373E] flex items-start gap-3">
        <AlertCircle size={18} className="text-[#C49A62] shrink-0 mt-0.5" />
        <div className="text-xs text-[#A7ACAE] leading-relaxed">
          <strong className="text-[#F3F1EB] uppercase tracking-wider font-technical text-[10px] sm:text-[11px] block sm:inline mr-2">
            Visual Demonstration Notice:
          </strong>
          The entries featured below are representative placeholders showcasing our structural design
          disciplines and card templates. Project specifics will be updated with genuine company works upon
          formal documentation.
        </div>
      </div>

      {/* Filter Category Tabs (Touch-friendly 44px min targets) */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-8 sm:mb-10 pb-4 border-b border-[#232A2F]">
        <div className="flex items-center gap-1.5 text-xs font-technical uppercase text-[#A7ACAE] mr-2">
          <SlidersHorizontal size={13} />
          <span>FILTER:</span>
        </div>

        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`min-h-[44px] px-3.5 sm:px-4 py-2 rounded text-xs font-technical uppercase tracking-wider transition-all duration-200 border flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C49A62] active:scale-95 ${
                isActive
                  ? 'bg-[#C49A62] text-[#101315] border-[#C49A62] font-semibold shadow-md shadow-[#C49A62]/10'
                  : 'bg-[#14181B] text-[#A7ACAE] border-[#232A2F] hover:text-[#F3F1EB] hover:border-[#2E373E]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Projects Grid (1 col on mobile, 2 on tablet, 3 on desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onSelect={(p) => setActiveModalProject(p)}
          />
        ))}
      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
};
