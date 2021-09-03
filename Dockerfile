FROM alpine:latest

COPY script.sh /script.sh

RUN apk add --no-cache nodejs npm

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 3000

ENTRYPOINT ["node"]

CMD ["app.js"] 
