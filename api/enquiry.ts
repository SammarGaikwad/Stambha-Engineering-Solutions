import type { IncomingMessage, ServerResponse } from 'http';
import { handleEnquiryRequest } from '../server/enquiryHandler';

// Exported handler for Vercel Serverless Functions
export default function handler(req: IncomingMessage, res: ServerResponse) {
  return handleEnquiryRequest(req, res);
}
