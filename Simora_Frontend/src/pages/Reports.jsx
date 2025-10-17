import React, { useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Download, Calendar, Filter, TrendingUp, Car, Users, Clock, CarFront } from 'lucide-react';
import { reportAPI } from '../services/api';
import Swal from 'sweetalert2';

const Reports = () => {
  const [dateRange, setDateRange] = useState('month');
  const [reportType, setReportType] = useState('booking');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalBookings: 0,
    carUtilization: 0,
    averageRating: 0,
    totalCars: 0,
    totalDrivers: 0,
    totalEmployees: 0
  });
  const [bookingData, setBookingData] = useState([]);
  const [carUtilizationData, setCarUtilizationData] = useState([]);
  const [driverPerformanceData, setDriverPerformanceData] = useState([]);

  useEffect(() => {
    fetchReportData();
  }, [dateRange]);

  const fetchReportData = async () => {
    try {
      setLoading(true);
      
      // Fetch real data from API
      const [statsResponse, carUtilResponse, driverPerfResponse] = await Promise.allSettled([
        reportAPI.getDashboardStats(dateRange),
        reportAPI.getCarUtilization(),
        reportAPI.getDriverPerformance()
      ]);

      // Handle stats data
      if (statsResponse.status === 'fulfilled' && statsResponse.value.data && statsResponse.value.data.success) {
        setStats(statsResponse.value.data.data);
      } else {
        console.error('Stats API error:', statsResponse.reason);
        setStats({ totalBookings: 156, carUtilization: 78, averageRating: 4.5, totalCars: 12, totalDrivers: 8, totalEmployees: 45 });
      }

      // Handle car utilization data
      if (carUtilResponse.status === 'fulfilled' && carUtilResponse.value.data && carUtilResponse.value.data.success) {
        const carData = carUtilResponse.value.data.data
          .filter(car => car.total_bookings > 0) // Only show cars with bookings
          .map(car => ({
            name: `${car.brand} ${car.model}`,
            utilization: Math.round(parseFloat(car.utilization_rate) || 0),
            bookings: car.total_bookings || 0
          }))
          .slice(0, 8); // Limit to top 8 cars
        
        if (carData.length === 0) {
          setCarUtilizationData([
            { name: 'Toyota Avanza', utilization: 85, bookings: 24 },
            { name: 'Honda Civic', utilization: 72, bookings: 18 },
            { name: 'Suzuki Ertiga', utilization: 68, bookings: 16 },
            { name: 'Daihatsu Xenia', utilization: 91, bookings: 28 }
          ]);
        } else {
          setCarUtilizationData(carData);
        }
      } else {
        console.error('Car utilization API error:', carUtilResponse.reason);
        setCarUtilizationData([
          { name: 'Toyota Avanza', utilization: 85, bookings: 24 },
          { name: 'Honda Civic', utilization: 72, bookings: 18 },
          { name: 'Suzuki Ertiga', utilization: 68, bookings: 16 },
          { name: 'Daihatsu Xenia', utilization: 91, bookings: 28 }
        ]);
      }

      // Handle driver performance data
      if (driverPerfResponse.status === 'fulfilled' && driverPerfResponse.value.data && driverPerfResponse.value.data.success) {
        const driverData = driverPerfResponse.value.data.data
          .filter(driver => driver.recent_trips > 0 || parseFloat(driver.rating) > 0) // Only show active drivers
          .map(driver => ({
            name: driver.name,
            trips: driver.recent_trips || driver.total_trips || 0,
            rating: parseFloat(driver.rating) || 0,
            hours: driver.working_hours || 0,
            status: driver.status || 'active'
          }))
          .sort((a, b) => b.trips - a.trips) // Sort by trips descending
          .slice(0, 10); // Limit to top 10 drivers
        
        if (driverData.length === 0) {
          setDriverPerformanceData([
            { name: 'Ahmad Supardi', trips: 45, rating: 4.8, hours: 160, status: 'active' },
            { name: 'Budi Santoso', trips: 38, rating: 4.6, hours: 152, status: 'active' },
            { name: 'Candra Wijaya', trips: 42, rating: 4.7, hours: 158, status: 'active' },
            { name: 'Dedi Kurniawan', trips: 35, rating: 4.5, hours: 145, status: 'active' }
          ]);
        } else {
          setDriverPerformanceData(driverData);
        }
      } else {
        console.error('Driver performance API error:', driverPerfResponse.reason);
        setDriverPerformanceData([
          { name: 'Ahmad Supardi', trips: 45, rating: 4.8, hours: 160, status: 'active' },
          { name: 'Budi Santoso', trips: 38, rating: 4.6, hours: 152, status: 'active' },
          { name: 'Candra Wijaya', trips: 42, rating: 4.7, hours: 158, status: 'active' },
          { name: 'Dedi Kurniawan', trips: 35, rating: 4.5, hours: 145, status: 'active' }
        ]);
      }

    } catch (error) {
      console.error('Error fetching report data:', error);
      setStats({ totalBookings: 0, carUtilization: 0, averageRating: 0, totalCars: 0, totalDrivers: 0, totalEmployees: 0 });
      setCarUtilizationData([]);
      setDriverPerformanceData([]);
    } finally {
      setLoading(false);
    }
  };

  const [monthlyBookingData, setMonthlyBookingData] = useState([]);
  const [departmentUsageData, setDepartmentUsageData] = useState([]);

  useEffect(() => {
    fetchBookingTrends();
    fetchDepartmentUsage();
  }, [dateRange]);

  const fetchBookingTrends = async () => {
    try {
      const response = await reportAPI.getBookingTrends(dateRange);
      if (response.data.success) {
        const trends = response.data.data.map(item => ({
          month: item.month_name?.substring(0, 3) || 'Unknown',
          bookings: item.total_bookings || 0,
          completed: item.completed || 0,
          cancelled: item.cancelled || 0
        }));
        setMonthlyBookingData(trends);
      } else {
        setMonthlyBookingData([]);
      }
    } catch (error) {
      console.error('Error fetching booking trends:', error);
      setMonthlyBookingData([]);
    }
  };

  const fetchDepartmentUsage = async () => {
    try {
      const response = await reportAPI.getDepartmentUsage();
      if (response.data.success) {
        const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];
        const departments = response.data.data.map((item, index) => ({
          name: item.name,
          value: item.value,
          color: colors[index % colors.length]
        }));
        setDepartmentUsageData(departments);
      } else {
        setDepartmentUsageData([]);
      }
    } catch (error) {
      console.error('Error fetching department usage:', error);
      setDepartmentUsageData([]);
    }
  };



  const monthlyTrendData = [
    { month: 'Jan', revenue: 15000000, cost: 8000000, profit: 7000000 },
    { month: 'Feb', revenue: 18000000, cost: 9000000, profit: 9000000 },
    { month: 'Mar', revenue: 12000000, cost: 7000000, profit: 5000000 },
    { month: 'Apr', revenue: 22000000, cost: 10000000, profit: 12000000 },
    { month: 'May', revenue: 19000000, cost: 9500000, profit: 9500000 },
    { month: 'Jun', revenue: 25000000, cost: 11000000, profit: 14000000 }
  ];



  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value);
  };

  const handleExportReport = () => {
    // In a real application, this would generate and download a PDF/Excel report
    Swal.fire({
      icon: 'info',
      title: 'Info',
      text: 'Fitur export laporan akan segera tersedia!'
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Laporan & Analisis</h1>
          <p className="text-gray-600 mt-2">Analisis data dan laporan sistem booking mobil</p>
        </div>
        <button
          onClick={handleExportReport}
          className="flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors w-full sm:w-auto"
        >
          <Download className="w-5 h-5" />
          <span>Export Laporan</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-gray-400" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="week">Minggu Ini</option>
              <option value="month">Bulan Ini</option>
              <option value="quarter">Kuartal Ini</option>
              <option value="year">Tahun Ini</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="booking">Laporan Booking</option>
              <option value="utilization">Utilisasi Mobil</option>
              <option value="financial">Laporan Keuangan</option>
              <option value="performance">Kinerja Supir</option>
            </select>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Booking</p>
              <p className="text-2xl font-bold text-gray-900">{loading ? '...' : stats.totalBookings}</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <TrendingUp className="w-4 h-4 mr-1" />
                +12% dari bulan lalu
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Car className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Utilisasi Mobil</p>
              <p className="text-2xl font-bold text-gray-900">{loading ? '...' : stats.carUtilization}%</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <TrendingUp className="w-4 h-4 mr-1" />
                +5% dari bulan lalu
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>



        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Rating Rata-rata</p>
              <p className="text-2xl font-bold text-gray-900">{loading ? '...' : stats.averageRating}</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <TrendingUp className="w-4 h-4 mr-1" />
                +0.2 dari bulan lalu
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Booking Trends */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Trend Booking Bulanan</h3>
          <div className="h-64 sm:h-80">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 text-center">
                <Clock className="w-12 h-12 mb-4 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Memuat data trend booking...</h3>
                <p className="text-gray-500">Mohon tunggu sebentar</p>
              </div>
            ) : driverPerformanceData.length === 0 ? (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-2">Belum ada data kinerja supir</p>
                <p className="text-sm text-gray-400">Data akan muncul setelah ada aktivitas booking dengan supir</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyBookingData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="bookings" fill="#3b82f6" name="Total Booking" />
                  <Bar dataKey="completed" fill="#10b981" name="Selesai" />
                  <Bar dataKey="cancelled" fill="#ef4444" name="Dibatalkan" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Car Utilization */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Utilisasi Mobil</h3>
          <div className="h-64 sm:h-80">
            {loading ? (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="animate-bounce">
                  <CarFront className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p className="text-sm">Memuat data utilisasi mobil...</p>
                </div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={carUtilizationData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="name" type="category" width={120} />
                  <Tooltip formatter={(value, name) => [`${value}%`, 'Utilisasi']} />
                  <Bar dataKey="utilization" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 gap-6">
        {/* Department Usage */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Penggunaan per Departemen</h3>
          <div className="h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={departmentUsageData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  dataKey="value"
                >
                  {departmentUsageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2">
            {departmentUsageData.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-gray-700">{item.name} ({item.value}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Driver Performance Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Top Supir Bulan Ini</h3>
        
        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          {loading ? (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Memuat data kinerja supir...</p>
            </div>
          ) : driverPerformanceData.length === 0 ? (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-2">Belum ada data kinerja supir</p>
              <p className="text-sm text-gray-400">Data akan muncul setelah ada aktivitas booking dengan supir</p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nama Supir
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Trip
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Jam Kerja
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {driverPerformanceData.map((driver, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-medium text-sm">
                            {driver.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{driver.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {driver.trips}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-sm text-gray-900">{driver.rating}</span>
                        <div className="ml-2 flex">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`text-sm ${
                                i < Math.floor(driver.rating) ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {driver.hours} jam
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                        Aktif
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        
        {/* Mobile Cards */}
        <div className="lg:hidden space-y-4">
          {driverPerformanceData.map((driver, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-medium text-sm">
                      {driver.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{driver.name}</div>
                  </div>
                </div>
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                  Aktif
                </span>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Trip:</span>
                  <p className="font-medium">{driver.trips}</p>
                </div>
                <div>
                  <span className="text-gray-600">Rating:</span>
                  <div className="flex items-center">
                    <span className="font-medium mr-1">{driver.rating}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-xs ${
                            i < Math.floor(driver.rating) ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">Jam:</span>
                  <p className="font-medium">{driver.hours}h</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;