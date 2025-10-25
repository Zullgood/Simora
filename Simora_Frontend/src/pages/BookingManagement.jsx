import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, XCircle, Clock, User, Car, Calendar, MapPin, 
  Plus, Edit, Trash2, Eye, Filter, Search, ChevronLeft, ChevronRight 
} from 'lucide-react';
import { driverAPI, employeeAPI, bookingAPI, carAPI } from '../services/api';
import Swal from 'sweetalert2';

const BookingManagement = () => {
  const [activeTab, setActiveTab] = useState('requests');
  const [requests, setRequests] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userRole = user.role || 'admin';
  const [showModal, setShowModal] = useState(false);
  const [editingRequest, setEditingRequest] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [formData, setFormData] = useState({
    employeeName: '',
    department: '',
    date: '',
    time: '',
    destination: '',
    purpose: '',
    notes: '',
    passengers: 1,
    passengerNames: [''],
    returnTime: ''
  });

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      await Promise.all([
        fetchBookingRequests(),
        fetchBookingHistory(),
        fetchDrivers(),
        fetchEmployees(),
        fetchCars()
      ]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchBookingRequests = async () => {
    try {
      const response = await bookingAPI.getAll();
      const bookingsData = response.data.data || [];
      const pendingBookings = bookingsData.filter(booking => booking.status === 'pending');
      setRequests(pendingBookings);
    } catch (error) {
      console.error('Error fetching booking requests:', error);
      setRequests([]);
    }
  };

  const fetchBookingHistory = async () => {
    try {
      const response = await bookingAPI.getAll();
      const bookingsData = response.data.data || [];
      setBookings(bookingsData);
    } catch (error) {
      console.error('Error fetching booking history:', error);
      setBookings([]);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await employeeAPI.getAll();
      console.log('Employees response:', response.data);
      const employeesData = response.data.data || [];
      console.log('Employees data:', employeesData);
      setEmployees(employeesData);
    } catch (error) {
      console.error('Error fetching employees:', error);
      setEmployees([]);
    }
  };

  const fetchDrivers = async () => {
    try {
      const response = await driverAPI.getAll();
      const driversData = response.data.data || [];
      console.log('Drivers data:', driversData.map(d => ({ id: d.id, name: d.name, status: d.status })));
      setDrivers(driversData);
    } catch (error) {
      console.error('Error fetching drivers:', error);
      setDrivers([]);
    }
  };

  const fetchCars = async () => {
    try {
      const response = await carAPI.getAll();
      const carsData = response.data.data || [];
      setCars(carsData);
    } catch (error) {
      console.error('Error fetching cars:', error);
      setCars([]);
    }
  };

  const handleApprove = async (requestId, driverName, carId) => {
    try {
      const selectedDriver = drivers.find(driver => driver.name === driverName);
      const selectedCar = cars.find(car => car.id === parseInt(carId));
      
      if (!selectedDriver || !selectedCar) {
        Swal.fire({
          icon: 'warning',
          title: 'Peringatan',
          text: 'Pilih supir dan mobil terlebih dahulu!'
        });
        return;
      }
      
      const approveData = {
        driver_id: selectedDriver.id,
        car_id: selectedCar.id
      };
      
      // Call backend API to approve booking
      await bookingAPI.approve(requestId, approveData);
      
      // Force refresh data after successful approval
      await new Promise(resolve => setTimeout(resolve, 500)); // Wait 500ms
      await Promise.all([
        fetchBookingRequests(),
        fetchBookingHistory(),
        fetchDrivers(),
        fetchCars()
      ]);
      
      // Force re-render by updating state
      setDrivers([]);
      await fetchDrivers();
      
      // Trigger notification
      const request = requests.find(r => r.id === requestId);
      if (request) {
        window.dispatchEvent(new CustomEvent('bookingStatusUpdate', {
          detail: {
            bookingId: requestId,
            status: 'approved',
            employeeName: request.employee?.name || 'Unknown',
            destination: request.destination || 'Unknown'
          }
        }));
      }
      
      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: `Booking berhasil disetujui!\nSupir: ${selectedDriver.name}\nMobil: ${selectedCar.brand} ${selectedCar.model}\n\nStatus supir dan mobil telah diperbarui.`
      });
      
    } catch (error) {
      console.error('Error approving booking:', error);
      Swal.fire({
        icon: 'error',
        title: 'Gagal!',
        text: 'Gagal menyetujui booking: ' + (error.response?.data?.message || error.message)
      });
    }
  };

  const handleReject = async (requestId) => {
    const result = await Swal.fire({
      title: 'Alasan Penolakan',
      html: `
        <div style="text-align: left justify-content: center">
          <p style="margin-bottom: 10px; color: #666;">Masukkan alasan penolakan booking ini:</p>
          <textarea 
            id="rejection-reason" 
            class="justify-content: center" 
            placeholder="Contoh: Masukan alasannya"
            style="width: 100%; min-height: 100px; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 14px;"
          ></textarea>
          <p style="margin-top: 10px; font-size: 12px; color: #999;">Minimal 10 karakter</p>
        </div>
      `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Tolak Booking',
      cancelButtonText: 'Batal',
      preConfirm: () => {
        const reason = document.getElementById('rejection-reason').value;
        if (!reason || reason.trim().length < 10) {
          Swal.showValidationMessage('Alasan penolakan minimal 10 karakter');
          return false;
        }
        return reason;
      }
    });

    if (result.isConfirmed && result.value) {
      try {
        const adminName = JSON.parse(localStorage.getItem('user'))?.name || 'Admin';
        const rejectData = { 
          rejection_reason: result.value,
          rejected_by: adminName
        };
        await bookingAPI.reject(requestId, rejectData);
        
        // Trigger notification
        const request = requests.find(r => r.id === requestId);
        if (request) {
          window.dispatchEvent(new CustomEvent('bookingStatusUpdate', {
            detail: {
              bookingId: requestId,
              status: 'rejected',
              employeeName: request.employee?.name || 'Unknown',
              destination: request.destination || 'Unknown'
            }
          }));
        }
        
        await fetchAllData();
        Swal.fire({
          icon: 'success',
          title: 'Berhasil!',
          text: 'Booking berhasil ditolak!'
        });
      } catch (error) {
        console.error('Error rejecting booking:', error);
        let errorMessage = 'Gagal menolak booking';
        if (error.response?.data?.errors) {
          const errors = Object.values(error.response.data.errors).flat();
          errorMessage = errors.join(', ');
        } else if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        }
        Swal.fire({
          icon: 'error',
          title: 'Gagal!',
          text: errorMessage
        });
      }
    }
  };

  const handleCompleteBooking = async (bookingId) => {
    const result = await Swal.fire({
      title: 'Konfirmasi',
      text: 'Tandai booking ini sebagai selesai?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#10b981',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Ya, Selesaikan',
      cancelButtonText: 'Batal'
    });

    if (result.isConfirmed) {
      try {
        // Try PATCH method first
        try {
          await bookingAPI.updateStatus(bookingId, 'completed');
        } catch (patchError) {
          console.log('PATCH failed, trying PUT method:', patchError);
          // Fallback to PUT method if PATCH fails
          await bookingAPI.update(bookingId, { status: 'completed' });
        }
        
        await fetchAllData();
        Swal.fire({
          icon: 'success',
          title: 'Berhasil!',
          text: 'Booking berhasil diselesaikan!'
        });
      } catch (error) {
        console.error('Error completing booking:', error);
        console.error('Error details:', {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message
        });
        
        let errorMessage = 'Gagal menyelesaikan booking';
        if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error.response?.data?.error) {
          errorMessage = error.response.data.error;
        } else if (error.message) {
          errorMessage = error.message;
        }
        
        Swal.fire({
          icon: 'error',
          title: 'Gagal!',
          text: errorMessage
        });
      }
    }
  };

  const handleDelete = async (requestId) => {
    const result = await Swal.fire({
      title: 'Konfirmasi Hapus',
      text: 'Apakah Anda yakin ingin menghapus booking ini?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Ya, Hapus',
      cancelButtonText: 'Batal'
    });

    if (result.isConfirmed) {
      try {
        await bookingAPI.delete(requestId);
        await fetchAllData();
        Swal.fire({
          icon: 'success',
          title: 'Berhasil!',
          text: 'Booking berhasil dihapus!'
        });
      } catch (error) {
        console.error('Error deleting booking:', error);
        Swal.fire({
          icon: 'error',
          title: 'Gagal!',
          text: 'Gagal menghapus booking: ' + (error.response?.data?.message || error.message)
        });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Ambil pegawai pertama sebagai pembuat booking
      const firstEmployeeName = formData.passengerNames[0];
      console.log('First employee name:', firstEmployeeName);
      console.log('Available employees:', employees.map(emp => emp.name));
      const selectedEmployee = employees.find(emp => emp.name === firstEmployeeName);
      console.log('Selected employee:', selectedEmployee);
      if (!selectedEmployee) {
        Swal.fire({
          icon: 'warning',
          title: 'Peringatan',
          text: 'Pegawai tidak ditemukan'
        });
        return;
      }
      
      const bookingData = {
        employee_id: selectedEmployee.id,
        pickup_date: formData.date,
        pickup_time: formData.time,
        destination: formData.destination,
        purpose: formData.purpose,
        notes: formData.notes || '',
        passenger_count: parseInt(formData.passengers) || 1,
        passenger_names: formData.passengerNames.filter(name => name.trim() !== '').join(', '),
        return_time: formData.returnTime || null
      };
      
      if (editingRequest) {
        await bookingAPI.update(editingRequest.id, bookingData);
      } else {
        await bookingAPI.create(bookingData);
      }
      
      await fetchAllData();
      setShowModal(false);
      setActiveTab('requests');
      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: editingRequest ? 'Booking berhasil diupdate!' : 'Booking berhasil dibuat!'
      });
      
    } catch (error) {
      console.error('Error saving booking:', error);
      let errorMessage = 'Gagal menyimpan booking';
      if (error.response?.data?.errors) {
        const errors = Object.values(error.response.data.errors).flat();
        errorMessage = errors.join(', ');
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      Swal.fire({
        icon: 'error',
        title: 'Gagal!',
        text: `Error: ${errorMessage}`
      });
    }
  };

  const handleCreate = () => {
    setEditingRequest(null);
    setFormData({
      employeeName: '',
      department: '',
      date: '',
      time: '',
      destination: '',
      purpose: '',
      notes: '',
      passengers: 1,
      passengerNames: [''],
      returnTime: ''
    });
    setShowModal(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Menunggu';
      case 'approved': return 'Disetujui';
      case 'completed': return 'Selesai';
      case 'rejected': return 'Ditolak';
      default: return status;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID');
  };

  const formatTime = (timeString) => {
    return timeString ? new Date(`2000-01-01T${timeString}`).toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit'
    }) : '-';
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;
    const matchesSearch = searchTerm === '' || 
                         booking.employee?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.employee?.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.destination?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.driver?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         formatDate(booking.pickup_date).toLowerCase().includes(searchTerm.toLowerCase()) ||
                         formatTime(booking.pickup_time).toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (booking.return_time && formatTime(booking.return_time).toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRequests = requests.slice(indexOfFirstItem, indexOfLastItem);
  const currentBookings = filteredBookings.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil((activeTab === 'requests' ? requests.length : filteredBookings.length) / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // Reset to first page when changing tabs or filters
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, filterStatus, searchTerm]);

  const PaginationComponent = ({ totalPages, currentPage }) => (
    totalPages > 1 && (
      <div className="flex justify-center items-center space-x-1 sm:space-x-2 px-4 mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        
        <div className="flex space-x-1 sm:space-x-2 overflow-x-auto max-w-xs sm:max-w-none">
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(page => {
              if (typeof window !== 'undefined' && window.innerWidth < 640) {
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
    )
  );

  return (
    <div className="p-3 sm:p-6">
      <div className="mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0 mb-4">
          <div className="text-center sm:text-left">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Manajemen Booking</h1>
            <p className="text-sm sm:text-base text-gray-600">Kelola pengajuan dan riwayat booking mobil</p>
          </div>
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2 w-full sm:w-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Booking</span>
          </button>
        </div>

        <div className="border-b border-gray-200">
          <nav className="-mb-px flex">
            <button
              onClick={() => setActiveTab('requests')}
              className={`flex-1 py-3 px-2 border-b-2 font-medium text-xs sm:text-sm text-center ${
                activeTab === 'requests'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Pengajuan ({requests.length})
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 py-3 px-2 border-b-2 font-medium text-xs sm:text-sm text-center ${
                activeTab === 'history'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Riwayat ({bookings.length})
            </button>
          </nav>
        </div>
      </div>

      <>
          {activeTab === 'requests' && (
            <div>
              {requests.length === 0 ? (
                <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-200">
                  <div className="flex flex-col items-center justify-center h-full text-gray-500 text-center">
                    <Clock className="w-12 h-12 mb-4 text-gray-300 animate-spin" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada pengajuan baru</h3>
                  <p className="text-gray-500">Semua pengajuan booking telah diproses</p>
                </div>
              ) : (
                <>
                  {/* Desktop Table */}
                  <div className="hidden lg:block bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="min-w-full">
                        <thead>
                          <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                              <span>Pegawai</span>
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                              <span>Tujuan</span>
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                              <span>Tanggal & Waktu</span>
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                              <span>Waktu Selesai</span>
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                              <span>Assignment</span>
                            </th>
                            <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Aksi</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {currentRequests.map((request, index) => (
                            <tr key={request.id} className={`hover:bg-blue-50 transition-colors duration-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                              <td className="px-6 py-5">
                                <div>
                                  <div className="text-sm font-semibold text-gray-900">{request.employee?.name}</div>
                                  <div className="text-xs text-gray-500">{request.employee?.department}</div>
                                </div>
                              </td>
                              <td className="px-6 py-5">
                                <div>
                                  <div className="text-sm font-medium text-gray-900 max-w-xs truncate">{request.destination}</div>
                                  <div className="text-xs text-gray-500">
                                    {request.passenger_count || 1} pegawai
                                  </div>
                                  {request.passenger_names && (
                                    <div className="text-xs text-gray-400 mt-1">{request.passenger_names}</div>
                                  )}
                                </div>
                              </td>
                              <td className="px-6 py-5">
                                <div>
                                  <div className="text-sm font-medium text-gray-900">{formatDate(request.pickup_date)}</div>
                                  <div className="text-xs text-gray-500">{formatTime(request.pickup_time)}</div>
                                </div>
                              </td>
                              <td className="px-6 py-5">
                                <div className="text-sm text-gray-900">
                                  {request.return_time ? formatTime(request.return_time) : '-'}
                                </div>
                              </td>
                              <td className="px-6 py-5">
                                <div className="space-y-2">
                                  <select 
                                    id={`driver-${request.id}`}
                                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500"
                                  >
                                    <option value="">Pilih Supir</option>
                                    {drivers.filter(driver => driver.status === 'active').map((driver) => (
                                      <option key={driver.id} value={driver.name}>
                                        {driver.name}
                                      </option>
                                    ))}
                                  </select>
                                  <select 
                                    id={`car-${request.id}`}
                                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500"
                                  >
                                    <option value="">Pilih Mobil</option>
                                    {cars
                                      .filter(car => {
                                        const capacity = car.capacity || 4;
                                        const passengerCount = request.passenger_count || 1;
                                        return car.status !== 'booked' && car.status !== 'maintenance' && capacity >= passengerCount;
                                      })
                                      .sort((a, b) => (a.capacity || 4) - (b.capacity || 4))
                                      .map((car) => {
                                        const capacity = car.capacity || 4;
                                        return (
                                          <option key={car.id} value={car.id}>
                                          {car.brand} {car.model} - {car.license_plate} (Kapasitas: {capacity})
                                          </option>
                                        );
                                      })}
                                  </select>
                                </div>
                              </td>
                              <td className="px-6 py-5">
                                <div className="flex justify-center space-x-2">
                                  <button
                                    onClick={() => handleReject(request.id)}
                                    className="px-3 py-2 text-xs bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                                  >
                                    Tolak
                                  </button>
                                  <button
                                    onClick={() => {
                                      const driverSelect = document.getElementById(`driver-${request.id}`);
                                      const carSelect = document.getElementById(`car-${request.id}`);
                                      if (driverSelect.value && carSelect.value) {
                                        handleApprove(request.id, driverSelect.value, carSelect.value);
                                      } else {
                                        Swal.fire({
                                          icon: 'warning',
                                          title: 'Peringatan',
                                          text: 'Pilih supir dan mobil terlebih dahulu!'
                                        });
                                      }
                                    }}
                                    className="px-3 py-2 text-xs bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                                  >
                                    Setujui
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Mobile Cards */}
                  <div className="lg:hidden space-y-4">
                    {currentRequests.map((request, index) => (
                      <div key={request.id} className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold text-gray-900">{request.employee?.name}</h3>
                            <p className="text-sm text-gray-500">{request.employee?.department}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Tujuan:</span>
                            <span className="text-sm font-medium">{request.destination}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Tanggal:</span>
                            <span className="text-sm">{formatDate(request.pickup_date)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Waktu:</span>
                            <span className="text-sm">{formatTime(request.pickup_time)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Waktu Selesai:</span>
                            <span className="text-sm">{request.return_time ? formatTime(request.return_time) : '-'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Jumlah Pegawai:</span>
                            <span className="text-sm">{request.passenger_count || 0} orang</span>
                          </div>
                          {request.passenger_names && (
                            <div>
                              <span className="text-sm text-gray-600">Pegawai yang Ikut:</span>
                              <div className="text-sm font-medium mt-1">{request.passenger_names}</div>
                            </div>
                          )}
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Pilih Supir</label>
                            <select 
                              id={`driver-mobile-${request.id}`}
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500"
                            >
                              <option value="">Pilih Supir</option>
                              {drivers.filter(driver => driver.status === 'active').map((driver) => (
                                <option key={driver.id} value={driver.name}>
                                  {driver.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Pilih Mobil</label>
                            <select 
                              id={`car-mobile-${request.id}`}
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500"
                            >
                              <option value="">Pilih Mobil</option>
                              {cars
                                .filter(car => {
                                  const capacity = car.capacity || 4;
                                  const passengerCount = request.passenger_count || 1;
                                  return car.status !== 'booked' && car.status !== 'maintenance' && capacity >= passengerCount;
                                })
                                .sort((a, b) => (a.capacity || 4) - (b.capacity || 4))
                                .map((car) => {
                                  const capacity = car.capacity || 4;
                                  return (
                                    <option key={car.id} value={car.id}>
                                      ✓ {car.brand} {car.model} - {car.license_plate} (Kapasitas: {capacity})
                                    </option>
                                  );
                                })}
                            </select>
                          </div>
                          
                          <div className="flex space-x-2 pt-2">
                            <button
                              onClick={() => handleReject(request.id)}
                              className="flex-1 px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                            >
                              Tolak
                            </button>
                            <button
                              onClick={() => {
                                const driverSelect = document.getElementById(`driver-mobile-${request.id}`);
                                const carSelect = document.getElementById(`car-mobile-${request.id}`);
                                if (driverSelect.value && carSelect.value) {
                                  handleApprove(request.id, driverSelect.value, carSelect.value);
                                } else {
                                  Swal.fire({
                                    icon: 'warning',
                                    title: 'Peringatan',
                                    text: 'Pilih supir dan mobil terlebih dahulu!'
                                  });
                                }
                              }}
                              className="flex-1 px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                            >
                              Setujui
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
              <PaginationComponent 
                totalPages={totalPages}
                currentPage={currentPage}
              />
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-white rounded-lg p-3 sm:p-4">
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Cari Pegawai, Tujuan, Tanggal, Waktu, Supir..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg"
                    />
                  </div>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg"
                  >
                    <option value="all">Semua Status</option>
                    <option value="pending">Menunggu</option>
                    <option value="approved">Disetujui</option>
                    <option value="completed">Selesai</option>
                    <option value="rejected">Ditolak</option>
                  </select>
                </div>
              </div>

              {filteredBookings.length === 0 ? (
                <div className="bg-white rounded-lg p-8 text-center">
                  <Car className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Tidak ada data booking</p>
                </div>
              ) : (
                <>
                  {/* Desktop Table */}
                  <div className="hidden lg:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pegawai</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tujuan</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Waktu</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Waktu Selesai</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supir</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Keterangan</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {currentBookings.map((booking, index) => (
                            <tr key={booking.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div>
                                  <div className="text-sm font-medium text-gray-900">{booking.employee?.name}</div>
                                  <div className="text-sm text-gray-500">{booking.employee?.department}</div>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="text-sm text-gray-900 max-w-xs truncate">{booking.destination}</div>
                                <div className="text-sm text-gray-500">{booking.passenger_count || 1} pegawai</div>
                                {booking.passenger_names && (
                                  <div className="text-xs text-gray-400 mt-1">{booking.passenger_names}</div>
                                )}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {formatDate(booking.pickup_date)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {formatTime(booking.pickup_time)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {booking.return_time ? formatTime(booking.return_time) : '-'}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {booking.driver?.name || 'Belum ditentukan'}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                                  {getStatusText(booking.status)}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                {booking.status === 'rejected' && booking.rejection_reason ? (
                                  <div>
                                    <p className="text-sm text-gray-900 max-w-xs">{booking.rejection_reason}</p>
                                    {booking.rejected_by && (
                                      <p className="text-xs text-gray-500 mt-1">Oleh: {booking.rejected_by}</p>
                                    )}
                                  </div>
                                ) : (
                                  <span className="text-sm text-gray-400">-</span>
                                )}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex space-x-2">
                                  {booking.status === 'approved' && (
                                    <button
                                      onClick={() => handleCompleteBooking(booking.id)}
                                      className="text-green-600 hover:text-green-900"
                                      title="Selesaikan"
                                    >
                                      <CheckCircle className="w-5 h-5" />
                                    </button>
                                  )}
                                  {userRole === 'super_admin' && (
                                    <button
                                      onClick={() => handleDelete(booking.id)}
                                      className="text-red-600 hover:text-red-900"
                                      title="Hapus"
                                    >
                                      <Trash2 className="w-5 h-5" />
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Mobile Cards */}
                  <div className="lg:hidden space-y-4">
                    {currentBookings.map((booking, index) => (
                      <div key={booking.id} className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold text-gray-900">{booking.employee?.name}</h3>
                            <p className="text-sm text-gray-500">{booking.employee?.department}</p>
                          </div>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                            {getStatusText(booking.status)}
                          </span>
                        </div>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Tujuan:</span>
                            <span className="text-sm font-medium">{booking.destination}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Tanggal:</span>
                            <span className="text-sm">{formatDate(booking.pickup_date)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Waktu:</span>
                            <span className="text-sm">{formatTime(booking.pickup_time)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Waktu Selesai:</span>
                            <span className="text-sm">{booking.return_time ? formatTime(booking.return_time) : '-'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Supir:</span>
                            <span className="text-sm">{booking.driver?.name || 'Belum ditentukan'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Jumlah Pegawai:</span>
                            <span className="text-sm">{booking.passenger_count || 0} orang</span>
                          </div>
                          {booking.passenger_names && (
                            <div>
                              <span className="text-sm text-gray-600">Pegawai yang Ikut:</span>
                              <div className="text-sm font-medium mt-1">{booking.passenger_names}</div>
                            </div>
                          )}
                          {booking.status === 'rejected' && booking.rejection_reason && (
                            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                              <span className="text-sm font-semibold text-red-800">Alasan Penolakan:</span>
                              <p className="text-sm text-red-700 mt-1">{booking.rejection_reason}</p>
                              {booking.rejected_by && (
                                <p className="text-xs text-red-600 mt-1">Ditolak oleh: {booking.rejected_by}</p>
                              )}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex space-x-2 pt-2">
                          {booking.status === 'approved' && (
                            <button
                              onClick={() => handleCompleteBooking(booking.id)}
                              className="flex-1 px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center space-x-1"
                            >
                              <CheckCircle className="w-4 h-4" />
                              <span>Selesai</span>
                            </button>
                          )}
                          {userRole === 'super_admin' && (
                            <button
                              onClick={() => handleDelete(booking.id)}
                              className="flex-1 px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center justify-center space-x-1"
                            >
                              <Trash2 className="w-4 h-4" />
                              <span>Hapus</span>
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
              <PaginationComponent 
                totalPages={totalPages}
                currentPage={currentPage}
              />
            </div>
          )}
        </>
      


      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">
              {editingRequest ? 'Edit Booking' : 'Tambah Booking Baru'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Departemen</label>
                  <input
                    type="text"
                    value={formData.department}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                    placeholder="Departemen akan otomatis terisi"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Waktu Mulai</label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Waktu Selesai</label>
                  <input
                    type="time"
                    value={formData.returnTime}
                    onChange={(e) => setFormData({...formData, returnTime: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah Pegawai</label>
                  <input
                    type="number"
                    min="1"
                    max="8"
                    value={formData.passengers}
                    onChange={(e) => {
                      const count = parseInt(e.target.value) || 1;
                      const newNames = Array(count).fill('').map((_, i) => formData.passengerNames[i] || '');
                      setFormData({...formData, passengers: count, passengerNames: newNames});
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
              
              {/* Employee Names */}
              {formData.passengers > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Pegawai yang Ikut
                  </label>
                  <div className="space-y-2">
                    {Array.from({ length: formData.passengers }, (_, index) => (
                      <div key={index}>
                        <select
                          value={formData.passengerNames[index] || ''}
                          onChange={(e) => {
                            const selectedName = e.target.value;
                            const selectedEmployee = employees.find(emp => emp.name === selectedName);

                            // salin array lama lalu update posisi index-nya
                            const newNames = [...formData.passengerNames];
                            newNames[index] = selectedName;

                            // update data form
                            setFormData({
                              ...formData,
                              passengerNames: newNames,
                              department: selectedEmployee ? selectedEmployee.department : formData.department
                            });
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          required
                        >
                          <option value="">Pilih Pegawai {index + 1}</option>

                          {employees
                            // Filter agar nama yang sudah dipilih tidak muncul lagi
                            .filter(
                              (emp) =>
                                !formData.passengerNames.includes(emp.name) ||
                                emp.name === formData.passengerNames[index]
                            )
                            .map((employee) => (
                              <option key={employee.id} value={employee.name}>
                                {employee.name}
                              </option>
                            ))}
                        </select>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tujuan</label>
                <input
                  type="text"
                  value={formData.destination}
                  onChange={(e) => setFormData({...formData, destination: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Keperluan</label>
                <select
                  value={formData.purpose}
                  onChange={(e) => setFormData({...formData, purpose: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  required
                >
                  <option value="">Pilih Keperluan</option>
                  <option value="Dinas Luar">Dinas Luar</option>
                  <option value="Meeting Client">Meeting Client</option>
                  <option value="Antar Jemput">Antar Jemput</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Catatan Tambahan</label>
                <textarea
                  rows="3"
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  placeholder="Catatan khusus atau instruksi tambahan..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="w-full sm:w-auto px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editingRequest ? 'Update' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingManagement;