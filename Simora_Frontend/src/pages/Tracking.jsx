import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Clock, Car, User, Phone, RefreshCw, Filter } from 'lucide-react';
import TrackingMap from '../components/Map/TrackingMap';
import { trackingAPI } from '../services/api';

const Tracking = () => {
  const [activeBookings, setActiveBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActiveBookings();
    
    // Auto refresh every 2 minutes
    const interval = setInterval(fetchActiveBookings, 120000);
    return () => clearInterval(interval);
  }, []);

  const fetchActiveBookings = async () => {
    try {
      const response = await trackingAPI.getActiveBookings();
      const bookings = response.data.data || response.data || [];
      
      // Filter only active bookings and add mock location data
      const activeBookings = bookings
        .filter(booking => ['approved', 'on_trip', 'waiting'].includes(booking.status))
        .map(booking => ({
          id: booking.id,
          employeeName: booking.employee?.name || 'Unknown',
          employeePhone: booking.employee?.phone || '-',
          driverName: booking.driver?.name || 'Unknown',
          carPlate: booking.car?.license_plate || '-',
          destination: booking.destination || '-',
          startTime: booking.start_time || '-',
          estimatedArrival: booking.end_time || '-',
          status: booking.status === 'approved' ? 'waiting' : booking.status,
          currentLocation: {
            lat: booking.current_lat || (-6.2088 + (Math.random() - 0.5) * 0.1),
            lng: booking.current_lng || (106.8456 + (Math.random() - 0.5) * 0.1),
            address: booking.current_address || 'Jakarta, Indonesia'
          },
          lastUpdate: formatLastUpdate(booking.updated_at)
        }));
      
      setActiveBookings(activeBookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatLastUpdate = (timestamp) => {
    if (!timestamp) return 'Tidak diketahui';
    const now = new Date();
    const time = new Date(timestamp);
    const diff = Math.floor((now - time) / 1000);
    
    if (diff < 60) return 'Baru saja';
    if (diff < 3600) return `${Math.floor(diff / 60)} menit lalu`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`;
    return `${Math.floor(diff / 86400)} hari lalu`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'on_trip': return 'bg-green-100 text-green-800';
      case 'waiting': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'on_trip': return 'Dalam Perjalanan';
      case 'waiting': return 'Menunggu';
      case 'completed': return 'Selesai';
      default: return status;
    }
  };

  const filteredBookings = activeBookings.filter(booking => 
    filterStatus === 'all' || booking.status === filterStatus
  );

  const refreshLocation = () => {
    setLoading(true);
    fetchActiveBookings();
  };

  const handleMarkerClick = (booking) => {
    setSelectedBooking(booking);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data tracking...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Live Tracking</h1>
          <p className="text-gray-600">Monitor lokasi karyawan dan supir secara real-time</p>
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Semua Status</option>
            <option value="on_trip">Dalam Perjalanan</option>
            <option value="waiting">Menunggu</option>
            <option value="completed">Selesai</option>
          </select>
          <button
            onClick={refreshLocation}
            className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Map Area */}
        <div className="xl:col-span-2 order-2 xl:order-1">
          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Peta Live Tracking</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Live</span>
              </div>
            </div>
            
            {/* OpenStreetMap */}
            <TrackingMap 
              bookings={filteredBookings}
              selectedBooking={selectedBooking}
              onMarkerClick={handleMarkerClick}
            />
          </div>
        </div>

        {/* Booking List */}
        <div className="space-y-4 order-1 xl:order-2">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">Booking Aktif ({filteredBookings.length})</h3>
          
          {filteredBookings.map((booking) => (
            <div
              key={booking.id}
              className={`bg-white rounded-lg shadow p-4 cursor-pointer transition-all ${
                selectedBooking?.id === booking.id ? 'ring-2 ring-blue-500' : 'hover:shadow-md'
              }`}
              onClick={() => setSelectedBooking(booking)}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <span className="font-medium text-gray-900">{booking.employeeName}</span>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(booking.status)}`}>
                  {getStatusText(booking.status)}
                </span>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Car className="w-4 h-4" />
                  <span>{booking.carPlate} - {booking.driverName}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span className="truncate">{booking.destination}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Navigation className="w-4 h-4" />
                  <span className="truncate">{booking.currentLocation.address}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>Update: {booking.lastUpdate}</span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Berangkat: {booking.startTime}</span>
                  <span>ETA: {booking.estimatedArrival}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Booking Details */}
      {selectedBooking && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Detail Tracking</h3>
            <button
              onClick={() => setSelectedBooking(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Informasi Karyawan</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Nama:</span>
                  <span className="font-medium">{selectedBooking.employeeName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Telepon:</span>
                  <span className="font-medium">{selectedBooking.employeePhone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tujuan:</span>
                  <span className="font-medium">{selectedBooking.destination}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-3">Informasi Kendaraan</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Supir:</span>
                  <span className="font-medium">{selectedBooking.driverName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Plat Nomor:</span>
                  <span className="font-medium">{selectedBooking.carPlate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedBooking.status)}`}>
                    {getStatusText(selectedBooking.status)}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-3">Lokasi Terkini</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Alamat:</span>
                  <span className="font-medium text-right">{selectedBooking.currentLocation.address}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Koordinat:</span>
                  <span className="font-medium">{selectedBooking.currentLocation.lat}, {selectedBooking.currentLocation.lng}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Update:</span>
                  <span className="font-medium">{selectedBooking.lastUpdate}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <button className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              <Phone className="w-4 h-4" />
              <span>Hubungi Karyawan</span>
            </button>
            <button className="flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
              <Phone className="w-4 h-4" />
              <span>Hubungi Supir</span>
            </button>
            <button className="flex items-center justify-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
              <Navigation className="w-4 h-4" />
              <span>Lihat Rute</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tracking;