FROM node:20-alpine AS build

WORKDIR /app

COPY api/package*.json ./
RUN npm install

COPY api/ .
RUN npm run build

FROM node:22.16-alpine

WORKDIR /app

COPY --from=build /app/package*.json ./
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/tsconfig.json ./tsconfig.json
COPY --from=build /app/src/database/sql ./src/database/sql



EXPOSE 3000
CMD ["node", "dist/main"]
