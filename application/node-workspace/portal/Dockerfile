FROM node:16-alpine as builder
WORKDIR /app

# Install deps
COPY ./package.json .
COPY ./yarn.lock .
COPY ./portal/package.json ./portal/package.json
RUN yarn

# Build portal
WORKDIR /app/portal
COPY ./portal .
RUN yarn build


FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY ./portal/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder ./app/portal/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
