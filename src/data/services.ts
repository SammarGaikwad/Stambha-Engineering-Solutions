import type { ServiceItem } from '../types';

export const servicesData: ServiceItem[] = [
  {
    id: 'steel-structures-peb-sheds',
    code: 'SERVICE 01',
    title: 'STEEL STRUCTURES & PEB SHEDS',
    shortDesc: 'Structural design and detailing for pre-engineered buildings, steel sheds, and industrial structures.',
    fullDesc:
      'We deliver comprehensive design calculations and fabrication-ready detailing for industrial warehouses, PEB sheds, factory sheds, and heavy structural frameworks. Every steel member, connection, and truss geometry is engineered for load efficiency, durability, and practical on-site erection.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop',
    imageAlt: 'Industrial steel building framework and trusses under construction',
    deliverables: [
      'Structural analysis and 3D frame design',
      'Steel member sizing and optimization',
      'High-strength connection detailing (bolted & welded)',
      'Fabrication and erection drawings (subject to project scope)',
      'Purlin, girt, and bracing layout detailing',
    ],
    keyHighlights: ['PEB Sheds', 'Industrial Warehouses', 'Crane Gantry Frames', 'Heavy Canopies'],
  },
  {
    id: 'rcc-building-design',
    code: 'SERVICE 02',
    title: 'RCC BUILDING DESIGN',
    shortDesc: 'Structural engineering solutions for reinforced concrete buildings and associated structural elements.',
    fullDesc:
      'Engineered structural systems for multi-storey residential, commercial, and institutional reinforced concrete structures. Our calculations balance safety, seismic/wind compliance, serviceability, and material optimization.',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop',
    imageAlt: 'Reinforced concrete framing and architectural engineering building',
    deliverables: [
      'Finite element structural analysis (seismic & gravity loads)',
      'Beam, column, and slab structural design',
      'Foundation design (subject to geotechnical report and scope)',
      'Reinforcement bar bending schedules (BBS) & detailing',
      'Issued-for-construction (IFC) structural drawings',
    ],
    keyHighlights: ['Commercial Complexes', 'Multi-Storey Frames', 'Raft & Isolated Footings', 'Retaining Walls'],
  },
  {
    id: 'structural-estimation',
    code: 'SERVICE 03',
    title: 'STRUCTURAL ESTIMATION',
    shortDesc: 'Quantity assessment and cost planning to support informed project decisions.',
    fullDesc:
      'Rigorous quantity take-offs and cost planning that provide clear transparency before procurement. We convert structural drawings into accurate material breakdowns to reduce wastage, budget overruns, and financial unpredictability.',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop',
    imageAlt: 'Architectural blueprints, technical calculations, and measurement tools',
    deliverables: [
      'Comprehensive quantity take-offs (QTO)',
      'Itemized Bill of Quantities (BOQ)',
      'Structural steel tonnage and concrete volume estimates',
      'Rebar tonnage and formwork area calculations',
      'Preliminary budget forecasting and rate analysis',
    ],
    keyHighlights: ['BOQ Preparation', 'Tonnage Take-Off', 'Tender Cost Estimation', 'Value Engineering Review'],
  },
  {
    id: 'construction',
    code: 'SERVICE 04',
    title: 'CONSTRUCTION',
    shortDesc: 'Construction execution and coordination aligned with approved drawings, project requirements, and site conditions.',
    fullDesc:
      'On-site structural execution carried out in strict accordance with approved engineering drawings, relevant building codes, and safety protocols. We bridge the gap between design theory and physical structural assembly.',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?q=80&w=1200&auto=format&fit=crop',
    imageAlt: 'Construction execution site with heavy structural machinery and steel erection',
    deliverables: [
      'Site execution following approved structural drawings',
      'Structural steel member erection and alignment',
      'Concrete placement, vibration, and curing coordination',
      'Site condition verification and field adaptations',
      'Daily/weekly construction progress logs',
    ],
    keyHighlights: ['Steel Frame Erection', 'RCC Casting', 'Site Foundation Execution', 'Structural Assemblies'],
  },
  {
    id: 'construction-management',
    code: 'SERVICE 05',
    title: 'CONSTRUCTION MANAGEMENT',
    shortDesc: 'Site coordination, construction planning, work sequencing, progress monitoring, and quality coordination.',
    fullDesc:
      'Dedicated management oversight that ensures continuous coordination between structural engineers, contractors, fabricators, and site personnel. We safeguard project timelines and quality through proactive technical supervision.',
    image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?q=80&w=1200&auto=format&fit=crop',
    imageAlt: 'Construction manager inspecting structural progress and blueprints on site',
    deliverables: [
      'Work sequencing and lookahead schedule planning',
      'Multi-agency trade and subcontractor coordination',
      'Quality assurance inspections and test report verification',
      'Site issue resolution and design clarification (RFI management)',
      'Site safety adherence and compliance tracking',
    ],
    keyHighlights: ['Work Sequencing', 'Quality Assurance', 'RFI Resolution', 'Subcontractor Alignment'],
  },
  {
    id: 'project-management',
    code: 'SERVICE 06',
    title: 'PROJECT MANAGEMENT',
    shortDesc: 'Project planning and coordination across scope, schedule, cost, stakeholders, and project deliverables.',
    fullDesc:
      'End-to-end governance of structural engineering initiatives. From initial kickoff and design deliverables to procurement alignment and final project handover, we ensure every milestone is systematically delivered.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop',
    imageAlt: 'Engineering project management team coordinating schedule milestones and scope',
    deliverables: [
      'Scope baseline definition and scope change control',
      'Master schedule tracking and milestone reviews',
      'Cost monitoring against approved budgets',
      'Stakeholder communication and technical reporting',
      'Handover documentation and closeout coordination',
    ],
    keyHighlights: ['Milestone Tracking', 'Cost Control', 'Scope Management', 'Stakeholder Reporting'],
  },
];
