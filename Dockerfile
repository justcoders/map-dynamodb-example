FROM node:6.9.1

ENV APP_HOME /usr/src/app

RUN mkdir -p $APP_HOME
WORKDIR $APP_HOME

RUN npm install -g pm2
RUN npm install -g bower

COPY package.json $APP_HOME
RUN npm install

COPY bower.json $APP_HOME
COPY ".bowerrc" $APP_HOME
RUN bower install --allow-root

COPY . $APP_HOME

EXPOSE 3000
CMD ["pm2-docker", "process.json"]