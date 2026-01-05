# Birdiary

Birdiary is a full-stack web application that allows users to log and track bird sightings.

[Visit Birdiary](https://mybirdiary.com)

The application is designed to be usable both with and without an account, prioritizing clarity, predictable behavior, and resilience across common and edge-case scenarios.

- **Backend**: Built with NestJS and Prisma ORM (PostgreSQL), exposing a REST API secured with JWT-based authentication.
- **Frontend**: Built with Next.js 15 (App Router), consuming the API primarily through server-side data fetching.
- **Design goals**: Straightforward UI, flexible UX (account creation is optional), strong validation and security (including bot prevention), predictable APIs, and robust error handling for both expected and unexpected failure cases.

## Tech Stack

- **Language**: TypeScript
- **Frontend**: Next.js (App Router), React, Tailwind CSS, shadcn/ui
- **Backend**: NestJS, Prisma ORM, PostgreSQL
- **Maps & Location**: Google Maps JavaScript API, Places API (Autocomplete), Geocoding API
- **Email**: Resend
- **Authentication & Security**: JWT, Cloudflare Turnstile
- **Validation**: Zod (frontend), class-validator (backend)
- **Observability & Error Tracking**: Sentry

## Architecture

### Frontend

The frontend uses React Server Components and server-side data fetching as the primary data access pattern. Client-side fetching is used selectively to support offline-like behavior and local persistence for users who choose not to create an account.

### Backend

The backend follows a service-oriented architecture aligned with NestJS best practices:

- **Controllers** define routes, validate inputs, and translate HTTP requests into application actions.
- **Services** encapsulate domain and business logic. Services are injectable and reusable (e.g. authentication, password hashing, email delivery).
- **DTOs** define validation boundaries. Guards and interceptors enforce authentication, authorization, and consistent response shapes.
- **Persistence** is handled via Prisma, with raw SQL used selectively for complex queries.

## Data Flow

Client → Next.js Server Component → Backend API → Prisma → Database

- Data is fetched and mutated primarily within server components to ensure consistent validation, authorization, and caching behavior.
- Responses are cached by default and selectively revalidated following mutations.
- For unauthenticated users, data is stored in the browser using local storage, allowing core functionality without requiring an account.

## Error Handling & Resilience

The application is designed to handle both expected and unexpected failure scenarios gracefully, with attention paid to user experience and system stability.

- **Expected errors** (validation failures, authorization issues, missing resources) return consistent, predictable responses that can be surfaced cleanly in the UI.
- **Unexpected errors** are caught at application boundaries to prevent crashes, logged via Sentry, and exposed to users through safe, non-leaking error messages.
- On the frontend, loading and error states are explicitly handled to avoid broken or ambiguous UI states.

## Security Considerations

Application security is treated as a first-class concern and is enforced at multiple layers of the system.

Key measures include:

- **Input validation and database safety**  
  Protection against SQL injection through strict server-side validation and parameterized queries.

- **Cross-site scripting (XSS) mitigation**  
  Use of HttpOnly cookies, input validation at API boundaries, and sanitization of user-supplied content.

- **Bot and abuse prevention**  
  Mitigation of automated and malicious traffic using Cloudflare Turnstile, honeypot fields, disposable email detection, and rate limiting.

- **Authentication and account protection**  
  Secure user authentication using JWT-based access tokens, email verification, and cryptographic password hashing.

- **Secure HTTP defaults**  
  Security-related HTTP headers are set using Helmet to reduce exposure to common web vulnerabilities.

- **Controlled cross-origin access**  
  Resource sharing is restricted via a strict CORS policy to limit access to trusted origins.
