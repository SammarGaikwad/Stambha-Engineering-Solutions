import React, { useState } from 'react';
import {
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  Mail,
  Phone,
  MessageSquare,
  ShieldCheck,
  Info,
} from 'lucide-react';
import { serviceDropdownOptions, companyConfig } from '../data/company';
import { submitEnquiry } from '../lib/api';
import type { EnquiryPayload } from '../types';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<EnquiryPayload>({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    serviceRequired: '',
    projectLocation: '',
    projectScope: '',
    consent: false,
    honeypot: '', // Hidden anti-spam trap
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<{
    success: boolean;
    message: string;
    isDiagnosticMode?: boolean;
    referenceId?: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: val,
    }));

    // Clear error for that field
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmissionStatus(null);
    setFieldErrors({});

    const result = await submitEnquiry(formData);

    setIsSubmitting(false);

    if (result.success) {
      setSubmissionStatus({
        success: true,
        message: result.message,
        isDiagnosticMode: result.isDiagnosticMode,
        referenceId: (result.data as { referenceId?: string })?.referenceId,
      });

      // Reset form
      setFormData({
        fullName: '',
        companyName: '',
        email: '',
        phone: '',
        serviceRequired: '',
        projectLocation: '',
        projectScope: '',
        consent: false,
        honeypot: '',
      });
    } else {
      setSubmissionStatus({
        success: false,
        message: result.message,
      });
      if (result.errors) {
        setFieldErrors(result.errors);
      }
    }
  };

  return (
    <section
      id="contact"
      className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-[#232A2F]/80"
    >
      {/* Background CAD grid */}
      <div className="absolute inset-0 -z-10 bg-cad-grid opacity-20 pointer-events-none" />

      {/* Section Tag */}
      <div className="flex items-center gap-3 sm:gap-4 mb-10 sm:mb-16">
        <span className="font-technical text-xs uppercase tracking-[0.25em] text-[#C49A62]">
          [ 08 // CONTACT & ENQUIRY ]
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-[#2E373E] to-transparent" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
        {/* Left Column: Context, Disclaimers, Official Channels */}
        <div className="lg:col-span-5 space-y-6 sm:space-y-8">
          <div>
            <h2 className="font-display font-extrabold text-2xl xs:text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-[#F3F1EB] leading-tight">
              DISCUSS YOUR PROJECT.
            </h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-[#A7ACAE] leading-relaxed">
              Submit your project scope, drawing stages, or structural estimation requirements.
              Our engineering team reviews inquiries to define feasible scope deliverables and initial technical consultations.
            </p>
          </div>

          {/* Official Contact Channels */}
          <div className="space-y-3.5 sm:space-y-4 pt-4 border-t border-[#232A2F]">
            <a
              href={`mailto:${companyConfig.emailPlaceholder}`}
              className="group flex items-start gap-3 sm:gap-3.5 p-3.5 sm:p-4 rounded bg-[#14181B] border border-[#232A2F] hover:border-[#C49A62]/60 hover:bg-[#161B1E] transition-all"
            >
              <Mail size={18} className="text-[#C49A62] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
              <div className="min-w-0">
                <div className="font-technical text-[10px] uppercase tracking-wider text-[#A7ACAE]">
                  CONSULTATION DESK
                </div>
                <div className="text-sm font-semibold text-[#F3F1EB] group-hover:text-[#C49A62] transition-colors mt-0.5 truncate">
                  {companyConfig.emailPlaceholder}
                </div>
                <div className="text-[10px] text-[#A7ACAE]/80 mt-1">
                  Click to email project scope & drawings
                </div>
              </div>
            </a>

            <a
              href={`tel:${companyConfig.phonePlaceholder.replace(/\s+/g, '')}`}
              className="group flex items-start gap-3 sm:gap-3.5 p-3.5 sm:p-4 rounded bg-[#14181B] border border-[#232A2F] hover:border-[#C49A62]/60 hover:bg-[#161B1E] transition-all"
            >
              <Phone size={18} className="text-[#C49A62] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
              <div className="min-w-0">
                <div className="font-technical text-[10px] uppercase tracking-wider text-[#A7ACAE]">
                  DIRECT LINE
                </div>
                <div className="text-sm font-semibold text-[#F3F1EB] group-hover:text-[#C49A62] transition-colors mt-0.5 truncate">
                  {companyConfig.phonePlaceholder}
                </div>
                <div className="text-[10px] text-[#A7ACAE]/80 mt-1">
                  Click to speak directly with our engineering desk
                </div>
              </div>
            </a>

            {/* WhatsApp Integration Status */}
            <a
              href={`https://wa.me/${companyConfig.whatsappNumber}?text=${encodeURIComponent(
                'Hello Stambha Engineering Solutions, I would like to discuss a structural engineering project.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-3 sm:gap-3.5 p-3.5 sm:p-4 rounded bg-[#14181B] border border-[#232A2F] hover:border-[#C49A62]/60 hover:bg-[#161B1E] transition-all"
            >
              <MessageSquare size={18} className="text-[#C49A62] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
              <div className="min-w-0">
                <div className="font-technical text-[10px] uppercase tracking-wider text-[#A7ACAE]">
                  WHATSAPP DIRECT ENQUIRY
                </div>
                <div className="text-sm font-semibold text-[#F3F1EB] group-hover:text-[#C49A62] transition-colors mt-0.5 flex items-center gap-2 flex-wrap">
                  <span>Chat on WhatsApp</span>
                  <span className="px-1.5 py-0.5 rounded bg-[#C49A62]/20 border border-[#C49A62]/40 text-[9px] font-technical text-[#C49A62]">
                    ACTIVE
                  </span>
                </div>
                <div className="text-[10px] text-[#A7ACAE]/80 mt-1">
                  Instant response for preliminary site & scope review
                </div>
              </div>
            </a>
          </div>

          {/* Privacy & Anti-Spam Commitment */}
          <div className="p-3.5 sm:p-4 rounded bg-[#101315] border border-white/[0.06] flex items-start gap-3 text-xs text-[#A7ACAE] leading-relaxed">
            <ShieldCheck size={18} className="text-[#C49A62] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#F3F1EB]">Data Integrity:</strong> Your project requirements
              are strictly evaluated for structural scope assessment and never shared with unauthorized third parties.
            </div>
          </div>
        </div>

        {/* Right Column: Functional Contact Form */}
        <div className="lg:col-span-7">
          <div className="rounded-lg border border-[#2E373E] bg-[#14181B] p-4 sm:p-6 md:p-10 shadow-2xl relative">
            {/* Header */}
            <div className="pb-4 sm:pb-6 border-b border-[#232A2F] mb-6 sm:mb-8">
              <h3 className="font-display font-bold text-lg sm:text-xl md:text-2xl text-[#F3F1EB] uppercase tracking-tight">
                PROJECT ENQUIRY FORM
              </h3>
              <p className="mt-1 text-xs text-[#A7ACAE]">
                All fields marked with <span className="text-[#C49A62]">*</span> are required for engineering scope evaluation.
              </p>
            </div>

            {/* Success Message Banner */}
            {submissionStatus && submissionStatus.success && (
              <div className="mb-6 sm:mb-8 p-4 sm:p-5 rounded bg-[#101315] border border-[#C49A62] space-y-3">
                <div className="flex items-center gap-3 text-[#C49A62]">
                  <CheckCircle size={20} />
                  <span className="font-technical text-sm font-bold uppercase tracking-wider">
                    Enquiry Submitted Successfully
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#F3F1EB] leading-relaxed">
                  {submissionStatus.message}
                </p>
                {submissionStatus.referenceId && (
                  <div className="font-technical text-xs text-[#A7ACAE]">
                    REFERENCE ID: <span className="text-[#C49A62]">{submissionStatus.referenceId}</span>
                  </div>
                )}
                {submissionStatus.isDiagnosticMode && (
                  <div className="p-3 rounded bg-[#161B1E] border border-white/[0.08] text-[11px] text-[#A7ACAE] flex items-start gap-2">
                    <Info size={14} className="text-[#C49A62] shrink-0 mt-0.5" />
                    <span>
                      <strong>Developer Note:</strong> Live email dispatch credentials (RESEND_API_KEY or SMTP)
                      are pending configuration in <code>.env</code>. The full enquiry payload was logged to the server terminal.
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Error Message Banner */}
            {submissionStatus && !submissionStatus.success && (
              <div className="mb-6 sm:mb-8 p-3.5 sm:p-4 rounded bg-[#101315] border border-red-500/60 flex items-start gap-3">
                <AlertCircle size={20} className="text-red-400 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-red-200 leading-relaxed">
                  {submissionStatus.message}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-6">
              {/* Anti-spam honeypot (invisible to humans) */}
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={handleChange}
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />

              {/* Row 1: Full Name & Company Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block font-technical text-xs uppercase tracking-wider text-[#F3F1EB] mb-1.5 sm:mb-2"
                  >
                    Full Name <span className="text-[#C49A62]">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Rajesh Sharma"
                    className={`w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded bg-[#101315] border text-base sm:text-sm text-[#F3F1EB] placeholder-[#686F72] focus:outline-none focus:ring-1 focus:ring-[#C49A62] transition-colors ${
                      fieldErrors.fullName ? 'border-red-500' : 'border-[#232A2F] focus:border-[#C49A62]'
                    }`}
                  />
                  {fieldErrors.fullName && (
                    <p className="mt-1.5 text-xs text-red-400 font-technical">
                      {fieldErrors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="companyName"
                    className="block font-technical text-xs uppercase tracking-wider text-[#A7ACAE] mb-1.5 sm:mb-2"
                  >
                    Company Name <span className="text-[10px] text-[#A7ACAE]/60">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="e.g. Apex Industrial Infrastructure"
                    className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded bg-[#101315] border border-[#232A2F] text-base sm:text-sm text-[#F3F1EB] placeholder-[#686F72] focus:outline-none focus:border-[#C49A62] focus:ring-1 focus:ring-[#C49A62] transition-colors"
                  />
                </div>
              </div>

              {/* Row 2: Email & Phone Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block font-technical text-xs uppercase tracking-wider text-[#F3F1EB] mb-1.5 sm:mb-2"
                  >
                    Email Address <span className="text-[#C49A62]">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                    className={`w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded bg-[#101315] border text-base sm:text-sm text-[#F3F1EB] placeholder-[#686F72] focus:outline-none focus:ring-1 focus:ring-[#C49A62] transition-colors ${
                      fieldErrors.email ? 'border-red-500' : 'border-[#232A2F] focus:border-[#C49A62]'
                    }`}
                  />
                  {fieldErrors.email && (
                    <p className="mt-1.5 text-xs text-red-400 font-technical">
                      {fieldErrors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block font-technical text-xs uppercase tracking-wider text-[#F3F1EB] mb-1.5 sm:mb-2"
                  >
                    Phone Number <span className="text-[#C49A62]">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className={`w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded bg-[#101315] border text-base sm:text-sm text-[#F3F1EB] placeholder-[#686F72] focus:outline-none focus:ring-1 focus:ring-[#C49A62] transition-colors ${
                      fieldErrors.phone ? 'border-red-500' : 'border-[#232A2F] focus:border-[#C49A62]'
                    }`}
                  />
                  {fieldErrors.phone && (
                    <p className="mt-1.5 text-xs text-red-400 font-technical">
                      {fieldErrors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* Row 3: Service Required & Project Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label
                    htmlFor="serviceRequired"
                    className="block font-technical text-xs uppercase tracking-wider text-[#F3F1EB] mb-1.5 sm:mb-2"
                  >
                    Service Required <span className="text-[#C49A62]">*</span>
                  </label>
                  <select
                    id="serviceRequired"
                    name="serviceRequired"
                    required
                    value={formData.serviceRequired}
                    onChange={handleChange}
                    className={`w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded bg-[#101315] border text-base sm:text-sm text-[#F3F1EB] focus:outline-none focus:ring-1 focus:ring-[#C49A62] transition-colors ${
                      fieldErrors.serviceRequired ? 'border-red-500' : 'border-[#232A2F] focus:border-[#C49A62]'
                    }`}
                  >
                    <option value="" disabled className="bg-[#101315] text-[#686F72]">
                      Select Required Service
                    </option>
                    {serviceDropdownOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-[#14181B] text-[#F3F1EB]">
                        {opt}
                      </option>
                    ))}
                  </select>
                  {fieldErrors.serviceRequired && (
                    <p className="mt-1.5 text-xs text-red-400 font-technical">
                      {fieldErrors.serviceRequired}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="projectLocation"
                    className="block font-technical text-xs uppercase tracking-wider text-[#A7ACAE] mb-1.5 sm:mb-2"
                  >
                    Project Location <span className="text-[10px] text-[#A7ACAE]/60">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    id="projectLocation"
                    name="projectLocation"
                    value={formData.projectLocation}
                    onChange={handleChange}
                    placeholder="City, State or Industrial Zone"
                    className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded bg-[#101315] border border-[#232A2F] text-base sm:text-sm text-[#F3F1EB] placeholder-[#686F72] focus:outline-none focus:border-[#C49A62] focus:ring-1 focus:ring-[#C49A62] transition-colors"
                  />
                </div>
              </div>

              {/* Project Scope / Requirements */}
              <div>
                <label
                  htmlFor="projectScope"
                  className="block font-technical text-xs uppercase tracking-wider text-[#F3F1EB] mb-1.5 sm:mb-2"
                >
                  Estimated Project Scope or Requirements <span className="text-[#C49A62]">*</span>
                </label>
                <textarea
                  id="projectScope"
                  name="projectScope"
                  required
                  rows={4}
                  value={formData.projectScope}
                  onChange={handleChange}
                  placeholder="Outline key structural details (e.g. PEB warehouse footprint, clear height, crane capacity, RCC multi-storey levels, or BOQ estimation timeline)..."
                  className={`w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded bg-[#101315] border text-base sm:text-sm text-[#F3F1EB] placeholder-[#686F72] focus:outline-none focus:ring-1 focus:ring-[#C49A62] transition-colors resize-y ${
                    fieldErrors.projectScope ? 'border-red-500' : 'border-[#232A2F] focus:border-[#C49A62]'
                  }`}
                />
                {fieldErrors.projectScope && (
                  <p className="mt-1.5 text-xs text-red-400 font-technical">
                    {fieldErrors.projectScope}
                  </p>
                )}
              </div>

              {/* Consent Checkbox */}
              <div>
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 rounded border-[#232A2F] bg-[#101315] text-[#C49A62] focus:ring-1 focus:ring-[#C49A62] accent-[#C49A62] shrink-0"
                  />
                  <span className="text-xs text-[#A7ACAE] leading-relaxed">
                    I acknowledge and consent that the information provided will be handled by
                    Stambha Engineering Solutions exclusively for the purpose of reviewing and responding
                    to this structural engineering enquiry.{' '}
                    <span className="text-[#C49A62]">*</span>
                  </span>
                </label>
                {fieldErrors.consent && (
                  <p className="mt-1.5 text-xs text-red-400 font-technical ml-7">
                    {fieldErrors.consent}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full min-h-[48px] inline-flex items-center justify-center gap-3 py-3.5 sm:py-4 px-6 text-xs font-technical uppercase tracking-[0.22em] font-semibold bg-[#C49A62] text-[#101315] hover:bg-[#D6AF79] disabled:opacity-60 disabled:cursor-not-allowed transition-all rounded duration-200 shadow-lg shadow-[#C49A62]/10 focus:outline-none focus:ring-2 focus:ring-[#C49A62]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin shrink-0" />
                      <span>Validating & Dispatching...</span>
                    </>
                  ) : (
                    <>
                      <span>Transmit Project Enquiry</span>
                      <Send size={15} className="shrink-0" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
