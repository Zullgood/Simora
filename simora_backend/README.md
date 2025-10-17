# Simora Backend API

Laravel backend API untuk aplikasi booking mobil perusahaan Simora.

## Setup

1. Install dependencies:
```bash
composer install
```

2. Copy environment file:
```bash
cp .env.example .env
```

3. Configure database di `.env`:
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=simora_db
DB_USERNAME=root
DB_PASSWORD=
```

4. Generate application key:
```bash
php artisan key:generate
```

5. Run migrations dan seeder:
```bash
php artisan migrate --seed
```

6. Start server:
```bash
php artisan serve
```

## Default Users

- **Super Admin**: admin@simora.com / password
- **HRD Admin**: hrd@simora.com / password

## API Endpoints

### Authentication
- `POST /api/login` - Login
- `POST /api/logout` - Logout
- `GET /api/user` - Get current user

### Employees
- `GET /api/employees` - List employees
- `POST /api/employees` - Create employee
- `GET /api/employees/{id}` - Get employee
- `PUT /api/employees/{id}` - Update employee
- `DELETE /api/employees/{id}` - Delete employee

### Drivers
- `GET /api/drivers` - List drivers
- `POST /api/drivers` - Create driver
- `GET /api/drivers/{id}` - Get driver
- `PUT /api/drivers/{id}` - Update driver
- `DELETE /api/drivers/{id}` - Delete driver

### Cars
- `GET /api/cars` - List cars
- `POST /api/cars` - Create car
- `GET /api/cars/{id}` - Get car
- `PUT /api/cars/{id}` - Update car
- `DELETE /api/cars/{id}` - Delete car

### Bookings
- `GET /api/bookings` - List bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings/{id}` - Get booking
- `PUT /api/bookings/{id}` - Update booking
- `DELETE /api/bookings/{id}` - Delete booking
- `PATCH /api/bookings/{id}/approve` - Approve booking
- `PATCH /api/bookings/{id}/reject` - Reject booking

### Admin Users (Super Admin only)
- `GET /api/admin-users` - List admin users
- `POST /api/admin-users` - Create admin user
- `GET /api/admin-users/{id}` - Get admin user
- `PUT /api/admin-users/{id}` - Update admin user
- `DELETE /api/admin-users/{id}` - Delete admin user

## CORS Configuration

Add to `config/cors.php` for frontend integration:
```php
'paths' => ['api/*'],
'allowed_methods' => ['*'],
'allowed_origins' => ['http://localhost:5173'],
'allowed_headers' => ['*'],
```