FROM bitnami/node:7

LABEL Bitnami <containers@bitnami.com>

ENV NODE_ENV=production

RUN npm install yarn --global

COPY . /app

WORKDIR /app

RUN yarn install && \
    npm rebuild node-sass && \
    yarn run compile

ENTRYPOINT ["yarn","run","start"]


