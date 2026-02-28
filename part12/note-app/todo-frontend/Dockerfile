FROM node:lts-alpine AS deps
WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --force

FROM deps AS test
WORKDIR /usr/src/app
ENV NODE_ENV=test
COPY . .
RUN npm run test

FROM test AS build
WORKDIR /usr/src/app
COPY --from=test /usr/src/app .
ENV VITE_BACKEND_URL=/api
RUN npm run build

FROM nginx:alpine AS production
#COPY nginx.conf /etc/nginx/
COPY --from=build --chown=nginx:nginx /usr/src/app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
