FROM node:latest as build-step
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
RUN npm run-script build


FROM nginx:latest as prod-stage
COPY --from=build-step /usr/src/app/dist/frontend /var/www/html/
COPY ./default /etc/nginx/sites-available/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
