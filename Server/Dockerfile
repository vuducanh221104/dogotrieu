FROM node:19.5.0-alpine


WORKDIR /Ecommerce/backend

COPY package*.json ./

RUN apk add --no-cache python3

RUN npm install

# RUN npm install -g @babel/core @babel/cli

COPY . .

EXPOSE 4000


# RUN npm run build-src
# RUN npm start

CMD ["npm", "start" ]

