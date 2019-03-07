# build React app
FROM node:11.6.0 as build-stage

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

ARG REACT_APP_OAUTH_CLIENT_ID
ENV REACT_APP_OAUTH_CLIENT_ID=${REACT_APP_OAUTH_CLIENT_ID}
ARG PORT
ENV PORT=${PORT}

ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json yarn.lock ./
RUN yarn install

COPY . .

RUN yarn build

# serve files via nginx
FROM nginx:1.13.12-alpine-perl

RUN rm /etc/nginx/conf.d/default.conf
COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html
COPY --from=build-stage /usr/src/app/nginx.conf /etc/nginx/nginx.conf

RUN export PORT="${PORT:-80}" && \
  sed -i "s/listen 80/listen ${PORT}/" /etc/nginx/nginx.conf && \
  cat /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]