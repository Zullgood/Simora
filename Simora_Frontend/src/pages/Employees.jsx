import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, UserCheck, Building, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import EmployeeModal from '../components/Employees/EmployeeModal';
import { employeeAPI } from '../services/api';
import Swal from 'sweetalert2';

const Employees = () => {
  const [employees, setEmployees] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 6;

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await employeeAPI.getAll();
      console.log('Employees API response:', response.data);
      if (response.data.success) {
        console.log('Employees data:', response.data.data);
        // Debug each employee to see field structure
        response.data.data.forEach((emp, index) => {
          console.log(`Employee ${index}:`, {
            id: emp.id,
            name: emp.name,
            nik: emp.nik,
            password: emp.password,
            hasNik: !!emp.nik,
            hasPassword: !!emp.password,
            photo: emp.photo ? 'Ada foto' : 'Tidak ada foto',
            photoLength: emp.photo ? emp.photo.length : 0
          });
        });
        setEmployees(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || employee.status === statusFilter;
    const matchesDepartment = departmentFilter === 'all' || employee.department === departmentFilter;
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleAddEmployee = () => {
    setEditingEmployee(null);
    setIsModalOpen(true);
  };

  const handleEditEmployee = (employee) => {
    console.log('Editing employee:', employee);
    setEditingEmployee(employee);
    setIsModalOpen(true);
  };

  const handleDeleteEmployee = async (id) => {
    const result = await Swal.fire({
      title: 'Konfirmasi Hapus',
      text: 'Apakah Anda yakin ingin menghapus pegawai ini?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, Hapus',
      cancelButtonText: 'Batal',
      confirmButtonColor: '#ef4444'
    });
    
    if (result.isConfirmed) {
      try {
        const response = await employeeAPI.delete(id);
        if (response.data.success) {
          fetchEmployees();
          Swal.fire({
            icon: 'success',
            title: 'Berhasil!',
            text: 'Data pegawai berhasil dihapus!'
          });
        }
      } catch (error) {
        console.error('Error deleting employee:', error);
        Swal.fire({
          icon: 'error',
          title: 'Gagal!',
          text: 'Gagal menghapus data pegawai'
        });
      }
    }
  };

  const handleSaveEmployee = async (employeeData) => {
    try {
      console.log('Sending employee data:', employeeData);
      
      // Convert camelCase to snake_case for backend
      const backendData = {
        name: String(employeeData.name || ''),
        email: String(employeeData.email || ''),
        phone: String(employeeData.phone || ''),
        employee_id: String(employeeData.employeeId || ''),
        department: String(employeeData.department || ''),
        position: String(employeeData.position || ''),
        hire_date: String(employeeData.hireDate || ''),
        address: String(employeeData.address || ''),
        status: String(employeeData.status || 'active')
      };
      
      // Add NIK dan Android account jika createAccount dicentang
      if (employeeData.createAccount) {
        backendData.nik = String(employeeData.nik || '');
        backendData.android_username = String(employeeData.nik || '');
        backendData.android_password = String(employeeData.password || '');
      } else {
        // Jika tidak buat akun, tetap kirim NIK jika ada
        if (employeeData.nik) backendData.nik = String(employeeData.nik);
      }
      
      if (employeeData.emergencyContact) backendData.emergency_contact = String(employeeData.emergencyContact);
      if (employeeData.emergencyPhone) backendData.emergency_phone = String(employeeData.emergencyPhone);
      
      // Add photo dengan validasi ukuran
      if (employeeData.photo) {
        console.log('Sending photo, length:', employeeData.photo.length);
        // Batasi ukuran base64 maksimal 30KB untuk database
        if (employeeData.photo.length > 30000) {
          throw new Error('Foto terlalu besar setelah kompresi. Coba foto yang lebih kecil.');
        }
        backendData.photo = employeeData.photo;
      }
      
      console.log('Backend formatted data:', {
        ...backendData,
        photo: backendData.photo ? 'Photo included' : 'No photo',
        hasNik: !!backendData.nik,
        hasPassword: !!backendData.password,
        createAccount: employeeData.createAccount
      });
      
      if (editingEmployee) {
        const response = await employeeAPI.update(editingEmployee.id, backendData);
        if (response.data.success) {
          fetchEmployees();
          setIsModalOpen(false);
          setEditingEmployee(null);
          Swal.fire({
            icon: 'success',
            title: 'Berhasil!',
            text: 'Data pegawai berhasil diupdate!'
          });
        }
      } else {
        const response = await employeeAPI.create(backendData);
        if (response.data.success) {
          fetchEmployees();
          setIsModalOpen(false);
          setEditingEmployee(null);
          Swal.fire({
            icon: 'success',
            title: 'Berhasil!',
            text: 'Pegawai baru berhasil ditambahkan!'
          });
        }
      }
    } catch (error) {
      console.error('Error saving employee:', error);
      
      // Handle email duplicate error
      if (error.response?.status === 422 || error.response?.status === 400) {
        const errorData = error.response.data;
        
        // Check for email duplicate error
        if (errorData.errors?.email || errorData.message?.toLowerCase().includes('email')) {
          throw new Error('Email ini sudah digunakan oleh pegawai lain. Silakan gunakan email yang berbeda.');
        }
        
        // Handle other validation errors
        if (errorData.errors) {
          const errorList = Object.entries(errorData.errors).map(([field, messages]) => {
            return `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`;
          }).join('\n');
          throw new Error(`Validasi gagal:\n${errorList}`);
        }
      }
      
      // Generic error message
      throw new Error(error.response?.data?.message || 'Gagal menyimpan data pegawai');
    }
  };

  const formatSalary = (salary) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(salary);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800', text: 'Aktif' },
      inactive: { color: 'bg-gray-100 text-gray-800', text: 'Tidak Aktif' },
      resigned: { color: 'bg-yellow-100 text-yellow-800', text: 'Resign' },
      terminated: { color: 'bg-red-100 text-red-800', text: 'Dipecat' }
    };
    
    const config = statusConfig[status] || statusConfig.active;
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
        {config.text}
      </span>
    );
  };



  const getDepartmentIcon = (department) => {
    return '';
  };


  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Daftar Pegawai</h1>
          <p className="text-gray-600 mt-2">Kelola data pegawai perusahaan</p>
        </div>
        <button
          onClick={handleAddEmployee}
          className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto"
        >
          <Plus className="w-5 h-5" />
          <span>Tambah Pegawai</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Cari pegawai..."
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
              <option value="active">Aktif</option>
              <option value="inactive">Tidak Aktif</option>
              <option value="resigned">Resign</option>
              <option value="terminated">Dipecat</option>
            </select>
          </div>
          <div>
            <select
              value={departmentFilter}
              onChange={(e) => {
                setDepartmentFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Semua Departemen</option>
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
        </div>
      </div>


      {/* Employees Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {currentEmployees.map((employee, index) => (
          <div 
            key={employee.id} 
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-fade-in group"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="p-6 group-hover:bg-gray-50 transition-colors duration-300">
              {/* Employee Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {employee.photo ? (
                    <img 
                      src={employee.photo.startsWith('data:') ? employee.photo : `data:image/jpeg;base64,${employee.photo}`} 
                      alt={employee.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        console.log('Error loading image for employee:', employee.name);
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  {!employee.photo && (
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center group-hover:from-blue-200 group-hover:to-blue-300 group-hover:scale-110 transition-all duration-300">
                      <span className="text-blue-600 font-medium text-lg group-hover:text-blue-700 transition-colors duration-200">
                        {employee.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div className="hidden w-12 h-12 bg-blue-100 rounded-full items-center justify-center">
                    <span className="text-blue-600 font-medium text-lg">
                      {employee.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">{employee.name}</h3>
                    <p className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-200">{employee.employeeId || employee.employee_id}</p>
                  </div>
                </div>
                <div className="transform group-hover:scale-105 transition-transform duration-200">
                  {getStatusBadge(employee.status)}
                </div>
              </div>

              {/* Employee Details */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-2 text-sm">
                  <Building className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Departemen:</span>
                  <span className="font-medium">{employee.department}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <UserCheck className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Posisi:</span>
                  <span className="font-medium">{employee.position}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Bergabung:</span>
                  <span className="font-medium">
                    {(() => {
                      const dateValue = employee.hireDate || employee.hire_date;
                      if (!dateValue) return 'Tidak ada data';
                      try {
                        const date = new Date(dateValue);
                        return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleDateString('id-ID');
                      } catch {
                        return 'Invalid Date';
                      }
                    })()}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Building className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Alamat:</span>
                  <span className="font-medium">{employee.address}</span>
                </div>
                {employee.salary && (
                  <div className="text-sm">
                    <span className="text-gray-600">Gaji:</span>
                    <span className="font-medium text-green-600 ml-2">
                      {formatSalary(employee.salary)}
                    </span>
                  </div>
                )}
              </div>

              {/* Contact Info */}
              <div className="bg-gray-50 rounded-lg p-3 mb-4">
                <p className="text-xs text-gray-600 mb-1">Kontak:</p>
                <p className="text-sm text-gray-900">{employee.phone}</p>
                <p className="text-sm text-gray-600">{employee.email}</p>
                {employee.nik && (
                  <p className="text-xs text-gray-500 mt-1">NIK: {employee.nik}</p>
                )}
              </div>

              {/* Android Account Info */}
              {(() => {
                const androidUsername = employee.android_username;
                const androidPassword = employee.android_password;
                console.log(`Employee ${employee.name} - Username: '${androidUsername}', Password: '${androidPassword}'`);
                
                return androidUsername && androidPassword ? (
                  <div className="bg-green-50 rounded-lg p-3 mb-4 border border-green-200">
                    <p className="text-xs text-green-600 mb-2 font-medium">Akun Android:</p>
                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600">Username:</span>
                        <span className="text-xs font-mono bg-white px-2 py-1 rounded">{androidUsername}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600">Password:</span>
                        <span className="text-xs font-mono bg-white px-2 py-1 rounded">{androidPassword}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-lg p-3 mb-4 border border-gray-200">
                    <p className="text-xs text-gray-500 text-center">Belum memiliki akun Android</p>
                  </div>
                );
              })()}

              {/* Actions */}
              <div className="flex space-x-2 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => handleEditEmployee(employee)}
                  className="flex-1 flex items-center justify-center space-x-2 bg-blue-50 text-blue-600 py-2 px-3 rounded-lg hover:bg-blue-100 hover:scale-105 transition-all duration-200 transform"
                >
                  <Edit className="w-4 h-4" />
                  <span className="text-sm">Edit</span>
                </button>
                <button
                  onClick={() => handleDeleteEmployee(employee.id)}
                  className="flex-1 flex items-center justify-center space-x-2 bg-red-50 text-red-600 py-2 px-3 rounded-lg hover:bg-red-100 hover:scale-105 transition-all duration-200 transform"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="text-sm">Hapus</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredEmployees.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200 animate-fade-in">
          <div className="text-gray-500">
            <div className="animate-bounce">
              <UserCheck className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            </div>
            <p className="text-lg mb-2">Tidak ada pegawai yang ditemukan</p>
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
      <EmployeeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEmployee}
        employee={editingEmployee}
        isEdit={!!editingEmployee}
      />
    </div>
  );
};

export default Employees;
