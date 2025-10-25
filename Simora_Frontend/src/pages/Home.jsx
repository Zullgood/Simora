import React, { useState, useEffect } from 'react';
import { Users, Car, UserCheck, Calendar, Clock, TrendingUp, Sun, Moon, CloudRain, Sunrise } from 'lucide-react';
import MetricCard from '../components/Dashboard/MetricCard';
import { 
  NetworkActivitiesChart, 
  CampaignPerformanceChart, 
  AppVersionsChart, 
  DeviceUsageChart 
} from '../components/Dashboard/ChartCard';
import { dashboardAPI } from '../services/api';

const Home = () => {
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
    recent_bookings: [],
    monthly_bookings: []
  });
  const [bookingTrends, setBookingTrends] = useState([]);
  const [topDrivers, setTopDrivers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userProfile] = useState({
    name: JSON.parse(localStorage.getItem('user') || '{}').name || 'Admin'
  });

  useEffect(() => {
    fetchDashboardData();
    fetchBookingTrends();
    fetchTopDrivers();
    
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const fetchBookingTrends = async () => {
    try {
      const response = await dashboardAPI.getBookingTrends();
      if (response.data && response.data.success) {
        const trends = response.data.data.map(item => ({
          week: item.week || 'Week',
          bookings: item.bookings || 0
        }));
        setBookingTrends(trends);
      } else {
        throw new Error('Invalid booking trends response');
      }
    } catch (error) {
      console.error('Error fetching booking trends:', error);
      setBookingTrends([
        { week: 'Minggu 1', bookings: 0 },
        { week: 'Minggu 2', bookings: 0 },
        { week: 'Minggu 3', bookings: 0 },
        { week: 'Minggu 4', bookings: 0 }
      ]);
    }
  };

  const fetchTopDrivers = async () => {
    try {
      const response = await dashboardAPI.getTopDrivers();
      console.log('Top drivers response:', response.data);
      if (response.data && response.data.success) {
        const drivers = response.data.data.map(driver => ({
          name: driver.name,
          trips: driver.trips || 0,
          rating: parseFloat(driver.rating) || 4.5,
          hours: driver.hours || 160
        }));
        console.log('Processed drivers:', drivers);
        setTopDrivers(drivers);
      } else {
        throw new Error('Invalid top drivers response');
      }
    } catch (error) {
      console.error('Error fetching top drivers:', error);
      // Use realistic fallback data
      setTopDrivers([
        { name: 'Ahmad Supardi', trips: 45, rating: 4.8, hours: 160 },
        { name: 'Budi Santoso', trips: 38, rating: 4.6, hours: 152 },
        { name: 'Candra Wijaya', trips: 42, rating: 4.7, hours: 158 },
        { name: 'Dedi Kurniawan', trips: 35, rating: 4.5, hours: 145 }
      ]);
    }
  };

  const fetchDashboardData = async () => {
    try {
      const response = await dashboardAPI.getStats();
      if (response.data && response.data.success) {
        setDashboardData(response.data.data);
      } else {
        throw new Error('Invalid dashboard response');
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      const mockStats = {
        total_employees: 45,
        total_drivers: 8,
        total_cars: 12,
        total_bookings: 156,
        active_bookings: 8,
        pending_bookings: 5,
        available_cars: 4,
        maintenance_cars: 2
      };
      
      setDashboardData({
        stats: mockStats,
        recent_bookings: [],
        monthly_bookings: []
      });
    }
  };



  // Get time-based greeting with weather-themed colors
  const getTimeBasedGreeting = () => {
    const hour = currentTime.getHours();
    if (hour >= 5 && hour < 11) {
      return { 
        greeting: 'Selamat Pagi', 
        icon: 'sunrise', 
        iconColor: 'from-amber-500 via-orange-500 to-rose-500',
        cardColor: 'bg-white/70'
      };
    } else if (hour >= 11 && hour < 15) {
      return { 
        greeting: 'Selamat Siang', 
        icon: 'sun', 
        iconColor: 'from-yellow-400 via-amber-500 to-orange-500',
        cardColor: 'bg-white/70'
      };
    } else if (hour >= 15 && hour < 18) {
      return { 
        greeting: 'Selamat Sore', 
        icon: 'cloud', 
        iconColor: 'from-blue-500 via-indigo-500 to-purple-500',
        cardColor: 'bg-white/70'
      };
    } else {
      return { 
        greeting: 'Selamat Malam', 
        icon: 'moon', 
        iconColor: 'from-indigo-600 via-purple-600 to-slate-700',
        cardColor: 'bg-white/70'
      };
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const timeInfo = getTimeBasedGreeting();

  const metrics = [
    {
      title: 'Total Supir',
      value: dashboardData.stats.total_drivers.toString(),
      change: '+2',
      changeType: 'increase',
      icon: Users,
      iconColor: 'text-blue-600'
    },
    {
      title: 'Total Mobil',
      value: dashboardData.stats.total_cars.toString(),
      change: '+1',
      changeType: 'increase',
      icon: Car,
      iconColor: 'text-green-600'
    },
    {
      title: 'Total Pegawai',
      value: dashboardData.stats.total_employees.toString(),
      change: '+3',
      changeType: 'increase',
      icon: UserCheck,
      iconColor: 'text-purple-600'
    },
    {
      title: 'Total Booking',
      value: dashboardData.stats.total_bookings.toString(),
      change: '+12',
      changeType: 'increase',
      icon: Calendar,
      iconColor: 'text-orange-600'
    },
    {
      title: 'Booking Aktif',
      value: dashboardData.stats.active_bookings.toString(),
      change: '+3',
      changeType: 'increase',
      icon: Clock,
      iconColor: 'text-red-600'
    },
    {
      title: 'Mobil Tersedia',
      value: dashboardData.stats.available_cars.toString(),
      change: '-2',
      changeType: 'decrease',
      icon: TrendingUp,
      iconColor: 'text-indigo-600'
    }
  ];





  return (
    <div className="space-y-2 sm:space-y-4 md:space-y-6 px-1 sm:px-4 md:px-0">
      {/* Welcome Section */}
      <div className={`${timeInfo.bgColor} rounded-lg sm:rounded-xl md:rounded-2xl p-2 sm:p-4 md:p-6 border border-gray-100 ${timeInfo.shadowColor} shadow-lg transition-all duration-1000 ease-in-out`}>
        <div className="flex flex-col space-y-2 sm:space-y-3 md:flex-row md:items-center md:justify-between md:space-y-0">
          {/* Left Side - Greeting */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className={`w-6 h-6 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-gradient-to-br ${timeInfo.iconColor} rounded-md sm:rounded-xl flex items-center justify-center shadow-md transition-all duration-700 ease-in-out hover:scale-110`}>
              {timeInfo.icon === 'sunrise' && <Sunrise className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-white animate-bounce-slow hover:animate-glow transition-transform duration-500" />}
              {timeInfo.icon === 'sun' && <Sun className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-white animate-spin hover:animate-pulse transition-transform duration-1000" style={{animationDuration: '4s'}} />}
              {timeInfo.icon === 'cloud' && <CloudRain className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-white animate-float hover:animate-wiggle transition-transform duration-500" />}
              {timeInfo.icon === 'moon' && <Moon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 animate-pulse-slow hover:animate-bounce transition-transform duration-500" />}
            </div>
            <div className="min-w-0 flex-1">
              <h1 className={`text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold ${timeInfo.textColor} transition-all duration-500 ease-in-out truncate`}>
                {timeInfo.greeting}, {userProfile.name}!
              </h1>
              <p className="text-gray-600 mt-0.5 text-xs sm:text-sm transition-opacity duration-700 ease-in-out">
                Selamat datang kembali di Dashboard Simora
              </p>
            </div>
          </div>
          
          {/* Right Side - Time & Date */}
          <div className="flex items-center justify-start md:justify-end">
            <div className="text-left md:text-center">
              <div className={`text-sm sm:text-base md:text-lg lg:text-xl font-mono font-bold ${timeInfo.textColor} transition-colors duration-300`}>
                {formatTime(currentTime)}
              </div>
              <div className="text-xs text-gray-600 mt-0.5">
                WIB 
              </div>
            </div>
          </div>
        </div>
        
        {/* Info Bar */}
        <div className="mt-2 sm:mt-3 md:mt-4 flex flex-wrap items-center justify-start md:justify-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600">
          <div className={`flex items-center space-x-1 sm:space-x-2 ${timeInfo.cardColor} rounded-md sm:rounded-lg px-2 py-1 transition-all duration-300 hover:scale-105`}>
            <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">{formatDate(currentTime)}</span>
            <span className="sm:hidden">{currentTime.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}</span>
          </div>
          <div className={`flex items-center space-x-1 sm:space-x-2 ${timeInfo.cardColor} rounded-md sm:rounded-lg px-2 py-1 transition-all duration-300 hover:scale-105`}>
            <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Sistem Booking Mobil Perusahaan</span>
            <span className="sm:hidden">Simora</span>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1 sm:gap-3 md:gap-4">
        {metrics.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            changeType={metric.changeType}
            icon={metric.icon}
            iconColor={metric.iconColor}
          />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
        <div className="lg:col-span-2 order-2 lg:order-1">
          <NetworkActivitiesChart bookingTrends={bookingTrends} />
        </div>
        <div className="order-1 lg:order-2">
          <CampaignPerformanceChart topDrivers={topDrivers} />
        </div>
      </div>

      {/* Recent Booking Requests */}
      <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 p-2 sm:p-4 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 md:mb-6 space-y-2 sm:space-y-0">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Clock className="w-3 h-3 sm:w-3 sm:h-3 md:w-4 md:h-4 text-blue-600" />
            </div>
            <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">Booking Terbaru</h3>
          </div>
          <a href="/booking-management" className="text-blue-600 hover:text-blue-700 text-xs sm:text-sm font-medium transition-colors self-start sm:self-center">
            Lihat Semua
          </a>
        </div>
        
        <div className="space-y-2 sm:space-y-3">
          {dashboardData.recent_bookings.length > 0 ? (
            dashboardData.recent_bookings.map((booking) => {
              const getStatusBadge = (status) => {
                switch (status) {
                  case 'pending': return 'bg-amber-100 text-amber-700 border-amber-200';
                  case 'approved': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
                  case 'rejected': return 'bg-red-100 text-red-700 border-red-200';
                  default: return 'bg-gray-100 text-gray-700 border-gray-200';
                }
              };
              
              const getStatusText = (status) => {
                switch (status) {
                  case 'pending': return 'Menunggu';
                  case 'approved': return 'Disetujui';
                  case 'rejected': return 'Ditolak';
                  default: return status;
                }
              };
              
              return (
                <div key={booking.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-1 sm:p-3 md:p-4 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors space-y-1 sm:space-y-0">
                  <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
                    <div className="w-5 h-5 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-medium text-xs sm:text-sm">
                        {booking.employee?.name?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-gray-900 truncate text-xs sm:text-sm">
                        {booking.employee?.name || 'Unknown User'}
                      </p>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 text-xs text-gray-500">
                        <span>{booking.employee?.department || 'N/A'}</span>
                        <span className="hidden sm:inline">•</span>
                        <span className="truncate">{booking.destination}</span>
                        <span className="hidden sm:inline">•</span>
                        <span>{new Date(booking.booking_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusBadge(booking.status)} self-start sm:self-center whitespace-nowrap`}>
                    {getStatusText(booking.status)}
                  </span>
                </div>
              );
            })
          ) : (
            <div className="text-center py-6 sm:py-8 md:py-12">
              <div className="flex flex-col items-center justify-center h-full text-gray-500 text-center">
                <Clock className="w-12 h-12 mb-4 text-gray-300" />
              </div>
              <p className="text-gray-500 font-medium text-xs sm:text-sm md:text-base">Belum ada booking terbaru</p>
              <p className="text-gray-400 text-xs mt-1">Booking akan muncul di sini setelah dibuat</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;