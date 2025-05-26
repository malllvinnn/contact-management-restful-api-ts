# Setup Project

## Create .env file
### Example:
```
DATABASE_URL="mysql://janedoe:mypassword@localhost:3306/mydb"
JWT_SECRET="JWTSecret"
JWT_EXPIRES="2h"
PORT=3000
```

## Database Setup (with Docker)
If you are using Docker for the database, follow these steps:
### Create `docker-compose.yml`
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
### Run MySQL Database using Docker
```shell
docker compose up -d
```
This command will:
- Start a MySQL container named mysql_server.
- Create a default database named app_database.
- Set the MySQL root password as admin123.

## Step Runner
### Install Project
```shell
npm install
```

### Prisma Setup
```shell
npx prisma migrate dev
```
> give the migration `name`

```shell
npx prisma generate
```

### Compile Typescript to Javascript
```shell
npm run build
```

### Run the compiled project
```shell
npm run start
```
