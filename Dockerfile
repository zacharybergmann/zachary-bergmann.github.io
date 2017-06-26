FROM node:7
RUN mkdir /zachary-bergmann.github.io
ADD . /zachary-bergmann.github.io
WORKDIR /zachary-bergmann.github.io
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install yarn
RUN yarn install
EXPOSE 3000
CMD ["yarn", "start"]