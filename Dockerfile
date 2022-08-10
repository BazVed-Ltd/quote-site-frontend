FROM node:16-alpine as build

WORKDIR /usr/src/app

COPY ./package*.json ./
RUN npm ci

COPY src ./src
COPY public ./public
COPY postcss.config.js tailwind.config.js ./

RUN npm run build


FROM nginx:latest

COPY --from=build /usr/src/app/build/ /usr/src/app/build/

COPY nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
