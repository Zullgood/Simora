import React, { useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Download, Calendar, Filter, TrendingUp, Car, Users, UserCheck, Clock, CarFront } from 'lucide-react';
import { reportAPI } from '../services/api';
import Swal from 'sweetalert2';

const Reports = () => {
  const [dateRange, setDateRange] = useState('month');

  // State is now managed per data component to allow independent loading
  const [stats, setStats] = useState({ loading: true, data: { totalBookings: 0, carUtilization: 0, averageRating: 0 }});
  const [monthlyBookingData, setMonthlyBookingData] = useState({ loading: true, data: [] });
  const [carUtilizationData, setCarUtilizationData] = useState({ loading: true, data: [] });
  const [driverPerformanceData, setDriverPerformanceData] = useState({ loading: true, data: [] });
  const [departmentUsageData, setDepartmentUsageData] = useState({ loading: true, data: [] });

  useEffect(() => {
    // Each fetch is now independent, updating its own state.
    // This prevents one slow endpoint from blocking the entire UI.

    // Fetch dashboard stats
    reportAPI.getDashboardStats(dateRange).then(response => {
      if (response.data?.success) {
        const statsData = response.data.data;
        setStats({ loading: false, data: {
          totalBookings: parseInt(statsData.totalBookings, 10) || 0,
          carUtilization: parseFloat(statsData.carUtilization) || 0,
          averageRating: parseFloat(statsData.averageRating) || 0,
        }});
      } else {
        setStats(s => ({ ...s, loading: false }));
      }
    }).catch(err => {
        console.error("Failed to fetch stats:", err);
        setStats(s => ({ ...s, loading: false }));
    });

    // Fetch booking trends
    reportAPI.getBookingTrends(dateRange).then(response => {
      if (response.data?.success) {
        const trends = response.data.data
          .filter(item => item && item.month_name)
          .map(item => ({
            month: item.month_name?.substring(0, 3) || 'N/A',
            bookings: parseInt(item.total_bookings, 10) || 0,
            completed: parseInt(item.completed, 10) || 0,
            cancelled: parseInt(item.cancelled, 10) || 0
          }));
        setMonthlyBookingData({ loading: false, data: trends });
      } else {
        setMonthlyBookingData(s => ({ ...s, loading: false }));
      }
    }).catch(err => {
        console.error("Failed to fetch booking trends:", err);
        setMonthlyBookingData(s => ({ ...s, loading: false }));
    });
    
    // Fetch car utilization
    reportAPI.getCarUtilization(dateRange).then(response => {
        if (response.data?.success) {
            const carData = response.data.data
              .filter(car => car && car.brand && car.model)
              .map(car => ({
                name: `${car.brand} ${car.model}`,
                utilization: Math.round(parseFloat(car.utilization_rate) || 0)
              }))
              .slice(0, 8);
            setCarUtilizationData({ loading: false, data: carData });
        } else {
            setCarUtilizationData(s => ({ ...s, loading: false }));
        }
    }).catch(err => {
        console.error("Failed to fetch car utilization:", err);
        setCarUtilizationData(s => ({ ...s, loading: false }));
    });

    // Fetch driver performance
    reportAPI.getDriverPerformance(dateRange).then(response => {
        if (response.data?.success) {
            const driverData = response.data.data
              .filter(driver => driver && driver.name)
              .map(driver => ({
                name: driver.name,
                trips: parseInt(driver.recent_trips || driver.total_trips, 10) || 0,
                rating: parseFloat(driver.rating) || 0,
                hours: parseInt(driver.working_hours, 10) || 0,
                status: driver.status || 'active'
              }));
            setDriverPerformanceData({ loading: false, data: driverData });
        } else {
            setDriverPerformanceData(s => ({ ...s, loading: false }));
        }
    }).catch(err => {
        console.error("Failed to fetch driver performance:", err);
        setDriverPerformanceData(s => ({ ...s, loading: false }));
    });

    // Fetch department usage
    reportAPI.getDepartmentUsage(dateRange).then(response => {
        if (response.data?.success) {
            const departmentData = response.data.data
              .filter(item => item && item.name)
              .map(item => ({
                name: item.name,
                value: parseFloat(item.value) || 0,
                bookings: parseInt(item.bookings, 10) || 0,
                employees: parseInt(item.employees, 10) || 0,
                color: item.color || '#3b82f6'
              }));
            setDepartmentUsageData({ loading: false, data: departmentData });
        } else {
            setDepartmentUsageData(s => ({ ...s, loading: false }));
        }
    }).catch(err => {
        console.error("Failed to fetch department usage:", err);
        setDepartmentUsageData(s => ({ ...s, loading: false }));
    });

  }, [dateRange]);


  const handleExportReport = async () => {
    // Tampilkan pilihan periode ekspor
    const result = await Swal.fire({
      title: 'Pilih Periode Ekspor',
      html: `
        <div style="text-align: left; padding: 10px;">
          <p style="margin-bottom: 15px; color: #666;">Pilih periode laporan yang ingin di-export:</p>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            <label style="display: flex; align-items: center; padding: 10px; border: 2px solid #e5e7eb; border-radius: 8px; cursor: pointer;" class="period-option">
              <input type="radio" name="period" value="week" style="margin-right: 10px; width: 18px; height: 18px;">
              <span style="font-size: 14px;"> Perminggu</span>
            </label>
            <label style="display: flex; align-items: center; padding: 10px; border: 2px solid #e5e7eb; border-radius: 8px; cursor: pointer;" class="period-option">
              <input type="radio" name="period" value="month" checked style="margin-right: 10px; width: 18px; height: 18px;">
              <span style="font-size: 14px;"> Perbulan</span>
            </label>
            <label style="display: flex; align-items: center; padding: 10px; border: 2px solid #e5e7eb; border-radius: 8px; cursor: pointer;" class="period-option">
              <input type="radio" name="period" value="year" style="margin-right: 10px; width: 18px; height: 18px;">
              <span style="font-size: 14px;"> Pertahun</span>
            </label>
          </div>
        </div>
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#10b981',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Export',
      cancelButtonText: 'Batal',
      didOpen: () => {
        // Add hover effect
        const options = document.querySelectorAll('.period-option');
        options.forEach(option => {
          option.addEventListener('mouseenter', () => {
            option.style.borderColor = '#10b981';
            option.style.backgroundColor = '#f0fdf4';
          });
          option.addEventListener('mouseleave', () => {
            const radio = option.querySelector('input[type="radio"]');
            if (!radio.checked) {
              option.style.borderColor = '#e5e7eb';
              option.style.backgroundColor = 'transparent';
            }
          });
          option.addEventListener('click', () => {
            options.forEach(opt => {
              opt.style.borderColor = '#e5e7eb';
              opt.style.backgroundColor = 'transparent';
            });
            option.style.borderColor = '#10b981';
            option.style.backgroundColor = '#f0fdf4';
          });
        });
      },
      preConfirm: () => {
        const selected = document.querySelector('input[name="period"]:checked');
        if (!selected) {
          Swal.showValidationMessage('Pilih periode terlebih dahulu');
          return false;
        }
        return selected.value;
      }
    });

    if (!result.isConfirmed) return;

    const selectedPeriod = result.value;

    try {
      // Fetch data sesuai periode yang dipilih
      Swal.fire({
        title: 'Memuat Data...',
        text: 'Mohon tunggu, sedang mengambil data laporan',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      const [statsRes, trendsRes, carUtilRes, driverPerfRes, deptUsageRes] = await Promise.all([
        reportAPI.getDashboardStats(selectedPeriod),
        reportAPI.getBookingTrends(selectedPeriod),
        reportAPI.getCarUtilization(selectedPeriod),
        reportAPI.getDriverPerformance(selectedPeriod),
        reportAPI.getDepartmentUsage(selectedPeriod)
      ]);

      // Process data
      const exportStats = {
        totalBookings: parseInt(statsRes.data?.data?.totalBookings, 10) || 0,
        carUtilization: parseFloat(statsRes.data?.data?.carUtilization) || 0,
        averageRating: parseFloat(statsRes.data?.data?.averageRating) || 0
      };

      const exportTrends = trendsRes.data?.data
        ?.filter(item => item && item.month_name)
        .map(item => ({
          month: item.month_name?.substring(0, 3) || 'N/A',
          bookings: parseInt(item.total_bookings, 10) || 0,
          completed: parseInt(item.completed, 10) || 0,
          cancelled: parseInt(item.cancelled, 10) || 0
        })) || [];

      const exportCarUtil = carUtilRes.data?.data
        ?.filter(car => car && car.brand && car.model)
        .map(car => ({
          name: `${car.brand} ${car.model}`,
          utilization: Math.round(parseFloat(car.utilization_rate) || 0)
        }))
        .slice(0, 8) || [];

      const exportDriverPerf = driverPerfRes.data?.data
        ?.filter(driver => driver && driver.name)
        .map(driver => ({
          name: driver.name,
          trips: parseInt(driver.recent_trips || driver.total_trips, 10) || 0,
          rating: parseFloat(driver.rating) || 0
        })) || [];

      const exportDeptUsage = deptUsageRes.data?.data
        ?.filter(item => item && item.name)
        .map(item => ({
          name: item.name,
          value: parseFloat(item.value) || 0,
          bookings: parseInt(item.bookings, 10) || 0
        })) || [];

      Swal.close();

      const { jsPDF } = await import('jspdf');
      const autoTable = (await import('jspdf-autotable')).default;
      
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      
      // Function to add header and footer to each page
      const addHeaderFooter = (pageNum) => {
        // Header - Professional design with company info
        doc.setFontSize(18);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(0, 0, 0);
        doc.text('PT. SIMORA TRANSPORT', pageWidth / 2, 12, { align: 'center' });
        
        doc.setFontSize(7);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(60, 60, 60);
        doc.text('Jl. Sudirman No. 123, Jakarta Pusat 10220, Indonesia', pageWidth / 2, 17, { align: 'center' });
        doc.text('Telp: (021) 5555-1234 | Email: info@simora.co.id | Web: www.simora.co.id', pageWidth / 2, 21, { align: 'center' });
        
        doc.setDrawColor(0, 0, 0);
        doc.setLineWidth(0.5);
        doc.line(14, 24, pageWidth - 14, 24);
        doc.setLineWidth(0.2);
        doc.line(14, 25, pageWidth - 14, 25);
        
        // Footer
        doc.setDrawColor(180, 180, 180);
        doc.setLineWidth(0.2);
        doc.line(14, pageHeight - 18, pageWidth - 14, pageHeight - 18);
        
        doc.setFontSize(7);
        doc.setTextColor(100, 100, 100);
        doc.setFont('helvetica', 'normal');
        doc.text(`Dicetak: ${new Date().toLocaleDateString('id-ID')}`, 14, pageHeight - 10);
        doc.text(`Hal. ${pageNum}`, pageWidth - 14, pageHeight - 10, { align: 'right' });
        
        doc.setTextColor(0, 0, 0);
      };
      
      // Add header and footer to first page
      addHeaderFooter(1);
      
      // Report Title
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text('LAPORAN BOOKING KENDARAAN', pageWidth / 2, 35, { align: 'center' });
      
      // Report Info Box
      doc.setFillColor(248, 248, 248);
      doc.rect(14, 40, pageWidth - 28, 16, 'F');
      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(0.2);
      doc.rect(14, 40, pageWidth - 28, 16, 'S');
      
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(60, 60, 60);
      const periodText = selectedPeriod === 'week' ? 'Perminggu' : selectedPeriod === 'month' ? 'Perbulan' : 'Pertahun';
      doc.text(`Periode: ${periodText}`, 18, 46);
      doc.text(`Tanggal: ${new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}`, 18, 52);
      
      // Section: Ringkasan Statistik
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text('RINGKASAN STATISTIK', 14, 64);
      
      autoTable(doc, {
        startY: 67,
        head: [['Metrik', 'Nilai']],
        body: [
          ['Total Booking', exportStats.totalBookings.toString()],
          ['Utilisasi Mobil', `${exportStats.carUtilization}%`],
          ['Rating Rata-rata', `${exportStats.averageRating} ★`]
        ],
        theme: 'plain',
        headStyles: { 
          fillColor: [235, 235, 235],
          textColor: [0, 0, 0],
          fontSize: 9,
          fontStyle: 'bold',
          halign: 'left',
          lineWidth: 0.1,
          lineColor: [180, 180, 180]
        },
        bodyStyles: {
          fontSize: 8,
          lineWidth: 0.1,
          lineColor: [200, 200, 200]
        },
        columnStyles: {
          0: { fontStyle: 'bold', cellWidth: 100 },
          1: { halign: 'center', fontStyle: 'bold' }
        }
      });
      
      let currentY = doc.lastAutoTable.finalY + 15;
      
      if (exportTrends.length > 0) {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(0, 0, 0);
        const trendTitle = selectedPeriod === 'week' ? 'TREND BOOKING MINGGUAN' : selectedPeriod === 'month' ? 'TREND BOOKING BULANAN' : 'TREND BOOKING TAHUNAN';
        doc.text(trendTitle, 14, currentY);
        
        autoTable(doc, {
          startY: currentY + 3,
          head: [['Periode', 'Total Booking', 'Selesai', 'Dibatalkan']],
          body: exportTrends.map(item => [
            item.month || '-',
            item.bookings.toString(),
            item.completed.toString(),
            item.cancelled.toString()
          ]),
          theme: 'plain',
          headStyles: { 
            fillColor: [235, 235, 235],
            textColor: [0, 0, 0],
            fontSize: 8,
            fontStyle: 'bold',
            halign: 'center',
            lineWidth: 0.1,
            lineColor: [180, 180, 180]
          },
          bodyStyles: {
            fontSize: 8,
            halign: 'center',
            lineWidth: 0.1,
            lineColor: [200, 200, 200]
          },
          columnStyles: {
            0: { fontStyle: 'bold', halign: 'left' }
          }
        });
        currentY = doc.lastAutoTable.finalY + 10;
      }
      
      if (exportCarUtil.length > 0) {
        if (currentY > 230) {
          doc.addPage();
          addHeaderFooter(2);
          currentY = 35;
        }
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(41, 128, 185);
        const carUtilTitle = selectedPeriod === 'week' ? ' UTILISASI MOBIL MINGGU INI' : selectedPeriod === 'month' ? ' UTILISASI MOBIL BULAN INI' : ' UTILISASI MOBIL TAHUN INI';
        doc.text(carUtilTitle, 14, currentY);
        
        autoTable(doc, {
          startY: currentY + 5,
          head: [['Mobil', 'Utilisasi']],
          body: exportCarUtil.map(item => [
            item.name || '-',
            `${item.utilization}%`
          ]),
          theme: 'plain',
          headStyles: { 
            fillColor: [235, 235, 235],
            textColor: [0, 0, 0],
            fontSize: 8,
            fontStyle: 'bold',
            halign: 'center',
            lineWidth: 0.1,
            lineColor: [180, 180, 180]
          },
          bodyStyles: {
            fontSize: 8,
            lineWidth: 0.1,
            lineColor: [200, 200, 200]
          },
          columnStyles: {
            0: { fontStyle: 'bold', halign: 'left' },
            1: { halign: 'center', fontStyle: 'bold' }
          }
        });
        currentY = doc.lastAutoTable.finalY + 15;
      }
      
      if (exportDriverPerf.length > 0) {
        if (currentY > 230) {
          doc.addPage();
          const pageNum = doc.internal.getNumberOfPages();
          addHeaderFooter(pageNum);
          currentY = 35;
        }
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(41, 128, 185);
        const driverPerfTitle = selectedPeriod === 'week' ? ' TOP SUPIR MINGGU INI' : selectedPeriod === 'month' ? ' TOP SUPIR BULAN INI' : ' TOP SUPIR TAHUN INI';
        doc.text(driverPerfTitle, 14, currentY);
        
        autoTable(doc, {
          startY: currentY + 5,
          head: [['Nama Supir', 'Trip', 'Rating']],
          body: exportDriverPerf.map(item => [
            item.name || '-',
            item.trips.toString(),
            `${item.rating} ★`
          ]),
          theme: 'plain',
          headStyles: { 
            fillColor: [235, 235, 235],
            textColor: [0, 0, 0],
            fontSize: 8,
            fontStyle: 'bold',
            halign: 'center',
            lineWidth: 0.1,
            lineColor: [180, 180, 180]
          },
          bodyStyles: {
            fontSize: 8,
            lineWidth: 0.1,
            lineColor: [200, 200, 200]
          },
          columnStyles: {
            0: { fontStyle: 'bold', halign: 'left' },
            1: { halign: 'center' },
            2: { halign: 'center', fontStyle: 'bold' }
          }
        });
        currentY = doc.lastAutoTable.finalY + 15;
      }
      
      if (exportDeptUsage.length > 0) {
        if (currentY > 230) {
          doc.addPage();
          const pageNum = doc.internal.getNumberOfPages();
          addHeaderFooter(pageNum);
          currentY = 35;
        }
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(41, 128, 185);
        const deptUsageTitle = selectedPeriod === 'week' ? ' PENGGUNAAN PER DEPARTEMEN MINGGU INI' : selectedPeriod === 'month' ? ' PENGGUNAAN PER DEPARTEMEN BULAN INI' : ' PENGGUNAAN PER DEPARTEMEN TAHUN INI';
        doc.text(deptUsageTitle, 14, currentY);
        
        autoTable(doc, {
          startY: currentY + 5,
          head: [['Departemen', 'Persentase', 'Total Booking']],
          body: exportDeptUsage.map(item => [
            item.name || '-',
            `${item.value}%`,
            item.bookings.toString()
          ]),
          theme: 'plain',
          headStyles: { 
            fillColor: [235, 235, 235],
            textColor: [0, 0, 0],
            fontSize: 8,
            fontStyle: 'bold',
            halign: 'center',
            lineWidth: 0.1,
            lineColor: [180, 180, 180]
          },
          bodyStyles: {
            fontSize: 8,
            lineWidth: 0.1,
            lineColor: [200, 200, 200]
          },
          columnStyles: {
            0: { fontStyle: 'bold', halign: 'left' },
            1: { halign: 'center', fontStyle: 'bold' },
            2: { halign: 'center' }
          }
        });
      }
      
      // Add signature section with 2 columns
      const finalY = doc.lastAutoTable.finalY + 20;
      let signY;
      
      if (finalY > 220) {
        doc.addPage();
        const pageNum = doc.internal.getNumberOfPages();
        addHeaderFooter(pageNum);
        signY = 40;
      } else {
        signY = finalY;
      }
      
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(0, 0, 0);
      
      // Date and location
      doc.text('Jakarta, ' + new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }), 14, signY);
      
      // Left signature - Dibuat oleh
      doc.text('Dibuat oleh,', 14, signY + 10);
      doc.setDrawColor(0, 0, 0);
      doc.setLineWidth(0.2);
      doc.line(14, signY + 35, 65, signY + 35);
      doc.setFont('helvetica', 'bold');
      doc.text('Staff Admin', 14, signY + 40);
      
      // Right signature - Disetujui oleh
      doc.setFont('helvetica', 'normal');
      doc.text('Disetujui oleh,', pageWidth - 75, signY + 10);
      doc.line(pageWidth - 75, signY + 35, pageWidth - 14, signY + 35);
      doc.setFont('helvetica', 'bold');
      doc.text('Manager Operasional', pageWidth - 75, signY + 40);
      
      
      const fileName = `Laporan-Booking-SIMORA-${new Date().toISOString().split('T')[0]}.pdf`;
      doc.save(fileName);
      
      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: `Laporan berhasil di-export sebagai ${fileName}`,
        timer: 2000,
        showConfirmButton: false
      });
    } catch (error) {
      console.error('Error saat export PDF:', error);
      Swal.fire({
        icon: 'error',
        title: 'Gagal Export!',
        text: 'Gagal export laporan. Silakan coba lagi.',
        confirmButtonColor: '#3b82f6'
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Laporan & Analisis</h1>
          <p className="text-gray-600 mt-2">Analisis data dan laporan sistem booking mobil</p>
        </div>
        <button
          onClick={handleExportReport}
          className="flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors w-full sm:w-auto"
        >
          <Download className="w-5 h-5" />
          <span>Export Laporan</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-gray-400" />
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="week">Minggu Ini</option>
            <option value="month">Bulan Ini</option>
            <option value="year">Tahun Ini</option>
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Booking {dateRange === 'week' ? '(Minggu Ini)' : dateRange === 'month' ? '(Bulan Ini)' : '(Tahun Ini)'}</p>
              <p className="text-2xl font-bold text-gray-900">{stats.loading ? '...' : (stats.data.totalBookings || 0)}</p>
              <p className="text-sm text-gray-500 flex items-center mt-1">
                <Calendar className="w-4 h-4 mr-1" />
                Periode: {dateRange === 'week' ? 'Minggu' : dateRange === 'month' ? 'Bulan' : 'Tahun'}
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Car className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Utilisasi Mobil {dateRange === 'week' ? '(Minggu Ini)' : dateRange === 'month' ? '(Bulan Ini)' : '(Tahun Ini)'}</p>
              <p className="text-2xl font-bold text-gray-900">{stats.loading ? '...' : (stats.data.carUtilization || 0)}%</p>
              <p className="text-sm text-gray-500 flex items-center mt-1">
                <Calendar className="w-4 h-4 mr-1" />
                Periode: {dateRange === 'week' ? 'Minggu' : dateRange === 'month' ? 'Bulan' : 'Tahun'}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Rating Rata-rata {dateRange === 'week' ? '(Minggu Ini)' : dateRange === 'month' ? '(Bulan Ini)' : '(Tahun Ini)'}</p>
              <p className="text-2xl font-bold text-gray-900">{stats.loading ? '...' : (stats.data.averageRating || 0)}</p>
              <p className="text-sm text-gray-500 flex items-center mt-1">
                <Calendar className="w-4 h-4 mr-1" />
                Periode: {dateRange === 'week' ? 'Minggu' : dateRange === 'month' ? 'Bulan' : 'Tahun'}
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Booking Trends */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
            Trend Booking {dateRange === 'week' ? 'Minggu Ini' : dateRange === 'month' ? 'Bulan Ini' : 'Tahun Ini'}
          </h3>
          <div className="h-64 sm:h-80">
            {monthlyBookingData.loading ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 text-center">
                <Clock className="w-12 h-12 mb-4 text-gray-300 animate-spin" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Memuat data...</h3>
              </div>
            ) : monthlyBookingData.data.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 text-center">
                <Car className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="font-medium text-gray-700 mb-1">Belum ada data trend booking</p>
                <p className="text-sm text-gray-400">Data akan muncul setelah ada aktivitas</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyBookingData.data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis 
                    allowDecimals={false}
                    domain={[0, dataMax => Math.ceil(dataMax * 1.1)]} 
                  />
                  <Tooltip formatter={(value, name) => [value, name.charAt(0).toUpperCase() + name.slice(1)]} />
                  <Bar dataKey="bookings" fill="#3b82f6" name="Total Booking" />
                  <Bar dataKey="completed" fill="#10b981" name="Selesai" />
                  <Bar dataKey="cancelled" fill="#ef4444" name="Ditolak" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Car Utilization */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
            Utilisasi Mobil Teratas {dateRange === 'week' ? 'Minggu Ini' : dateRange === 'month' ? 'Bulan Ini' : 'Tahun Ini'}
          </h3>
          <div className="h-64 sm:h-80">
            {carUtilizationData.loading ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 text-center">
                 <CarFront className="w-12 h-12 mb-4 text-gray-300 animate-bounce" />
                 <h3 className="text-lg font-medium text-gray-900 mb-2">Memuat data...</h3>
              </div>
            ) : carUtilizationData.data.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500 text-center">
                    <CarFront className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="font-medium text-gray-700 mb-1">Belum ada data utilisasi</p>
                    <p className="text-sm text-gray-400">Data akan muncul setelah ada aktivitas</p>
                </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={carUtilizationData.data} layout="vertical" margin={{ top: 5, right: 20, left: 80, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} tickFormatter={(tick) => `${tick}%`} />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip formatter={(value) => [`${value}%`, 'Utilisasi']} />
                  <Bar dataKey="utilization" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
      
      {/* Department Usage and Driver Performance Table */}
       <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Department Usage */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
            Penggunaan per Departemen {dateRange === 'week' ? 'Minggu Ini' : dateRange === 'month' ? 'Bulan Ini' : 'Tahun Ini'}
          </h3>
          <div className="h-64 sm:h-80">
          {departmentUsageData.loading ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 text-center">
                 <UserCheck className="w-12 h-12 mb-4 text-gray-300 animate-bounce" />
                 <h3 className="text-lg font-medium text-gray-900 mb-2">Memuat data...</h3>
              </div>
            ) : departmentUsageData.data.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500 text-center">
                    <UserCheck className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="font-medium text-gray-700 mb-1">Belum ada data departemen</p>
                    <p className="text-sm text-gray-400">Data akan muncul setelah ada aktivitas</p>
                </div>
            ) : (
                <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                    data={departmentUsageData.data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    >
                    {departmentUsageData.data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                    </Pie>
                    <Tooltip formatter={(value, name) => [`${value}%`, name]} />
                </PieChart>
                </ResponsiveContainer>
            )}
          </div>
          {!departmentUsageData.loading && departmentUsageData.data.length > 0 && (
             <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-2">
                {departmentUsageData.data.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                    <div 
                        className="w-3 h-3 rounded-full flex-shrink-0" 
                        style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm text-gray-700 truncate">{item.name} ({item.value}%)</span>
                </div>
                ))}
            </div>
          )}
        </div>

        {/* Driver Performance Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
              Top Supir {dateRange === 'week' ? 'Minggu Ini' : dateRange === 'month' ? 'Bulan Ini' : 'Tahun Ini'}
            </h3>
            <div className="h-full">
            {driverPerformanceData.loading ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500 text-center">
                    <Users className="w-12 h-12 text-gray-300 mx-auto mb-4 animate-bounce" />
                    <p className="font-medium text-gray-700">Memuat data kinerja supir...</p>
                </div>
            ) : driverPerformanceData.data.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500 text-center">
                    <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="font-medium text-gray-700 mb-1">Belum ada data kinerja supir</p>
                    <p className="text-sm text-gray-400">Data akan muncul setelah ada aktivitas</p>
                </div>
            ) : (
                <div className="overflow-x-auto h-96">
                <table className="w-full">
                    <thead className="bg-gray-50 sticky top-0">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nama Supir
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Trip
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rating
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {driverPerformanceData.data.map((driver, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                                <div className="text-sm font-medium text-gray-900">{driver.name}</div>
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {driver.trips}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                             <span className="text-sm text-gray-900">{driver.rating} ★</span>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
            )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;