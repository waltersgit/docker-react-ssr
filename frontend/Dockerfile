FROM node:8.9-alpine

MAINTAINER conlyc


RUN npm cache clean -f
RUN npm install webpack@^4.17.0 -g && npm install webpack-cli@^3.1.0
RUN mkdir -p /usr/app/src  
WORKDIR /usr/app/src
COPY package.json ./
RUN npm install
COPY . ./
RUN webpack --config ./config/webpack.server.js
EXPOSE 3000
