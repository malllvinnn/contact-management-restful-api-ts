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


# 🚀 TypeScript RESTful API - Project Starter
A simple RESTful API built with TypeScript, Express, Prisma, and MySQL.

## 🔐 Environment Setup

### 1️⃣ Create `.env` File
Copy the example file and fill in your credentials:
```bash
cp .env.example .env
```

Edit `.env` file with your own secure values:
```env
# MySQL Configuration
MYSQL_ROOT_PASSWORD=your_secure_password_here

# Database URL (for local development)
DATABASE_URL="mysql://root:your_secure_password_here@localhost:3306/db_contact_management"

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES=2h

# Application Port
PORT=3000
```

**⚠️ IMPORTANT SECURITY NOTES:**
- ✅ `.env` is in `.gitignore` - your secrets are safe
- ✅ `.env.example` provides a template without real credentials
- ❌ **NEVER** commit `.env` to git
- 🔑 Use strong, unique passwords in production

## 🐳 Docker Setup

### ▶️ Run with Docker Compose
```bash
docker-compose up -d
```

The `docker-compose.yml` uses environment variables from your `.env` file - **no hardcoded passwords!**

This command will:
- 🚀 Start MySQL container with your secure password
- 🏗️ Create database `db_contact_management`
- 🔒 All credentials loaded from `.env` file

## 📦 Step Runner
### 📥 Install Project
```shell
npm install
```

### ⚙️ Prisma Setup
```shell
npx prisma migrate dev
```
> ✍️ give the migration `name`

```shell
npx prisma generate
```

### 🏗️ Build Typescript to Javascript
```shell
npm run build
```

### 🚀 Run the compiled project
```shell
npm run start
```
## 📖 API Documentation

For detailed API endpoints and specifications, see the [API Documentation](doc).