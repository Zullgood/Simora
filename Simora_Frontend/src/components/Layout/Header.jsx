import React, { useState, useEffect } from 'react';
import { Menu, Bell, User, ChevronDown, Clock, Car, Settings, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { notificationAPI, profileAPI } from '../../services/api';
import Swal from 'sweetalert2';

const Header = ({ toggleSidebar }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [userProfile, setUserProfile] = useState({
    name: 'Admin Simora',
    position: 'HRD Manager',
    email: 'admin@simora.com',
    avatar: null
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserProfile();
    fetchNotifications();
    fetchUnreadCount();
    
    // Poll for new notifications every 60 seconds
    const interval = setInterval(() => {
      fetchNotifications();
      fetchUnreadCount();
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await profileAPI.getProfile();
      const userData = response.data.data || response.data;
      setUserProfile({
        name: userData.name || 'Admin Simora',
        position: userData.position || userData.role || 'Admin',
        email: userData.email || 'admin@simora.com',
        avatar: userData.avatar || null
      });
    } catch (error) {
      console.error('Error fetching user profile:', error);
      // Use fallback data when API fails
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      setUserProfile({
        name: user.name || 'Admin Simora',
        position: user.position || user.role || 'HRD Manager',
        email: user.email || 'admin@simora.com',
        avatar: null
      });
    }
  };
  
  const fetchNotifications = async () => {
    try {
      const response = await notificationAPI.getAll();
      const backendNotifications = response.data.data || [];
      // Show only recent unread notifications (last 10)
      const recentNotifications = backendNotifications
        .filter(notif => !notif.read_at)
        .slice(0, 10);
      setNotifications(recentNotifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      // Fallback to empty array on error - suppress 404 errors
      setNotifications([]);
    }
  };
  
  const fetchUnreadCount = async () => {
    try {
      const response = await notificationAPI.getUnreadCount();
      setUnreadCount(response.data.count || 0);
    } catch (error) {
      console.error('Error fetching unread count:', error);
      // Set to 0 when API fails
      setUnreadCount(0);
    }
  };
  
  const handleMarkAsRead = async (id) => {
    try {
      await notificationAPI.markAsRead(id);
      // Update local state immediately for better UX
      setNotifications(prev => prev.map(notif => 
        notif.id === id ? { ...notif, read_at: new Date().toISOString() } : notif
      ));
      fetchUnreadCount();
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };
  
  const handleMarkAllAsRead = async () => {
    try {
      await notificationAPI.markAllAsRead();
      // Update local state immediately
      setNotifications(prev => prev.map(notif => ({ 
        ...notif, 
        read_at: new Date().toISOString() 
      })));
      setUnreadCount(0);
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };
  
  const handleLogout = () => {
    Swal.fire({
      title: 'Konfirmasi Logout',
      text: 'Apakah Anda yakin ingin keluar?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Logout',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
      }
    });
  };
  
  const formatTime = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diff = Math.floor((now - time) / 1000);
    
    if (diff < 60) return 'Baru saja';
    if (diff < 3600) return `${Math.floor(diff / 60)} menit lalu`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`;
    return `${Math.floor(diff / 86400)} hari lalu`;
  };

  return (
    <header className="bg-slate-700 text-white shadow-lg w-full animate-fade-in">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left side - Menu button */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSidebar}
            className="lg:hidden text-white hover:text-gray-300 transition-all duration-300 hover:scale-110 hover:rotate-12 p-2 rounded-lg hover:bg-slate-600"
          >
            <Menu className="w-6 h-6 hover:animate-pulse" />
          </button>
          <h2 className="text-xl font-semibold hidden sm:block bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent hover:from-blue-200 hover:to-white transition-all duration-300 hover:scale-105">
            Dashboard Admin Simora
          </h2>
        </div>

        {/* Right side - User actions */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-white hover:text-blue-300 transition-all duration-300 hover:scale-110 hover:rotate-12 rounded-lg hover:bg-slate-600 group"
            >
              <Bell className="w-6 h-6 group-hover:animate-bounce" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  <span className="absolute inset-0 bg-red-500 rounded-full animate-ping"></span>
                  <span className="relative">{unreadCount > 99 ? '99+' : unreadCount}</span>
                </span>
              )}
            </button>
            
            {/* Notification Dropdown */}
            {showNotifications && (
              <>
                {/* Mobile Overlay */}
                <div className="fixed inset-0 bg-black bg-opacity-25 z-40 sm:hidden" onClick={() => setShowNotifications(false)}></div>
                
                {/* Dropdown */}
                <div className="absolute right-0 mt-2 w-80 sm:w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50 
                              sm:max-w-none max-w-[calc(100vw-1rem)] 
                              sm:mr-0 -mr-2 animate-fade-in transform scale-95 animate-scale-in">
                  <div className="p-3 sm:p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm sm:text-base font-semibold text-gray-900">Notifikasi</h3>
                      <div className="flex items-center space-x-2">
                        {unreadCount > 0 && (
                          <button
                            onClick={handleMarkAllAsRead}
                            className="text-xs text-blue-600 hover:text-blue-800"
                          >
                            Tandai semua dibaca
                          </button>
                        )}
                        <button 
                          onClick={() => setShowNotifications(false)}
                          className="sm:hidden text-gray-400 hover:text-gray-600"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="max-h-60 sm:max-h-64 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notif) => (
                        <div 
                          key={notif.id} 
                          className={`p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                            !notif.read_at ? 'bg-blue-50' : ''
                          }`}
                          onClick={() => {
                            if (!notif.read_at) {
                              handleMarkAsRead(notif.id);
                            }
                            // Navigate to booking management for booking notifications
                            if (notif.type === 'booking' || notif.type === 'booking_created' || notif.type === 'booking_status') {
                              navigate('/booking-management');
                              setShowNotifications(false);
                            }
                          }}
                        >
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 mt-0.5">
                              {notif.type === 'booking' ? (
                                <Clock className="w-4 h-4 text-blue-500" />
                              ) : (
                                <Car className="w-4 h-4 text-green-500" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-gray-900 leading-tight">{notif.title}</p>
                                  <p className="text-sm text-gray-700 leading-tight mt-1">{notif.message}</p>
                                  <p className="text-xs text-gray-500 mt-1">{formatTime(notif.created_at)}</p>
                                </div>
                                {!notif.read_at && (
                                  <div className="w-2 h-2 bg-blue-500 rounded-full ml-2 mt-1"></div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-6 text-center text-gray-500">
                        <Bell className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                        <p className="text-sm">Tidak ada notifikasi</p>
                      </div>
                    )}
                  </div>
                  <div className="p-3 border-t border-gray-200">
                    <Link 
                      to="/booking-management" 
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                      onClick={() => setShowNotifications(false)}
                    >
                      Lihat semua booking →
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* User Profile */}
          <div className="relative">
            <button 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-3 hover:bg-slate-600 rounded-lg p-2 transition-all duration-300 hover:scale-105 group"
            >
              {userProfile.avatar ? (
                <img 
                  src={userProfile.avatar.startsWith('data:') ? userProfile.avatar : `data:image/jpeg;base64,${userProfile.avatar}`} 
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover border-2 border-slate-500 group-hover:border-blue-400 transition-all duration-300 group-hover:scale-110"
                />
              ) : (
                <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center group-hover:bg-blue-500 transition-all duration-300 group-hover:scale-110">
                  <User className="w-4 h-4 group-hover:animate-pulse" />
                </div>
              )}
              <div className="hidden sm:block group-hover:translate-x-1 transition-transform duration-300">
                <p className="text-sm font-medium group-hover:text-blue-200 transition-colors duration-300">{userProfile.name}</p>
                <p className="text-xs text-slate-300 group-hover:text-slate-200 transition-colors duration-300">{userProfile.position}</p>
              </div>
              <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
            </button>
            
            {/* Profile Dropdown */}
            {showProfileMenu && (
              <>
                {/* Mobile Overlay */}
                <div className="fixed inset-0 bg-black bg-opacity-25 z-40 sm:hidden" onClick={() => setShowProfileMenu(false)}></div>
                
                {/* Dropdown */}
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50 animate-fade-in transform scale-95 animate-scale-in">
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                      {userProfile.avatar ? (
                        <img 
                          src={userProfile.avatar.startsWith('data:') ? userProfile.avatar : `data:image/jpeg;base64,${userProfile.avatar}`} 
                          alt="Profile"
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-gray-600" />
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-gray-900">{userProfile.name}</p>
                        <p className="text-sm text-gray-600">{userProfile.position}</p>
                        <p className="text-xs text-gray-500">{userProfile.email}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="py-2">
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      <User className="w-4 h-4 mr-3" />
                      Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      <Settings className="w-4 h-4 mr-3" />
                      Settings
                    </Link>
                  </div>
                  
                  <div className="border-t border-gray-200 py-2">
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Logout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;