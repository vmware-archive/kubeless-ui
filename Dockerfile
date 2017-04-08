FROM node:6.9

RUN useradd --user-group --create-home --shell /bin/false app && mkdir -p /opt/app

ENV HOME=/home/app TERM=xterm APP=/opt/app

ADD package.json yarn.lock $APP/

RUN chown -R app $APP && chgrp -R app $APP && chown -R app /usr/local

WORKDIR $APP

USER app

RUN npm install --global yarn

# RUN yarn install && yarn upgrade
RUN rm -rf node_modules && yarn install && yarn cache clean && npm cache clean && rm -rf ~/tmp/*
