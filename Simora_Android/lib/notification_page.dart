import 'package:flutter/material.dart';

class NotificationPage extends StatefulWidget {
  const NotificationPage({Key? key}) : super(key: key);

  @override
  State<NotificationPage> createState() => _NotificationPageState();
}

class _NotificationPageState extends State<NotificationPage> {
  final List<NotificationItem> notifications = [
    NotificationItem(
      title: 'Perjalanan Dimulai',
      message: 'Toyota Avanza (B 1234 XYZ) telah memulai perjalanan ke Bandung',
      time: '5 menit lalu',
      type: NotificationType.started,
      isRead: false,
    ),
    NotificationItem(
      title: 'Perjalanan Selesai',
      message: 'Honda CR-V (B 5678 ABC) telah tiba di tujuan',
      time: '2 jam lalu',
      type: NotificationType.completed,
      isRead: false,
    ),
    NotificationItem(
      title: 'Booking Disetujui',
      message: 'Peminjaman mobil Mitsubishi Pajero untuk tanggal 15 Okt telah disetujui',
      time: '2 jam lalu',
      type: NotificationType.approved,
      isRead: true,
    ),
    NotificationItem(
      title: 'Booking Ditolak',
      message: 'Booking mobil Toyota Innova untuk tanggal 16 Okt ditolak',
      time: '3 jam lalu',
      type: NotificationType.rejected,
      isRead: true,
    ),
    NotificationItem(
      title: 'Reminder Pengembalian',
      message: 'Jangan lupa mengembalikan mobil sebelum pukul 17:00',
      time: 'Kemarin',
      type: NotificationType.reminder,
      isRead: true,
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF5F7FA),
      appBar: AppBar(
        elevation: 0,
        backgroundColor: Colors.white,
        title: const Text(
          'Notifikasi',
          style: TextStyle(
            color: Color(0xFF1E293B),
            fontSize: 20,
            fontWeight: FontWeight.w600,
          ),
        ),
        actions: [
          TextButton(
            onPressed: () {
              setState(() {
                for (var notification in notifications) {
                  notification.isRead = true;
                }
              });
            },
            child: const Text(
              'Tandai Semua',
              style: TextStyle(
                color: Color(0xFF3B82F6),
                fontSize: 14,
              ),
            ),
          ),
        ],
      ),
      body: ListView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: notifications.length,
        itemBuilder: (context, index) {
          final notification = notifications[index];
          return _buildNotificationCard(notification, index);
        },
      ),
    );
  }

  Widget _buildNotificationCard(NotificationItem notification, int index) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      decoration: BoxDecoration(
        color: notification.isRead ? Colors.white : const Color(0xFFEFF6FF),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: notification.isRead 
              ? const Color(0xFFE2E8F0) 
              : const Color(0xFF3B82F6).withOpacity(0.2),
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.03),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          borderRadius: BorderRadius.circular(12),
          onTap: () {
            setState(() {
              notification.isRead = true;
            });
          },
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                  width: 48,
                  height: 48,
                  decoration: BoxDecoration(
                    color: _getNotificationColor(notification.type).withOpacity(0.1),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Icon(
                    _getNotificationIcon(notification.type),
                    color: _getNotificationColor(notification.type),
                    size: 24,
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Expanded(
                            child: Text(
                              notification.title,
                              style: TextStyle(
                                fontSize: 15,
                                fontWeight: notification.isRead 
                                    ? FontWeight.w500 
                                    : FontWeight.w600,
                                color: const Color(0xFF1E293B),
                              ),
                            ),
                          ),
                          if (!notification.isRead)
                            Container(
                              width: 8,
                              height: 8,
                              decoration: const BoxDecoration(
                                color: Color(0xFF3B82F6),
                                shape: BoxShape.circle,
                              ),
                            ),
                        ],
                      ),
                      const SizedBox(height: 4),
                      Text(
                        notification.message,
                        style: TextStyle(
                          fontSize: 13,
                          color: const Color(0xFF64748B),
                          height: 1.4,
                        ),
                      ),
                      const SizedBox(height: 8),
                      Row(
                        children: [
                          Icon(
                            Icons.access_time,
                            size: 14,
                            color: const Color(0xFF94A3B8),
                          ),
                          const SizedBox(width: 4),
                          Text(
                            notification.time,
                            style: const TextStyle(
                              fontSize: 12,
                              color: Color(0xFF94A3B8),
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Color _getNotificationColor(NotificationType type) {
    switch (type) {
      case NotificationType.started:
        return const Color(0xFF3B82F6);
      case NotificationType.completed:
        return const Color(0xFF10B981);
      case NotificationType.approved:
        return const Color(0xFF8B5CF6);
      case NotificationType.rejected:
        return const Color(0xFFEF4444);
      case NotificationType.reminder:
        return const Color(0xFFF59E0B);
    }
  }

  IconData _getNotificationIcon(NotificationType type) {
    switch (type) {
      case NotificationType.started:
        return Icons.directions_car;
      case NotificationType.completed:
        return Icons.check_circle;
      case NotificationType.approved:
        return Icons.thumb_up;
      case NotificationType.rejected:
        return Icons.cancel;
      case NotificationType.reminder:
        return Icons.notifications_active;
    }
  }
}

enum NotificationType {
  started,
  completed,
  approved,
  rejected,
  reminder,
}

class NotificationItem {
  final String title;
  final String message;
  final String time;
  final NotificationType type;
  bool isRead;

  NotificationItem({
    required this.title,
    required this.message,
    required this.time,
    required this.type,
    required this.isRead,
  });
}