FROM node:12.19.0-alpine3.10 as builder
WORKDIR /app

COPY ./package.json .
COPY ./yarn.lock .
RUN yarn
COPY . .
RUN yarn build
RUN yarn install --production

FROM node:12.19.0-alpine3.10
EXPOSE 8000
WORKDIR /app

COPY --from=builder ./app/package.json .
COPY --from=builder ./app/yarn.lock .

COPY --from=builder ./app/node_modules ./node_modules
COPY --from=builder ./app/dist ./dist
ENTRYPOINT [ "yarn", "start:prod" ]