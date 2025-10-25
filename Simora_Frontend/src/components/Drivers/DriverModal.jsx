import React, { useState, useEffect } from 'react';
import { X, User, Mail, Phone, CreditCard, Calendar, MapPin, AlertCircle } from 'lucide-react';
import Swal from 'sweetalert2';

const DriverModal = ({ isOpen, onClose, onSave, driver = null, isEdit = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    licenseNumber: '',
    licenseExpiry: '',
    address: '',
    status: 'active',
    joinDate: new Date().toISOString().split('T')[0],
    photo: null
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      setErrors({});
      
      if (isEdit && driver) {
        setFormData({
          name: driver.name || '',
          email: driver.email || '',
          phone: driver.phone || '',
          licenseNumber: driver.license_number || driver.licenseNumber || '',
          licenseExpiry: driver.license_expiry || driver.licenseExpiry || '',
          address: driver.address || '',
          status: driver.status || 'active',
          joinDate: driver.join_date || driver.joinDate || new Date().toISOString().split('T')[0],
          photo: driver.photo || null
        });
      } else {
        setFormData({
          name: '',
          email: '',
          phone: '',
          licenseNumber: '',
          licenseExpiry: '',
          address: '',
          status: 'active',
          joinDate: new Date().toISOString().split('T')[0],
          photo: null
        });
      }
    }
  }, [isEdit, driver, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name || !formData.name.trim()) {
      newErrors.name = 'Nama lengkap wajib diisi';
    }
    
    if (!formData.email || !formData.email.trim()) {
      newErrors.email = 'Email wajib diisi';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }
    
    if (!formData.phone || !formData.phone.trim()) {
      newErrors.phone = 'Nomor telepon wajib diisi';
    } else if (formData.phone.length < 10) {
      newErrors.phone = 'Nomor telepon minimal 10 digit';
    }
    
    if (!formData.licenseNumber || !formData.licenseNumber.trim()) {
      newErrors.licenseNumber = 'Nomor SIM wajib diisi';
    }
    
    if (!formData.licenseExpiry) {
      newErrors.licenseExpiry = 'Tanggal berakhir SIM wajib diisi';
    } else {
      const expiryDate = new Date(formData.licenseExpiry);
      const today = new Date();
      if (expiryDate <= today) {
        newErrors.licenseExpiry = 'Tanggal berakhir SIM harus di masa depan';
      }
    }
    
    if (!formData.address || !formData.address.trim()) {
      newErrors.address = 'Alamat wajib diisi';
    }
    
    console.log('Validation errors:', newErrors);
    console.log('Form data:', formData);
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      // Pastikan data tidak terlalu besar
      const dataSize = JSON.stringify(formData).length;
      if (dataSize > 1024 * 1024) { // 1MB limit
        Swal.fire({
          icon: 'error',
          title: 'Data Terlalu Besar',
          text: 'Silakan gunakan foto yang lebih kecil.'
        });
        return;
      }
      
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
      Swal.fire({
        icon: 'error',
        title: 'Gagal Menyimpan',
        text: 'Silakan coba lagi.'
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-lg sm:rounded-xl shadow-2xl w-full max-w-sm sm:max-w-lg max-h-[95vh] sm:max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
            </div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">
              {isEdit ? 'Edit Supir' : 'Tambah Supir Baru'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1.5 sm:p-2 rounded-full transition-colors flex-shrink-0 ml-2"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-5">
          {/* Photo Upload - Responsive */}
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mb-2 sm:mb-3 overflow-hidden">
                {formData.photo ? (
                  <img src={formData.photo} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-gray-400 text-xl sm:text-2xl">
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
                    // Validasi ukuran file (max 2MB)
                    if (file.size > 2 * 1024 * 1024) {
                      Swal.fire({
                        icon: 'error',
                        title: 'Ukuran Terlalu Besar',
                        text: 'Ukuran foto maksimal 2MB'
                      });
                      return;
                    }
                    
                    const reader = new FileReader();
                    reader.onload = (e) => {
                      const img = new Image();
                      img.onload = () => {
                        // Kompresi gambar
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d');
                        
                        // Resize ke maksimal 300x300
                        const maxSize = 300;
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
                        
                        // Konversi ke base64 dengan kualitas 0.7
                        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
                        setFormData(prev => ({ ...prev, photo: compressedDataUrl }));
                      };
                      img.src = e.target.result;
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="hidden"
                id="driver-photo-upload"
              />
              <label
                htmlFor="driver-photo-upload"
                className="cursor-pointer bg-blue-50 text-blue-600 px-2 py-1 sm:px-3 sm:py-1 rounded-lg text-xs sm:text-sm hover:bg-blue-100 transition-colors"
              >
                Upload Foto
              </label>
            </div>
          </div>
          
          {/* Nama Lengkap */}
          <div>
            <label className="flex items-center text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              <User className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-gray-500" />
              Nama Lengkap
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Masukkan nama lengkap"
              className={`w-full px-3 py-2 sm:px-4 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors text-sm sm:text-base ${
                errors.name 
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              }`}
            />
            {errors.name && (
              <div className="flex items-center mt-1 text-xs sm:text-sm text-red-600">
                <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                {errors.name}
              </div>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="flex items-center text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              <Mail className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-gray-500" />
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="contoh@email.com"
              className={`w-full px-3 py-2 sm:px-4 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors text-sm sm:text-base ${
                errors.email 
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              }`}
            />
            {errors.email && (
              <div className="flex items-center mt-1 text-xs sm:text-sm text-red-600">
                <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                {errors.email}
              </div>
            )}
          </div>
          {/* Nomor Telepon */}
          <div>
            <label className="flex items-center text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              <Phone className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-gray-500" />
              Nomor Telepon
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, ''); // Only allow digits
                if (value.length <= 12) {
                  handleChange({ target: { name: 'phone', value } });
                }
              }}
              maxLength="12"
              pattern="[0-9]{1,12}"
              placeholder="081234567890"
              className={`w-full px-3 py-2 sm:px-4 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors text-sm sm:text-base ${
                errors.phone 
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              }`}
            />
            {errors.phone && (
              <div className="flex items-center mt-1 text-xs sm:text-sm text-red-600">
                <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                {errors.phone}
              </div>
            )}
          </div>
        
          {/* Nomor SIM */}
          <div>
            <label className="flex items-center text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              <CreditCard className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-gray-500" />
              Nomor SIM
            </label>
            <input
              type="text"
              name="licenseNumber"
              value={formData.licenseNumber}
              onChange={handleChange}
              placeholder="SIM123456789"
              className={`w-full px-3 py-2 sm:px-4 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors text-sm sm:text-base ${
                errors.licenseNumber 
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              }`}
            />
            {errors.licenseNumber && (
              <div className="flex items-center mt-1 text-xs sm:text-sm text-red-600">
                <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                {errors.licenseNumber}
              </div>
            )}
          </div>

          {/* Tanggal Berakhir SIM */}
          <div>
            <label className="flex items-center text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-gray-500" />
              Tanggal Berakhir SIM
            </label>
            <input
              type="date"
              name="licenseExpiry"
              value={formData.licenseExpiry}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              className={`w-full px-3 py-2 sm:px-4 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors text-sm sm:text-base ${
                errors.licenseExpiry 
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              }`}
            />
            {errors.licenseExpiry && (
              <div className="flex items-center mt-1 text-xs sm:text-sm text-red-600">
                <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                {errors.licenseExpiry}
              </div>
            )}
          </div>

          {/* Alamat */}
          <div>
            <label className="flex items-center text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-gray-500" />
              Alamat
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={2}
              placeholder="Masukkan alamat lengkap"
              className={`w-full px-3 py-2 sm:px-4 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors resize-none text-sm sm:text-base ${
                errors.address 
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              }`}
            />
            {errors.address && (
              <div className="flex items-center mt-1 text-xs sm:text-sm text-red-600">
                <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                {errors.address}
              </div>
            )}
          </div>

          {/* Tanggal Bergabung */}
          <div>
            <label className="flex items-center text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-gray-500" />
              Tanggal Bergabung
            </label>
            <input
              type="date"
              name="joinDate"
              value={formData.joinDate}
              onChange={handleChange}
              max={new Date().toISOString().split('T')[0]}
              className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
            >
              <option value="active">Tersedia</option>
              <option value="on_duty">Sedang Bertugas</option>
              <option value="inactive">Tidak Aktif</option>
            </select>
          </div>

          {/* Buttons - Responsive */}
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-4 sm:pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 sm:px-6 sm:py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm sm:text-base"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 sm:px-6 sm:py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm sm:text-base"
            >
              {isEdit ? 'Update Supir' : 'Tambah Supir'}
            </button>
          </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DriverModal;