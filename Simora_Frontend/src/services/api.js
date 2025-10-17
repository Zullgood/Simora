import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0'
  },
  withCredentials: false,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers['X-Requested-With'] = 'XMLHttpRequest';
  config.headers['Accept'] = 'application/json';
  config.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
  config.headers['Pragma'] = 'no-cache';
  config.headers['Expires'] = '0';
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && !error.config?.url?.includes('/login')) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (credentials) => api.post('/login', credentials),
  logout: () => api.post('/logout'),
  getUser: () => api.get('/user'),
};

export const employeeAPI = {
  getAll: () => api.get('/employees'),
  create: (data) => api.post('/employees', data),
  update: (id, data) => api.put(`/employees/${id}`, data),
  delete: (id) => api.delete(`/employees/${id}`),
};

export const driverAPI = {
  getAll: () => api.get('/drivers'),
  create: (data) => api.post('/drivers', data),
  update: (id, data) => api.put(`/drivers/${id}`, data),
  delete: (id) => api.delete(`/drivers/${id}`),
};

export const carAPI = {
  getAll: () => api.get('/cars'),
  create: (data) => api.post('/cars', data),
  update: (id, data) => api.put(`/cars/${id}`, data),
  delete: (id) => api.delete(`/cars/${id}`),
};

export const bookingAPI = {
  getAll: () => api.get('/bookings'),
  getPending: () => api.get('/bookings?status=pending'),
  getHistory: () => api.get('/bookings/history'),
  create: (data) => api.post('/bookings', data),
  update: (id, data) => api.put(`/bookings/${id}`, data),
  delete: (id) => api.delete(`/bookings/${id}`),
  approve: (id, data) => api.patch(`/bookings/${id}/approve`, data),
  reject: (id, data) => api.patch(`/bookings/${id}/reject`, data),
  updateStatus: (id, status) => api.patch(`/bookings/${id}/status`, { status }),
  assignDriver: (id, driverId) => api.patch(`/bookings/${id}/assign-driver`, { driver_id: driverId }),
  assignCar: (id, carId) => api.patch(`/bookings/${id}/assign-car`, { car_id: carId }),
};

export const adminUserAPI = {
  getAll: () => api.get('/admin-users'),
  create: (data) => api.post('/admin-users', data),
  update: (id, data) => api.put(`/admin-users/${id}`, data),
  delete: (id) => api.delete(`/admin-users/${id}`),
};

export const notificationAPI = {
  getAll: () => api.get('/notifications'),
  getUnreadCount: () => api.get('/notifications/unread-count'),
  markAsRead: (id) => api.patch(`/notifications/${id}/read`),
  markAllAsRead: () => api.patch('/notifications/mark-all-read'),
};

export const dashboardAPI = {
  getStats: () => api.get('/dashboard'),
  getBookingTrends: () => api.get('/dashboard/booking-trends'),
  getCarUsage: () => api.get('/dashboard/car-usage'),
  getBookingPurposes: () => api.get('/dashboard/booking-purposes'),
  getTopDrivers: () => api.get('/dashboard/top-drivers'),
};

export const profileAPI = {
  getProfile: () => api.get('/profile'),
  updateProfile: (data) => api.put('/profile', data),
  changePassword: (data) => api.put('/profile/change-password', data),
};

export const trackingAPI = {
  getActiveBookings: () => api.get('/tracking/active-bookings'),
  updateLocation: (bookingId, data) => api.patch(`/tracking/${bookingId}/location`, data),
  updateStatus: (bookingId, data) => api.patch(`/tracking/${bookingId}/status`, data),
  startTrip: (bookingId) => api.patch(`/tracking/${bookingId}/start`),
  endTrip: (bookingId) => api.patch(`/tracking/${bookingId}/end`),
  getBookingHistory: (bookingId) => api.get(`/tracking/${bookingId}/history`),
};

export const reportAPI = {
  getDashboardStats: (range) => api.get('/reports/dashboard-stats', { params: { range } }),
  getBookingTrends: (range) => api.get('/reports/booking-trends', { params: { range } }),
  getCarUtilization: () => api.get('/reports/car-utilization'),
  getDepartmentUsage: () => api.get('/reports/department-usage'),
  getDriverPerformance: () => api.get('/reports/driver-performance'),
};

export const analyticsAPI = {
  getAnalytics: () => api.get('/analytics'),
  getBookingTrends: (period = 12) => api.get(`/analytics/booking-trends?period=${period}`),
  getDriverPerformance: () => api.get('/analytics/driver-performance'),
};

export default api;