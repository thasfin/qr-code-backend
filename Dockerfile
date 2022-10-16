FROM node:18 as build

RUN sudo apt update && sudo apt install -y curl

WORKDIR /usr/src/app

RUN yarn config set network-timeout 600000

# RUN npm config set registry "http://registry.npmjs.org"

RUN yarn config set registry "http://registry.yarnpkg.com"

COPY package*.json yarn.lock ./

COPY prisma ./prisma/

RUN yarn --verbose

COPY . .

RUN yarn build --verbose

### Build production image

FROM node:18 as prod

RUN yarn config set network-timeout 600000

# RUN npm config set registry "http://registry.npmjs.org"

RUN yarn config set registry "http://registry.yarnpkg.com"

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/yarn.lock ./
COPY --from=build /usr/src/app/prisma ./prisma

RUN yarn install --frozen-lockfile --production --verbose

CMD [ "node", "dist/src/main" ]