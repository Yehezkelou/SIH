

FROM node:20-alpine AS builder

# on install pnpm 
RUN npm install -g pnpm

WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json nx.json ./

COPY . .

RUN pnpm install --frozen-lockfile

RUN pnpm nx build api-gateway --configuration=production

FROM node:20-alpine AS runner

WORKDIR /app


COPY --from=builder /app/apps/backend/api-gateway/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/libs ./libs
# Certificats mTLS lus au démarrage par auth.module.ts (certs/ca.crt, client.key, client.crt)
COPY --from=builder /app/certs ./certs

ENV PORT=8080
ENV NODE_ENV=production

EXPOSE 8080

CMD ["node", "dist/main.js"]