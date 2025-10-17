import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import BookingNotification from '../BookingNotification';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="h-screen bg-gray-100 flex overflow-hidden">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex-1 flex flex-col h-full">
        <Header toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 p-6 bg-gray-50 overflow-auto">
          <Outlet />
        </main>
        
        <BookingNotification />
      </div>
    </div>
  );
};

export default Layout;
