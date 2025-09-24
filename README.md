# GM Auto

A Laravel 12 application using Inertia.js (React) for the frontend and SQLite for the database. The queue connection is configured to use the database driver.

## Prerequisites

- PHP 8.2+
- Composer 2.x
- Node.js 20+ and npm 10+
- SQLite 3
- Optional: Docker Desktop (if you prefer running via Laravel Sail)

## 1) Local setup (without Docker)

1. Clone the repository and enter the project directory.
2. Copy the environment file:
   - cp .env.example .env
3. Edit .env and set the basics:
   - APP_NAME="GM Auto"
   - APP_URL=http://127.0.0.1:8000
   - DB_CONNECTION=sqlite
   - DB_DATABASE=database/database.sqlite
   - QUEUE_CONNECTION=database
4. Create the SQLite database file:
   - mkdir -p database && touch database/database.sqlite
5. Install dependencies:
   - composer install
   - npm install
6. Generate the application key:
   - php artisan key:generate
7. Run migrations:
   - php artisan migrate
   - If you don’t have queue tables yet, run: php artisan queue:table && php artisan migrate
8. (Optional) Link storage for public files:
   - php artisan storage:link
9. Start the app during development (use separate terminals):
   - Backend API: php artisan serve
   - Frontend dev server: npm run dev
   - Queue worker: php artisan queue:work
10. Open http://127.0.0.1:8000 in your browser.

## 2) Docker setup (Laravel Sail) — optional

Use this if your project includes Sail’s Docker setup.

1. Ensure Docker Desktop is running.
2. Copy .env and configure for SQLite and queue:
   - APP_NAME="GM Auto"
   - DB_CONNECTION=sqlite
   - DB_DATABASE=/var/www/html/database/database.sqlite
   - QUEUE_CONNECTION=database
3. Create the database file on the host:
   - mkdir -p database && touch database/database.sqlite
4. Install dependencies (host machine):
   - composer install
5. Start containers:
   - ./vendor/bin/sail up -d
6. Initialize the app in the container:
   - ./vendor/bin/sail artisan key:generate
   - ./vendor/bin/sail artisan migrate
   - If queue tables are missing: ./vendor/bin/sail artisan queue:table && ./vendor/bin/sail artisan migrate
7. Frontend dev server (inside Sail):
   - ./vendor/bin/sail npm install
   - ./vendor/bin/sail npm run dev
8. Queue worker (inside Sail):
   - ./vendor/bin/sail artisan queue:work
9. Visit http://localhost

## Build for production

- npm run build
- php artisan optimize

Deployments should run migrations and ensure a queue worker is running:
- php artisan migrate --force
- php artisan queue:work --daemon --queue=default --sleep=3 --tries=3
