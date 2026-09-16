# Phoenix Tours — Milestone 2
Premium Dubai/UAE tourism platform foundation using Next.js 15 + PostgreSQL/Prisma.

## Included
- Public tour website foundation
- Protected `/admin` area with signed, HTTP-only session cookie
- PostgreSQL data models for admins, categories, tours, attractions, itinerary stops and bookings
- Tour CRUD API foundation
- Attraction/itinerary schema including Photo Stop, Drive By, Visit Included, Entry Ticket Included and Optional Add-on
- Shared/private and per-person/per-vehicle pricing fields
- Seed script for first admin and core categories

## Local setup
1. Install Node.js 20+ and PostgreSQL (or use a hosted PostgreSQL database).
2. Copy `.env.example` to `.env` and replace every placeholder.
3. Run `npm install`.
4. Run `npm run db:push`.
5. Set a strong `ADMIN_SEED_PASSWORD`, then run `npm run db:seed` once.
6. Run `npm run dev` and open `http://localhost:3000`.
7. Admin login is at `/admin/login`.

## Security
Never commit `.env`. Use a long random `AUTH_SECRET`, HTTPS in production, a strong unique admin password, and a managed PostgreSQL database with TLS. The seed password in examples is not intended for production.

## Next milestone
Admin UI CRUD screens, booking form/calculator persisted to PostgreSQL, pickup/add-on models, availability, promo codes, media, dynamic tour routes, SEO/schema/sitemap and analytics.
