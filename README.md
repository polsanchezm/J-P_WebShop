# J&P's Shop

## Dev Installation

### Backend

```bash
cd backend
composer install
cp .env.example .env    # Setup enviroment
```

### Frontend

```bash
cd frontend
npm install
```

## Dev Running

### Backend

```bash
cd backend
php artisan serve
```

### Frontend

```bash
cd frontend
npm run dev
```

## Running with Docker

### Configure enviroment variables
```bash
cp .env.example .env
```

### Create the images
```bash
docker compose build
```

### Create the containers
```bash
docker compose up -d
```


