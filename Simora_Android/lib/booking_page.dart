import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

class BookingPage extends StatefulWidget {
  const BookingPage({super.key});

  @override
  State<BookingPage> createState() => _BookingPageState();
}

class _BookingPageState extends State<BookingPage> with SingleTickerProviderStateMixin {
  final _formKey = GlobalKey<FormState>();
  late AnimationController _animationController;

  DateTime? selectedDate;
  String? startTime;
  String? endTime;
  int jumlahPegawai = 1;
  List<String?> selectedPegawaiIds = [null]; // ID pegawai yang dipilih
  List<TextEditingController> pegawaiControllers = [];
  final TextEditingController tujuanController = TextEditingController();
  String? selectedKeperluan; // Ubah dari TextEditingController menjadi String
  final TextEditingController catatanController = TextEditingController();

  String departemenPegawai = "Commercial";
  String namaPemilikAkun = "Daiva Afdal";
  String idPemilikAkun = "EMP-001"; // ID pemilik akun
  bool _isLoading = false;

  // Data keperluan
  final List<String> daftarKeperluan = [
    "Meeting Client",
    "Dinas Luar",
    "Antar Jemput",
    "Lainnya",
  ];

  // Data dummy pegawai (nanti dari API)
  final List<Map<String, String>> daftarPegawai = [
    {"id": "EMP-002", "nama": "Azijul Akbar", "departemen": "HRD"},
    {"id": "EMP-003", "nama": "Budi Santoso", "departemen": "IT"},
    {"id": "EMP-004", "nama": "Citra Dewi", "departemen": "Finance"},
    {"id": "EMP-005", "nama": "Deni Ramadan", "departemen": "Marketing"},
    {"id": "EMP-006", "nama": "Eka Putri", "departemen": "Operations"},
    {"id": "EMP-007", "nama": "Fajar Sidik", "departemen": "Commercial"},
    {"id": "EMP-008", "nama": "Gina Marlina", "departemen": "HRD"},
  ];

  @override
  void initState() {
    super.initState();
    // Pegawai pertama adalah pemilik akun (tidak bisa diubah)
    TextEditingController firstController = TextEditingController(text: namaPemilikAkun);
    pegawaiControllers.add(firstController);
    selectedPegawaiIds[0] = idPemilikAkun; // Set ID pemilik akun
    _animationController = AnimationController(
      duration: const Duration(milliseconds: 300),
      vsync: this,
    );
  }

  @override
  void dispose() {
    _animationController.dispose();
    for (var controller in pegawaiControllers) {
      controller.dispose();
    }
    tujuanController.dispose();
    catatanController.dispose();
    super.dispose();
  }

  String getDepartemenList() {
    List<String> departments = [departemenPegawai]; // Departemen pemilik akun
    
    for (int i = 1; i < selectedPegawaiIds.length; i++) {
      String? pegawaiId = selectedPegawaiIds[i];
      if (pegawaiId != null) {
        var pegawai = daftarPegawai.firstWhere(
          (p) => p['id'] == pegawaiId,
          orElse: () => {"departemen": ""},
        );
        String dept = pegawai['departemen'] ?? "";
        if (dept.isNotEmpty && !departments.contains(dept)) {
          departments.add(dept);
        }
      }
    }
    
    return departments.join(', ');
  }

  List<String> generateTimeOptions() {
    List<String> times = [];
    
    // Dapatkan waktu sekarang
    DateTime now = DateTime.now();
    int currentHour = now.hour;
    int currentMinute = now.minute;
    
    // Bulatkan ke kelipatan 5 terdekat ke atas
    int roundedMinute = ((currentMinute / 5).ceil() * 5) % 60;
    int startHour = currentHour;
    
    // Jika menit dibulatkan jadi 0, berarti naik ke jam berikutnya
    if (roundedMinute == 0 && currentMinute > 0) {
      startHour = (currentHour + 1) % 24;
    }
    
    // Generate waktu mulai dari waktu sekarang (dibulatkan) sampai akhir hari
    for (int hour = startHour; hour < 24; hour++) {
      int startMinute = (hour == startHour) ? roundedMinute : 0;
      for (int minute = startMinute; minute < 60; minute += 5) {
        times.add("${hour.toString().padLeft(2, '0')}:${minute.toString().padLeft(2, '0')}");
      }
    }
    
    // Tambahkan waktu dari 00:00 sampai waktu sekarang untuk hari berikutnya
    for (int hour = 0; hour <= startHour; hour++) {
      int endMinute = (hour == startHour) ? roundedMinute : 60;
      for (int minute = 0; minute < endMinute; minute += 5) {
        times.add("${hour.toString().padLeft(2, '0')}:${minute.toString().padLeft(2, '0')}");
      }
    }
    
    return times;
  }

  void _handleSubmit() async {
    if (_formKey.currentState!.validate()) {
      if (selectedDate == null) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: const Row(
              children: [
                Icon(Icons.warning, color: Colors.white),
                SizedBox(width: 12),
                Text('Silakan pilih tanggal terlebih dahulu'),
              ],
            ),
            backgroundColor: Colors.orange,
            behavior: SnackBarBehavior.floating,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
          ),
        );
        return;
      }

      setState(() {
        _isLoading = true;
      });

      await Future.delayed(const Duration(seconds: 2));

      setState(() {
        _isLoading = false;
      });

      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: const Row(
              children: [
                Icon(Icons.check_circle, color: Colors.white),
                SizedBox(width: 12),
                Text('Pengajuan berhasil dikirim!'),
              ],
            ),
            backgroundColor: Colors.green,
            behavior: SnackBarBehavior.floating,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
          ),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    List<String> timeOptions = generateTimeOptions();

    return Scaffold(
      backgroundColor: Colors.grey.shade50,
      body: CustomScrollView(
        slivers: [
          // Modern App Bar
          SliverAppBar(
            expandedHeight: 120,
            floating: false,
            pinned: true,
            backgroundColor: const Color(0xFF1976D2),
            flexibleSpace: FlexibleSpaceBar(
              title: const Text(
                'Booking Mobil',
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
                      right: -30,
                      top: -30,
                      child: Opacity(
                        opacity: 0.1,
                        child: Icon(
                          Icons.directions_car,
                          size: 200,
                          color: Colors.white,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),

          // Content
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.all(20.0),
              child: Form(
                key: _formKey,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Info Card
                    Container(
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        color: Colors.blue.shade50,
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(color: Colors.blue.shade200),
                      ),
                      child: Row(
                        children: [
                          Icon(Icons.info_outline, color: Colors.blue.shade700),
                          const SizedBox(width: 12),
                          Expanded(
                            child: Text(
                              'Isi formulir dengan lengkap untuk mengajukan booking mobil',
                              style: TextStyle(
                                color: Colors.blue.shade900,
                                fontSize: 13,
                                fontWeight: FontWeight.w500,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 24),

                    // Tanggal
                    _buildSectionTitle('Tanggal Perjalanan', Icons.calendar_today),
                    const SizedBox(height: 12),
                    _buildDatePicker(),
                    const SizedBox(height: 24),

                    // Departemen
                    _buildSectionTitle('Departemen', Icons.business),
                    const SizedBox(height: 12),
                    _buildDepartmentField(getDepartemenList()),
                    const SizedBox(height: 24),

                    // Waktu Section
                    _buildSectionTitle('Waktu Perjalanan', Icons.access_time),
                    const SizedBox(height: 12),
                    Row(
                      children: [
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Padding(
                                padding: const EdgeInsets.only(bottom: 8.0),
                                child: Text(
                                  'Waktu Mulai',
                                  style: TextStyle(
                                    fontSize: 13,
                                    fontWeight: FontWeight.w600,
                                    color: Colors.grey.shade700,
                                  ),
                                ),
                              ),
                              _buildTimeDropdown(timeOptions, startTime, (value) {
                                setState(() {
                                  startTime = value;
                                });
                              }, 'Pilih waktu mulai'),
                            ],
                          ),
                        ),
                        const SizedBox(width: 16),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Padding(
                                padding: const EdgeInsets.only(bottom: 8.0),
                                child: Text(
                                  'Waktu Selesai',
                                  style: TextStyle(
                                    fontSize: 13,
                                    fontWeight: FontWeight.w600,
                                    color: Colors.grey.shade700,
                                  ),
                                ),
                              ),
                              _buildTimeDropdown(timeOptions, endTime, (value) {
                                setState(() {
                                  endTime = value;
                                });
                              }, 'Pilih waktu selesai'),
                            ],
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 24),

                    // Jumlah Pegawai
                    _buildSectionTitle('Jumlah Pegawai', Icons.groups),
                    const SizedBox(height: 12),
                    _buildEmployeeCounter(),
                    const SizedBox(height: 24),

                    // Nama Pegawai
                    _buildSectionTitle('Nama Pegawai yang Ikut', Icons.person_add),
                    const SizedBox(height: 12),
                    _buildEmployeeNameFields(),
                    const SizedBox(height: 24),

                    // Tujuan
                    _buildSectionTitle('Tujuan Perjalanan', Icons.location_on),
                    const SizedBox(height: 12),
                    _buildTextField(
                      controller: tujuanController,
                      hint: 'Masukkan tujuan perjalanan',
                      icon: Icons.location_on_outlined,
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Tujuan tidak boleh kosong';
                        }
                        return null;
                      },
                    ),
                    const SizedBox(height: 24),

                    // Keperluan
                    _buildSectionTitle('Keperluan', Icons.work_outline),
                    const SizedBox(height: 12),
                    _buildKeperluanDropdown(),
                    const SizedBox(height: 24),

                    // Catatan Tambahan
                    _buildSectionTitle('Catatan Tambahan', Icons.note_outlined, isOptional: true),
                    const SizedBox(height: 12),
                    _buildTextField(
                      controller: catatanController,
                      hint: 'Catatan tambahan (opsional)',
                      icon: Icons.note_outlined,
                      maxLines: 3,
                    ),
                    const SizedBox(height: 32),

                    // Submit Button
                    SizedBox(
                      width: double.infinity,
                      height: 56,
                      child: ElevatedButton(
                        onPressed: _isLoading ? null : _handleSubmit,
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const Color(0xFF1976D2),
                          foregroundColor: Colors.white,
                          elevation: 2,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(14),
                          ),
                        ),
                        child: _isLoading
                            ? const SizedBox(
                                width: 24,
                                height: 24,
                                child: CircularProgressIndicator(
                                  color: Colors.white,
                                  strokeWidth: 2.5,
                                ),
                              )
                            : const Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  Icon(Icons.send, size: 20),
                                  SizedBox(width: 12),
                                  Text(
                                    'Kirim Pengajuan',
                                    style: TextStyle(
                                      fontSize: 16,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                ],
                              ),
                      ),
                    ),
                    const SizedBox(height: 32),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSectionTitle(String title, IconData icon, {bool isOptional = false}) {
    return Row(
      children: [
        Container(
          padding: const EdgeInsets.all(8),
          decoration: BoxDecoration(
            color: const Color(0xFF1976D2).withOpacity(0.1),
            borderRadius: BorderRadius.circular(8),
          ),
          child: Icon(icon, color: const Color(0xFF1976D2), size: 20),
        ),
        const SizedBox(width: 12),
        Text(
          title,
          style: const TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.bold,
            color: Colors.black87,
          ),
        ),
        if (isOptional) ...[
          const SizedBox(width: 8),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
            decoration: BoxDecoration(
              color: Colors.grey.shade200,
              borderRadius: BorderRadius.circular(4),
            ),
            child: Text(
              'Opsional',
              style: TextStyle(
                fontSize: 11,
                color: Colors.grey.shade600,
                fontWeight: FontWeight.w500,
              ),
            ),
          ),
        ],
      ],
    );
  }

  Widget _buildDatePicker() {
    return InkWell(
      onTap: () async {
        DateTime? pickedDate = await showDatePicker(
          context: context,
          initialDate: DateTime.now(),
          firstDate: DateTime.now(),
          lastDate: DateTime(2100),
          builder: (context, child) {
            return Theme(
              data: Theme.of(context).copyWith(
                colorScheme: const ColorScheme.light(
                  primary: Color(0xFF1976D2),
                ),
              ),
              child: child!,
            );
          },
        );
        if (pickedDate != null) {
          setState(() {
            selectedDate = pickedDate;
          });
        }
      },
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: selectedDate != null ? const Color(0xFF1976D2) : Colors.grey.shade300,
            width: selectedDate != null ? 2 : 1,
          ),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.04),
              blurRadius: 10,
              offset: const Offset(0, 2),
            ),
          ],
        ),
        child: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(10),
              decoration: BoxDecoration(
                color: const Color(0xFF1976D2).withOpacity(0.1),
                borderRadius: BorderRadius.circular(8),
              ),
              child: const Icon(Icons.calendar_today, color: Color(0xFF1976D2), size: 20),
            ),
            const SizedBox(width: 16),
            Expanded(
              child: Text(
                selectedDate == null
                    ? "Pilih tanggal perjalanan"
                    : DateFormat('dd MMMM yyyy').format(selectedDate!),
                style: TextStyle(
                  fontSize: 14,
                  fontWeight: selectedDate != null ? FontWeight.w600 : FontWeight.normal,
                  color: selectedDate != null ? Colors.black87 : Colors.grey.shade600,
                ),
              ),
            ),
            Icon(Icons.arrow_forward_ios, size: 16, color: Colors.grey.shade400),
          ],
        ),
      ),
    );
  }

  Widget _buildDepartmentField(String departemenText) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.grey.shade100,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Colors.grey.shade300),
      ),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(10),
            decoration: BoxDecoration(
              color: Colors.grey.shade300,
              borderRadius: BorderRadius.circular(8),
            ),
            child: Icon(Icons.business, color: Colors.grey.shade700, size: 20),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Text(
              departemenText,
              style: TextStyle(
                fontSize: 14,
                fontWeight: FontWeight.w600,
                color: Colors.grey.shade700,
              ),
            ),
          ),
          Icon(Icons.lock, color: Colors.grey.shade400, size: 18),
        ],
      ),
    );
  }

  Widget _buildTimeDropdown(List<String> options, String? value, Function(String?) onChanged, String hint) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Colors.grey.shade300),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.04),
            blurRadius: 10,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: DropdownButtonFormField<String>(
        value: value,
        items: options.map((time) {
          return DropdownMenuItem(
            value: time,
            child: Text(time, style: const TextStyle(fontSize: 13)),
          );
        }).toList(),
        onChanged: onChanged,
        decoration: InputDecoration(
          hintText: hint,
          hintStyle: TextStyle(color: Colors.grey.shade500, fontSize: 11),
          contentPadding: const EdgeInsets.symmetric(horizontal: 10, vertical: 12),
          border: InputBorder.none,
        ),
        icon: Icon(Icons.access_time, color: Colors.grey.shade400, size: 16),
        isExpanded: true,
      ),
    );
  }

  Widget _buildEmployeeCounter() {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Colors.grey.shade300),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.04),
            blurRadius: 10,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Row(
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Jumlah: $jumlahPegawai orang',
                  style: const TextStyle(
                    fontSize: 15,
                    fontWeight: FontWeight.w600,
                    color: Colors.black87,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  'Termasuk Anda (Max. 8 orang)',
                  style: TextStyle(
                    fontSize: 12,
                    color: Colors.grey.shade600,
                  ),
                ),
              ],
            ),
          ),
          Row(
            children: [
              IconButton(
                onPressed: jumlahPegawai > 1
                    ? () {
                        setState(() {
                          jumlahPegawai--;
                          pegawaiControllers.removeLast();
                          selectedPegawaiIds.removeLast();
                        });
                      }
                    : null,
                icon: const Icon(Icons.remove_circle_outline),
                color: const Color(0xFF1976D2),
                iconSize: 32,
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                decoration: BoxDecoration(
                  color: const Color(0xFF1976D2).withOpacity(0.1),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Text(
                  jumlahPegawai.toString(),
                  style: const TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    color: Color(0xFF1976D2),
                  ),
                ),
              ),
              IconButton(
                onPressed: jumlahPegawai < 8
                    ? () {
                        setState(() {
                          jumlahPegawai++;
                          pegawaiControllers.add(TextEditingController());
                          selectedPegawaiIds.add(null);
                        });
                      }
                    : null,
                icon: const Icon(Icons.add_circle_outline),
                color: jumlahPegawai < 8 ? const Color(0xFF1976D2) : Colors.grey,
                iconSize: 32,
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildEmployeeNameFields() {
    return Column(
      children: List.generate(jumlahPegawai, (index) {
        // Pegawai pertama (index 0) adalah pemilik akun - tidak bisa diubah
        bool isOwner = index == 0;
        
        return Padding(
          padding: const EdgeInsets.only(bottom: 12),
          child: isOwner 
              ? _buildLockedEmployeeField(pegawaiControllers[index])
              : _buildEmployeeDropdown(index),
        );
      }),
    );
  }

  Widget _buildEmployeeDropdown(int index) {
    // Filter pegawai yang sudah dipilih di index lain
    List<Map<String, String>> availablePegawai = daftarPegawai.where((pegawai) {
      String pegawaiId = pegawai['id']!;
      // Cek apakah pegawai ini sudah dipilih di index lain
      for (int i = 0; i < selectedPegawaiIds.length; i++) {
        if (i != index && selectedPegawaiIds[i] == pegawaiId) {
          return false; // Pegawai sudah dipilih di index lain
        }
      }
      return true; // Pegawai masih tersedia
    }).toList();

    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.04),
            blurRadius: 10,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: DropdownButtonFormField<String>(
        value: selectedPegawaiIds[index],
        decoration: InputDecoration(
          labelText: 'Pegawai ${index + 1}',
          labelStyle: TextStyle(color: Colors.grey.shade600, fontSize: 13),
          prefixIcon: Container(
            margin: const EdgeInsets.all(12),
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: const Color(0xFF1976D2).withOpacity(0.1),
              borderRadius: BorderRadius.circular(8),
            ),
            child: const Icon(Icons.person_outline, color: Color(0xFF1976D2), size: 20),
          ),
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
            borderSide: BorderSide.none,
          ),
          enabledBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
            borderSide: BorderSide(color: Colors.grey.shade200),
          ),
          focusedBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
            borderSide: const BorderSide(color: Color(0xFF1976D2), width: 2),
          ),
          filled: true,
          fillColor: Colors.white,
          contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
        ),
        hint: Text(
          availablePegawai.isEmpty ? 'Tidak ada pegawai tersedia' : 'Pilih pegawai',
          style: TextStyle(
            fontSize: 14,
            color: availablePegawai.isEmpty ? Colors.red.shade400 : Colors.grey.shade500,
          ),
        ),
        items: availablePegawai.map((pegawai) {
          return DropdownMenuItem<String>(
            value: pegawai['id'],
            child: Row(
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text(
                        pegawai['nama']!,
                        style: const TextStyle(
                          fontSize: 14,
                          fontWeight: FontWeight.w600,
                        ),
                        overflow: TextOverflow.ellipsis,
                      ),
                      const SizedBox(height: 2),
                      Text(
                        pegawai['departemen']!,
                        style: TextStyle(
                          fontSize: 11,
                          color: Colors.grey.shade600,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          );
        }).toList(),
        onChanged: availablePegawai.isEmpty ? null : (value) {
          setState(() {
            selectedPegawaiIds[index] = value;
            // Update controller dengan nama pegawai yang dipilih
            if (value != null) {
              var pegawai = daftarPegawai.firstWhere((p) => p['id'] == value);
              pegawaiControllers[index].text = pegawai['nama']!;
            } else {
              pegawaiControllers[index].text = '';
            }
          });
        },
        validator: (value) {
          if (value == null) {
            return 'Pilih pegawai ${index + 1}';
          }
          return null;
        },
        isExpanded: true,
        isDense: false,
      ),
    );
  }

  Widget _buildLockedEmployeeField(TextEditingController controller) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.blue.shade50,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Colors.blue.shade200, width: 2),
      ),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(10),
            decoration: BoxDecoration(
              color: const Color(0xFF1976D2).withOpacity(0.2),
              borderRadius: BorderRadius.circular(8),
            ),
            child: const Icon(Icons.person, color: Color(0xFF1976D2), size: 20),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Pemohon (Anda)',
                  style: TextStyle(
                    fontSize: 11,
                    fontWeight: FontWeight.w600,
                    color: Colors.blue.shade700,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  controller.text,
                  style: const TextStyle(
                    fontSize: 15,
                    fontWeight: FontWeight.bold,
                    color: Colors.black87,
                  ),
                ),
              ],
            ),
          ),
          Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: Colors.green.shade100,
              borderRadius: BorderRadius.circular(8),
            ),
            child: Icon(Icons.verified, color: Colors.green.shade700, size: 20),
          ),
        ],
      ),
    );
  }

  Widget _buildKeperluanDropdown() {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.04),
            blurRadius: 10,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: DropdownButtonFormField<String>(
        value: selectedKeperluan,
        decoration: InputDecoration(
          hintText: 'Pilih keperluan',
          hintStyle: TextStyle(color: Colors.grey.shade500, fontSize: 14),
          prefixIcon: Container(
            margin: const EdgeInsets.all(12),
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: const Color(0xFF1976D2).withOpacity(0.1),
              borderRadius: BorderRadius.circular(8),
            ),
            child: const Icon(Icons.work_outline, color: Color(0xFF1976D2), size: 20),
          ),
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
            borderSide: BorderSide.none,
          ),
          enabledBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
            borderSide: BorderSide(color: Colors.grey.shade200),
          ),
          focusedBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
            borderSide: const BorderSide(color: Color(0xFF1976D2), width: 2),
          ),
          errorBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
            borderSide: const BorderSide(color: Colors.red),
          ),
          filled: true,
          fillColor: Colors.white,
          contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
        ),
        items: daftarKeperluan.map((keperluan) {
          return DropdownMenuItem<String>(
            value: keperluan,
            child: Text(
              keperluan,
              style: const TextStyle(
                fontSize: 14,
                fontWeight: FontWeight.w600,
              ),
            ),
          );
        }).toList(),
        onChanged: (value) {
          setState(() {
            selectedKeperluan = value;
          });
        },
        validator: (value) {
          if (value == null) {
            return 'Keperluan tidak boleh kosong';
          }
          return null;
        },
        isExpanded: true,
      ),
    );
  }

  Widget _buildTextField({
    required TextEditingController controller,
    required String hint,
    required IconData icon,
    String? Function(String?)? validator,
    int maxLines = 1,
  }) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.04),
            blurRadius: 10,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: TextFormField(
        controller: controller,
        maxLines: maxLines,
        decoration: InputDecoration(
          hintText: hint,
          hintStyle: TextStyle(color: Colors.grey.shade500, fontSize: 14),
          prefixIcon: Container(
            margin: const EdgeInsets.all(12),
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: const Color(0xFF1976D2).withOpacity(0.1),
              borderRadius: BorderRadius.circular(8),
            ),
            child: Icon(icon, color: const Color(0xFF1976D2), size: 20),
          ),
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
            borderSide: BorderSide.none,
          ),
          enabledBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
            borderSide: BorderSide(color: Colors.grey.shade200),
          ),
          focusedBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
            borderSide: const BorderSide(color: Color(0xFF1976D2), width: 2),
          ),
          errorBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
            borderSide: const BorderSide(color: Colors.red),
          ),
          filled: true,
          fillColor: Colors.white,
          contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
        ),
        validator: validator,
      ),
    );
  }
}