FROM node:12.18.1-alpine

LABEL version="1.0" description="node image"

WORKDIR /usr/app

COPY package*.json ./

RUN yarn add knex

RUN yarn install

COPY . .

EXPOSE 3000

CMD ["yarn", "start:dev"]