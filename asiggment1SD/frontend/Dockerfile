FROM node:16.17.0-alpine3.15

COPY package.json package-lock.json ./

RUN npm install

COPY . .

# RUN npm run build

CMD ["npm", "start"]