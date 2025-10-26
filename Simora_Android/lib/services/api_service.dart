import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiService {
  static const String baseUrl = "http://192.168.0.152:8000/api"; // IP laptop kamu

  static Future<Map<String, dynamic>> login(String name, String nik) async {
    try {
      final response = await http.post(
        Uri.parse("$baseUrl/login"),
        body: {
          'name': name,
          'nik': nik,
        },
      );

      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      } else {
        return {'status': 'error', 'message': 'Nama atau NIK salah!'};
      }
    } catch (e) {
      return {'status': 'error', 'message': 'Gagal terhubung ke server'};
    }
  }
}
