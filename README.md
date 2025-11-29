# ChemSphere Nexus

**The Operating System for Agile Chemical Procurement.**

ChemSphere Nexus is a B2B Chemical Marketplace Application designed to streamline sourcing, provide real-time market intelligence, and offer verified global inventory.

## Core Pillars

* **Sourcing:** Automated RFX & Spot Buying.
* **Intelligence:** Real-time Price Benchmarking & Risk Analysis.
* **Marketplace:** Verified Global Inventory.

## Sitemap

### Public Routes

* `/` (Home): Hero section, Start Sourcing CTA, Live Market Ticker.
* `/features/sourcing`: Automated RFQ workflows, sustainability scoring.
* `/features/market-intelligence`: Price analytics.
* `/marketplace`: Public catalog with faceted search.
* `/suppliers`: Value prop for distributors.
* `/success-stories`: Case studies.
* `/company/about`: About ChemSphere Nexus.
* `/legal/imprint`: Impressum.
* `/legal/privacy`: Privacy Policy.
* `/legal/terms`: Terms of Service.

### App Routes (Protected)

* `/auth/login`: SSO and Email login.
* `/auth/register`: Company registration.
* `/dashboard/buyer`: Buyer widgets (Active Tenders, Savings, Watchlist).
* `/dashboard/supplier`: Supplier widgets (Inbound Leads, Quote Status).
* `/sourcing/new`: RFQ Wizard.
* `/analytics/benchmarks`: Market data charting.

## Tech Stack

* **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS.
* **Backend:** Next.js API Routes (Server Actions), Prisma ORM.
* **Database:** PostgreSQL.
* **UI Components:** Lucide Icons, Recharts, TanStack Table.

## Getting Started

1. **Install dependencies:**

    ```bash
    npm install
    ```

2. **Set up Database:**
    Ensure you have a PostgreSQL database running. Update `.env` with `DATABASE_URL`.

    ```bash
    npx prisma generate
    npx prisma db push
    ```

3. **Run Development Server:**

    ```bash
    npm run dev
    ```
