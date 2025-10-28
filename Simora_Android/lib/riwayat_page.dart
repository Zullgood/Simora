import 'package:flutter/material.dart';


class RiwayatPage extends StatefulWidget {
  const RiwayatPage({super.key});

  @override
  State<RiwayatPage> createState() => _RiwayatPageState();
}

class _RiwayatPageState extends State<RiwayatPage> with SingleTickerProviderStateMixin {
  late TabController _tabController;

  // Data dummy sementara (nanti diganti API dari Laravel)
  final List<Map<String, dynamic>> riwayatPerjalanan = [
    {
      "tanggal": "14 Okt 2025",
      "waktu": "09:00 - 12:00",
      "tujuan": "Bandung",
      "keperluan": "Rapat cabang perusahaan",
      "status": "Menunggu",
      "driver": "Belum ditentukan",
      "mobil": "Belum ditentukan"
    },
    {
      "tanggal": "13 Okt 2025",
      "waktu": "08:00 - 16:00",
      "tujuan": "Jakarta",
      "keperluan": "Survey lokasi proyek",
      "status": "Disetujui",
      "driver": "Andi Wijaya",
      "mobil": "Toyota Avanza - B 1234 XYZ"
    },
    {
      "tanggal": "12 Okt 2025",
      "waktu": "10:00 - 14:00",
      "tujuan": "Cimahi",
      "keperluan": "Kunjungan ke cabang",
      "status": "Dalam Perjalanan",
      "driver": "Budi Santoso",
      "mobil": "Honda Mobilio - D 5678 ABC"
    },
    {
      "tanggal": "10 Okt 2025",
      "waktu": "07:00 - 17:00",
      "tujuan": "Subang",
      "keperluan": "Distribusi alat kantor",
      "status": "Selesai",
      "driver": "Yanto Hermawan",
      "mobil": "Daihatsu Xenia - B 9012 DEF"
    },
    {
      "tanggal": "8 Okt 2025",
      "waktu": "09:00 - 15:00",
      "tujuan": "Bekasi",
      "keperluan": "Peninjauan proyek baru",
      "status": "Ditolak",
      "driver": "-",
      "mobil": "-"
    },
  ];

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 5, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  Color getStatusColor(String status) {
    switch (status) {
      case "Menunggu":
        return const Color(0xFFFB8C00);
      case "Disetujui":
        return const Color(0xFF43A047);
      case "Ditolak":
        return const Color(0xFFE53935);
      case "Dalam Perjalanan":
        return const Color(0xFF1E88E5);
      case "Selesai":
        return const Color(0xFF757575);
      default:
        return Colors.black54;
    }
  }

  IconData getStatusIcon(String status) {
    switch (status) {
      case "Menunggu":
        return Icons.schedule;
      case "Disetujui":
        return Icons.check_circle;
      case "Ditolak":
        return Icons.cancel;
      case "Dalam Perjalanan":
        return Icons.local_shipping;
      case "Selesai":
        return Icons.done_all;
      default:
        return Icons.info_outline;
    }
  }

  List<Map<String, dynamic>> getFilteredData(String status) {
    if (status == "Semua") {
      return riwayatPerjalanan;
    }
    return riwayatPerjalanan.where((item) => item["status"] == status).toList();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey.shade50,
      body: NestedScrollView(
        headerSliverBuilder: (context, innerBoxIsScrolled) {
          return [
            // Modern App Bar
            SliverAppBar(
              expandedHeight: 160,
              floating: false,
              pinned: true,
              backgroundColor: const Color(0xFF1976D2),
              flexibleSpace: FlexibleSpaceBar(
                title: const Text(
                  'Riwayat Perjalanan',
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
                  ),
                ),
                background: Container(
                  decoration: const BoxDecoration(
                    gradient: LinearGradient(
                      begin: Alignment.topLeft,
                      end: Alignment.bottomRight,
                      colors: [Color(0xFF2196F3), Color(0xFF1976D2), Color(0xFF0D47A1)],
                    ),
                  ),
                  child: Stack(
                    children: [
                      Positioned(
                        right: -50,
                        top: -20,
                        child: Opacity(
                          opacity: 0.1,
                          child: Icon(
                            Icons.history,
                            size: 200,
                            color: Colors.white,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              bottom: PreferredSize(
                preferredSize: const Size.fromHeight(50),
                child: Container(
                  color: Colors.white,
                  child: TabBar(
                    controller: _tabController,
                    isScrollable: true,
                    labelColor: const Color(0xFF1976D2),
                    unselectedLabelColor: Colors.grey.shade600,
                    indicatorColor: const Color(0xFF1976D2),
                    indicatorWeight: 3,
                    labelStyle: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14),
                    tabs: const [
                      Tab(text: "Semua"),
                      Tab(text: "Menunggu"),
                      Tab(text: "Disetujui"),
                      Tab(text: "Dalam Perjalanan"),
                      Tab(text: "Selesai"),
                    ],
                  ),
                ),
              ),
            ),
          ];
        },
        body: TabBarView(
          controller: _tabController,
          children: [
            _buildRiwayatList(getFilteredData("Semua")),
            _buildRiwayatList(getFilteredData("Menunggu")),
            _buildRiwayatList(getFilteredData("Disetujui")),
            _buildRiwayatList(getFilteredData("Dalam Perjalanan")),
            _buildRiwayatList(getFilteredData("Selesai")),
          ],
        ),
      ),
    );
  }

  Widget _buildRiwayatList(List<Map<String, dynamic>> data) {
    if (data.isEmpty) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(Icons.inbox_outlined, size: 80, color: Colors.grey.shade400),
            const SizedBox(height: 16),
            Text(
              'Tidak ada data',
              style: TextStyle(
                fontSize: 16,
                color: Colors.grey.shade600,
                fontWeight: FontWeight.w500,
              ),
            ),
          ],
        ),
      );
    }

    return ListView.builder(
      itemCount: data.length,
      padding: const EdgeInsets.all(16),
      itemBuilder: (context, index) {
        final item = data[index];
        return _buildRiwayatCard(item);
      },
    );
  }

  Widget _buildRiwayatCard(Map<String, dynamic> item) {
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.05),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        children: [
          // Header Card
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: getStatusColor(item["status"]).withOpacity(0.1),
              borderRadius: const BorderRadius.only(
                topLeft: Radius.circular(16),
                topRight: Radius.circular(16),
              ),
            ),
            child: Row(
              children: [
                Container(
                  padding: const EdgeInsets.all(10),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: Icon(
                    getStatusIcon(item["status"]),
                    color: getStatusColor(item["status"]),
                    size: 24,
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        item["tujuan"],
                        style: const TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                          color: Colors.black87,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Row(
                        children: [
                          Icon(Icons.calendar_today, size: 14, color: Colors.grey.shade600),
                          const SizedBox(width: 6),
                          Text(
                            item["tanggal"],
                            style: TextStyle(
                              fontSize: 13,
                              color: Colors.grey.shade700,
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                  decoration: BoxDecoration(
                    color: getStatusColor(item["status"]),
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: Text(
                    item["status"],
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 12,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ],
            ),
          ),

          // Content Card
          Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              children: [
                // Waktu
                _buildInfoRow(
                  Icons.access_time,
                  'Waktu',
                  item["waktu"],
                  const Color(0xFF1E88E5),
                ),
                const SizedBox(height: 12),

                // Keperluan
                _buildInfoRow(
                  Icons.work_outline,
                  'Keperluan',
                  item["keperluan"],
                  const Color(0xFFFB8C00),
                ),
                const SizedBox(height: 12),

                // Driver
                _buildInfoRow(
                  Icons.person_outline,
                  'Driver',
                  item["driver"],
                  const Color(0xFF43A047),
                ),
                const SizedBox(height: 12),

                // Mobil
                _buildInfoRow(
                  Icons.directions_car_outlined,
                  'Mobil',
                  item["mobil"],
                  const Color(0xFF8E24AA),
                ),

                // Action Buttons (hanya untuk status tertentu)
                if (item["status"] == "Menunggu" || item["status"] == "Disetujui") ...[
                  const SizedBox(height: 16),
                  const Divider(height: 1),
                  const SizedBox(height: 12),
                  Row(
                    children: [
                      if (item["status"] == "Menunggu")
                        Expanded(
                          child: OutlinedButton.icon(
                            onPressed: () {
                              _showCancelDialog(context);
                            },
                            icon: const Icon(Icons.close, size: 18),
                            label: const Text('Batalkan'),
                            style: OutlinedButton.styleFrom(
                              foregroundColor: Colors.red,
                              side: const BorderSide(color: Colors.red),
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(10),
                              ),
                            ),
                          ),
                        ),
                      if (item["status"] == "Disetujui") ...[
                        Expanded(
                          child: OutlinedButton.icon(
                            onPressed: () {},
                            icon: const Icon(Icons.map, size: 18),
                            label: const Text('Lihat Rute'),
                            style: OutlinedButton.styleFrom(
                              foregroundColor: const Color(0xFF1976D2),
                              side: const BorderSide(color: Color(0xFF1976D2)),
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(10),
                              ),
                            ),
                          ),
                        ),
                        const SizedBox(width: 8),
                        Expanded(
                          child: ElevatedButton.icon(
                            onPressed: () {},
                            icon: const Icon(Icons.phone, size: 18),
                            label: const Text('Hubungi'),
                            style: ElevatedButton.styleFrom(
                              backgroundColor: const Color(0xFF1976D2),
                              foregroundColor: Colors.white,
                              elevation: 0,
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(10),
                              ),
                            ),
                          ),
                        ),
                      ],
                    ],
                  ),
                ],
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildInfoRow(IconData icon, String label, String value, Color color) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
          padding: const EdgeInsets.all(8),
          decoration: BoxDecoration(
            color: color.withOpacity(0.1),
            borderRadius: BorderRadius.circular(8),
          ),
          child: Icon(icon, color: color, size: 18),
        ),
        const SizedBox(width: 12),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                label,
                style: TextStyle(
                  fontSize: 12,
                  color: Colors.grey.shade600,
                  fontWeight: FontWeight.w500,
                ),
              ),
              const SizedBox(height: 4),
              Text(
                value,
                style: const TextStyle(
                  fontSize: 14,
                  color: Colors.black87,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  void _showCancelDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        title: const Row(
          children: [
            Icon(Icons.warning_amber_rounded, color: Colors.orange, size: 28),
            SizedBox(width: 12),
            Text('Batalkan Pesanan?'),
          ],
        ),
        content: const Text(
          'Apakah Anda yakin ingin membatalkan pesanan perjalanan ini?',
          style: TextStyle(fontSize: 14),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Tidak'),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(
                  content: const Row(
                    children: [
                      Icon(Icons.check_circle, color: Colors.white),
                      SizedBox(width: 12),
                      Text('Pesanan berhasil dibatalkan'),
                    ],
                  ),
                  backgroundColor: Colors.red,
                  behavior: SnackBarBehavior.floating,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(10),
                  ),
                ),
              );
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.red,
              foregroundColor: Colors.white,
            ),
            child: const Text('Ya, Batalkan'),
          ),
        ],
      ),
    );
  }
}