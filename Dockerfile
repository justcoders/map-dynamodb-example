FROM node:6.9.1

ENV NODE_ENV development

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install -g pm2 && npm install
RUN bower install

COPY . /usr/src/app

EXPOSE 3000
CMD ["pm2-docker", "process.json"]