FROM node:18-alpine

WORKDIR /home/node/app
 
COPY . .
 
RUN yarn install --production
RUN npm install -g @nestjs/cli
RUN yarn build
 
EXPOSE 80

CMD ["yarn", "start:prod"]