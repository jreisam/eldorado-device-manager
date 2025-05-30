FROM node:20-alpine AS build

WORKDIR /app

COPY ms/package*.json ./
RUN npm install

COPY ms/ .
RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY --from=build /app/package*.json ./
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules

EXPOSE 3000
CMD ["node", "dist/main"]
