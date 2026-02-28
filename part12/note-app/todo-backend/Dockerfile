FROM node:lts-slim

RUN apt update && apt upgrade -y
RUN apt install -y --no-install-recommends dumb-init

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

USER node

RUN npm ci --only=production

COPY --chown=node:node . .

ENTRYPOINT ["/usr/bin/dumb-init", "--"]

CMD ["node", "src/index.js"]
