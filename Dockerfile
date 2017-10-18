FROM bitnami/node:8

LABEL maintainer "Bitnami Team <containers@bitnami.com>"

ENV NODE_ENV=production

RUN npm install yarn --global

COPY . /app

WORKDIR /app

RUN yarn install && \
    npm rebuild node-sass && \
    yarn run build

ENTRYPOINT ["yarn","run","start"]
