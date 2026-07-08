# ============================
# Stage 1: Build assets
# ============================
FROM node:22-alpine AS node-builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build


# ============================
# Stage 2: PHP + Nginx runtime
# ============================
FROM php:8.3-fpm-alpine

# Install system deps and PHP extensions
RUN apk add --no-cache \
    nginx \
    supervisor \
    libpng-dev \
    libzip-dev \
    zip \
    unzip \
    git \
    curl \
    oniguruma-dev \
    libxml2-dev \
    mysql-client \
    && docker-php-ext-install \
    pdo_mysql \
    mbstring \
    exif \
    pcntl \
    bcmath \
    gd \
    zip \
    opcache \
    xml

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Install Redis extension if needed (uncomment if you use Redis)
# RUN apk add --no-cache autoconf g++ make \
#     && pecl install redis \
#     && docker-php-ext-enable redis

WORKDIR /var/www

# Copy composer files first for layer caching
COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader --no-interaction --no-scripts

# Copy built assets from node stage
COPY --from=node-builder /app/public/build ./public/build

# Copy the rest of the app
COPY . .

# Laravel optimizations
RUN php artisan config:cache \
    && php artisan route:cache \
    && php artisan view:cache \
    && php artisan storage:link \
    && chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

# Nginx config
COPY docker/nginx.conf /etc/nginx/http.d/default.conf

# Supervisor config to run both PHP-FPM and Nginx
COPY docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

EXPOSE 80

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
