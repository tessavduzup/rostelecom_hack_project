FROM nginx:20-alpine as builder

WORKDIR /usr/src/rostelecom_analytics_frontend_app/

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]

FROM nginx-alpine as production

COPY --from-builder /rostelecom_analytics_frontend_app/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]