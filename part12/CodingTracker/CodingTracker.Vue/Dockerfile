FROM node:lts-slim AS deps
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci

FROM deps AS build
ARG VITE_API_URL=/api
ENV VITE_API_URL=${VITE_API_URL}
COPY . .
RUN npm run build

FROM nginx:alpine AS production
WORKDIR /usr/share/nginx/html
COPY --from=build --chown=nginx:nginx /usr/src/app/dist .
COPY nginx.conf /etc/nginx/nginx.conf