FROM node:16-alpine as builder
WORKDIR /app

# Install deps
COPY ./package.json .
COPY ./yarn.lock .
COPY ./common/package.json ./common/package.json
COPY ./notifications-api/package.json ./notifications-api/package.json
RUN yarn

# Build common
WORKDIR /app/common
COPY ./common .
RUN yarn build

# Build notifications-api
WORKDIR /app/notifications-api
COPY ./notifications-api .
RUN yarn build


FROM node:16-alpine
EXPOSE 8000
WORKDIR /app

# Install prod deps
COPY ./package.json .
COPY ./yarn.lock .
COPY ./common/package.json ./common/package.json
COPY ./notifications-api/package.json ./notifications-api/package.json
RUN yarn install --production && yarn cache clean

# Copy build artifacts for common and notifications-api
COPY --from=builder ./app/common/dist ./common/dist
COPY --from=builder ./app/notifications-api/dist ./notifications-api/dist

WORKDIR /app/notifications-api
ENTRYPOINT [ "yarn", "start:prod" ]