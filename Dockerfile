FROM node:18-alpine

WORKDIR /app

COPY package.json ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 1338

CMD ["yarn", "start"]