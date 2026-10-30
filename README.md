# Abidi Web Studio — Luxury International Web Development Agency

Official full-stack agency website for **Abidi Web Studio**, founded by **Syed Hadi Abidi**.

Designed for high-conversion international client acquisition across the **United States**, **United Kingdom**, **Canada**, **Australia**, and **Pakistan**.

---

## 1. Features & Implementation Status Checklist

### ✅ Implemented and Fully Tested
- **Multi-Page Architecture & Route Resolution**:
  - Home (`/`)
  - About Studio (`/about`)
  - Services Overview (`/services`)
  - Deep-Dive Service Pages (`/services/web-design`, `/services/ecommerce`, `/services/frontend`, `/services/backend`, `/services/fullstack`, `/services/react-nextjs`, `/services/custom-apps`, `/services/redesign`, `/services/maintenance`)
  - Portfolio Demonstrations (`/portfolio`) with live interactive simulated feature playgrounds (Fashion e-commerce cart, Real estate filters, SaaS KPI metrics, Booking scheduler, Advisory framework)
  - International Pricing (`/pricing`) with dynamic 5-country regional switcher (USA, UK, Canada, Australia, Pakistan) and 3 package tiers (Starter, Professional, Custom Quote)
  - Industries We Serve (`/industries`) covering 12 business sectors with prefilled inquiry CTAs
  - 7-Step Development Process (`/process`) with concrete milestone deliverables
  - Frequently Asked Questions (`/faq`) with interactive search and category filtering
  - Contact Page (`/contact`) featuring the complete 15-field project inquiry form
  - Privacy Policy (`/privacy`) with GDPR & international compliance provisions
  - Terms & Conditions (`/terms`) with intellectual property and hosting clarity
  - Full-Stack Administrative Console (`/admin`) with secure password verification, KPI counters, status management (`New`, `Contacted`, `Qualified`, `In Progress`, `Won`, `Lost`), timestamped internal notes, CSV & JSON data export, and system health status.
- **Top Bar Contract**: Adheres strictly to the single-line wordmark, clean whitespace-nowrap links, and primary action standard.
- **Anti-AI Slop & Zero-Pill Restraint**: High-contrast luxury palette (Deep Midnight `#080D1A`, Rich Blue `#2563EB`, Electric Blue `#38BDF8`, White `#F8FAFC`, Muted Silver `#A1A1AA`), unboxed typographic metadata, and honest business presentation.
- **WhatsApp Integration**:
  - Official international format: `+923293171559` (`923293171559`)
  - Prefilled inquiry URL generator for services, packages, and custom inquiries
  - Non-intrusive floating WhatsApp action button on bottom-right
- **Social Media Links**: Exact destinations for Instagram (`@abidiweb_studio`), Facebook, Email (`syedhadiabidi426@gmail.com`), and WhatsApp.
- **Server-Side API**:
  - `POST /api/enquiries`: Input sanitization, email format verification, honeypot bot defense, rate limiting, and atomic JSON persistence.
  - `POST /api/admin/login`: Constant-time hash verification and 24-hour cryptographic session tokens.
  - `GET /api/admin/enquiries`: Query filtering by status, country, and keyword search.
  - `PATCH /api/admin/enquiries/:id`: Status update and internal note logging.
  - `GET /api/admin/export`: Instant CSV and JSON downloads.

### ⚙️ Features Requiring Credentials or External Configuration
- **Production SMTP Email Dispatch**:
  - In development and standard deployment, all project inquiries are securely received, validated, and stored in the server database (`data/enquiries.json`) with full audit timestamps.
  - To enable automatic outbound email delivery to `syedhadiabidi426@gmail.com`, supply your SMTP credentials (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`) in `.env`.
- **Payment Gateway Integration for Commercial E-commerce**:
  - The portfolio demo showcases the full frontend cart and checkout review. Commercial client payment processing requires connecting client-specific Stripe or PayPal API keys in production.
- **Custom Domain & SSL**:
  - Connect your registered custom domain (e.g. `abidiwebstudio.com`) via DNS A/CNAME records on your hosting provider.

---

## 2. Running Locally (Step-by-Step for Beginners)

### Prerequisites
- Node.js (version 20 or higher recommended)
- npm (Node Package Manager)

### Step 1: Install Dependencies
Open your terminal in the project directory and run:
```bash
npm install
```

### Step 2: Configure Environment Variables
Copy the example environment file:
```bash
cp .env.example .env
```
Open `.env` and set your preferred admin password:
```env
ADMIN_PASSWORD="YourStrongPassword2026!"
```

### Step 3: Run the Full-Stack Development Server
Start the Express + Vite unified server:
```bash
npm run dev
```
Open your browser at:
```
http://localhost:3000
```

### Step 4: Access the Admin Portal
1. Navigate to `http://localhost:3000/admin` or click **Admin Portal** in the footer.
2. Enter your `ADMIN_PASSWORD` (default in dev: `AbidiWebStudio2026!`).
3. View, update, and manage all incoming leads.

---

## 3. How to Configure Production Email Delivery (SMTP)

When a client submits an enquiry on the Contact page, the server validates the fields and saves the inquiry to `data/enquiries.json`.

To forward email alerts to `syedhadiabidi426@gmail.com`:
1. Choose an SMTP provider (e.g., Gmail App Password, Resend, Brevo, SendGrid, or your web hosting email).
2. Add the following to your `.env` file on your server:
   ```env
   SMTP_HOST="smtp.gmail.com"
   SMTP_PORT="587"
   SMTP_USER="syedhadiabidi426@gmail.com"
   SMTP_PASS="your-16-character-app-password"
   SMTP_SECURE="false"
   NOTIFICATION_EMAIL="syedhadiabidi426@gmail.com"
   ```
3. Restart the server. The admin dashboard **System Health** tab will display **SMTP Transporter Ready**.

---

## 4. How to Deploy to Production

### Option A: Google Cloud Run / Docker (Recommended)
1. Build the production bundle:
   ```bash
   npm run build
   ```
2. Start the production server:
   ```bash
   npm start
   ```

### Option B: VPS (Ubuntu / Debian / DigitalOcean)
1. Clone the repository and run `npm install`.
2. Run `npm run build`.
3. Use PM2 to run the background service:
   ```bash
   npm install -g pm2
   pm2 start server.ts --name "abidi-web-studio" --interpreter tsx
   ```
4. Point Nginx reverse proxy to port `3000` with Let's Encrypt SSL.

---

## 5. Third-Party Costs & Transparency Guide

As outlined in our client agreements:
- **Domain Registration**: ~$10 - $15 / year (Namecheap, Porkbun, Cloudflare).
- **Cloud Hosting**: Free tier eligible on Google Cloud Run, Vercel, or ~$5/month on basic VPS.
- **Development Charges**: Only the agreed starting project rate.
- **Client Retains 100% Ownership**: All code, databases, and assets belong entirely to the client upon completion.

---

## 6. Official Contact Channels

- **Founder & Lead Developer**: Syed Hadi Abidi
- **Official Email**: `syedhadiabidi426@gmail.com`
- **Direct WhatsApp**: `+92 329 3171559` (`https://wa.me/923293171559`)
- **Instagram**: `https://www.instagram.com/abidiweb_studio?vrfl=d3hkdm1pamxiMWls`
- **Facebook**: `https://www.facebook.com/share/1F3vVA8nmn/`
