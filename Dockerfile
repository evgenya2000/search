FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html/search
COPY nginx.conf.template /etc/nginx/templates/default.conf.template
ENV API_UPSTREAM=http://land-search-bff:3000
ENV NGINX_ENVSUBST_FILTER=^API_UPSTREAM$
EXPOSE 80
