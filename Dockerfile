FROM node:14-alpine

WORKDIR /app
COPY ./package.json .
RUN yarn

COPY . /app

ENV NODE_ENV=production

CMD ["yarn", "start"]
