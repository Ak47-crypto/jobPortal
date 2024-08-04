FROM node:18.20.4-alpine
WORKDIR /jobportal
COPY . /jobportal
RUN npm install
EXPOSE 3001
CMD npm run dev
