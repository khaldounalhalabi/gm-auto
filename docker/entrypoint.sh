#!/bin/sh
set -e

# Wipe any stale bootstrap cache files before booting artisan at all.
# If bootstrap/cache/packages.php (or services.php/config.php) references a
# provider that's no longer in vendor/ (e.g. a package removed by a
# composer.lock change), booting Laravel to run ANY artisan command -
# including `package:discover` itself - will crash with a
# "Class ... not found" error. Plain `rm` doesn't need to boot the
# framework, so it's the only way to break that chicken-and-egg deadlock.
rm -f bootstrap/cache/packages.php \
      bootstrap/cache/services.php \
      bootstrap/cache/config.php \
      bootstrap/cache/routes-v7.php

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

# NOTE: no runtime chown here — the container runs as www-data (non-root),
# which can't chown at all. Ownership is set once at build time in the
# Dockerfile. If you later mount a volume over storage/, you'll need to
# either fix perms on the host or switch the Dockerfile back to root +
# do the chown here instead.

# Run migrations only when explicitly requested. Set RUN_MIGRATIONS=true for the
# very first deploy, or run migrations manually via the Dokploy UI / CLI.
if [ "${RUN_MIGRATIONS:-false}" = "true" ]; then
    php artisan migrate --force
fi

# exec replaces the shell process with Octane, so it becomes PID 1 and
# receives SIGTERM directly from Docker/Dokploy for a clean shutdown.
exec php artisan octane:frankenphp --port=80
