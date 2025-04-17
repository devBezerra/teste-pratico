# Etapa 1: build
FROM node:20-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: runtime
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY --from=builder /app/dist /app/dist

CMD ["node", "dist/src/main.js"]
CMD ["sh", "-c", "npm run migration:run && node dist/src/main"]
EXPOSE 3000

