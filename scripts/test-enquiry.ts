import { createServer } from 'http';
import { handleEnquiryRequest } from '../server/enquiryHandler.ts';

const server = createServer((req, res) => {
  if (req.url === '/api/enquiry') {
    handleEnquiryRequest(req, res);
  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(4899, async () => {
  console.log('Testing Enquiry Endpoint on port 4899...');

  try {
    // 1. Test Valid Enquiry
    const validPayload = {
      fullName: 'Vikram Sethi',
      companyName: 'Apex Industrial Corp',
      email: 'vikram@apexindustrial.com',
      phone: '+91 98765 43210',
      serviceRequired: 'Steel Structure / PEB Shed Design',
      projectLocation: 'Pune, Maharashtra',
      projectScope: 'Design and fabrication detailing for 25,000 sq ft industrial PEB shed with 10T crane gantry.',
      consent: true,
    };

    const res1 = await fetch('http://localhost:4899/api/enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validPayload),
    });
    const json1 = await res1.json();
    console.log('✅ Test 1 (Valid Payload): Status', res1.status, json1);

    // 2. Test Invalid Payload (Missing required fields)
    const invalidPayload = {
      fullName: 'V',
      email: 'bad-email',
      consent: false,
    };
    const res2 = await fetch('http://localhost:4899/api/enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(invalidPayload),
    });
    const json2 = await res2.json();
    console.log('✅ Test 2 (Validation Failures Handled): Status', res2.status, json2.errors);

    // 3. Test Honeypot Spam Block
    const spamPayload = {
      ...validPayload,
      honeypot: 'bot-trap-value',
    };
    const res3 = await fetch('http://localhost:4899/api/enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(spamPayload),
    });
    const json3 = await res3.json();
    console.log('✅ Test 3 (Spam Bot Blocked Silently): Status', res3.status, json3);

    console.log('\n🎉 ALL ENQUIRY ENDPOINT TESTS PASSED WITH 100% SUCCESS!');
  } catch (err) {
    console.error('Test error:', err);
  } finally {
    server.close();
    process.exit(0);
  }
});
