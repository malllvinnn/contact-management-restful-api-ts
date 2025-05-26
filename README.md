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

## 🗂️ Create `.env` File
### Example:
```
DATABASE_URL="mysql://janedoe:mypassword@localhost:3306/mydb"
JWT_SECRET="JWTSecret"
JWT_EXPIRES="2h"
PORT=3000
```

## 🐳 Database Setup (with Docker)
If you are using Docker for the database, follow these steps:
### 📝 Create `docker-compose.yml`
Example configuration:
```yaml
version: "3.8"

services:
  mysql:
    container_name: mysql_server
    image: mysql:8.3
    restart: on-failure
    ports:
      - "3306:3306"
    environment:
      MYSQL_ROOT_PASSWORD: admin123
      MYSQL_DATABASE: app_database
    volumes:
      - mysql_data:/var/lib/mysql
    networks:
      - app_network

volumes:
  mysql_data:

networks:
  app_network:
```
### ▶️ Run MySQL Database using Docker
```shell
docker compose up -d
```
This command will:
- 🚀 Start a MySQL container named `mysql_server`.
- 🏗️ Create a default database named `app_database`.
- 🔒 Set the MySQL root password as `admin123`.

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