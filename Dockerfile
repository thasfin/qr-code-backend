FROM node:16-slim as build

WORKDIR /usr/src/app

RUN yarn config set network-timeout 600000

COPY package*.json yarn.lock ./

COPY prisma ./prisma/

RUN yarn --frozen-lockfile

COPY . .

RUN yarn build

### Build production image

FROM node:16-slim as prod

RUN yarn config set network-timeout 600000

WORKDIR /usr/src/app

COPY --from=build /src/configs/start-file.txt ./dist/src/configs/
COPY --from=build /src/configs/status-file.json ./dist/src/configs/
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/yarn.lock ./
COPY --from=build /usr/src/app/prisma ./prisma

RUN yarn install --production --frozen-lockfile

CMD [ "node", "dist/src/main" ]