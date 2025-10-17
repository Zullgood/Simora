import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { authAPI } from '../services/api';
import Swal from 'sweetalert2';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await authAPI.login(formData);
      
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user || {}));
        
        Swal.fire({
          title: 'Login Berhasil!',
          text: 'Selamat datang di Dashboard Simora',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
          navigate('/', { replace: true });
        });
      } else {
        Swal.fire({
          title: 'Login Gagal',
          text: 'Periksa email dan password Anda',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    } catch (error) {
      let errorMessage = 'Login gagal';
      if (error.code === 'ERR_NETWORK') {
        errorMessage = 'Tidak dapat terhubung ke server. Pastikan backend berjalan.';
      } else {
        errorMessage = error.response?.data?.message || 'Login gagal';
      }
      
      Swal.fire({
        title: 'Login Gagal',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat relative flex items-center justify-center p-3 sm:p-6 lg:p-8" style={{backgroundImage: 'url(/bg_login.jpg)'}}>
      <div className="absolute inset-0 bg-black bg-opacity-70 sm:bg-opacity-60 lg:bg-opacity-50"></div>
      
      <div className="relative z-10 w-full max-w-6xl flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-6 sm:gap-8 lg:gap-0">
        <div className="flex-1 pr-12 hidden lg:block">
          <div className="flex items-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl mr-4 shadow-lg">
              <Car className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-5xl font-bold text-white mb-2 drop-shadow-lg">Simora</h1>
              <p className="text-xl text-white/90 drop-shadow-md">Sistem Booking Mobil Perusahaan</p>
            </div>
          </div>
          
          <div className="space-y-6 text-white">
            <div>
              <h3 className="text-2xl font-semibold mb-3 drop-shadow-md">Kelola Armada dengan Mudah</h3>
              <p className="text-lg text-white/90 leading-relaxed drop-shadow-sm">
                Platform terpadu untuk mengelola booking mobil perusahaan, 
                monitoring supir, dan laporan perjalanan secara real-time.
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-white/90">Dashboard Analytics Lengkap</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-white/90">Manajemen Supir & Kendaraan</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-white/90">Laporan Perjalanan Real-time</span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg animate-fade-in-up">
          <div className="bg-white/15 backdrop-blur-xl rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-2xl border border-white/30 p-4 sm:p-6 md:p-8 lg:p-10 hover:bg-white/20 transition-all duration-300">
            <div className="lg:hidden text-center mb-4 sm:mb-6 md:mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg sm:rounded-xl md:rounded-2xl mb-2 sm:mb-3 md:mb-4 shadow-lg">
                <Car className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 drop-shadow-lg">Simora</h1>
              <p className="text-white/80 text-xs sm:text-sm drop-shadow-md">Admin Dashboard</p>
            </div>
            
            <div className="text-center mb-4 sm:mb-6 md:mb-8">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2 md:mb-3 drop-shadow-md">Selamat Datang</h2>
              <p className="text-white/80 text-xs sm:text-sm md:text-base lg:text-lg drop-shadow-sm">Masuk ke akun admin Anda</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">
              <div className="group">
                <label className="block text-xs sm:text-sm font-semibold text-white mb-1 sm:mb-2 md:mb-3 drop-shadow-sm group-focus-within:text-blue-200 transition-colors">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4 sm:w-5 sm:h-5 group-focus-within:text-blue-300 transition-colors" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="admin@simora.com"
                    className="w-full pl-9 sm:pl-10 md:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 md:py-4 bg-white/15 border-2 border-white/20 rounded-lg sm:rounded-xl md:rounded-2xl focus:ring-2 sm:focus:ring-4 focus:ring-blue-400/30 focus:border-blue-400/60 focus:bg-white/25 transition-all duration-300 text-white placeholder-white/60 hover:bg-white/20 hover:border-white/30 text-sm sm:text-base"
                    required
                  />
                </div>
              </div>

              <div className="group">
                <label className="block text-xs sm:text-sm font-semibold text-white mb-1 sm:mb-2 md:mb-3 drop-shadow-sm group-focus-within:text-blue-200 transition-colors">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4 sm:w-5 sm:h-5 group-focus-within:text-blue-300 transition-colors" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Masukkan password"
                    className="w-full pl-9 sm:pl-10 md:pl-12 pr-9 sm:pr-10 md:pr-12 py-2.5 sm:py-3 md:py-4 bg-white/15 border-2 border-white/20 rounded-lg sm:rounded-xl md:rounded-2xl focus:ring-2 sm:focus:ring-4 focus:ring-blue-400/30 focus:border-blue-400/60 focus:bg-white/25 transition-all duration-300 text-white placeholder-white/60 hover:bg-white/20 hover:border-white/30 text-sm sm:text-base"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-all duration-200 hover:scale-110 active:scale-95 p-1"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between pt-1 sm:pt-2 gap-2 xs:gap-3 sm:gap-0">
                <label className="flex items-center cursor-pointer group">
                  <input type="checkbox" className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500 bg-white/20 border-white/30 rounded focus:ring-blue-400 focus:ring-2" />
                  <span className="ml-2 text-xs sm:text-sm text-white/90 font-medium group-hover:text-white transition-colors">Ingat saya</span>
                </label>
                <button type="button" className="text-xs sm:text-sm text-blue-300 hover:text-blue-100 font-semibold transition-all duration-200 hover:underline">
                  Lupa password?
                </button>
              </div>



              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2.5 sm:py-3 md:py-4 rounded-lg sm:rounded-xl md:rounded-2xl hover:from-blue-700 hover:to-blue-800 focus:ring-2 sm:focus:ring-4 focus:ring-blue-400/50 transition-all duration-300 font-bold text-sm sm:text-base lg:text-lg shadow-2xl hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group"
              >
                <span className="relative z-10">
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span className="text-sm sm:text-base">Memproses...</span>
                    </div>
                  ) : (
                    'Masuk ke Dashboard'
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
            </form>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Login;