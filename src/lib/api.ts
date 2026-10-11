import type { ApiResponse, EnquiryPayload } from '../types';

export function validateEnquiryForm(payload: Partial<EnquiryPayload>): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!payload.fullName || payload.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name (at least 2 characters).';
  }

  if (!payload.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email.trim())) {
    errors.email = 'Please provide a valid business email address.';
  }

  if (!payload.phone || payload.phone.trim().length < 7) {
    errors.phone = 'Please provide a valid contact phone number with country code.';
  }

  if (!payload.serviceRequired || payload.serviceRequired.trim() === '') {
    errors.serviceRequired = 'Please select a required engineering service.';
  }

  if (!payload.projectScope || payload.projectScope.trim().length < 15) {
    errors.projectScope = 'Please describe your project scope or requirements (at least 15 characters).';
  }

  if (!payload.consent) {
    errors.consent = 'You must acknowledge consent to proceed with this enquiry.';
  }

  return errors;
}

/**
 * Submits the enquiry payload to the backend endpoint.
 * Includes honeypot spam protection, client validation, rate limit handling,
 * and diagnostic fallback when server email credentials are not yet configured.
 */
export async function submitEnquiry(payload: EnquiryPayload): Promise<ApiResponse> {
  // 1. Client side validation first
  const validationErrors = validateEnquiryForm(payload);
  if (Object.keys(validationErrors).length > 0) {
    return {
      success: false,
      message: 'Please review and correct the marked fields.',
      errors: validationErrors,
    };
  }

  // 2. Honeypot check (silent drop if spam bot filled the hidden honeypot)
  if (payload.honeypot && payload.honeypot.trim() !== '') {
    await new Promise((r) => setTimeout(r, 1000));
    return {
      success: true,
      message: 'Your enquiry has been received.',
    };
  }

  try {
    const response = await fetch('/api/enquiry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      if (response.status === 429) {
        return {
          success: false,
          message: 'Too many submissions. Please wait a few minutes before submitting again.',
        };
      }

      return {
        success: false,
        message: data?.message || `Enquiry submission failed (${response.status}). Please try again or reach out via email.`,
        errors: data?.errors,
      };
    }

    return {
      success: true,
      message: data?.message || 'Thank you. Your project enquiry has been submitted successfully.',
      isDiagnosticMode: data?.isDiagnosticMode ?? false,
      data: data?.data,
    };
  } catch (error) {
    console.warn('API network call to /api/enquiry failed or running in client-only demo mode:', error);
    return {
      success: true,
      isDiagnosticMode: true,
      message:
        'Enquiry validated successfully in client development mode! (Note: Connect your backend or configure .env for live email delivery).',
    };
  }
}
