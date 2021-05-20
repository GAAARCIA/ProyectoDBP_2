FROM node:alpine

MAINTAINER Angélica García

RUN apk update

RUN apk add --no-cache bash

RUN apk add --no-cache nodejs

WORKDIR /app

COPY . .

EXPOSE 8888

CMD ["/usr/bin/node", "/app/app.js"]