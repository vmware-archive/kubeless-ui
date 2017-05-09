FROM bitnami/node

ENV TERM=xterm
ENV ROOT /var/www/kubeless-ui
ENV NODE_ENV=production

RUN mkdir -p $ROOT/dist && \
    mkdir -p $ROOT/src
COPY package.json $ROOT/src/

WORKDIR $ROOT/src

RUN install_packages apt-transport-https
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
RUN install_packages yarn

# build & test
COPY . $ROOT/src/
RUN yarn cache clean && npm cache clean && rm -rf /tmp/*
