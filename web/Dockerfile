FROM node AS build
COPY . /app
WORKDIR /app
RUN npm install && npm run build

FROM node
COPY --from=build /app /app
WORKDIR /app
ENTRYPOINT [ "sh", "./docker-entrypoint.sh" ]
