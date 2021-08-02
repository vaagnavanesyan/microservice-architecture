FROM node:16-alpine as builder
WORKDIR /app

# Install deps
COPY ./package.json .
COPY ./yarn.lock .
COPY ./common/package.json ./common/package.json
COPY ./billing-api/package.json ./billing-api/package.json
RUN yarn

# Build common
WORKDIR /app/common
COPY ./common .
RUN yarn build

# Build billing-api
WORKDIR /app/billing-api
COPY ./billing-api .
RUN yarn build


FROM node:16-alpine
EXPOSE 8000
WORKDIR /app

# Install prod deps
COPY ./package.json .
COPY ./yarn.lock .
COPY ./common/package.json ./common/package.json
COPY ./billing-api/package.json ./billing-api/package.json
RUN yarn install --production && yarn cache clean

# Copy build artifacts for common and billing-api
COPY --from=builder ./app/common/dist ./common/dist
COPY --from=builder ./app/billing-api/dist ./billing-api/dist

WORKDIR /app/billing-api
ENTRYPOINT [ "yarn", "start:prod" ]