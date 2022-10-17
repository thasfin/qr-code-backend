FROM node:16-slim as build

WORKDIR /usr/src/app

RUN yarn config set network-timeout 600000

COPY package*.json yarn.lock ./

COPY prisma ./prisma

RUN yarn --frozen-lockfile

COPY . .

RUN yarn build

COPY node_modules ./node_modules

COPY src/configs/*.json ./dist/src/configs/

COPY src/configs/*.txt ./dist/src/configs/

### Build production image

FROM node:16-slim as prod

RUN yarn config set network-timeout 600000

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/yarn.lock ./
COPY --from=build /usr/src/app/prisma ./prisma

CMD [ "node", "dist/src/main" ]