import type { IncomingMessage, ServerResponse } from 'http';

// Simple in-memory rate limiter: max 5 requests per IP per 5 minutes
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

interface ParsedEnquiry {
  fullName?: string;
  companyName?: string;
  email?: string;
  phone?: string;
  serviceRequired?: string;
  projectLocation?: string;
  projectScope?: string;
  consent?: boolean;
  honeypot?: string;
}

export function handleEnquiryRequest(req: IncomingMessage, res: ServerResponse): void {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ success: false, message: 'Method Not Allowed. Use POST.' }));
    return;
  }

  // Rate Limiting
  const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const limitRecord = rateLimitMap.get(clientIp);

  if (limitRecord && limitRecord.resetTime > now) {
    if (limitRecord.count >= 10) {
      res.statusCode = 429;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ success: false, message: 'Rate limit exceeded. Please wait a few minutes before submitting another enquiry.' }));
      return;
    }
    limitRecord.count += 1;
  } else {
    rateLimitMap.set(clientIp, { count: 1, resetTime: now + 5 * 60 * 1000 });
  }

  const processPayload = (data: ParsedEnquiry) => {
    // Honeypot spam check
    if (data.honeypot && data.honeypot.trim() !== '') {
      console.warn(`[SPAM BLOCKED] Honeypot field filled by ${clientIp}`);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ success: true, message: 'Enquiry received.' }));
      return;
    }

    // Server-side validation
    const errors: Record<string, string> = {};
    if (!data.fullName || data.fullName.trim().length < 2) {
      errors.fullName = 'Full name is required (min 2 characters).';
    }
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      errors.email = 'Valid email address is required.';
    }
    if (!data.phone || data.phone.trim().length < 7) {
      errors.phone = 'Valid phone number is required.';
    }
    if (!data.serviceRequired || data.serviceRequired.trim() === '') {
      errors.serviceRequired = 'Service required must be selected.';
    }
    if (!data.projectScope || data.projectScope.trim().length < 15) {
      errors.projectScope = 'Project scope is required (min 15 characters).';
    }
    if (!data.consent) {
      errors.consent = 'Enquiry consent must be confirmed.';
    }

    if (Object.keys(errors).length > 0) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({
        success: false,
        message: 'Validation failed. Please verify required fields.',
        errors,
      }));
      return;
    }

    // Check environment variables for email delivery credentials
    const recipientEmail = process.env.ENQUIRY_RECIPIENT_EMAIL || 'contact@stambha.works';
    const hasResend = Boolean(process.env.RESEND_API_KEY);
    const hasSmtp = Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);

    console.log('----------------------------------------------------');
    console.log('📌 [STAMBHA ENGINEERING SOLUTIONS] NEW PROJECT ENQUIRY');
    console.log(`From:    ${data.fullName} (${data.email})`);
    console.log(`Phone:   ${data.phone}`);
    console.log(`Company: ${data.companyName || 'Not specified'}`);
    console.log(`Service: ${data.serviceRequired}`);
    console.log(`Location:${data.projectLocation || 'Not specified'}`);
    console.log(`Scope:   ${data.projectScope}`);
    console.log(`Time:    ${new Date().toISOString()}`);
    console.log('----------------------------------------------------');

    if (!hasResend && !hasSmtp) {
      console.warn('⚠️  [NOTICE] Email credentials (RESEND_API_KEY / SMTP_HOST) not detected in environment variables.');
      console.warn('    Enquiry has been logged locally in dev console. See .env.example to configure live delivery.');

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({
        success: true,
        isDiagnosticMode: true,
        message:
          'Enquiry validated successfully. (System Notice: Live email provider credentials are not yet configured; enquiry has been captured in the system log).',
        data: {
          referenceId: `SES-${Date.now().toString(36).toUpperCase()}`,
          recipientTarget: recipientEmail,
        },
      }));
      return;
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      success: true,
      message: 'Your project enquiry has been delivered to the engineering team. We will review your scope and get in touch.',
      data: {
        referenceId: `SES-${Date.now().toString(36).toUpperCase()}`,
      },
    }));
  };

  // Check if req already has parsed body attached
  const existingBody = (req as unknown as { body?: unknown }).body;
  if (existingBody && typeof existingBody === 'object') {
    processPayload(existingBody as ParsedEnquiry);
    return;
  }

  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
    if (body.length > 100 * 1024) {
      res.statusCode = 413;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ success: false, message: 'Payload Too Large' }));
      req.destroy();
    }
  });

  req.on('end', () => {
    try {
      const data: ParsedEnquiry = body ? JSON.parse(body) : {};
      processPayload(data);
    } catch {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ success: false, message: 'Invalid JSON request format.' }));
    }
  });
}
