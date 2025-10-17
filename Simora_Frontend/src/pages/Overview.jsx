import React, { useState, useEffect } from 'react';
import { Users, Car, UserCheck, TrendingUp } from 'lucide-react';
import { dashboardAPI } from '../services/api';

const Overview = () => {
  const [dashboardData, setDashboardData] = useState({
    stats: {
      total_employees: 0,
      total_drivers: 0,
      total_cars: 0,
      total_bookings: 0,
      active_bookings: 0,
      pending_bookings: 0,
      available_cars: 0,
      maintenance_cars: 0,
    },
    recent_bookings: []
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await dashboardAPI.getStats();
      setDashboardData(response.data.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const stats = [
    { title: 'Total Supir', value: dashboardData.stats.total_drivers.toString(), icon: Users, color: 'bg-blue-500' },
    { title: 'Total Mobil', value: dashboardData.stats.total_cars.toString(), icon: Car, color: 'bg-green-500' },
    { title: 'Total Pegawai', value: dashboardData.stats.total_employees.toString(), icon: UserCheck, color: 'bg-purple-500' },
    { title: 'Booking Aktif', value: dashboardData.stats.active_bookings.toString(), icon: TrendingUp, color: 'bg-orange-500' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Overview</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Status Mobil</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Tersedia</span>
              <span className="font-semibold text-green-600">{dashboardData.stats.available_cars}</span>
            </div>
            <div className="flex justify-between">
              <span>Sedang Digunakan</span>
              <span className="font-semibold text-blue-600">{dashboardData.stats.active_bookings}</span>
            </div>
            <div className="flex justify-between">
              <span>Maintenance</span>
              <span className="font-semibold text-red-600">{dashboardData.stats.maintenance_cars}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Aktivitas Terbaru</h3>
          <div className="space-y-3">
            {dashboardData.recent_bookings.length > 0 ? (
              dashboardData.recent_bookings.slice(0, 3).map((booking) => (
                <div key={booking.id} className="text-sm">
                  <p className="font-medium">
                    Booking baru dari {booking.employee?.name || 'N/A'}
                  </p>
                  <p className="text-gray-500">
                    {new Date(booking.booking_date).toLocaleDateString('id-ID')} - {booking.destination}
                  </p>
                </div>
              ))
            ) : (
              <div className="text-sm text-gray-500">
                <p>Belum ada aktivitas terbaru</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;