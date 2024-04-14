FROM node:alpine

WORKDIR /usr/src/app
COPY package*.json ./
COPY . .

RUN npm install

ENV DB_USER="postgres" \
    DB_HOST="db" \
    DB_NAME="postgres" \
    DB_PASSWORD="1234" \
    DB_PORT="5432"

EXPOSE 3000