FROM node:16-alpine as base

WORKDIR /usr/src/app

COPY ./package*.json ./
RUN npm ci


FROM base as development

COPY . ./

CMD ["npm", "run", "start"]


FROM base as build

COPY src ./src
COPY public ./public
COPY postcss.config.js tailwind.config.js ./

RUN npm run build


FROM build AS copy-src
FROM nginx:latest

COPY --from=copy-src /usr/src/app/build/ /usr/src/app/build/

COPY nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
