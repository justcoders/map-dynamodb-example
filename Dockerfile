FROM node:6.9.1

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json bower.json /usr/src/app/
RUN npm install -g pm2
RUN npm install -g bower
RUN npm install
RUN bower install --allow-root

COPY . /usr/src/app

EXPOSE 3000
CMD ["pm2-docker", "process.json"]