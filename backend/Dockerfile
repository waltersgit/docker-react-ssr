FROM node:8.9-alpine

MAINTAINER conlyc

RUN npm install webpack@^4.17.0 -g && npm install webpack-cli@^3.1.0
ADD package.json /tmp/package.json
RUN cd /tmp && npm install  
RUN mkdir -p /usr/app && cp -a /tmp/node_modules /usr/app  
RUN mkdir -p /usr/app
WORKDIR /usr/app  
COPY . /usr/app
RUN webpack --config ./webpack.config.js
EXPOSE 5000

