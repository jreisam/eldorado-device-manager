FROM node:22.16-alpine AS build

WORKDIR /app

COPY web/package*.json ./
RUN npm install

COPY web/ .
RUN npm run build
RUN echo "debugging: conteúdo da pasta build:" && ls -la /app/dist
RUN echo "debugging: conteúdo da pasta browser:" && ls -la /app/dist/browser || echo "Pasta browser não encontrada"

FROM nginx:alpine

COPY web/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/browser/ /usr/share/nginx/html/

RUN echo "debugging: conteúdo de /usr/share/nginx/html:" && ls -la /usr/share/nginx/html
RUN ls -la /usr/share/nginx/html/*.css || echo "Nenhum arquivo CSS encontrado"
RUN ls -la /usr/share/nginx/html/*.js || echo "Nenhum arquivo JS encontrado"

EXPOSE 80
