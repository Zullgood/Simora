import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { profileAPI } from '../../services/api';
import { 
  Home, 
  Users, 
  Car, 
  UserCheck, 
  FileText, 
  Clock,
  MapPin,
  ChevronDown, 
  ChevronRight,
  Menu,
  X,
  Shield,
  History
} from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState({});
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userProfile, setUserProfile] = useState({
    name: 'Admin Simora',
    department: 'HRD/GA',
    avatar: null
  });
  
  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userRole = user.role || 'admin';

  useEffect(() => {
    fetchUserProfile();
    
    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await profileAPI.getProfile();
      const userData = response.data.data || response.data;
      setUserProfile({
        name: userData.name || 'Admin Simora',
        department: userData.department || userData.position || 'Admin',
        avatar: userData.avatar || null
      });
    } catch (error) {
      console.error('Error fetching user profile:', error);
      // Use fallback data when API fails
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      setUserProfile({
        name: user.name || 'Admin Simora',
        department: user.department || user.position || 'HRD/GA',
        avatar: null
      });
    }
  };

  const menuItems = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      
      subItems: [
        { label: 'Dashboard', path: '/' },
        { label: 'Overview', path: '/overview' },
        { label: 'Analytics', path: '/analytics' }
      ]
    },
    {
      id: 'drivers',
      label: 'Daftar Supir',
      icon: Users,
      path: '/drivers'
    },
    {
      id: 'cars',
      label: 'Daftar Mobil',
      icon: Car,
      path: '/cars'
    },
    {
      id: 'employees',
      label: 'Daftar Pegawai',
      icon: UserCheck,
      path: '/employees'
    },
    {
      id: 'bookings',
      label: 'Booking Management',
      icon: Clock,
      path: '/booking-management'
    },
    {
      id: 'tracking',
      label: 'Live Tracking',
      icon: MapPin,
      path: '/tracking'
    },
    {
      id: 'reports',
      label: 'Laporan',
      icon: FileText,
      path: '/reports'
    },

    {
      id: 'super-admin',
      label: 'Super Admin',
      icon: Shield,
      path: '/super-admin'
    }
  ];

  const toggleExpanded = (itemId) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const isParentActive = (item) => {
    if (item.path === location.pathname) return true;
    if (item.subItems) {
      return item.subItems.some(subItem => subItem.path === location.pathname);
    }
    return false;
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        w-64 bg-slate-800 text-white transition-transform duration-300 ease-in-out z-50
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
        fixed lg:relative top-0 left-0 h-screen lg:h-full
        flex flex-col
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700 animate-fade-in">
          <div className="flex items-center space-x-3 group">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg p-1">
              <img src="/logo.png" alt="SIMORA Logo" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent group-hover:from-blue-200 group-hover:to-white transition-all duration-300">Simora</h1>
          </div>
          <button 
            onClick={toggleSidebar}
            className="lg:hidden text-white hover:text-gray-300 hover:rotate-90 transition-all duration-300 p-1 rounded-lg hover:bg-slate-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* User Profile */}
        <div className="p-6 border-b border-slate-700 animate-slide-in group cursor-pointer" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center space-x-3 hover:bg-slate-700 p-3 rounded-xl transition-all duration-300 transform hover:scale-105">
            {userProfile.avatar ? (
              <img 
                src={userProfile.avatar.startsWith('data:') ? userProfile.avatar : `data:image/jpeg;base64,${userProfile.avatar}`} 
                alt="Profile"
                className="w-12 h-12 rounded-full object-cover border-2 border-slate-600 group-hover:border-blue-400 transition-all duration-300 shadow-lg group-hover:shadow-blue-500/25"
              />
            ) : (
              <div className="w-12 h-12 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full flex items-center justify-center group-hover:from-blue-500 group-hover:to-blue-600 transition-all duration-300 shadow-lg">
                <UserCheck className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
              </div>
            )}
            <div className="group-hover:translate-x-1 transition-transform duration-300">
              <p className="font-medium group-hover:text-blue-200 transition-colors duration-300">{userProfile.name}</p>
              <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-300">{userProfile.department}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-6 flex-1">
          <ul className="space-y-1 px-3">
            {menuItems.filter(item => {
              // Hide Super Admin menu for regular admin users
              if (item.id === 'super-admin' && userRole !== 'super_admin') {
                return false;
              }
              // Hide Admin Users menu for regular admin users
              if (item.id === 'admin-users' && userRole !== 'super_admin') {
                return false;
              }
              return true;
            }).map((item, index) => (
              <li key={item.id} className="animate-slide-in" style={{ animationDelay: `${0.3 + index * 0.1}s` }}>
                <div>
                  <Link
                    to={item.path}
                    onClick={() => item.subItems && toggleExpanded(item.id)}
                    className={`
                      flex items-center justify-between px-3 py-3 rounded-xl text-sm font-medium transition-all duration-300 group relative overflow-hidden
                      ${isParentActive(item) 
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25 transform scale-105' 
                        : 'text-slate-300 hover:bg-slate-700 hover:text-white hover:transform hover:scale-105 hover:shadow-lg'
                      }
                    `}
                  >
                    {/* Animated background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left opacity-0 group-hover:opacity-100"></div>
                    
                    <div className="flex items-center space-x-3 relative z-10">
                      <item.icon className={`w-5 h-5 transition-all duration-300 ${
                        isParentActive(item) ? 'text-white' : 'group-hover:scale-110 group-hover:text-blue-300'
                      }`} />
                      <span className="group-hover:translate-x-1 transition-transform duration-300">{item.label}</span>
                    </div>
                    {item.subItems && (
                      <div className="relative z-10">
                        {expandedItems[item.id] ? 
                          <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" /> : 
                          <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-90" />
                        }
                      </div>
                    )}
                  </Link>
                  
                  {/* Sub Items */}
                  {item.subItems && expandedItems[item.id] && (
                    <ul className="mt-2 ml-8 space-y-1 animate-fade-in">
                      {item.subItems.map((subItem, subIndex) => (
                        <li key={subIndex} className="animate-slide-in" style={{ animationDelay: `${subIndex * 0.1}s` }}>
                          <Link
                            to={subItem.path}
                            className={`
                              block px-3 py-2 rounded-lg text-sm transition-all duration-300 group relative overflow-hidden
                              ${isActive(subItem.path)
                                ? 'bg-gradient-to-r from-slate-600 to-slate-700 text-white shadow-md transform scale-105'
                                : 'text-slate-400 hover:bg-slate-700 hover:text-white hover:transform hover:scale-105 hover:translate-x-2'
                              }
                            `}
                          >
                            <div className="absolute left-0 top-0 w-1 h-full bg-blue-400 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></div>
                            <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">{subItem.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-6 border-t border-slate-700 mt-auto animate-fade-in group" style={{ animationDelay: '0.8s' }}>
          <div className="text-center hover:bg-slate-700 p-3 rounded-xl transition-all duration-300 cursor-pointer">
            <p className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
              © 2025 Simora. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;