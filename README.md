<p align="center">
  <a href="https://malv-store.my.id" target="_blank">
    <img src="public/images/chibi.png" width="100" alt="Malvin Logo" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/author-Muhammad%20Malfin-blueviolet" />
  <img src="https://img.shields.io/badge/language-TypeScript-007acc" />
  <img src="https://img.shields.io/badge/framework-Express.js-green" />
  <img src="https://img.shields.io/badge/database-MySQL-blue" />
  <img src="https://img.shields.io/badge/Prisma-ORM-2D3748" />
  <img src="https://img.shields.io/badge/Bcrypt-Encryption-blue" />
  <img src="https://img.shields.io/badge/JSON%20Web%20Token-JWT-yellow" />
  <img src="https://img.shields.io/badge/Zod-Validation-orange" />
</p>

# Contact Management RESTful API

A RESTful API for managing personal contacts and their addresses, built with TypeScript and Express 5. Supports full CRUD for contacts and nested addresses, with secure JWT-based authentication.

## Features

- **JWT Authentication with JTI Rotation** — tokens are immediately invalidated on logout by storing a `jti` (JWT ID) in the database, preventing token reuse after sign-out
- **Layered Architecture** — clean separation of Controller → Service → Prisma with a dedicated error-handling middleware
- **Request Validation** — all inputs validated with Zod schemas before touching the database
- **Paginated Contact Search** — filter contacts by name, email, or phone with pagination support
- **Dockerized** — ships with a `docker-compose.yml` for running the API + MySQL together

## Tech Stack

| Layer | Technology |
|---|---|
| Language | TypeScript 5 |
| Framework | Express 5 |
| ORM | Prisma 6 |
| Database | MySQL 8 |
| Auth | JSON Web Token (HS256) |
| Validation | Zod |
| Password Hashing | bcrypt |
| Logging | Winston |
| Testing | Jest + Supertest |

## Environment Setup

Copy the example file and fill in your credentials:
```bash
cp .env.example .env
```

```env
# MySQL Configuration
MYSQL_ROOT_PASSWORD=your_secure_password_here

# Database URL
DATABASE_URL="mysql://root:your_secure_password_here@localhost:3306/db_contact_management"

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES=2h

# Application
PORT=3000
CLIENT_URL=http://localhost:5173
```

## Running the Application

### Option A: Docker (Recommended)

```bash
docker-compose up -d
```

On first run, apply the database migrations:
```bash
docker exec -it api_contact_management npx prisma migrate deploy
```

### Option B: Local

```bash
npm install
npx prisma migrate dev
npx prisma generate
npm run build
npm start
```

For development with hot reload:
```bash
npm run dev
```

## API Documentation

| Resource | File |
|---|---|
| User (register, login, profile) | [doc/user.md](doc/user.md) |
| Contact (CRUD + search) | [doc/contact.md](doc/contact.md) |
| Address (CRUD per contact) | [doc/address.md](doc/address.md) |

## Running Tests

Tests use a real database connection. Make sure your `.env` is configured before running.

```bash
# Run all tests
npm test

# Run a specific test file
npx jest tests/user.test.ts --runInBand
```
