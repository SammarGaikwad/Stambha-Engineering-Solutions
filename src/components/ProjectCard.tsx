import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { ProjectItem } from '../types';

interface ProjectCardProps {
  project: ProjectItem;
  onSelect: (project: ProjectItem) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(project)}
      className="group cursor-pointer rounded border border-[#232A2F] bg-[#14181B] hover:border-[#C49A62]/60 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-[#C49A62]/5 hover:-translate-y-1"
    >
      <div>
        {/* Project Image */}
        <div className="relative aspect-[16/10] overflow-hidden bg-[#101315]">
          <img
            src={project.image}
            alt={project.imageAlt}
            loading="lazy"
            className="w-full h-full object-cover filter brightness-[0.75] contrast-110 group-hover:scale-105 group-hover:brightness-90 transition-all duration-700 ease-out"
          />

          {/* Dark Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#14181B] via-transparent to-black/30" />

          {/* Top Category Badge & Placeholder Tag */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <span className="px-2.5 py-1 rounded bg-[#101315]/85 backdrop-blur-sm border border-[#232A2F] text-[10px] font-technical uppercase tracking-widest text-[#F3F1EB]">
              {project.category}
            </span>

            <span className="px-2 py-0.5 rounded bg-[#C49A62]/20 border border-[#C49A62]/40 text-[9px] font-technical uppercase tracking-wider text-[#C49A62]">
              SAMPLE DEMO
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6">
          <h3 className="font-display font-bold text-lg sm:text-xl text-[#F3F1EB] uppercase tracking-tight group-hover:text-white transition-colors leading-snug">
            {project.title}
          </h3>

          <p className="mt-3 text-xs sm:text-sm text-[#A7ACAE] leading-relaxed line-clamp-2 font-sans">
            {project.summary}
          </p>
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-6 pb-6 pt-2 border-t border-[#232A2F]/60 flex items-center justify-between">
        <span className="font-technical text-[10px] uppercase tracking-wider text-[#A7ACAE]/70">
          {project.keyDetails.structuralType.split('&')[0]}
        </span>

        <span className="inline-flex items-center gap-1 font-technical text-xs uppercase tracking-widest text-[#C49A62] group-hover:text-[#D6AF79]">
          <span>View Scope</span>
          <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </div>
  );
};
