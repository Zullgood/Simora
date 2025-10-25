# Pemisahan Admin dan Employee

## Masalah
Sebelumnya, ketika menambah admin melalui AdminModal, data tersimpan di database `users` tetapi muncul di daftar pegawai karena menggunakan API yang sama (`employeeAPI`).

## Solusi
Telah dibuat pemisahan yang jelas antara admin dan employee:

### Backend Changes

1. **AdminUserController.php** - Controller baru untuk mengelola admin users
   - `GET /api/admin-users` - Mengambil semua admin
   - `POST /api/admin-users` - Membuat admin baru
   - `PUT /api/admin-users/{id}` - Update admin
   - `DELETE /api/admin-users/{id}` - Hapus admin

2. **Migration** - Menambahkan kolom `status` ke tabel `users`
   - `2025_01_21_000006_add_status_to_users_table.php`

3. **Routes** - Menambahkan routes untuk admin-users di `api.php`

### Frontend Changes

1. **Employees.jsx**
   - `fetchEmployees()` - Sekarang mengambil data dari 2 endpoint terpisah:
     - `employeeAPI.getAll()` untuk pegawai
     - `adminUserAPI.getAll()` untuk admin
   - `handleSaveEmployee()` - Memisahkan logika save berdasarkan role:
     - Admin menggunakan `adminUserAPI`
     - Employee menggunakan `employeeAPI`
   - `handleDeleteEmployee()` - Mendeteksi role dan menggunakan API yang sesuai

2. **Data Structure**
   - Admin ditandai dengan `role: 'admin'`
   - Admin mendapat `employeeId` otomatis: `ADM-{id}`
   - Data admin dan employee digabung untuk ditampilkan dalam satu list

### Cara Kerja

1. **Menambah Admin:**
   - Klik "Tambah Admin" → AdminModal terbuka
   - Data dikirim ke `/api/admin-users` (tabel `users`)
   - Admin muncul di daftar dengan badge "Admin"

2. **Menambah Employee:**
   - Klik "Tambah Pegawai" → EmployeeModal terbuka  
   - Data dikirim ke `/api/employees` (tabel `employees`)
   - Employee muncul di daftar sebagai pegawai biasa

3. **Edit/Delete:**
   - System otomatis mendeteksi role
   - Menggunakan API yang sesuai berdasarkan role

### Database Structure

- **Table `users`**: Menyimpan admin users
  - Kolom: id, name, email, password, role, department, position, status
  
- **Table `employees`**: Menyimpan employee data
  - Kolom: id, name, email, phone, employee_id, department, position, dll

### Testing

Untuk test backend:
```bash
# Jalankan server
php artisan serve

# Test endpoint admin
curl -X GET "http://localhost:8000/api/admin-users"
```

Sekarang admin dan employee sudah terpisah dengan jelas dan tidak akan saling tercampur lagi.