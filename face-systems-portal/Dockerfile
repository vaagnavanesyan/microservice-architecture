FROM node:14.15.5-alpine3.10 as builder
WORKDIR /app

COPY ./package.json .
COPY ./yarn.lock .
RUN yarn
COPY . .
RUN yarn build


FROM alpine
WORKDIR /app

COPY --from=builder ./app/build ./build