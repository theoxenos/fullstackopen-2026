FROM node:lts-slim

RUN apt update && apt upgrade -y
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init

WORKDIR /usr/src/app

COPY . .

# Change npm ci to npm install since we are going to be in development mode
RUN npm install

ENTRYPOINT ["/usr/bin/dumb-init", "--"]

# npm run dev is the command to start the application in development mode
CMD ["node", "--watch", "src/index.js"]