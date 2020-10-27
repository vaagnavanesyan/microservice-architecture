FROM node:12.19.0-alpine3.10

EXPOSE 8000

WORKDIR /app

COPY ./package.json .
COPY ./yarn.lock .
RUN yarn
COPY . .

RUN yarn build

ENTRYPOINT [ "yarn", "start:prod" ]