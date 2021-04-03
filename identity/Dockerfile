FROM node:14.15.5-alpine3.10 as builder
WORKDIR /app

ARG NPM_TOKEN
COPY ./.yarnrc .
COPY ./package.json .
COPY ./yarn.lock .
COPY ./.npmrc.dev ./.npmrc
RUN yarn
COPY . .
RUN yarn build


FROM node:14.15.5-alpine3.10
EXPOSE 8000
WORKDIR /app

ARG NPM_TOKEN
COPY --from=builder ./app/package.json .
COPY --from=builder ./app/yarn.lock .
COPY --from=builder ./app/.yarnrc .
COPY --from=builder ./app/.npmrc ./.npmrc

RUN yarn install --production && yarn cache clean && rm .npmrc
COPY --from=builder ./app/dist ./dist
ENTRYPOINT [ "yarn", "start:prod" ]