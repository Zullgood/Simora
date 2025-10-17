import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const EmployeeModal = ({ isOpen, onClose, onSave, employee = null, isEdit = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    employeeId: '',
    nik: '',
    password: '',
    createAccount: false,
    photo: '',
    department: '',
    position: '',
    hireDate: '',
    address: '',
    emergencyContact: '',
    emergencyPhone: '',
    status: 'active'
  });
  
  // State untuk menyimpan pesan error
  const [error, setError] = useState('');

  // Generate employee ID otomatis
  const generateEmployeeId = () => {
    const timestamp = Date.now().toString().slice(-6);
    return `EMP${timestamp}`;
  };

  useEffect(() => {
    // Reset state saat modal dibuka atau ditutup
    if (!isOpen) {
      setError('');
    }

    if (isEdit && employee) {
      setFormData({
        name: employee.name || '',
        email: employee.email || '',
        phone: employee.phone || '',
        employeeId: employee.employeeId || employee.employee_id || '',
        nik: employee.nik || '',
        password: employee.password || '',
        createAccount: !!(employee.nik && employee.password),
        photo: employee.photo || '',
        department: employee.department || '',
        position: employee.position || '',
        hireDate: employee.hireDate || employee.hire_date || '',
        address: employee.address || '',
        emergencyContact: employee.emergencyContact || employee.emergency_contact || '',
        emergencyPhone: employee.emergencyPhone || employee.emergency_phone || '',
        status: employee.status || 'active'
      });
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        employeeId: generateEmployeeId(),
        nik: '',
        password: '',
        createAccount: false,
        photo: '',
        department: '',
        position: '',
        hireDate: '',
        address: '',
        emergencyContact: '',
        emergencyPhone: '',
        status: 'active'
      });
    }
  }, [isEdit, employee, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Hapus error sebelumnya

    // 1. Validasi email secara lokal di komponen
    // Catatan: Ini harus didukung oleh validasi di backend juga
    const emailToValidate = formData.email.toLowerCase().trim();

    // 2. Lakukan validasi email di sini sebelum onSave dipanggil
    // Anda harus mendapatkan daftar email yang sudah ada dari props
    // atau mengambilnya dari backend. 
    // Saya akan asumsikan Anda memiliki sebuah properti 'existingEmails' dari induk
    // ATAU
    // Anda bisa memindahkan logika validasi email ini ke fungsi 'onSave' di komponen induk
    // agar lebih akurat dan terhindar dari duplikasi data di database.

    // Contoh validasi lokal (jika Anda memiliki daftar email yang sudah ada)
    // const existingEmails = await fetchExistingEmails();
    // if (existingEmails.some(e => e.toLowerCase() === emailToValidate && employee?.email.toLowerCase() !== emailToValidate)) {
    //   setError('Email ini sudah digunakan. Mohon gunakan email lain.');
    //   return;
    // }

    // Validasi akun Android
    if (formData.createAccount) {
      if (!formData.nik || formData.nik.trim() === '') {
        setError('NIK harus diisi untuk membuat akun Android');
        return;
      }
      if (!formData.password || formData.password.trim() === '') {
        setError('Password harus diisi untuk membuat akun Android');
        return;
      }
    }
    
    // Panggil fungsi onSave yang ada di komponen induk
    // onSave seharusnya menangani validasi email dan menyimpan data
    try {
      await onSave(formData);
      // onSave akan melempar error jika ada duplikasi email,
      // sehingga tidak akan mencapai baris ini jika gagal.
      onClose(); // Hanya tutup modal jika penyimpanan berhasil
    } catch (err) {
      console.error(err);
      // Tangani error yang dilempar dari onSave (komponen induk)
      setError(err.message || 'Terjadi kesalahan saat menyimpan data.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {isEdit ? 'Edit Pegawai' : 'Tambah Pegawai Baru'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Upload Foto */}
          <div className="flex justify-center mb-6">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-3 overflow-hidden">
                {formData.photo ? (
                  <img src={formData.photo} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-gray-400 text-2xl">
                    {formData.name ? formData.name.split(' ').map(n => n[0]).join('').toUpperCase() : '👤'}
                  </span>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    if (file.size > 1 * 1024 * 1024) {
                      setError('Ukuran file terlalu besar. Maksimal 1MB.');
                      return;
                    }
                    
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    const img = new Image();
                    
                    img.onload = () => {
                      const maxSize = 200;
                      let { width, height } = img;
                      
                      if (width > height) {
                        if (width > maxSize) {
                          height = (height * maxSize) / width;
                          width = maxSize;
                        }
                      } else {
                        if (height > maxSize) {
                          width = (width * maxSize) / height;
                          height = maxSize;
                        }
                      }
                      
                      canvas.width = width;
                      canvas.height = height;
                      
                      ctx.drawImage(img, 0, 0, width, height);
                      
                      const compressedBase64 = canvas.toDataURL('image/jpeg', 0.5);
                      setFormData(prev => ({ ...prev, photo: compressedBase64 }));
                    };
                    
                    const reader = new FileReader();
                    reader.onload = (ev) => {
                      img.src = ev.target.result;
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="hidden"
                id="employee-photo-upload"
              />
              <label
                htmlFor="employee-photo-upload"
                className="cursor-pointer bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-sm hover:bg-blue-100 transition-colors"
              >
                Upload Foto
              </label>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
              <input
                type="text"
                name="name"
                placeholder="Masukan nama anda"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                placeholder="namaanda@gmail.com"
                value={formData.email}
                onChange={(e) => {
                  handleChange(e);
                  if (error && error.includes('email')) {
                    setError(''); // Clear error saat user mulai mengetik
                  }
                }}
                required
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 ${
                  error && error.toLowerCase().includes('email') 
                    ? 'border-red-500 focus:ring-red-500 bg-red-50' 
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
              />
              {error && error.toLowerCase().includes('email') && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Telepon</label>
              <input
                type="tel"
                name="phone"
                placeholder="081234567890"
                value={formData.phone}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, ''); // Only allow digits
                  if (value.length <= 12) {
                    handleChange({ target: { name: 'phone', value } });
                  }
                }}
                maxLength="12"
                pattern="[0-9]{1,12}"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ID Pegawai</label>
              <input
                type="text"
                name="employeeId"
                value={formData.employeeId}
                onChange={handleChange}
                required
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">NIK</label>
              <input
                type="text"
                name="nik"
                placeholder="0897654321234567"
                value={formData.nik}
                onChange={handleChange}
                maxLength="16"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Departemen</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Pilih Departemen</option>
                <option value="HRD/GA">HRD/GA</option>
                <option value="IT">IT</option>
                <option value="Marketing">Marketing</option>
                <option value="Legal">Legal</option>
                <option value="TOM">TOM</option>
                <option value="Finance Accounting">Finance Accounting</option>
                <option value="Comdev">Comdev</option>
                <option value="P&D">P&D</option>
                <option value="Surveyor">Surveyor</option>
                <option value="Konstruksi">Konstruksi</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Posisi/Jabatan</label>
              <select
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Pilih Jabatan</option>
                <option value="Manajer">Manajer</option>
                <option value="Head Section">Head Section</option>
                <option value="Supervisor">Supervisor</option>
                <option value="Staff">Staff</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Bergabung</label>
              <input
                type="date"
                name="hireDate"
                value={formData.hireDate}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
              <textarea
                name="address"
                placeholder="Jl. Kp. Gg."
                value={formData.address}
                onChange={handleChange}
                rows={3}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <option value="active">Aktif</option>
                <option value="inactive">Tidak Aktif</option>
                <option value="resigned">Resign</option>
                <option value="terminated">Dipecat</option>
              </select>
            </div>
          </div>

          {/* Android Account Section */}
          <div className="border-t pt-4">
            <div className="flex items-center space-x-3 mb-4">
              <input
                type="checkbox"
                name="createAccount"
                checked={formData.createAccount}
                onChange={(e) => setFormData(prev => ({ ...prev, createAccount: e.target.checked }))}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="text-sm font-medium text-gray-700">
                Buat akun Android untuk pegawai ini
              </label>
            </div>
            
            {formData.createAccount && (
              <div className="bg-blue-50 rounded-lg p-4 space-y-4">
                <h4 className="font-medium text-blue-900 mb-3">Akun Login Android</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password Login</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Password untuk login Android"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      required={formData.createAccount}
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={() => {
                        const randomPassword = Math.random().toString(36).slice(-8);
                        setFormData(prev => ({ ...prev, password: randomPassword }));
                      }}
                      className="px-3 py-2 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                    >
                      Generate Password
                    </button>
                  </div>
                </div>
                <div className="text-sm text-blue-700 bg-blue-100 p-3 rounded">
                  <p><strong>Login Info:</strong></p>
                  <p>Username: {formData.nik || 'NIK akan digunakan sebagai username'}</p>
                  <p>Password: {formData.password || 'Password akan ditampilkan setelah dibuat'}</p>
                </div>
              </div>
            )}
          </div>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              {isEdit ? 'Update' : 'Simpan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeModal;