import React, { useEffect, useRef } from 'react';

const TrackingMap = ({ bookings, selectedBooking, onMarkerClick }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    // Load Leaflet CSS and JS dynamically
    if (!document.querySelector('link[href*="leaflet.css"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    if (!window.L) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = initializeMap;
      document.head.appendChild(script);
    } else {
      initializeMap();
    }
  }, []);

  useEffect(() => {
    if (mapInstanceRef.current) {
      updateMarkers();
    }
  }, [bookings, selectedBooking]);

  const initializeMap = () => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map centered on Jakarta
    mapInstanceRef.current = window.L.map(mapRef.current).setView([-6.2088, 106.8456], 12);

    // Add OpenStreetMap tiles
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(mapInstanceRef.current);

    updateMarkers();
  };

  const updateMarkers = () => {
    if (!mapInstanceRef.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => {
      mapInstanceRef.current.removeLayer(marker);
    });
    markersRef.current = [];

    // Add markers for each booking
    bookings.forEach(booking => {
      // Validate coordinates
      const lat = booking.currentLocation?.lat || booking.lat || -6.2088;
      const lng = booking.currentLocation?.lng || booking.lng || 106.8456;
      
      // Skip if coordinates are invalid
      if (isNaN(lat) || isNaN(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
        return;
      }
      
      const isSelected = selectedBooking?.id === booking.id;
      
      // Create custom icon based on status
      const iconColor = getMarkerColor(booking.status);
      const iconHtml = `
        <div style="
          background-color: ${iconColor};
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          color: white;
          font-weight: bold;
          ${isSelected ? 'transform: scale(1.2); border-color: #3b82f6;' : ''}
        ">
          🚗
        </div>
      `;

      const customIcon = window.L.divIcon({
        html: iconHtml,
        className: 'custom-marker',
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      });

      const marker = window.L.marker([lat, lng], { icon: customIcon }).addTo(mapInstanceRef.current);

      // Add popup with booking info
      const popupContent = `
        <div style="min-width: 200px;">
          <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: bold;">
            ${booking.employeeName}
          </h3>
          <p style="margin: 4px 0; font-size: 12px;">
            <strong>Supir:</strong> ${booking.driverName}
          </p>
          <p style="margin: 4px 0; font-size: 12px;">
            <strong>Mobil:</strong> ${booking.carPlate}
          </p>
          <p style="margin: 4px 0; font-size: 12px;">
            <strong>Tujuan:</strong> ${booking.destination}
          </p>
          <p style="margin: 4px 0; font-size: 12px;">
            <strong>Status:</strong> ${getStatusText(booking.status)}
          </p>
          <p style="margin: 4px 0; font-size: 12px;">
            <strong>Update:</strong> ${booking.lastUpdate}
          </p>
        </div>
      `;

      marker.bindPopup(popupContent);

      // Handle marker click
      marker.on('click', () => {
        if (onMarkerClick) {
          onMarkerClick(booking);
        }
      });

      markersRef.current.push(marker);
    });

    // Fit map to show all markers
    if (markersRef.current.length > 0) {
      try {
        const group = new window.L.featureGroup(markersRef.current);
        const bounds = group.getBounds();
        if (bounds && bounds.isValid && bounds.isValid()) {
          mapInstanceRef.current.fitBounds(bounds.pad(0.1));
        } else {
          mapInstanceRef.current.setView([-6.2088, 106.8456], 12);
        }
      } catch (error) {
        console.warn('Error fitting map bounds:', error);
        mapInstanceRef.current.setView([-6.2088, 106.8456], 12);
      }
    } else {
      // No markers, set default view
      mapInstanceRef.current.setView([-6.2088, 106.8456], 12);
    }
  };

  const getMarkerColor = (status) => {
    switch (status) {
      case 'on_trip': return '#10b981'; // green
      case 'waiting': return '#f59e0b'; // yellow
      case 'completed': return '#3b82f6'; // blue
      default: return '#6b7280'; // gray
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

  return (
    <div className="relative">
      <div 
        ref={mapRef} 
        className="w-full h-64 sm:h-80 lg:h-96 rounded-lg"
        style={{ minHeight: '300px' }}
      />
      
      {/* Map Legend */}
      <div className="absolute top-4 right-4 bg-white p-3 rounded-lg shadow-lg">
        <h4 className="text-sm font-semibold mb-2">Status</h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Dalam Perjalanan</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span>Menunggu</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span>Selesai</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackingMap;