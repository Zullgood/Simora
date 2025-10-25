import React, { useState, useEffect } from "react";
import { Plus, Search, Edit, Trash2, Car, Calendar, User, Phone, Mail, ChevronLeft, ChevronRight } from "lucide-react";
import DriverModal from '../components/Drivers/DriverModal';
import { driverAPI } from '../services/api';
import Swal from 'sweetalert2';

const Driver = () => {
  const [drivers, setDrivers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDriver, setEditingDriver] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const driversPerPage = 6;

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      const response = await driverAPI.getAll();
      console.log('Drivers API response:', response.data);
      const driversData = response.data.data || response.data || [];
      setDrivers(driversData);
    } catch (err) {
      console.error("Error fetching drivers:", err);
    }
  };

  const filteredDrivers = drivers.filter((driver) => {
    const matchesSearch =
      driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (driver.email && driver.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (driver.phone && driver.phone.includes(searchTerm));
    const matchesStatus =
      statusFilter === "all" || driver.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredDrivers.length / driversPerPage);
  const indexOfLastDriver = currentPage * driversPerPage;
  const indexOfFirstDriver = indexOfLastDriver - driversPerPage;
  const currentDrivers = filteredDrivers.slice(indexOfFirstDriver, indexOfLastDriver);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  const handleAddDriver = () => {
    setEditingDriver(null);
    setIsModalOpen(true);
  };
  
  const handleEditDriver = (driver) => {
    setEditingDriver(driver);
    setIsModalOpen(true);
  };

  const handleDeleteDriver = async (id) => {
    const result = await Swal.fire({
      title: 'Konfirmasi Hapus',
      text: 'Apakah Anda yakin ingin menghapus supir ini?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, Hapus',
      cancelButtonText: 'Batal',
      confirmButtonColor: '#ef4444'
    });
    
    if (result.isConfirmed) {
      try {
        const response = await driverAPI.delete(id);
        if (response.data.success) {
          fetchDrivers();
          Swal.fire({
            icon: 'success',
            title: 'Berhasil!',
            text: 'Data supir berhasil dihapus!'
          });
        }
      } catch (err) {
        console.error("Gagal hapus driver:", err);
        Swal.fire({
          icon: 'error',
          title: 'Gagal!',
          text: 'Gagal menghapus data supir'
        });
      }
    }
  };

  const handleSaveDriver = async (driverData) => {
    try {
      // Validasi data sebelum dikirim
      if (!driverData.name?.trim() || !driverData.email?.trim() || !driverData.phone?.trim() || !driverData.licenseNumber?.trim() || !driverData.licenseExpiry) {
        Swal.fire({
          icon: 'warning',
          title: 'Peringatan',
          text: 'Semua field wajib diisi!'
        });
        return;
      }
      
      // Konversi field names untuk backend (camelCase yang diharapkan controller)
      const backendData = {
        name: driverData.name?.trim() || '',
        email: driverData.email?.trim() || '',
        phone: driverData.phone?.trim() || '',
        licenseNumber: driverData.licenseNumber?.trim() || '',
        licenseExpiry: driverData.licenseExpiry || '',
        address: driverData.address?.trim() || '',
        status: driverData.status || 'active',
        joinDate: driverData.joinDate || new Date().toISOString().split('T')[0]
      };
      
      // Debug: cek apakah ada field kosong
      console.log('Field validation:');
      console.log('name:', backendData.name);
      console.log('email:', backendData.email);
      console.log('phone:', backendData.phone);
      console.log('licenseNumber:', backendData.licenseNumber);
      console.log('licenseExpiry:', backendData.licenseExpiry);
      
      // Include photo if provided
      if (driverData.photo) {
        backendData.photo = driverData.photo;
      }
      
      console.log('Sending data to backend:', backendData);
      console.log('Data size:', JSON.stringify(backendData).length, 'bytes');
      console.log('API endpoint:', editingDriver ? `PUT /drivers/${editingDriver.id}` : 'POST /drivers');
      
      let response;
      if (editingDriver) {
        response = await driverAPI.update(editingDriver.id, backendData);
      } else {
        response = await driverAPI.create(backendData);
      }
      
      console.log('Backend response:', response.data);
      
      if (response.data?.success !== false && (response.status === 200 || response.status === 201)) {
        fetchDrivers();
        setIsModalOpen(false);
        setEditingDriver(null);
        Swal.fire({
          icon: 'success',
          title: 'Berhasil!',
          text: editingDriver ? 'Data supir berhasil diupdate!' : 'Supir baru berhasil ditambahkan!'
        });
      }
    } catch (error) {
      console.error('Full error object:', error);
      console.error('Error response:', error.response);
      console.error('Error response data:', error.response?.data);
      console.error('Error status:', error.response?.status);
      
      let errorMessage = 'Gagal menyimpan data supir';
      
      if (error.response?.data) {
        // Log full backend response
        console.error('Backend error details:', JSON.stringify(error.response.data, null, 2));
        
        if (error.response.data.message) {
          if (error.response.data.message.includes('MySQL server has gone away')) {
            errorMessage = 'Koneksi database terputus. Silakan restart backend dan coba lagi.';
          } else if (error.response.data.message.includes('Duplicate entry')) {
            errorMessage = 'Email atau nomor telepon sudah digunakan.';
          } else if (error.response.data.message.includes('validation')) {
            errorMessage = 'Data tidak valid. Periksa kembali form.';
          } else {
            errorMessage = error.response.data.message;
          }
        } else if (error.response.data.errors) {
          // Laravel validation errors
          const validationErrors = Object.values(error.response.data.errors).flat();
          errorMessage = 'Validation Error: ' + validationErrors.join(', ');
        } else {
          errorMessage = 'Server Error (500): ' + JSON.stringify(error.response.data);
        }
      } else if (error.code === 'ECONNREFUSED') {
        errorMessage = 'Backend tidak berjalan. Pastikan server Laravel aktif di http://localhost:8000';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage
      });
      throw error;
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800', text: 'Tersedia' },
      inactive: { color: 'bg-gray-100 text-gray-800', text: 'Tidak Aktif' },
      on_duty: { color: 'bg-blue-100 text-blue-800', text: 'Sedang Bertugas' },
      booked: { color: 'bg-blue-100 text-blue-800', text: 'Sedang Bertugas' },
    };
    
    const config = statusConfig[status] || statusConfig.active;
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
        {config.text}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Daftar Supir</h1>
          <p className="text-gray-600 mt-2">Kelola data supir perusahaan</p>
        </div>
        <button
          onClick={handleAddDriver}
          className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto"
        >
          <Plus className="w-5 h-5" />
          <span>Tambah Supir</span>
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
                placeholder="Cari supir..."
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
              <option value="active">Tersedia</option>
              <option value="on_duty">Sedang Bertugas</option>
              <option value="inactive">Tidak Aktif</option>
            </select>
          </div>
        </div>
      </div>

      {/* Drivers Grid - Responsive Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
        {currentDrivers.map((driver, index) => (
          <div 
            key={driver.id} 
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-fade-in group"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="p-4 sm:p-5 md:p-6 group-hover:bg-gray-50 transition-colors duration-300">
              {/* Driver Header - Mobile Optimized */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  {driver.photo ? (
                    <img 
                      src={driver.photo.startsWith('data:') ? driver.photo : `data:image/jpeg;base64,${driver.photo}`}
                      alt={driver.name}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-gray-200 flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center flex-shrink-0 group-hover:from-blue-200 group-hover:to-blue-300 group-hover:scale-110 transition-all duration-300">
                      <span className="text-blue-600 font-medium text-sm sm:text-lg group-hover:text-blue-700 transition-colors duration-200">
                        {driver.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors duration-200">{driver.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-500 truncate group-hover:text-gray-600 transition-colors duration-200">{driver.license_number || 'No SIM'}</p>
                  </div>
                </div>
                <div className="flex-shrink-0 ml-2 transform group-hover:scale-105 transition-transform duration-200">
                  {getStatusBadge(driver.status)}
                </div>
              </div>

              {/* Driver Details - Compact for Mobile */}
              <div className="space-y-2 sm:space-y-3 mb-4">
                <div className="flex items-center space-x-2 text-xs sm:text-sm">
                  <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
                  <span className="text-gray-600 flex-shrink-0">Telepon:</span>
                  <span className="font-medium truncate">{driver.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-xs sm:text-sm">
                  <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
                  <span className="text-gray-600 flex-shrink-0">Email:</span>
                  <span className="font-medium truncate">{driver.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-xs sm:text-sm">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
                  <span className="text-gray-600 flex-shrink-0">Bergabung:</span>
                  <span className="font-medium">
                    {driver.join_date ? new Date(driver.join_date).toLocaleDateString('id-ID') : '-'}
                  </span>
                </div>
              </div>

              {/* Info Cards - Responsive */}
              <div className="space-y-2 sm:space-y-3 mb-4">
                {/* SIM Info */}
                <div className="bg-gray-50 rounded-lg p-2 sm:p-3">
                  <p className="text-xs text-gray-600 mb-1">Info SIM:</p>
                  <div className="flex flex-col sm:flex-row sm:justify-between text-xs sm:text-sm">
                    <span className="text-gray-900">No: {driver.license_number || '-'}</span>
                    <span className="text-gray-600">Berlaku: {driver.license_expiry || '-'}</span>
                  </div>
                </div>

                {/* Address Info - Only show if exists */}
                {driver.address && (
                  <div className="bg-gray-50 rounded-lg p-2 sm:p-3">
                    <p className="text-xs text-gray-600 mb-1">Alamat:</p>
                    <p className="text-xs sm:text-sm text-gray-700 line-clamp-2">{driver.address}</p>
                  </div>
                )}
              </div>

              {/* Actions - Responsive */}
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => handleEditDriver(driver)}
                  className="flex-1 flex items-center justify-center space-x-2 bg-blue-50 text-blue-600 py-2.5 px-3 rounded-lg hover:bg-blue-100 hover:scale-105 transition-all duration-200 text-sm font-medium transform"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredDrivers.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200 animate-fade-in">
          <div className="text-gray-500">
            <div className="animate-bounce">
              <User className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            </div>
            <p className="text-lg mb-2">Tidak ada supir yang ditemukan</p>
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

      {/* Modal */}
      <DriverModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveDriver}
        driver={editingDriver}
        isEdit={!!editingDriver}
      />
    </div>
  );
};

export default Driver;





