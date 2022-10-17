FROM node:16 as build

RUN apt-get -y update && apt install -y curl

WORKDIR /usr/src/app

RUN yarn config set network-timeout 600000

# RUN npm config set registry "http://registry.npmjs.org"

RUN yarn config set strict-ssl false --global

RUN yarn config set registry "http://registry.yarnpkg.com"

COPY package*.json yarn.lock ./

COPY prisma ./prisma/

RUN yarn --verbose

COPY . .

RUN yarn build

### Build production image

FROM node:16 as prod

RUN yarn config set network-timeout 600000

# RUN npm config set registry "http://registry.npmjs.org"

RUN yarn config set strict-ssl false --global

RUN yarn config set registry "http://registry.yarnpkg.com"

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/yarn.lock ./
COPY --from=build /usr/src/app/prisma ./prisma

RUN yarn install --frozen-lockfile --production

CMD [ "node", "dist/src/main" ]