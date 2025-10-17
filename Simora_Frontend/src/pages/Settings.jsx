import React, { useState } from 'react';
import { Settings as SettingsIcon, Bell, Shield, Database, Mail, Globe, Save, Eye, EyeOff } from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [showApiKey, setShowApiKey] = useState(false);

  const [settings, setSettings] = useState({
    // General Settings
    companyName: 'PT Simora Indonesia',
    companyAddress: 'Jl. Sudirman No. 123, Jakarta Pusat',
    companyPhone: '021-12345678',
    companyEmail: 'admin@simora.com',
    timezone: 'Asia/Jakarta',
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    bookingAlerts: true,
    
    // Security Settings
    sessionTimeout: '30',
    passwordExpiry: '90',
    twoFactorAuth: false,
    
    // System Settings
    maxBookingDays: '30',
    autoApproval: false,
    trackingInterval: '5',
    apiKey: 'sk_test_1234567890abcdef'
  });

  const handleInputChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    console.log('Saving settings:', settings);
    alert('Pengaturan berhasil disimpan!');
  };

  const tabs = [
    { id: 'general', label: 'Umum', icon: SettingsIcon }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Pengaturan</h1>
          <p className="text-gray-600">Kelola konfigurasi sistem dan preferensi</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full sm:w-auto"
        >
          <Save className="w-4 h-4" />
          <span>Simpan Perubahan</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-4 sm:space-x-8 px-4 sm:px-6 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-4 sm:p-6">
          {/* General Settings */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Pengaturan Umum</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Perusahaan
                  </label>
                  <input
                    type="text"
                    value={settings.companyName}
                    onChange={(e) => handleInputChange('general', 'companyName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Perusahaan
                  </label>
                  <input
                    type="email"
                    value={settings.companyEmail}
                    onChange={(e) => handleInputChange('general', 'companyEmail', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nomor Telepon
                  </label>
                  <input
                    type="tel"
                    value={settings.companyPhone}
                    onChange={(e) => handleInputChange('general', 'companyPhone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Zona Waktu
                  </label>
                  <select
                    value={settings.timezone}
                    onChange={(e) => handleInputChange('general', 'timezone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Asia/Jakarta">WIB (Jakarta)</option>
                    <option value="Asia/Makassar">WITA (Makassar)</option>
                    <option value="Asia/Jayapura">WIT (Jayapura)</option>
                  </select>
                </div>

                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alamat Perusahaan
                  </label>
                  <textarea
                    value={settings.companyAddress}
                    onChange={(e) => handleInputChange('general', 'companyAddress', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;