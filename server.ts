import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const isProd = process.env.NODE_ENV === 'production';

// Ensure data directory exists
const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const ENQUIRIES_FILE = path.join(DATA_DIR, 'enquiries.json');
const CONFIG_FILE = path.join(DATA_DIR, 'config.json');

// Helper for atomic file read/write
function readJsonFile<T>(filePath: string, defaultValue: T): T {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(defaultValue, null, 2), 'utf-8');
      return defaultValue;
    }
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
    return defaultValue;
  }
}

function writeJsonFile<T>(filePath: string, data: T): void {
  try {
    const tempPath = `${filePath}.tmp.${Date.now()}`;
    fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), 'utf-8');
    fs.renameSync(tempPath, filePath);
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err);
  }
}

// Security & Password Helpers
const ADMIN_PASSWORD_ENV = process.env.ADMIN_PASSWORD || 'AbidiWebStudio2026!';
const SESSION_SECRET = process.env.SESSION_SECRET || 'abidi-secure-session-key-2026';

// In-memory active tokens with expiry (24 hours)
const activeSessions = new Map<string, { username: string; expiresAt: number }>();

function generateToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

// Basic rate limiting for enquiry submission
const submissionRateLimit = new Map<string, { count: number; resetAt: number }>();

function sanitizeString(input: unknown): string {
  if (typeof input !== 'string') return '';
  return input.trim().replace(/<[^>]*>?/gm, '');
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Middleware: Express json parser
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// Auth Middleware
function requireAdminAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing or malformed token' });
  }

  const token = authHeader.split(' ')[1];
  const session = activeSessions.get(token);

  if (!session || session.expiresAt < Date.now()) {
    if (session) activeSessions.delete(token);
    return res.status(401).json({ error: 'Unauthorized: Session expired or invalid' });
  }

  (req as any).user = session.username;
  next();
}

// ---------------- API ROUTES ----------------

// 1. Submit Project Enquiry
app.post('/api/enquiries', (req: Request, res: Response) => {
  const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';
  const now = Date.now();

  // Rate Limiter: max 5 requests per 10 minutes per IP
  const rateRecord = submissionRateLimit.get(ip) || { count: 0, resetAt: now + 10 * 60 * 1000 };
  if (now > rateRecord.resetAt) {
    rateRecord.count = 0;
    rateRecord.resetAt = now + 10 * 60 * 1000;
  }
  rateRecord.count += 1;
  submissionRateLimit.set(ip, rateRecord);

  if (rateRecord.count > 5) {
    return res.status(429).json({
      error: 'Too many submissions. Please wait a few minutes or reach out directly on WhatsApp at +92 329 3171559.',
    });
  }

  // Honeypot check
  if (req.body._website_hp) {
    return res.status(400).json({ error: 'Bot submission detected.' });
  }

  const fullName = sanitizeString(req.body.fullName);
  const businessName = sanitizeString(req.body.businessName);
  const email = sanitizeString(req.body.email);
  const country = sanitizeString(req.body.country);
  const preferredContact = sanitizeString(req.body.preferredContact) || 'email';
  const whatsappNumber = sanitizeString(req.body.whatsappNumber);
  const websiteType = sanitizeString(req.body.websiteType);
  const industry = sanitizeString(req.body.industry);
  const projectBudget = sanitizeString(req.body.projectBudget);
  const desiredCompletionDate = sanitizeString(req.body.desiredCompletionDate);
  const existingWebsiteUrl = sanitizeString(req.body.existingWebsiteUrl);
  const projectDescription = sanitizeString(req.body.projectDescription);
  const additionalRequirements = sanitizeString(req.body.additionalRequirements);
  const privacyConsent = req.body.privacyConsent === true;

  const requiredServices: string[] = Array.isArray(req.body.requiredServices)
    ? req.body.requiredServices.map((s: any) => sanitizeString(s)).filter(Boolean)
    : [];

  // Validation
  if (!fullName || fullName.length < 2) {
    return res.status(400).json({ error: 'Please provide your full name.' });
  }
  if (!email || !validateEmail(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }
  if (!country) {
    return res.status(400).json({ error: 'Please select your country or region.' });
  }
  if (!websiteType) {
    return res.status(400).json({ error: 'Please select the website type you need.' });
  }
  if (!projectDescription || projectDescription.length < 10) {
    return res.status(400).json({ error: 'Please provide at least a brief summary of your project requirements.' });
  }
  if (!privacyConsent) {
    return res.status(400).json({ error: 'You must consent to the privacy policy to submit an enquiry.' });
  }

  const newEnquiry = {
    id: `enq_${Date.now()}_${crypto.randomBytes(3).toString('hex')}`,
    createdAt: new Date().toISOString(),
    fullName,
    businessName,
    email,
    country,
    preferredContact,
    whatsappNumber,
    websiteType,
    industry,
    requiredServices,
    projectBudget,
    desiredCompletionDate,
    existingWebsiteUrl,
    projectDescription,
    additionalRequirements,
    privacyConsent,
    status: 'New',
    internalNotes: [],
    ip,
  };

  const enquiries = readJsonFile<any[]>(ENQUIRIES_FILE, []);
  enquiries.unshift(newEnquiry);
  writeJsonFile(ENQUIRIES_FILE, enquiries);

  // Check SMTP configuration status honestly
  const smtpConfigured = Boolean(process.env.SMTP_HOST && process.env.SMTP_USER);

  return res.status(201).json({
    success: true,
    enquiryId: newEnquiry.id,
    emailServiceConfigured: smtpConfigured,
    message: smtpConfigured
      ? 'Your enquiry has been successfully delivered to Abidi Web Studio. We will contact you shortly.'
      : 'Your enquiry has been securely received and recorded. Founder Syed Hadi Abidi will review your requirements and respond via your preferred contact method.',
  });
});

// 2. Public Live Pricing / Config Endpoint
app.get('/api/config/pricing', (_req: Request, res: Response) => {
  const config = readJsonFile<any>(CONFIG_FILE, null);
  res.json({ success: true, customConfig: config });
});

// 3. Admin Authentication: Login
app.post('/api/admin/login', (req: Request, res: Response) => {
  const password = req.body.password;

  if (!password || typeof password !== 'string') {
    return res.status(400).json({ error: 'Password is required' });
  }

  // Constant time comparison
  const expectedPassword = ADMIN_PASSWORD_ENV;
  const match = crypto.timingSafeEqual(
    Buffer.from(crypto.createHash('sha256').update(password).digest('hex')),
    Buffer.from(crypto.createHash('sha256').update(expectedPassword).digest('hex'))
  );

  if (!match) {
    return res.status(401).json({ error: 'Invalid administrative password' });
  }

  const token = generateToken();
  const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
  activeSessions.set(token, { username: 'admin', expiresAt });

  res.json({
    success: true,
    token,
    expiresAt,
    user: 'Syed Hadi Abidi (Admin)',
  });
});

// 4. Admin Auth: Verify Session
app.get('/api/admin/verify', requireAdminAuth, (_req: Request, res: Response) => {
  res.json({
    authenticated: true,
    user: 'Syed Hadi Abidi (Admin)',
    smtpConfigured: Boolean(process.env.SMTP_HOST && process.env.SMTP_USER),
  });
});

// 5. Admin Auth: Logout
app.post('/api/admin/logout', requireAdminAuth, (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    activeSessions.delete(token);
  }
  res.json({ success: true, message: 'Logged out successfully' });
});

// 6. Admin: Get Enquiries with filtering & search
app.get('/api/admin/enquiries', requireAdminAuth, (req: Request, res: Response) => {
  const { status, country, service, search } = req.query;
  let enquiries = readJsonFile<any[]>(ENQUIRIES_FILE, []);

  if (status && typeof status === 'string' && status !== 'all') {
    enquiries = enquiries.filter((e) => e.status === status);
  }
  if (country && typeof country === 'string' && country !== 'all') {
    enquiries = enquiries.filter((e) => e.country.toLowerCase() === country.toLowerCase());
  }
  if (service && typeof service === 'string' && service !== 'all') {
    enquiries = enquiries.filter(
      (e) => e.websiteType === service || (e.requiredServices && e.requiredServices.includes(service))
    );
  }
  if (search && typeof search === 'string') {
    const term = search.toLowerCase();
    enquiries = enquiries.filter(
      (e) =>
        e.fullName.toLowerCase().includes(term) ||
        (e.businessName && e.businessName.toLowerCase().includes(term)) ||
        e.email.toLowerCase().includes(term) ||
        e.projectDescription.toLowerCase().includes(term)
    );
  }

  res.json({
    success: true,
    total: enquiries.length,
    enquiries,
  });
});

// 7. Admin: Update Enquiry Status / Add Note
app.patch('/api/admin/enquiries/:id', requireAdminAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, note } = req.body;

  const validStatuses = ['New', 'Contacted', 'Qualified', 'In Progress', 'Won', 'Lost'];
  const enquiries = readJsonFile<any[]>(ENQUIRIES_FILE, []);
  const index = enquiries.findIndex((e) => e.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Enquiry not found' });
  }

  if (status) {
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    enquiries[index].status = status;
  }

  if (note && typeof note === 'string' && note.trim().length > 0) {
    if (!enquiries[index].internalNotes) {
      enquiries[index].internalNotes = [];
    }
    enquiries[index].internalNotes.push({
      timestamp: new Date().toISOString(),
      note: sanitizeString(note),
    });
  }

  writeJsonFile(ENQUIRIES_FILE, enquiries);
  res.json({ success: true, enquiry: enquiries[index] });
});

// 8. Admin: Delete Enquiry
app.delete('/api/admin/enquiries/:id', requireAdminAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  let enquiries = readJsonFile<any[]>(ENQUIRIES_FILE, []);
  const initialLength = enquiries.length;
  enquiries = enquiries.filter((e) => e.id !== id);

  if (enquiries.length === initialLength) {
    return res.status(404).json({ error: 'Enquiry not found' });
  }

  writeJsonFile(ENQUIRIES_FILE, enquiries);
  res.json({ success: true, message: 'Enquiry deleted' });
});

// 9. Admin: Export Leads (CSV or JSON)
app.get('/api/admin/export', requireAdminAuth, (req: Request, res: Response) => {
  const format = req.query.format === 'csv' ? 'csv' : 'json';
  const enquiries = readJsonFile<any[]>(ENQUIRIES_FILE, []);

  if (format === 'csv') {
    const headers = [
      'ID',
      'Date',
      'Full Name',
      'Business Name',
      'Email',
      'Country',
      'Preferred Contact',
      'WhatsApp Number',
      'Website Type',
      'Industry',
      'Budget',
      'Target Date',
      'Status',
    ];

    const rows = enquiries.map((e) => [
      `"${e.id}"`,
      `"${e.createdAt}"`,
      `"${(e.fullName || '').replace(/"/g, '""')}"`,
      `"${(e.businessName || '').replace(/"/g, '""')}"`,
      `"${e.email}"`,
      `"${e.country}"`,
      `"${e.preferredContact}"`,
      `"${e.whatsappNumber || ''}"`,
      `"${e.websiteType}"`,
      `"${e.industry}"`,
      `"${e.projectBudget}"`,
      `"${e.desiredCompletionDate}"`,
      `"${e.status}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=abidi-leads-${Date.now()}.csv`);
    return res.send(csvContent);
  }

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Disposition', `attachment; filename=abidi-leads-${Date.now()}.json`);
  return res.json(enquiries);
});

// 10. Admin: Get and Update Configuration
app.get('/api/admin/config', requireAdminAuth, (_req: Request, res: Response) => {
  const config = readJsonFile<any>(CONFIG_FILE, {});
  res.json({ success: true, config });
});

app.put('/api/admin/config', requireAdminAuth, (req: Request, res: Response) => {
  const newConfig = req.body;
  writeJsonFile(CONFIG_FILE, newConfig);
  res.json({ success: true, message: 'Configuration saved successfully', config: newConfig });
});

// Static assets serving - guarantees all images resolve in dev and production
const publicImagesPath = path.resolve(__dirname, 'public/images');
const srcImagesPath = path.resolve(__dirname, 'src/assets/images');
const publicPath = path.resolve(__dirname, 'public');

app.use('/images', express.static(publicImagesPath));
app.use('/src/assets/images', express.static(publicImagesPath));
app.use('/src/assets/images', express.static(srcImagesPath));
app.use(express.static(publicPath));

// ---------------- SERVER & VITE INTEGRATION ----------------
async function startServer() {
  if (!isProd) {
    // Development mode with Vite middleware
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });

    app.use(vite.middlewares);

    app.get('*', async (req, res, next) => {
      // Don't intercept API or image routes
      if (req.originalUrl.startsWith('/api') || req.originalUrl.startsWith('/images') || req.originalUrl.startsWith('/src/assets/images')) {
        return next();
      }
      try {
        const template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        const html = await vite.transformIndexHtml(req.originalUrl, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
      } catch (err) {
        vite.ssrFixStacktrace(err as Error);
        next(err);
      }
    });
  } else {
    // Production mode
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));

    app.get('*', (req, res, next) => {
      if (req.originalUrl.startsWith('/api') || req.originalUrl.startsWith('/images') || req.originalUrl.startsWith('/src/assets/images')) {
        return next();
      }
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Abidi Web Studio Server running at http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Fatal error starting server:', err);
  process.exit(1);
});
