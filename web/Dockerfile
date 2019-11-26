FROM node AS build
ARG API_URL
ARG SUBSCRIPTIONS_URL
ENV API_URL=${API_URL}
ENV SUBSCRIPTIONS_URL=${SUBSCRIPTIONS_URL}
COPY . /app
WORKDIR /app
RUN npm install && npm run build

FROM node
COPY --from=build /app /app
WORKDIR /app
ENTRYPOINT [ "sh", "./docker-entrypoint.sh" ]
