FROM node:16 as build

WORKDIR /usr/src/app

RUN yarn config set network-timeout 600000

COPY package*.json yarn.lock ./

COPY prisma ./prisma/

RUN yarn

COPY . .

RUN yarn build

### Build production image

FROM node:16 as prod

RUN yarn config set network-timeout 600000

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/yarn.lock ./
COPY --from=build /usr/src/app/prisma ./prisma

RUN yarn install --production

CMD [ "node", "dist/src/main" ]