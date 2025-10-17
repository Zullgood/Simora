import React, { useEffect, useState } from "react";
import { Plus, Search, Edit, Trash2, CarFront, Fuel, Gauge, Users, Calendar, ChevronLeft, ChevronRight, Eye, X, Wrench } from "lucide-react";
import CarModal from '../components/Cars/CarModal';
import { carAPI } from '../services/api';
import Swal from 'sweetalert2';

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 6;

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await carAPI.getAll();
      console.log('Cars API response:', response.data);
      const carsData = response.data.data || response.data || [];
      setCars(carsData);
    } catch (err) {
      console.error("Error fetching cars:", err);
      setCars([]);
    }
  };

  const filteredCars = cars.filter(car => {
    const matchesSearch =
      car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (car.license_plate || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || car.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Logika Paginasi
  const totalPages = Math.ceil(filteredCars.length / carsPerPage);
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleAddCar = () => {
    setEditingCar(null);
    setIsModalOpen(true);
  };

  const handleEditCar = (car) => {
    setEditingCar(car);
    setIsModalOpen(true);
  };
  
  const handleViewDetail = (car) => {
    setSelectedCar(car);
    setIsDetailModalOpen(true);
  };

  const handleDeleteCar = async (id) => {
    const result = await Swal.fire({
      title: 'Konfirmasi Hapus',
      text: 'Apakah Anda yakin ingin menghapus mobil ini?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, Hapus',
      cancelButtonText: 'Batal',
      confirmButtonColor: '#ef4444'
    });
    
    if (result.isConfirmed) {
      try {
        const response = await carAPI.delete(id);
        if (response.data.success) {
          fetchCars();
          Swal.fire({
            icon: 'success',
            title: 'Berhasil!',
            text: 'Data mobil berhasil dihapus!'
          });
        }
      } catch (error) {
        console.error('Error deleting car:', error.response?.data);
        Swal.fire({
          icon: 'error',
          title: 'Gagal!',
          text: 'Gagal menghapus data mobil'
        });
      }
    }
  };

  const handleSaveCar = async (carData) => {
    try {
      if (editingCar) {
        const response = await carAPI.update(editingCar.id, carData);
        if (response.data.success) {
          fetchCars();
          setIsModalOpen(false);
          setEditingCar(null);
          Swal.fire({
            icon: 'success',
            title: 'Berhasil!',
            text: 'Data mobil berhasil diupdate!'
          });
        }
      } else {
        const response = await carAPI.create(carData);
        if (response.data.success) {
          fetchCars();
          setIsModalOpen(false);
          setEditingCar(null);
          Swal.fire({
            icon: 'success',
            title: 'Berhasil!',
            text: 'Mobil baru berhasil ditambahkan!'
          });
        }
      }
    } catch (error) {
      console.error('Error saving car:', error.response?.data);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Gagal menyimpan data mobil'
      });
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      available: { color: 'bg-green-100 text-green-800', text: 'Tersedia' },
      booked: { color: 'bg-blue-100 text-blue-800', text: 'Dipesan' },
      maintenance: { color: 'bg-yellow-100 text-yellow-800', text: 'Perawatan' },
      out_of_service: { color: 'bg-red-100 text-red-800', text: 'Tidak Beroperasi' }
    };

    const config = statusConfig[status] || statusConfig.available;
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
        {config.text}
      </span>
    );
  };

  const getFuelTypeText = (fuelType) => {
    const fuelTypes = {
      gasoline: 'Bensin',
      diesel: 'Solar',
      electric: 'Listrik',
      hybrid: 'Hibrida'
    };
    return fuelTypes[fuelType] || fuelType;
  };

  const getTransmissionText = (transmission) => {
    return transmission === 'manual' ? 'Manual' : 'Otomatis';
  };
  


  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Daftar Mobil</h1>
          <p className="text-gray-600 mt-2">Kelola data kendaraan perusahaan</p>
        </div>
        <button
          onClick={handleAddCar}
          className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto"
        >
          <Plus className="w-5 h-5" />
          <span>Tambah Mobil</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Cari mobil..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Semua Status</option>
              <option value="available">Tersedia</option>
              <option value="booked">Dipesan</option>
              <option value="maintenance">Perawatan</option>
              <option value="out_of_service">Tidak Beroperasi</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Cars Grid - Responsive Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
        {currentCars.map((car, index) => (
          <div 
            key={car.id} 
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-fade-in group"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Car Image */}
            <div className="relative overflow-hidden">
              {car.photo ? (
                <img
                  src={car.photo}
                  alt={`${car.brand} ${car.model}`}
                  className="w-full h-50 sm:h-52 md:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-48 sm:h-52 md:h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center group-hover:from-blue-200 group-hover:to-blue-300 transition-all duration-300">
                  <CarFront className="w-16 h-16 sm:w-20 sm:h-20 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
                </div>
              )}
              {/* Status Badge on Image */}
              <div className="absolute top-3 right-3 transform group-hover:scale-105 transition-transform duration-200">
                {getStatusBadge(car.status)}
              </div>
              {/* Overlay effect */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
            </div>
            
            <div className="p-4 sm:p-5 md:p-6 group-hover:bg-gray-50 transition-colors duration-300">
              {/* Car Header */}
              <div className="mb-4">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors duration-200">
                  {car.brand} {car.model}
                </h3>
                <p className="text-sm text-gray-500 mt-1 group-hover:text-gray-600 transition-colors duration-200">{car.license_plate}</p>
                
                {/* Additional Info for Mobile */}
                <div className="flex items-center space-x-4 mt-2 text-xs text-gray-600">
                  <span className="flex items-center space-x-1 group-hover:text-blue-600 transition-colors duration-200">
                    <Calendar className="w-3 h-3" />
                    <span>{car.year}</span>
                  </span>
                  <span className="flex items-center space-x-1 group-hover:text-blue-600 transition-colors duration-200">
                    <Users className="w-3 h-3" />
                    <span>{car.capacity} orang</span>
                  </span>
                  <span className="flex items-center space-x-1 group-hover:text-blue-600 transition-colors duration-200">
                    <Fuel className="w-3 h-3" />
                    <span>{getFuelTypeText(car.fuel_type)}</span>
                  </span>
                </div>
              </div>

              {/* Actions - Responsive */}
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => handleViewDetail(car)}
                  className="flex-1 flex items-center justify-center space-x-2 bg-gray-50 text-gray-600 py-2.5 px-3 rounded-lg hover:bg-gray-100 hover:scale-105 transition-all duration-200 text-sm font-medium transform"
                >
                  <Eye className="w-4 h-4" />
                  <span>Detail</span>
                </button>
                <button
                  onClick={() => handleEditCar(car)}
                  className="flex-1 flex items-center justify-center space-x-2 bg-blue-50 text-blue-600 py-2.5 px-3 rounded-lg hover:bg-blue-100 hover:scale-105 transition-all duration-200 text-sm font-medium transform"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDeleteCar(car.id)}
                  className="flex-1 flex items-center justify-center space-x-2 bg-red-50 text-red-600 py-2.5 px-3 rounded-lg hover:bg-red-100 hover:scale-105 transition-all duration-200 text-sm font-medium transform"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Hapus</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCars.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200 animate-fade-in">
          <div className="text-gray-500">
            <div className="animate-bounce">
              <CarFront className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            </div>
            <p className="text-lg mb-2">Tidak ada mobil yang ditemukan</p>
            <p className="text-sm">Coba ubah filter atau search term</p>
          </div>
        </div>
      )}

      {/* Pagination - Responsive */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-1 sm:space-x-2 px-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          
          {/* Show limited pages on mobile */}
          <div className="flex space-x-1 sm:space-x-2 overflow-x-auto max-w-xs sm:max-w-none">
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(page => {
                // On mobile, show current page and 2 pages around it
                if (window.innerWidth < 640) {
                  return Math.abs(page - currentPage) <= 1;
                }
                return true;
              })
              .map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-2 py-2 sm:px-3 sm:py-2 rounded-lg text-sm ${
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))
            }
          </div>
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      )}
      
      {/* Page Info for Mobile */}
      {totalPages > 1 && (
        <div className="text-center text-sm text-gray-500 sm:hidden">
          Halaman {currentPage} dari {totalPages}
        </div>
      )}

      {/* Modal Edit/Add Car */}
      <CarModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCar}
        car={editingCar}
        isEdit={!!editingCar}
      />
      
      {/* Modal Lihat Detail Mobil - Responsive */}
      {isDetailModalOpen && selectedCar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm" onClick={() => setIsDetailModalOpen(false)}></div>
          
          {/* Modal Content */}
          <div className="relative bg-white rounded-lg sm:rounded-xl shadow-xl w-full max-w-sm sm:max-w-lg max-h-[90vh] overflow-y-auto p-4 sm:p-6 animate-fade-in-up">
            <button
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
              onClick={() => setIsDetailModalOpen(false)}
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            
            {/* Car Image */}
            {selectedCar.photo && (
              <div className="mb-4 sm:mb-6">
                <img
                  src={selectedCar.photo}
                  alt={`${selectedCar.brand} ${selectedCar.model}`}
                  className="w-full h-40 sm:h-48 object-cover rounded-lg"
                />
              </div>
            )}
            
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 pr-8">
              {selectedCar.brand} {selectedCar.model}
            </h2>
            <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">Informasi detail kendaraan.</p>

            <div className="space-y-3 sm:space-y-4 text-gray-700">
              <div className="flex items-center space-x-3">
                <CarFront className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />
                <span className="text-sm sm:text-base">
                  <strong className="font-semibold">Plat Nomor:</strong> {selectedCar.license_plate}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />
                <span className="text-sm sm:text-base">
                  <strong className="font-semibold">Tahun:</strong> {selectedCar.year}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Fuel className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />
                <span className="text-sm sm:text-base">
                  <strong className="font-semibold">Bahan Bakar:</strong> {getFuelTypeText(selectedCar.fuel_type)}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Gauge className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />
                <span className="text-sm sm:text-base">
                  <strong className="font-semibold">Transmisi:</strong> {getTransmissionText(selectedCar.transmission)}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />
                <span className="text-sm sm:text-base">
                  <strong className="font-semibold">Kapasitas:</strong> {selectedCar.capacity} orang
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Gauge className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />
                <span className="text-sm sm:text-base">
                  <strong className="font-semibold">Kilometer:</strong> {selectedCar.mileage || '-'} km
                </span>
              </div>

              {/* Status Badge */}
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"></div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm sm:text-base font-semibold">Status:</span>
                  {getStatusBadge(selectedCar.status)}
                </div>
              </div>

              {/* Informasi Servis */}
              <div className="space-y-2 mt-4 sm:mt-6 p-3 sm:p-4 rounded-lg bg-gray-50">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800">Informasi Servis</h3>
                <div className="flex items-center space-x-3 text-xs sm:text-sm">
                  <Wrench className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
                  <span>
                    <strong className="font-medium">Terakhir:</strong> {selectedCar.last_service ? new Date(selectedCar.last_service).toLocaleDateString("id-ID") : "-"}
                  </span>
                </div>
                <div className="flex items-center space-x-3 text-xs sm:text-sm">
                  <Wrench className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
                  <span>
                    <strong className="font-medium">Berikutnya:</strong> {selectedCar.next_service ? new Date(selectedCar.next_service).toLocaleDateString("id-ID") : "-"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cars;
