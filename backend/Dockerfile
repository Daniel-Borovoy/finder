FROM node:15.14.0

WORKDIR /finder-backend

COPY ["package.json", "yarn.lock"]
RUN yarn install -prod

COPY . .
RUN yarn build

CMD [ "yarn", "start" ]
