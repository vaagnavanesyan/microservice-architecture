FROM node:16-alpine as builder
WORKDIR /app

# Install deps
COPY ./package.json .
COPY ./yarn.lock .
COPY ./common/package.json ./common/package.json
COPY ./identity/package.json ./identity/package.json
RUN yarn

# Build common
WORKDIR /app/common
COPY ./common .
RUN yarn build

# Build identity
WORKDIR /app/identity
COPY ./identity .
RUN yarn build


FROM node:16-alpine
EXPOSE 8000
WORKDIR /app

# Install prod deps
COPY ./package.json .
COPY ./yarn.lock .
COPY ./common/package.json ./common/package.json
COPY ./identity/package.json ./identity/package.json
RUN yarn install --production && yarn cache clean

# Copy build artifacts for common and identity
COPY --from=builder ./app/common/dist ./common/dist
COPY --from=builder ./app/identity/dist ./identity/dist

WORKDIR /app/identity
ENTRYPOINT [ "yarn", "start:prod" ]