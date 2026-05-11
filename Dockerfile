# Multi-stage build para Astro
FROM node:lts-slim AS builder
# Activar yarn moderno
RUN npm install -g corepack

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --immutable-cache
COPY . .

RUN yarn build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiamos template de nginx
COPY nginx.conf /etc/nginx/templates/default.conf

# El entrypoint de nginx:alpine procesa el template automáticamente
# reemplazando las variables de entorno
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]