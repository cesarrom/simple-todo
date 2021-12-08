FROM node:14-alpine3.12

RUN apk add make gcc g++
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python

COPY ./lib/ /app/lib
COPY ./yarn.lock /app
COPY ./package.json /app
COPY ./.env /app

WORKDIR /app

RUN yarn install --production

EXPOSE 5001

CMD ["node", "./lib/main"]