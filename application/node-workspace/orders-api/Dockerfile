FROM node:16-alpine as builder
WORKDIR /app

# Install deps
COPY ./package.json .
COPY ./yarn.lock .
COPY ./common/package.json ./common/package.json
COPY ./orders-api/package.json ./orders-api/package.json
RUN yarn

# Build common
WORKDIR /app/common
COPY ./common .
RUN yarn build

# Build orders-api
WORKDIR /app/orders-api
COPY ./orders-api .
RUN yarn build


FROM node:16-alpine
EXPOSE 8000
WORKDIR /app

# Install prod deps
COPY ./package.json .
COPY ./yarn.lock .
COPY ./common/package.json ./common/package.json
COPY ./orders-api/package.json ./orders-api/package.json
RUN yarn install --production && yarn cache clean

# Copy build artifacts for common and orders-api
COPY --from=builder ./app/common/dist ./common/dist
COPY --from=builder ./app/orders-api/dist ./orders-api/dist

WORKDIR /app/orders-api
ENTRYPOINT [ "yarn", "start:prod" ]