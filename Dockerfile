# Pakai Node.js versi 20 yang super ringan
FROM node:20-alpine

# Set folder kerja di dalam container
WORKDIR /app

# Copy package.json dulu buat optimalisasi cache Docker
COPY package*.json ./

# Install semua dependencies
RUN npm install

# Copy seluruh file project ke dalam container
COPY . .

# Generate Prisma Client (Wajib buat Prisma)
RUN npx prisma generate

# Build TypeScript jadi JavaScript ke folder dist/
RUN npm run build

# Expose port (asumsi BE lu jalan di port 3000)
EXPOSE 3000

# Jalanin file hasil build
CMD ["node", "dist/main.js"]