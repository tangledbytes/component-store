FROM node:12.18-alpine as builder
WORKDIR /usr/src/app
COPY ["./component/package.json", "./component/package-lock.json*", "./"]
RUN npm install --silent
COPY ./component ./
RUN node scripts/build.js

FROM node:12.18-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["./server/package.json", "./server/package-lock.json*", "./"]
RUN npm install --production --silent
COPY ./server ./
EXPOSE 8080
RUN mkdir -p public
COPY --from=builder /usr/src/app/dist/main.js ./
CMD [ "npm", "start" ]