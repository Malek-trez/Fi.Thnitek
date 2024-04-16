FROM node:alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install

ENV POSTGRES_USER="postgres" \
    POSTGRES_HOST="db" \
    POSTGRES_NAME="postgres" \
    POSTGRES_PASSWORD="1234" \
    POSTGRES_PORT="5432"

EXPOSE 3000