import type { ProjectItem } from '../types';

/**
 * PORTFOLIO CONFIGURATION GUIDE:
 * The entries below are visual demonstration placeholders designed to showcase
 * layout, technical hierarchy, and interactive modal presentations.
 * 
 * Replace these placeholder entries with verified company projects once completed:
 * - Update `title`, `category`, and `image` (local file in /assets or external CDN).
 * - Fill in genuine scope overview and technical notes.
 * - Do NOT fabricate real client identities, project values, or exact addresses.
 */
export const projectsData: ProjectItem[] = [
  {
    id: 'industrial-steel-shed-sample',
    title: 'Industrial Steel Shed — Sample Project',
    category: 'Steel Structures',
    isSamplePlaceholder: true,
    summary:
      'Clear-span structural steel shed model demonstrating roof truss geometry, purlin layouts, and column baseplate engineering.',
    scopeOverview:
      'Demonstration of structural design calculations for heavy-duty storage, portal frame stability analysis, and bolted joint detailing for industrial conditions.',
    keyDetails: {
      structuralType: 'Fabricated Steel Truss & Portal Frame',
      designScope: 'Structural Analysis & Fabrication Detailing',
      detailingStandard: 'Standard Industrial Structural Detailing',
      deliverableType: '3D Model, Fabrication Drawings, BOQ Estimate',
    },
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop',
    imageAlt: 'Structural steel shed portal frame and roof truss system (Sample Project)',
    technicalNotes:
      'Sample visualization illustrating heavy rafter profiles, diagonal wind bracing, and crane beam support brackets.',
  },
  {
    id: 'peb-warehouse-sample',
    title: 'PEB Warehouse — Sample Project',
    category: 'PEB Sheds',
    isSamplePlaceholder: true,
    summary:
      'Pre-engineered building warehouse layout optimized for clear floor space, high eaves, and efficient steel consumption.',
    scopeOverview:
      'Sample engineering model highlighting tapered built-up sections, cold-formed secondary members, and roof sheeting bracing systems.',
    keyDetails: {
      structuralType: 'Pre-Engineered Building (PEB) System',
      designScope: 'Tapered Frame Design & Secondary Detailing',
      detailingStandard: 'Standard PEB Practice',
      deliverableType: 'Erection Mark Plans & Component Schedules',
    },
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop',
    imageAlt: 'Pre-engineered warehouse building interior with steel portal frames (Sample Project)',
    technicalNotes:
      'Demonstrates high-clearance logistic facility engineering with modular bay extensions and integrated canopies.',
  },
  {
    id: 'rcc-commercial-building-sample',
    title: 'RCC Commercial Building — Sample Project',
    category: 'RCC Buildings',
    isSamplePlaceholder: true,
    summary:
      'Multi-storey reinforced concrete framing model demonstrating column grid optimization, slab ductility, and foundation layout.',
    scopeOverview:
      'Illustrates gravity and lateral load distribution for commercial floor plates, seismic beam-column joints, and shear wall placement.',
    keyDetails: {
      structuralType: 'Reinforced Concrete Moment-Resisting Frame',
      designScope: 'Full Structural Modeling & Bar Detailing',
      detailingStandard: 'Ductile Detailing Standards',
      deliverableType: 'Structural Drawings & Bar Bending Schedules',
    },
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?q=80&w=1200&auto=format&fit=crop',
    imageAlt: 'Reinforced concrete commercial building structural frame under construction (Sample Project)',
    technicalNotes:
      'Showcases standard slab-beam framing schemes designed to maximize flexible internal office zoning.',
  },
  {
    id: 'structural-steel-framework-sample',
    title: 'Structural Steel Framework — Sample Project',
    category: 'Steel Structures',
    isSamplePlaceholder: true,
    summary:
      'Intricate lattice steel tower and framework detailing illustrating multi-member spatial connections and gusset plate modeling.',
    scopeOverview:
      'Prototype engineering detailing highlighting 3D spatial node coordination, diagonal tube bracing, and heavy anchor bolt layouts.',
    keyDetails: {
      structuralType: 'Spatial Lattice Frame & Heavy Braced Tower',
      designScope: 'Node Stress Analysis & Connection Detailing',
      detailingStandard: 'Industrial High-Stress Detailing',
      deliverableType: 'Shop Drawings & Connection Calculation Sheets',
    },
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop',
    imageAlt: 'Geometric architectural steel framework and structural engineering grid (Sample Project)',
    technicalNotes:
      'Designed to demonstrate spatial structural stability under severe lateral and wind load forces.',
  },
  {
    id: 'industrial-manufacturing-facility-sample',
    title: 'Industrial Manufacturing Facility — Sample Project',
    category: 'Industrial Construction',
    isSamplePlaceholder: true,
    summary:
      'Integrated industrial facility combining heavy crane runway beams, mezzanines, and equipment foundation pits.',
    scopeOverview:
      'Sample engineering setup showing heavy vibration-tolerant machine bases combined with wide-span industrial roofing.',
    keyDetails: {
      structuralType: 'Hybrid Steel Frame & Heavy Machine Plinths',
      designScope: 'Dynamic Load Considerations & Site Sequencing',
      detailingStandard: 'Industrial Plant Standards',
      deliverableType: 'Integrated Structural IFC Documentation',
    },
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop',
    imageAlt: 'Industrial manufacturing facility under construction (Sample Project)',
    technicalNotes:
      'Illustrates coordination between deep foundation plinths and overhead crane beam runway supports.',
  },
  {
    id: 'logistics-distribution-hub-sample',
    title: 'Logistics Distribution Hub — Sample Project',
    category: 'PEB Sheds',
    isSamplePlaceholder: true,
    summary:
      'Large-footprint distribution facility featuring continuous ridge monitors, dock leveler framing, and expansive column spacing.',
    scopeOverview:
      'Sample engineering layout focused on minimizing internal column counts while ensuring wind resistance across long spans.',
    keyDetails: {
      structuralType: 'Multi-Span PEB Rigid Frame',
      designScope: 'Optimized Column Grids & Canopy Integration',
      detailingStandard: 'Modern Logistics Engineering Standard',
      deliverableType: 'Fabrication Drawings & BOQ Quantification',
    },
    image: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=1200&auto=format&fit=crop',
    imageAlt: 'High-bay logistics warehouse structural facility (Sample Project)',
    technicalNotes:
      'Showcases efficient steel weight per square foot through optimized section depths and high-tensile purlins.',
  },
];
