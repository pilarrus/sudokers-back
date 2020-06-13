FROM node:12.16-alpine as builder

COPY package*.json ./
RUN npm install

FROM node:12.16-alpine
#USER node
WORKDIR /app
COPY --from=builder node_modules node_modules
COPY . .
RUN npm install pm2 -g

EXPOSE 3000