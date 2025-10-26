FROM nginx:alpine as builder

WORKDIR /usr/src/rostelecom_analytics_frontend_app/

COPY package*.json ./

RUN apk add nodejs-current npm && npm install

COPY . .

CMD ["npm", "run", "dev"]

FROM nginx:alpine as production

COPY --from=builder usr/src/rostelecom_analytics_frontend_app/ /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]