import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Clock, X, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { notificationAPI } from '../services/api';

const BookingNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch initial notifications from backend
    fetchNotifications();
    
    // Setup WebSocket for real-time notifications (disabled for now)
    let ws = null;
    const token = localStorage.getItem('token');
    
    // WebSocket is disabled because Laravel doesn't have WebSocket server by default
    // To enable WebSocket, you need to install Laravel WebSockets or Pusher
    // For now, we'll use polling as the primary method
    
    const setupWebSocket = () => {
      if (!token) return;
      
      try {
        // Only try WebSocket if explicitly enabled
        const enableWebSocket = false; // Set to true when WebSocket server is ready
        
        if (enableWebSocket) {
          ws = new WebSocket(`ws://localhost:6001/app/simora?protocol=7&client=js&version=7.0.3&flash=false`);
          
          ws.onopen = () => {
            console.log('🔔 WebSocket connected for real-time notifications');
          };
          
          ws.onmessage = (event) => {
            try {
              const data = JSON.parse(event.data);
              if (data.event === 'booking.notification') {
                console.log('📱 New notification from WebSocket:', data);
                addNotification(data.data);
              }
            } catch (error) {
              console.error('Error parsing WebSocket message:', error);
            }
          };
          
          ws.onerror = (error) => {
            console.log('WebSocket error, using polling only:', error);
          };
          
          ws.onclose = () => {
            console.log('WebSocket closed, using polling only');
          };
        }
      } catch (error) {
        console.log('WebSocket not available, using polling only');
      }
    };
    
    // setupWebSocket(); // Disabled for now
    
    // Primary method: Poll for new notifications every 30 seconds
    const interval = setInterval(fetchNotifications, 30000);
    
    // Also poll when window becomes visible again
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchNotifications();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Listen for manual booking status changes
    const handleBookingUpdate = (event) => {
      const { bookingId, status, employeeName, destination } = event.detail;
      
      const notification = {
        id: Date.now(),
        booking_id: bookingId,
        type: 'booking_status',
        title: getNotificationTitle(status),
        message: getNotificationMessage({ status, employeeName, destination }),
        data: { bookingId, status, employeeName, destination },
        read_at: null,
        created_at: new Date().toISOString(),
      };

      addNotification(notification);
    };

    window.addEventListener('bookingStatusUpdate', handleBookingUpdate);

    return () => {
      if (ws) {
        ws.close();
      }
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('bookingStatusUpdate', handleBookingUpdate);
    };
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await notificationAPI.getAll();
      const backendNotifications = response.data.data || response.data || [];
      
      // Only show unread notifications
      const unreadNotifications = backendNotifications
        .filter(notif => !notif.read_at)
        .slice(0, 5);
      
      setNotifications(unreadNotifications);
    } catch (error) {
      // Silently handle errors - don't spam console if backend is down
      if (error.response?.status !== 401) {
        console.log('Notifications temporarily unavailable');
      }
    }
  };

  const addNotification = (notification) => {
    setNotifications(prev => [notification, ...prev.slice(0, 4)]);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      removeNotification(notification.id);
    }, 5000);
  };

  const handleNotificationClick = (notification) => {
    console.log('Navigating to booking management...');
    
    // Mark as read and remove first
    removeNotification(notification.id);
    
    // Navigate to booking management - debug the path
    console.log('Current location:', window.location.pathname);
    navigate('/booking-management');
    console.log('After navigate, location:', window.location.pathname);
  };

  const removeNotification = async (id) => {
    // Mark as read in backend if it's a backend notification
    const notification = notifications.find(n => n.id === id);
    if (notification && notification.id && typeof notification.id === 'number' && notification.id > 1000000) {
      // This is a backend notification, mark as read
      try {
        await notificationAPI.markAsRead(notification.id);
      } catch (error) {
        console.error('Error marking notification as read:', error);
      }
    }
    
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getNotificationIcon = (status) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getNotificationTitle = (status) => {
    switch (status) {
      case 'approved': return 'Booking Disetujui';
      case 'rejected': return 'Booking Ditolak';
      case 'pending': return 'Booking Baru';
      default: return 'Update Booking';
    }
  };

  const getNotificationMessage = (data) => {
    // Handle backend notification format
    if (data.message) return data.message;
    
    // Handle manual notification format
    const { status, employeeName, destination } = data;
    switch (status) {
      case 'approved':
        return `Booking ${employeeName} ke ${destination} telah disetujui`;
      case 'rejected':
        return `Booking ${employeeName} ke ${destination} telah ditolak`;
      case 'pending':
        return `Booking baru dari ${employeeName} ke ${destination}`;
      default:
        return `Status booking ${employeeName} telah diperbarui`;
    }
  };

  const getNotificationColor = (notification) => {
    // Get status from notification data
    const status = notification.data?.status || notification.type;
    
    switch (status) {
      case 'approved':
      case 'booking_approved':
        return 'border-l-green-500 bg-gradient-to-r from-green-50 to-green-100';
      case 'rejected':
      case 'booking_rejected':
        return 'border-l-red-500 bg-gradient-to-r from-red-50 to-red-100';
      case 'pending':
      case 'booking_created':
      case 'booking_status':
        return 'border-l-yellow-500 bg-gradient-to-r from-yellow-50 to-yellow-100';
      default:
        return 'border-l-blue-500 bg-gradient-to-r from-blue-50 to-blue-100';
    }
  };

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 max-w-sm w-full sm:w-96">
      {notifications.map((notification, index) => (
        <div
          key={notification.id}
          className={`
            p-4 rounded-xl shadow-xl border-l-4 bg-white backdrop-blur-sm cursor-pointer
            ${getNotificationColor(notification)}
            transform transition-all duration-500 ease-out
            animate-slide-in hover:scale-105 hover:shadow-2xl
            border border-gray-200
          `}
          style={{ 
            animationDelay: `${index * 100}ms`,
            animation: 'slideInRight 0.5s ease-out forwards'
          }}
          onClick={() => handleNotificationClick(notification)}
        >
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 animate-bounce">
              {getNotificationIcon(notification.status)}
            </div>
            <div className="flex-1 min-w-0">
              {notification.title && (
                <p className="text-xs font-medium text-gray-600 mb-1">
                  {notification.title}
                </p>
              )}
              <p className="text-sm font-semibold text-gray-900 leading-relaxed">
                {notification.message || getNotificationMessage(notification)}
              </p>
              <p className="text-xs text-gray-500 mt-2 font-medium">
                {(() => {
                  const timestamp = notification.created_at || notification.timestamp;
                  const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
                  return date.toLocaleTimeString('id-ID', {
                    hour: '2-digit',
                    minute: '2-digit'
                  });
                })()}
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeNotification(notification.id);
              }}
              className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-1 transition-all duration-200 transform hover:scale-110"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          {/* Progress bar */}
          <div className="mt-3 w-full bg-gray-200 rounded-full h-1 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full animate-progress"
              style={{
                animation: 'progress 5s linear forwards'
              }}
            />
          </div>
        </div>
      ))}
      
      <style jsx>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes progress {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
    </div>
  );
};

// Helper function to trigger notifications
export const triggerBookingNotification = (bookingId, status, employeeName, destination) => {
  const event = new CustomEvent('bookingStatusUpdate', {
    detail: { bookingId, status, employeeName, destination }
  });
  window.dispatchEvent(event);
};

export default BookingNotification;