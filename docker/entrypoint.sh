#!/bin/sh
set -e

# Create the public/storage symlink if it doesn't exist yet.
if [ ! -L /var/www/public/storage ]; then
    php artisan storage:link
fi

# Discover packages and cache Laravel artifacts using the runtime environment.
# This MUST happen at runtime (not build time) so Dokploy-injected env vars are used.
php artisan package:discover --ansi
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Keep runtime directories writable for the web server user.
chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache /var/www/public/storage

# Run migrations only when explicitly requested. Set RUN_MIGRATIONS=true for the
# very first deploy, or run migrations manually via the Dokploy UI / CLI.
if [ "${RUN_MIGRATIONS:-false}" = "true" ]; then
    php artisan migrate --force
fi

exec "$@"
