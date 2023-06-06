FROM node:14

EXPOSE 3001

WORKDIR /backend

COPY package.json package-lock*.json .sequelizerc ./

RUN npm install

COPY . .

CMD ["npm", "start"]
