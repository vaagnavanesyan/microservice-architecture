FROM node:14.15.5-alpine3.10 as builder
WORKDIR /app

COPY ./package.json .
COPY ./yarn.lock .
RUN yarn
COPY . .
RUN yarn build


FROM steebchen/nginx-spa:stable
COPY --from=builder ./app/build /app
EXPOSE 80
CMD ["nginx"]