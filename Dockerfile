FROM node:16-alpine AS build-step

WORKDIR /build
COPY package.json yarn.lock ./
RUN yarn

COPY . .
RUN yarn build

FROM nginx:1.18-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build-step /build/build /frontend/build
