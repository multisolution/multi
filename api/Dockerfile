FROM leocavalcante/dwoole:prod
RUN apk add postgresql-dev \
    && docker-php-ext-install -j$(nproc) pdo_pgsql
COPY . /app
