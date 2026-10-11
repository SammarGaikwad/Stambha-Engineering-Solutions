# STAMBHA ENGINEERING SOLUTIONS
### Structural Engineering Consultancy & Construction Management

> **BUILT ON PRECISION. ENGINEERED TO LAST.**  
> A cinematic, editorial web experience engineered with React, TypeScript, Tailwind CSS, GSAP, and Three.js.

---

## 🏗️ Overview

**Stambha Engineering Solutions** is a structural engineering consultancy delivering steel structure design & detailing, PEB shed engineering, RCC building analysis, quantity estimation, and comprehensive construction management.

The website is crafted with architectural minimalism, deep graphite & charcoal atmospheres (`#101315`, `#191D20`), construction bronze accents (`#C49A62`), and high-performance interactive 3D engineering models.

---

## 🛠️ Technology Stack

- **Frontend Core:** React 19, TypeScript, Vite
- **Styling:** Tailwind CSS with custom CAD drafting tokens & design system
- **Motion & Storytelling:** GSAP & ScrollTrigger with prefers-reduced-motion accessibility
- **3D Visualization:** Lightweight Three.js interactive portal frame & space truss model with stress color mapping
- **Icons:** Lucide React
- **Enquiry Dispatch:** Integrated API endpoint (`/api/enquiry`) with validation, rate limiting, anti-spam honeypot, and configurable email provider dispatchers (Resend / SMTP)

---

## 📂 Project Structure

```text
Stambha Engineering Solutions/
├── api/
│   └── enquiry.ts               # Vercel / serverless function handler
├── server/
│   └── enquiryHandler.ts        # Node/Express/Vite middleware for /api/enquiry
├── src/
│   ├── components/
│   │   ├── Navbar.tsx           # Sticky desktop header & wordmark
│   │   ├── MobileMenu.tsx       # Accessible mobile overlay drawer
│   │   ├── Hero.tsx             # Section 1: Cinematic hero with CAD crosshairs
│   │   ├── BrandStatement.tsx   # Section 2: Editorial typographic philosophy
│   │   ├── Services.tsx         # Section 3: 6 core engineering disciplines
│   │   ├── ServiceCard.tsx      # Reusable service card with scope modal
│   │   ├── Process.tsx          # Section 4: 5-stage sequential methodology
│   │   ├── ProjectGallery.tsx   # Section 5: Filterable demonstration portfolio
│   │   ├── ProjectCard.tsx      # Reusable portfolio card with demo badge
│   │   ├── ProjectModal.tsx     # Deep structural specification inspector
│   │   ├── StructuralPlanning.tsx # Section 6: Precision, Coordination, Execution
│   │   ├── StructuralTrussViewer.tsx # Interactive 3D Three.js steel truss
│   │   ├── CallToAction.tsx     # Section 7: Dramatic consultation CTA
│   │   ├── ContactForm.tsx      # Section 8: Validated enquiry form with honeypot
│   │   ├── Footer.tsx           # Section 9: Wordmark, verified links, legal
│   │   ├── PrivacyModal.tsx     # Privacy Policy modal dialog
│   │   └── CustomCursor.tsx     # Desktop architectural reticle cursor
│   ├── data/
│   │   ├── company.ts           # Company configuration, placeholders & WhatsApp toggle
│   │   ├── services.ts          # Complete deliverables & descriptions for all 6 services
│   │   ├── projects.ts          # Replaceable project portfolio data
│   │   └── approach.ts          # The 5 methodology stages & focus points
│   ├── lib/
│   │   └── api.ts               # Client-side validation & enquiry submission
│   ├── types/
│   │   └── index.ts             # TypeScript interfaces
│   ├── App.tsx                  # Master page assembly
│   ├── index.css                # Base drafting utilities & design tokens
│   └── main.tsx                 # React entry point
├── .env.example                 # Environment variable templates
├── tailwind.config.js           # Design system color palette & fonts
└── vite.config.ts               # Vite configuration with API middleware & code splitting
```

---

## 🚀 Getting Started

### 1. Installation
```bash
npm install
```

### 2. Run Locally in Development Mode
```bash
npm run dev
```
Visit `http://localhost:5173` in your browser. The Vite development server includes built-in middleware handling `POST /api/enquiry`.

### 3. Production Build & Type Checking
```bash
npm run build
```
Generates an optimized, minified production bundle in `dist/` with automated code-splitting for Three.js and GSAP.

### 4. Preview Production Build
```bash
npm run preview
```

### 5. Test Enquiry Endpoint
```bash
npx tsx scripts/test-enquiry.ts
```

---

## ⚙️ Configuration & Content Customization

### 1. Company Information & Contact Channels
Edit `src/data/company.ts`:
- **Email & Phone:** Replace `emailPlaceholder` and `phonePlaceholder` with genuine business credentials.
- **WhatsApp Direct Link:** Set `whatsappNumber: '919876543210'` (country code + number) once the official company WhatsApp business number is confirmed. Leaving it as `null` ensures no unverified number is shown.

### 2. Replacing Sample Portfolio Projects
Edit `src/data/projects.ts`:
Every project card is explicitly configured with technical fields:
- `title`
- `category` ('Steel Structures' | 'PEB Sheds' | 'RCC Buildings' | 'Industrial Construction')
- `image` (URL or local asset in `/src/assets`)
- `scopeOverview`
- `keyDetails` (Structural Type, Design Scope, Detailing Standard, Deliverable Type)

### 3. Updating Services & Deliverables
Edit `src/data/services.ts` to customize any of the 6 core services and their respective contract deliverables.

---

## ✉️ Enquiry Delivery & Environment Variables

Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Available variables:
```ini
# Recipient Email for Client Project Enquiries
ENQUIRY_RECIPIENT_EMAIL="consult@stambhaengineering.com"

# OPTION A: RESEND API (Recommended)
RESEND_API_KEY="re_123456789"

# OPTION B: SMTP CREDENTIALS (Alternative)
SMTP_HOST="smtp.example.com"
SMTP_PORT=587
SMTP_USER="user@example.com"
SMTP_PASS="password"
SMTP_FROM="Stambha Portal <noreply@stambhaengineering.com>"
```

> **Developer Note on Diagnostic Mode:**  
> If email credentials are not yet configured in `.env`, the system runs in transparent Diagnostic Mode. All enquiries are validated, logged to the server terminal, and given a reference ID (e.g., `SES-XXXXXX`) rather than silently failing.

---

## 🌐 Deployment

### Vercel
This repository is configured out of the box for Vercel deployment:
- `api/enquiry.ts` serves as the serverless function.
- In Vercel Project Settings, add `ENQUIRY_RECIPIENT_EMAIL` and `RESEND_API_KEY`.

### Netlify / Node VPS / Docker
Run `npm run build` to serve the static frontend bundle from `dist/`, and host `server/enquiryHandler.ts` behind any Node.js HTTP server.

---

## ⚖️ License & Integrity
All content and structural schematics are designed for **Stambha Engineering Solutions**. No unsupported credentials or fabricated statistics are included.
