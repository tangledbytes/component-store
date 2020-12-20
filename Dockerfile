FROM node:12.18 as builder
WORKDIR /usr/src/app
COPY . .
RUN chmod +x ./bundle.sh
RUN ./bundle.sh --navigator="meshmap" --dir="server"

FROM node:12.18-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["./server/package.json", "./server/package-lock.json*", "./"]
RUN npm install --production --silent
COPY --from=builder /usr/src/app/server ./
EXPOSE 8080
CMD [ "npm", "start" ]