FROM bitnami/node:7

MAINTAINER Bitnami <containers@bitnami.com>

ENV NODE_ENV=production

RUN npm install yarn eslint  --global

COPY . /app

WORKDIR /app

RUN yarn install

RUN npm rebuild node-sass

RUN yarn run compile

ENTRYPOINT ["yarn","run","start"]


