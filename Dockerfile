# base image
FROM node:11.6.0

# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH
ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV

# install and cache app dependencies
COPY package.json /usr/src/app/package.json
RUN yarn > /dev/null
RUN yarn global add react-scripts > /dev/null

# add app
ADD . /usr/src/app

# build react app
RUN yarn build

# start app
CMD ["pushstate-server", "build"]
