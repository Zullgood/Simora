import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const CarModal = ({ isOpen, onClose, onSave, car = null, isEdit = false }) => {
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: '',
    license_plate: '',
    color: '',
    capacity: '',
    fuel_type: 'gasoline',
    transmission: 'manual',
    status: 'available',
    mileage: '',
    last_service: '',
    next_service: '',
    photo: null
  });

  useEffect(() => {
    if (isEdit && car) {
      setFormData({
        brand: car.brand || '',
        model: car.model || '',
        year: car.year || '',
        license_plate: car.license_plate || car.licensePlate || '',
        color: car.color || '',
        capacity: car.capacity || '',
        fuel_type: car.fuel_type || car.fuelType || 'gasoline',
        transmission: car.transmission || 'manual',
        status: car.status || 'available',
        mileage: car.mileage || '',
        last_service: car.last_service || car.lastService || '',
        next_service: car.next_service || car.nextService || '',
        photo: car.photo || null
      });
    } else {
      setFormData({
        brand: '',
        model: '',
        year: '',
        license_plate: '',
        color: '',
        capacity: '',
        fuel_type: 'gasoline',
        transmission: 'manual',
        status: 'available',
        mileage: '',
        last_service: '',
        next_service: '',
        photo: null
      });
    }
  }, [isEdit, car, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Hapus field kosong/null biar tidak ngirim data kotor
    const cleanData = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value !== '' && value !== null)
    );

    onSave(cleanData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {isEdit ? 'Edit Mobil' : 'Tambah Mobil Baru'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Upload Foto */}
          <div className="flex justify-center mb-6">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center mb-3 overflow-hidden">
                {formData.photo ? (
                  <img src={formData.photo} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-gray-400 text-2xl">🚗</span>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (ev) => {
                      setFormData(prev => ({ ...prev, photo: ev.target.result }));
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="hidden"
                id="car-photo-upload"
              />
              <label
                htmlFor="car-photo-upload"
                className="cursor-pointer bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-sm hover:bg-blue-100 transition-colors"
              >
                Upload Foto Mobil
              </label>
            </div>
          </div>
          
          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Merek */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Merek</label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Model */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Tahun */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tahun</label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                min="1990"
                max="2024"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Plat Nomor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Plat</label>
              <input
                type="text"
                name="license_plate"
                value={formData.license_plate}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Warna */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Warna</label>
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Kapasitas */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kapasitas (Orang)</label>
              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                min="1"
                max="20"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Fuel Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Bahan Bakar</label>
              <select
                name="fuel_type"
                value={formData.fuel_type}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <option value="gasoline">Bensin</option>
                <option value="diesel">Solar</option>
                <option value="electric">Listrik</option>
                <option value="hybrid">Hibrida</option>
              </select>
            </div>

            {/* Transmission */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Transmisi</label>
              <select
                name="transmission"
                value={formData.transmission}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <option value="manual">Manual</option>
                <option value="automatic">Otomatis</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <option value="available">Tersedia</option>
                <option value="booked">Dipesan</option>
                <option value="maintenance">Perawatan</option>
                <option value="out_of_service">Tidak Beroperasi</option>
              </select>
            </div>

            {/* Mileage */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kilometer</label>
              <input
                type="number"
                name="mileage"
                value={formData.mileage}
                onChange={handleChange}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Last Service */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Service Terakhir</label>
              <input
                type="date"
                name="last_service"
                value={formData.last_service}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Next Service */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Service Berikutnya</label>
              <input
                type="date"
                name="next_service"
                value={formData.next_service}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
            >
              {isEdit ? 'Update' : 'Simpan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CarModal;








