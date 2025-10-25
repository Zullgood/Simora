# Fitur Input Nama Penumpang

## Deskripsi
Fitur baru yang memungkinkan input nama-nama penumpang berdasarkan jumlah penumpang yang dipilih saat membuat booking.

## Cara Kerja

### 1. Input Jumlah Penumpang
- User memilih jumlah penumpang (1-8 orang)
- Form akan otomatis menampilkan field input sesuai jumlah penumpang

### 2. Input Nama Penumpang
- Setiap penumpang memiliki field input terpisah
- Label: "Nama Pegawai 1", "Nama Pegawai 2", dst.
- Semua field nama penumpang wajib diisi (required)

### 3. Penyimpanan Data
- Nama penumpang disimpan sebagai string yang dipisahkan koma
- Contoh: "John Doe, Jane Smith, Bob Wilson"

## Implementasi

### Frontend (BookingManagement.jsx)
```javascript
// State untuk menyimpan nama penumpang
passengerNames: ['']

// Update jumlah penumpang dan array nama
onChange={(e) => {
  const count = parseInt(e.target.value) || 1;
  const newNames = Array(count).fill('').map((_, i) => formData.passengerNames[i] || '');
  setFormData({...formData, passengers: count, passengerNames: newNames});
}}

// Render input fields berdasarkan jumlah penumpang
{Array.from({ length: formData.passengers }, (_, index) => (
  <input
    placeholder={`Nama Pegawai ${index + 1}`}
    value={formData.passengerNames[index] || ''}
    onChange={(e) => {
      const newNames = [...formData.passengerNames];
      newNames[index] = e.target.value;
      setFormData({...formData, passengerNames: newNames});
    }}
    required
  />
))}
```

### Backend Changes

1. **Migration**: `2025_01_21_000008_add_passenger_names_to_bookings_table.php`
   - Menambahkan kolom `passenger_names` (text, nullable)

2. **Model Booking**: Menambahkan `passenger_names` ke fillable array

3. **BookingController**: Menambahkan validasi untuk `passenger_names`

### Database Structure
```sql
ALTER TABLE bookings ADD COLUMN passenger_names TEXT NULL;
```

## Tampilan

### Form Input
```
Jumlah Penumpang: [3]

Nama Penumpang:
┌─────────────────────────┐
│ Nama Pegawai 1          │
├─────────────────────────┤
│ Nama Pegawai 2          │
├─────────────────────────┤
│ Nama Pegawai 3          │
└─────────────────────────┘
```

### Tampilan di Tabel
```
Tujuan: Jakarta
3 penumpang
John Doe, Jane Smith, Bob Wilson
```

## Validasi
- Jumlah penumpang: 1-8 orang
- Nama penumpang: wajib diisi untuk setiap penumpang
- Data disimpan sebagai string dengan pemisah koma

## Testing
1. Buat booking baru
2. Pilih jumlah penumpang (misal: 3)
3. Isi nama untuk setiap penumpang
4. Submit form
5. Verifikasi data tersimpan dan ditampilkan dengan benar

Fitur ini meningkatkan akurasi data booking dengan mencatat siapa saja yang akan menggunakan kendaraan.