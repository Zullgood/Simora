import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import RoleProtectedRoute from './components/RoleProtectedRoute';
import Home from './pages/Home';
import Overview from './pages/Overview';
import Analytics from './pages/Analytics';
import Drivers from './pages/Drivers';
import Cars from './pages/Cars';
import Employees from './pages/Employees';
import BookingManagement from './pages/BookingManagement';
import Tracking from './pages/Tracking';
import Reports from './pages/Reports';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

import SuperAdmin from './pages/SuperAdmin';
import './App.css';

function App() {
  const token = localStorage.getItem('token');
  
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          token ? (
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          ) : (
            <Navigate to="/login" replace />
          )
        }>
          <Route index element={<Home />} />
          <Route path="overview" element={<Overview />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="drivers" element={<Drivers />} />
          <Route path="cars" element={<Cars />} />
          <Route path="employees" element={<Employees />} />
          <Route path="bookings" element={<BookingManagement />} />
          <Route path="booking-management" element={<BookingManagement />} />
          <Route path="tracking" element={<Tracking />} />
          <Route path="reports" element={<Reports />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />

          <Route path="super-admin" element={
            <RoleProtectedRoute allowedRoles={['super_admin']}>
              <SuperAdmin />
            </RoleProtectedRoute>
          } />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
