import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Users } from 'lucide-react';

const ChartCard = ({ title, subtitle, children, className = "" }) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${className}`}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
};

// Booking Trends Chart
export const NetworkActivitiesChart = ({ bookingTrends = [], loading = false }) => {
  const data = bookingTrends.length > 0 ? bookingTrends.map(item => ({
    name: item.week || item.month || 'Week',
    bookings: item.bookings || 0
  })) : [
    { name: 'Minggu 1', bookings: 12 },
    { name: 'Minggu 2', bookings: 19 },
    { name: 'Minggu 3', bookings: 15 },
    { name: 'Minggu 4', bookings: 22 },
    { name: 'Minggu 5', bookings: 18 },
    { name: 'Minggu 6', bookings: 25 }
  ];

  return (
    <ChartCard title="Tren Booking Mingguan" subtitle="Jumlah booking per minggu">
      <div className="h-64">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-gray-500 text-center">
              <div className="animate-bounce">
                <div className="text-4xl mb-2">📊</div>
              </div>
              <p className="text-lg mb-2">Memuat data booking...</p>
              <p className="text-sm">Mohon tunggu sebentar</p>
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="bookings" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </ChartCard>
  );
};

// Top Drivers Performance Chart
export const CampaignPerformanceChart = ({ topDrivers = [], loading = false }) => {
  const data = topDrivers.length > 0 ? topDrivers.slice(0, 5).map(driver => ({
    name: driver.name.length > 10 ? driver.name.substring(0, 8) + '...' : driver.name,
    trips: driver.trips || 0,
    rating: driver.rating || 0
  })) : [
    { name: 'Ahmad S.', trips: 15, rating: 4.8 },
    { name: 'Budi W.', trips: 12, rating: 4.6 },
    { name: 'Candra M.', trips: 10, rating: 4.7 },
    { name: 'Dedi K.', trips: 8, rating: 4.5 }
  ];

  return (
    <ChartCard title="Top Supir Bulan Ini" subtitle="Berdasarkan jumlah trip">
      <div className="h-64">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-gray-500 text-center">
              <div className="animate-bounce">
                <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              </div>
              <p className="text-lg mb-2">Memuat data supir...</p>
              <p className="text-sm">Mohon tunggu sebentar</p>
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value, name) => [
                name === 'trips' ? `${value} trip` : `${value} rating`,
                name === 'trips' ? 'Jumlah Trip' : 'Rating'
              ]} />
              <Bar dataKey="trips" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </ChartCard>
  );
};

// Car Usage Chart
export const AppVersionsChart = ({ carUsage = [] }) => {
  const data = carUsage.length > 0 ? carUsage : [
    { car: 'Toyota Avanza', usage: 85, label: '85%' },
    { car: 'Honda Civic', usage: 72, label: '72%' },
    { car: 'Suzuki Ertiga', usage: 68, label: '68%' },
    { car: 'Daihatsu Xenia', usage: 91, label: '91%' }
  ];

  return (
    <ChartCard title="Utilisasi Mobil" subtitle="Tingkat penggunaan mobil">
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">{item.car}</span>
            <div className="flex items-center space-x-3">
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full" 
                  style={{ width: `${item.usage}%` }}
                ></div>
              </div>
              <span className="text-sm text-gray-600 w-8">{item.label}</span>
            </div>
          </div>
        ))}
      </div>
    </ChartCard>
  );
};

// Booking Purpose Chart
export const DeviceUsageChart = ({ bookingPurposes = [] }) => {
  const data = bookingPurposes.length > 0 ? bookingPurposes : [
    { name: 'Dinas Luar', value: 45, color: '#3b82f6' },
    { name: 'Meeting', value: 25, color: '#10b981' },
    { name: 'Antar Jemput', value: 20, color: '#f59e0b' },
    { name: 'Lainnya', value: 10, color: '#ef4444' }
  ];

  return (
    <ChartCard title="Tujuan Booking" subtitle="Kategori penggunaan">
      <div className="flex items-center space-x-6">
        <div className="w-32 h-32">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={60}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-sm text-gray-700">{item.name} {item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </ChartCard>
  );
};

export default ChartCard;