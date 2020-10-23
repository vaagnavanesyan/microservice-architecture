FROM node:12.19.0-alpine3.10

EXPOSE 8000

COPY . .

RUN yarn

ENTRYPOINT [ "node", "server.js" ]