FROM node:latest as build-stage
WORKDIR /code

COPY package*.json ./
RUN npm install
COPY ./ .
RUN npm run build

FROM nginx as production-stage
RUN mkdir /code
COPY --from=build-stage /code/dist/ /code
COPY nginx.conf /etc/nginx/nginx.conf
