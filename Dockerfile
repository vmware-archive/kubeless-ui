FROM bitnami/node

RUn install_packages apt-transport-https
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
RUN install_packages yarn
RUN yarn cache clean && npm cache clean && rm -rf /tmp/*
