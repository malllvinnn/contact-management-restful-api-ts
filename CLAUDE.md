# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A RESTful API for contact management built with TypeScript, Express 5, Prisma ORM, and MySQL. Implements user auth (JWT + JTI rotation), contacts, and addresses.

## Commands

```bash
# Development (hot reload)
npm run dev

# Build TypeScript
npm run build

# Run compiled app
npm start

# Run all tests (must run serially due to shared DB)
npm test

# Run a single test file
npx jest tests/user.test.ts --runInBand

# Prisma: apply migrations
npx prisma migrate dev

# Prisma: generate client after schema changes
npx prisma generate

# Docker (includes MySQL)
docker-compose up -d
docker exec -it <api_container> npx prisma migrate deploy
```

## Environment

Copy `.env.example` to `.env` and fill in:
- `DATABASE_URL` — MySQL connection string to `db_contact_management`
- `JWT_SECRET` — signing secret for HS256 tokens
- `JWT_EXPIRES` — token lifetime (e.g. `2h`)
- `PORT` — default `3000`
- `CLIENT_URL` — CORS origin, default `http://localhost:5173`

## Architecture

### Request Flow

```
Request → CORS → express.json() → Router → [authMiddleware] → Controller → Service → Prisma → DB
                                                                                    ↓
                                                                           errorMiddleware (ZodError | ResponseError | 500)
```

### Layer Responsibilities

- **`src/route/`** — `public-api.ts` (unauthenticated: register, login) and `api.ts` (all others, applies `authMiddleware`)
- **`src/middleware/auth-middleware.ts`** — extracts Bearer token, verifies JWT, checks `jti` against DB (invalidated on logout), injects `req.user`
- **`src/controller/`** — thin HTTP layer: parses request body/params, calls service, returns JSON response
- **`src/service/`** — business logic; all methods are `static async`. Calls `Validation.validate()` before any DB work
- **`src/validation/`** — Zod schemas per resource (`UserValidation`, `ContactValidation`, `AddressValidation`). `Validation.validate()` throws `ZodError` on failure, caught by `errorMiddleware`
- **`src/model/`** — TypeScript request/response types and `toXxxResponse()` mapper functions
- **`src/error/response-error.ts`** — `ResponseError(status, message)` for domain errors (4xx)
- **`src/application/`** — `web.ts` (Express app setup), `database.ts` (PrismaClient singleton), `logging.ts` (Winston logger)

### Auth Flow (JWT + JTI)

On login, a new UUID `jti` is generated, stored in `users.jti`, and embedded in the JWT. `authMiddleware` verifies both the token signature and that `user.jti === decode.jti`. Logout nullifies `jti` in the DB, invalidating the token immediately even before expiry.

### Data Model

`User (username PK) → Contact (uuid PK, username FK) → Address (uuid PK, contact_id FK)`

### Tests

Integration tests in `tests/` use `supertest` against the real `web` app and a real database. `test-util.ts` provides `UserTest`, `ContactTest`, `AddressTest` helpers for seed/teardown. Tests use `beforeEach`/`afterEach` to set up and clean up test data. Run with `--runInBand` (already set in `package.json`) to prevent race conditions.

### Type Extension

`src/type/user-request.ts` extends Express `Request` with `user?: User` to carry the authenticated Prisma `User` object through the request lifecycle.
