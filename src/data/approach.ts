import type { ApproachStage } from '../types';

export const approachStages: ApproachStage[] = [
  {
    step: '01',
    title: 'UNDERSTAND',
    subtitle: 'PROJECT DISCOVERY & SITE CONSTRAINTS',
    description:
      'We begin by analyzing the client’s spatial requirements, intended building usage, geotechnical data, and site parameters to define unambiguous structural criteria before engineering work commences.',
    focusAreas: [
      'Client functional & architectural requirements',
      'Site topography & soil report evaluation',
      'Local building codes & climatic wind/seismic zones',
      'Structural system selection (Steel, PEB, or RCC)',
    ],
  },
  {
    step: '02',
    title: 'DESIGN',
    subtitle: 'ENGINEERING MODELING & DETAILING',
    description:
      'Develop 3D structural analytical models, rigorous load calculations, and meticulous fabrication/reinforcement detailing that eliminate ambiguity for fabricators and site teams.',
    focusAreas: [
      'Full 3D finite element load simulations',
      'Member sizing & structural optimization',
      'Bolted/welded connection design & plate detailing',
      'Comprehensive Issued-for-Construction (IFC) drawings',
    ],
  },
  {
    step: '03',
    title: 'ESTIMATE',
    subtitle: 'QUANTITY TAKE-OFF & COST PLANNING',
    description:
      'Extract exact structural quantities, steel tonnage, rebar schedules, and concrete volumes to produce reliable Bills of Quantities (BOQ) that safeguard against budgetary surprises.',
    focusAreas: [
      'Itemized Bill of Quantities (BOQ)',
      'Structural steel tonnage take-offs',
      'Rebar bar bending schedule (BBS) quantification',
      'Material procurement schedules & cost planning',
    ],
  },
  {
    step: '04',
    title: 'EXECUTE',
    subtitle: 'CONSTRUCTION & FABRICATION COORDINATION',
    description:
      'Coordinate construction activities, fabricators, and site personnel to ensure that erection sequences, tolerances, and structural alignments strictly match the engineered drawings.',
    focusAreas: [
      'Shop drawing review & RFIs resolution',
      'Erection sequencing & heavy lift coordination',
      'Foundation anchor bolt alignment verification',
      'Site problem-solving for unexpected field conditions',
    ],
  },
  {
    step: '05',
    title: 'DELIVER',
    subtitle: 'QUALITY ASSURANCE & PROJECT HANDOVER',
    description:
      'Support systematic quality verification, milestone progress tracking, and complete documentation handover according to the agreed contract scope.',
    focusAreas: [
      'Quality checklist verification against design codes',
      'Milestone audit reports & completion logs',
      'As-built record drawing consolidation',
      'Structural handover documentation for asset owners',
    ],
  },
];
