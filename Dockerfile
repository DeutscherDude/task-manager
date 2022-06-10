FROM node:18.2.0

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build
