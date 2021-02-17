FROM node:14.15.0-alpine3.10 as builder
WORKDIR /app

COPY ./package.json .
COPY ./yarn.lock .
RUN yarn
COPY . .
RUN yarn build


FROM node:12.19.0-alpine3.10
EXPOSE 8000
WORKDIR /app

COPY --from=builder ./app/package.json .
COPY --from=builder ./app/yarn.lock .

RUN yarn install --production && yarn cache clean
COPY --from=builder ./app/dist ./dist
# COPY  ./client ./client
ENTRYPOINT [ "yarn", "start:prod" ]