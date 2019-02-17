FROM node:carbon-jessie

RUN mkdir -p /srv/app/server

WORKDIR /srv/app/server

COPY package.json /srv/app/server

RUN npm install

COPY ./ /srv/app/server

CMD ["/bin/bash"]
# CMD ["npm", "run", "dev"]
