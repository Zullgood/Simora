-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 25, 2025 at 05:56 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `simora_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `employee_id` bigint(20) UNSIGNED NOT NULL,
  `driver_id` bigint(20) UNSIGNED DEFAULT NULL,
  `car_id` bigint(20) UNSIGNED DEFAULT NULL,
  `destination` varchar(255) NOT NULL,
  `pickup_date` date NOT NULL,
  `return_date` date DEFAULT NULL,
  `pickup_time` time NOT NULL,
  `return_time` time DEFAULT NULL,
  `passenger_count` int(11) NOT NULL DEFAULT 1,
  `purpose` varchar(255) NOT NULL,
  `status` enum('pending','approved','rejected','completed') NOT NULL DEFAULT 'pending',
  `notes` text DEFAULT NULL,
  `rejection_reason` text DEFAULT NULL,
  `rejected_by` varchar(255) DEFAULT NULL,
  `approved_at` timestamp NULL DEFAULT NULL,
  `completed_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `current_lat` decimal(10,8) DEFAULT NULL,
  `current_lng` decimal(11,8) DEFAULT NULL,
  `current_address` varchar(255) DEFAULT NULL,
  `last_location_update` timestamp NULL DEFAULT NULL,
  `status_updated_at` timestamp NULL DEFAULT NULL,
  `passenger_names` text DEFAULT NULL,
  `recommended_car_id` bigint(20) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`id`, `employee_id`, `driver_id`, `car_id`, `destination`, `pickup_date`, `return_date`, `pickup_time`, `return_time`, `passenger_count`, `purpose`, `status`, `notes`, `rejection_reason`, `rejected_by`, `approved_at`, `completed_at`, `created_at`, `updated_at`, `current_lat`, `current_lng`, `current_address`, `last_location_update`, `status_updated_at`, `passenger_names`, `recommended_car_id`) VALUES
(13, 1, NULL, NULL, 'e', '2025-10-21', NULL, '14:44:00', '15:45:00', 1, 'Dinas Luar', 'rejected', 'Ditolak oleh admin', NULL, NULL, NULL, NULL, '2025-10-21 00:44:39', '2025-10-21 00:47:48', NULL, NULL, NULL, NULL, NULL, 'Azijul Akbar', NULL),
(14, 1, 2, 3, 'q', '2025-10-21', NULL, '14:48:00', '15:49:00', 1, 'Meeting Client', 'completed', 'q', NULL, NULL, NULL, NULL, '2025-10-21 00:49:00', '2025-10-21 00:50:48', NULL, NULL, NULL, NULL, NULL, 'Azijul Akbar', NULL),
(15, 2, 2, 3, 'p', '2025-10-21', NULL, '14:51:00', '16:51:00', 1, 'Dinas Luar', 'completed', NULL, NULL, NULL, NULL, NULL, '2025-10-21 00:51:09', '2025-10-21 00:52:37', NULL, NULL, NULL, NULL, NULL, 'Daiva Afdal', NULL),
(16, 1, 2, 3, 'q', '2025-10-21', NULL, '14:52:00', '15:53:00', 1, 'Antar Jemput', 'completed', 'q', NULL, NULL, NULL, NULL, '2025-10-21 00:53:09', '2025-10-21 00:55:14', NULL, NULL, NULL, NULL, NULL, 'Azijul Akbar', NULL),
(18, 1, 2, 3, 'p', '2025-10-21', NULL, '14:58:00', '15:59:00', 1, 'Dinas Luar', 'completed', NULL, NULL, NULL, NULL, NULL, '2025-10-21 00:58:35', '2025-10-21 01:02:29', NULL, NULL, NULL, NULL, NULL, 'Azijul Akbar', NULL),
(21, 1, NULL, NULL, 'Bandung', '2025-10-22', NULL, '06:23:00', '06:23:00', 1, 'Antar Jemput', 'rejected', 'Ditolak oleh admin', NULL, NULL, NULL, NULL, '2025-10-21 15:23:26', '2025-10-21 15:23:37', NULL, NULL, NULL, NULL, NULL, 'Azijul Akbar', NULL),
(22, 1, NULL, NULL, 'Bandung', '2025-10-22', NULL, '05:43:00', '07:43:00', 1, 'Dinas Luar', 'rejected', 'Ditolak oleh admin', NULL, NULL, NULL, NULL, '2025-10-21 15:43:37', '2025-10-21 15:58:22', NULL, NULL, NULL, NULL, NULL, 'Azijul Akbar', NULL),
(23, 2, NULL, NULL, 'p', '2025-10-22', NULL, '07:02:00', '08:02:00', 1, 'Antar Jemput', 'rejected', NULL, 'Melebihi waktu', 'Super Admin', NULL, NULL, '2025-10-21 16:02:42', '2025-10-22 05:07:35', NULL, NULL, NULL, NULL, NULL, 'Daiva Afdal', NULL),
(24, 2, 3, 3, 'Bandung', '2025-10-22', NULL, '19:07:00', '19:10:00', 1, 'Antar Jemput', 'completed', NULL, NULL, NULL, NULL, NULL, '2025-10-22 05:08:07', '2025-10-22 05:10:43', NULL, NULL, NULL, NULL, NULL, 'Daiva Afdal', NULL),
(25, 3, 2, 3, 'Bandung', '2025-10-22', NULL, '19:18:00', '19:20:00', 1, 'Antar Jemput', 'completed', NULL, NULL, NULL, NULL, NULL, '2025-10-22 05:18:29', '2025-10-22 23:00:06', NULL, NULL, NULL, NULL, NULL, 'Qinthara', NULL),
(26, 2, 3, 4, 'Bandung', '2025-10-22', NULL, '19:30:00', '19:32:00', 1, 'Antar Jemput', 'completed', NULL, NULL, NULL, NULL, NULL, '2025-10-22 05:30:18', '2025-10-22 23:00:32', NULL, NULL, NULL, NULL, NULL, 'Daiva Afdal', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cars`
--

CREATE TABLE `cars` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `brand` varchar(255) NOT NULL,
  `model` varchar(255) NOT NULL,
  `year` int(11) NOT NULL,
  `license_plate` varchar(255) NOT NULL,
  `color` varchar(255) NOT NULL,
  `fuel_type` enum('gasoline','diesel','electric','hybrid') NOT NULL,
  `transmission` varchar(255) NOT NULL DEFAULT 'manual',
  `capacity` int(11) NOT NULL,
  `photo` longtext DEFAULT NULL,
  `mileage` int(11) DEFAULT NULL,
  `last_service` date DEFAULT NULL,
  `next_service` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `status` enum('available','in_use','maintenance','booked') DEFAULT 'available'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cars`
--

INSERT INTO `cars` (`id`, `brand`, `model`, `year`, `license_plate`, `color`, `fuel_type`, `transmission`, `capacity`, `photo`, `mileage`, `last_service`, `next_service`, `created_at`, `updated_at`, `status`) VALUES
(3, 'Toyota', 'Avanza', 1990, 'b 1234 c', 'merah', 'gasoline', 'manual', 2, NULL, 12222222, '2025-10-21', '2025-11-08', '2025-10-21 00:46:56', '2025-10-22 23:00:06', 'available'),
(4, 'Toyota', 'Alpart', 2000, 'b 1235 c', 'pink', 'gasoline', 'manual', 6, NULL, 200000, '2025-10-01', '2025-10-31', '2025-10-21 07:28:46', '2025-10-22 23:00:32', 'available');

-- --------------------------------------------------------

--
-- Table structure for table `drivers`
--

CREATE TABLE `drivers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `license_number` varchar(255) NOT NULL,
  `license_expiry` date NOT NULL,
  `phone` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `join_date` date NOT NULL,
  `experience_years` int(11) NOT NULL,
  `photo` longtext DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `status` enum('active','inactive','on_duty','booked') DEFAULT 'active',
  `rating` decimal(2,1) NOT NULL DEFAULT 4.5,
  `working_hours` int(11) NOT NULL DEFAULT 0,
  `total_trips` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `drivers`
--

INSERT INTO `drivers` (`id`, `name`, `email`, `license_number`, `license_expiry`, `phone`, `address`, `join_date`, `experience_years`, `photo`, `created_at`, `updated_at`, `status`, `rating`, `working_hours`, `total_trips`) VALUES
(2, 'didi', 'admin@example.com', 'SIM12998876744444', '2025-11-08', '229991133333', 'r', '2025-10-21', 0, NULL, '2025-10-21 00:48:34', '2025-10-22 23:00:06', 'active', 0.0, 0, 0),
(3, 'qinthara', 'qindi@gmail.com', 'SIM129988767', '2025-11-06', '089525411228', 'acasd', '2025-10-21', 0, NULL, '2025-10-21 07:27:40', '2025-10-22 23:00:32', 'active', 0.0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `nik` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `department` varchar(255) NOT NULL,
  `position` varchar(255) NOT NULL,
  `role` enum('employee','admin') NOT NULL DEFAULT 'employee',
  `photo` text DEFAULT NULL,
  `android_username` varchar(255) DEFAULT NULL,
  `android_password` varchar(255) DEFAULT NULL,
  `has_android_account` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `employee_id` varchar(50) DEFAULT NULL,
  `hire_date` date DEFAULT NULL,
  `status` enum('active','inactive','resigned','terminated') NOT NULL DEFAULT 'active',
  `address` text DEFAULT NULL,
  `emergency_contact` varchar(100) DEFAULT NULL,
  `emergency_phone` varchar(20) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`id`, `name`, `nik`, `email`, `phone`, `department`, `position`, `role`, `photo`, `android_username`, `android_password`, `has_android_account`, `created_at`, `updated_at`, `employee_id`, `hire_date`, `status`, `address`, `emergency_contact`, `emergency_phone`, `password`) VALUES
(1, 'Azijul Akbar', '0892143362531695', 'azijulakbar@gmail.com', '089765432121', 'Comdev', 'Manajer', 'employee', 'data:image/jpeg;base64,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', 'azijulakbar@gmail.com', 'p7rwzcbg', 0, '2025-10-20 17:48:28', '2025-10-20 20:15:07', 'EMP637226', '2025-10-01', 'active', 'JL. panjat pinang', NULL, NULL, NULL),
(2, 'Daiva Afdal', '01298631543', 'daivaafdal@gmail.com', '089765432124', 'Commercial', 'Manajer', 'employee', NULL, 'daivaafdal@gmail.com', 'bra9muoj', 0, '2025-10-20 17:58:09', '2025-10-20 17:58:09', 'EMP183757', '2025-10-09', 'active', 'Kp. kolam renang', NULL, NULL, NULL),
(3, 'Qinthara', '0929863587034269', 'qinthara@gmail.com', '089765432132', 'HRD/GA', 'Manajer', 'employee', NULL, 'qinthara@gmail.com', '6o9trqbn', 0, '2025-10-20 18:02:12', '2025-10-20 18:02:12', 'EMP465276', '2025-10-21', 'active', 'Kp. Sempit Seram', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2024_01_01_000001_create_employees_table', 1),
(5, '2024_01_01_000002_create_drivers_table', 1),
(6, '2024_01_01_000003_create_cars_table', 1),
(7, '2024_01_01_000003_create_notifications_table', 1),
(8, '2024_01_01_000004_create_bookings_table', 1),
(9, '2024_01_01_000005_add_fields_to_users_table', 1),
(10, '2024_01_15_000001_add_profile_fields_to_users_table', 1),
(11, '2024_01_15_000002_modify_avatar_field_in_users_table', 1),
(12, '2024_01_15_000003_add_tracking_fields_to_bookings_table', 1),
(13, '2024_12_02_000001_add_missing_columns_to_employees', 1),
(14, '2025_01_06_000001_fix_bookings_table_structure', 1),
(15, '2025_01_20_000001_add_approval_timestamps_to_bookings_table', 1),
(16, '2025_01_21_000002_add_role_to_employees', 1),
(17, '2025_01_21_000006_add_status_to_users_table', 1),
(18, '2025_09_16_045823_create_personal_access_tokens_table', 1),
(19, '2025_09_16_073554_add_additional_fields_to_cars_table', 1),
(20, '2025_09_16_074312_fix_cars_photo_field', 1),
(21, '2025_09_16_084051_add_fields_to_drivers_table', 1),
(22, '2025_09_18_012339_add_rating_working_hours_to_drivers_table', 1),
(23, '2025_09_25_100938_update_drivers_status_enum', 1),
(24, '2025_09_30_013113_update_bookings_table_fields', 1),
(25, '2025_10_14_012323_add_return_date_to_bookings_table', 1),
(26, '2025_01_21_000007_add_last_login_to_users_table', 2),
(27, '2025_01_21_000008_add_passenger_names_to_bookings_table', 3),
(28, '2025_01_21_000009_add_recommended_car_id_to_bookings_table', 4),
(29, '2025_01_01_000001_update_cars_status_enum', 5),
(30, '2025_10_21_230030_add_rejection_reason_to_bookings_table', 6);

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `type` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`data`)),
  `read_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` text NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'auth_token', '31059ea2aa680b905f1360da922938705b347cd1f72a5981754db9f4a24da4c9', '[\"*\"]', NULL, NULL, '2025-10-20 17:41:44', '2025-10-20 17:41:44'),
(2, 'App\\Models\\User', 1, 'auth_token', '443b25bc17c4a38ffed6e6b87d61afb698703d333ad7148f180fd8e8263bf03a', '[\"*\"]', '2025-10-20 21:43:05', NULL, '2025-10-20 17:41:58', '2025-10-20 21:43:05'),
(3, 'App\\Models\\User', 1, 'auth_token', '8db49d463d4942e16866a7a2153b3f28107da4ecb1996a85a0b2dbe64271db6d', '[\"*\"]', '2025-10-20 21:44:24', NULL, '2025-10-20 21:43:45', '2025-10-20 21:44:24'),
(4, 'App\\Models\\User', 2, 'auth_token', '9907bec88e30e8b8fc09d21ee3f7bf887aaa43fa397a37b745407a35db9b6ee3', '[\"*\"]', '2025-10-20 21:45:31', NULL, '2025-10-20 21:44:43', '2025-10-20 21:45:31'),
(5, 'App\\Models\\User', 1, 'auth_token', 'e60c976a68fdc7c0de2754ed9c62d3eb6636d8d3b031b4a49d83280be4793b5a', '[\"*\"]', '2025-10-22 05:36:58', NULL, '2025-10-20 21:45:52', '2025-10-22 05:36:58'),
(6, 'App\\Models\\User', 1, 'auth_token', '3ceeff9ed973b8aeb53dca424d6f020b7d3bc2b81cef8b4c1ecfbe2a184fc58a', '[\"*\"]', '2025-10-22 22:45:14', NULL, '2025-10-22 05:37:57', '2025-10-22 22:45:14'),
(7, 'App\\Models\\User', 2, 'auth_token', 'd89e164b3b4717ca893e0a398e8478b529912a5309dbc7eb2a31ca84a9e338d2', '[\"*\"]', '2025-10-22 22:53:29', NULL, '2025-10-22 22:45:33', '2025-10-22 22:53:29'),
(8, 'App\\Models\\User', 1, 'auth_token', '2f0313c6362cf50714287ab3bd06e81c612d77c187df97e96e9ba9d7f2463977', '[\"*\"]', '2025-10-22 22:55:01', NULL, '2025-10-22 22:54:28', '2025-10-22 22:55:01'),
(9, 'App\\Models\\User', 2, 'auth_token', 'cb65e334843baf1104111845be3c49247f93f31dcc8716d7766ff2cbed90f704', '[\"*\"]', '2025-10-22 23:05:38', NULL, '2025-10-22 22:55:25', '2025-10-22 23:05:38'),
(10, 'App\\Models\\User', 1, 'auth_token', 'aa222c4e1602f85a2acb6acfb769b1838e0dd4eaf6fcc5868cbbbab55eabe1f8', '[\"*\"]', '2025-10-23 00:21:04', NULL, '2025-10-22 23:05:53', '2025-10-23 00:21:04'),
(11, 'App\\Models\\User', 2, 'auth_token', '8c5d2d4203893c0460fac763139a5cbf958d942c041172d23128c9ee9da4c43d', '[\"*\"]', '2025-10-23 00:25:30', NULL, '2025-10-23 00:21:28', '2025-10-23 00:25:30'),
(12, 'App\\Models\\User', 1, 'auth_token', '509270460e75759cb091b8bd3fd218ae8348800b9714b64f9126aa3c6a82831d', '[\"*\"]', '2025-10-23 00:57:33', NULL, '2025-10-23 00:26:00', '2025-10-23 00:57:33'),
(13, 'App\\Models\\User', 1, 'auth_token', '1379ce1294ac27202566c589a5bd411ebf17084fa4893f51db3299c91b891d2b', '[\"*\"]', NULL, NULL, '2025-10-23 01:22:45', '2025-10-23 01:22:45'),
(14, 'App\\Models\\User', 1, 'auth_token', 'db8a62e2ed1a3afd4efd4ccf413eb01e470ff377f9769214ffc7a7aa03990882', '[\"*\"]', NULL, NULL, '2025-10-23 01:22:58', '2025-10-23 01:22:58'),
(15, 'App\\Models\\User', 1, 'auth_token', '6f12595ead5322c99334c4b47561c426ee0f1637cb3932532817b75c9c30522e', '[\"*\"]', '2025-10-23 01:25:59', NULL, '2025-10-23 01:24:01', '2025-10-23 01:25:59'),
(16, 'App\\Models\\User', 1, 'auth_token', '51a326780be8e714f4bf172af32d239f473c96d86ebf6c712f9b721052152368', '[\"*\"]', NULL, NULL, '2025-10-23 01:30:51', '2025-10-23 01:30:51'),
(17, 'App\\Models\\User', 1, 'auth_token', 'e5792ac9de194c11fbef524058db9d79b8e158dd6b774e67ad581986daafa9b0', '[\"*\"]', NULL, NULL, '2025-10-23 01:31:02', '2025-10-23 01:31:02'),
(18, 'App\\Models\\User', 1, 'auth_token', 'b1b117b925b745ad0a44ad206c7f0c54aabd5961748cb50b9f623fb427dabddb', '[\"*\"]', '2025-10-23 01:31:47', NULL, '2025-10-23 01:31:30', '2025-10-23 01:31:47'),
(19, 'App\\Models\\User', 1, 'auth_token', '5fd9cc5b893404b45af00fd99fd358745ff60a3b48b51d09c243e95f543c4370', '[\"*\"]', '2025-10-23 01:34:24', NULL, '2025-10-23 01:31:52', '2025-10-23 01:34:24'),
(20, 'App\\Models\\User', 1, 'auth_token', '808c86525b6ee1fd1bd74cc8885ef9d24cc600626ae849a09a7fdcdc5ed3f359', '[\"*\"]', '2025-10-23 01:55:16', NULL, '2025-10-23 01:51:43', '2025-10-23 01:55:16'),
(21, 'App\\Models\\User', 2, 'auth_token', '9782ad50db92d454b946f251d007c6b43666a3b83e9b8c923ea95fd8859e3380', '[\"*\"]', '2025-10-23 01:56:31', NULL, '2025-10-23 01:55:59', '2025-10-23 01:56:31'),
(22, 'App\\Models\\User', 1, 'auth_token', 'b6d0d815eead653a7cf92c0c4209b5e63c50b9ab799f68e699b851499b0cc9fe', '[\"*\"]', NULL, NULL, '2025-10-25 08:43:22', '2025-10-25 08:43:22'),
(23, 'App\\Models\\User', 1, 'auth_token', '138396e1ce1edb50ff8b9b52a6c1e0c0a9e5b27f92e0db667ebdf541b2923e87', '[\"*\"]', NULL, NULL, '2025-10-25 08:44:41', '2025-10-25 08:44:41'),
(24, 'App\\Models\\User', 1, 'auth_token', 'a4925a6d718f13b80a1b3fc4835e071364ce38ed4c2850a340c4b7a63c33d600', '[\"*\"]', '2025-10-25 08:49:15', NULL, '2025-10-25 08:48:03', '2025-10-25 08:49:15'),
(25, 'App\\Models\\User', 1, 'auth_token', '24967c7664b16a24f93d2497b957851a4a247737bec15f60b29ac6f91cacd34b', '[\"*\"]', '2025-10-25 08:50:06', NULL, '2025-10-25 08:49:26', '2025-10-25 08:50:06'),
(26, 'App\\Models\\User', 1, 'auth_token', '9379e8fe3bdd66f0ce513563f8f8cb84d9411d4ec6532d7b2aff5cd6491ea553', '[\"*\"]', '2025-10-25 08:50:59', NULL, '2025-10-25 08:50:15', '2025-10-25 08:50:59'),
(27, 'App\\Models\\User', 1, 'auth_token', '7405dd1876938dba115c69f4f3ab2bc8fabb92706b4d509c28db46152d96a595', '[\"*\"]', '2025-10-25 08:55:42', NULL, '2025-10-25 08:51:08', '2025-10-25 08:55:42');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('0i7AJXo5DU65s7V6wCWJlc2lQKNGzKN0NNDUX63X', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiZjduaWlXcnhHcmtGODhJQjc0a0J5aE5aMm9JYUFkTngzSEhMeUlxYiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407507),
('0iTqacWfSkG57OKWCHj4v0G4RIJKe3cKPDIONI2L', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoicHgzY1JKNjdaNEQwQXBMQ1YyRmE4ZmxWTmZaM29oYmtDUHRlNzBWNiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407537),
('18o0k8OsNqmFvH4vpUJxV4kePo0vt4ghyh8KUj5s', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiMDFNTG4xMUxScjg0OUEzZWhicHAzbWViSW1leFhwQ2JXZEVVR3ZGaSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407531),
('1onUtLjAEKasV4aEEefL7UUJUkqFvSFYc8X6yBKS', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoieXdmcHBMVGExd1lEUTdUY2VlM3Z5OU5KSFJid1hWSWpaT3RtUThXbyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407713),
('1P0JrNtUfAgbzooGWMeRRngpn6rmFr1vqZ0twEZK', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiWVBXenRDc2lSZEZWUUQzZHJtbU94M0ZBMXIxOFdyN2pyZHdMYWFKYyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407608),
('20QcpXneUnfXnVBLZSEyb04wCtnIjYyHqXxdxJOu', NULL, '127.0.0.1', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiSzNVYU1acmNnRExVMzFaUWJBMlh4U2hTWXY2dXNXOFBBWHdieVk1QiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407273),
('261Hb5yrOqS5fNhT8ptFYV70J1TfH0Di8jSyvcG6', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiODFQalVkUWdDczFvZVoxN1lvYUlBMEFERk5KYmdwSlpIanBMVzRmSiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407539),
('2YHei2QLjYPyILDDlgB86WxCyrO5y37CPTJdTYus', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoidTZDbE8zZTA0MVZiWXFDS1EwTWFUZEhTVkQ1bVZtb0hZaXhzbTIyayI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407355),
('3wKBZ741JRE7EWcHCB01osQefF987y50PZnggMpE', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiYmZOWXpCWG91WWRuSUhXODRjZ0MxOWhTQjhqRGdTWk0xZm9DdFBRcCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407382),
('42c4s1IuKYZRSby9Dx0AhWjV5eqvz5PzwVUsUczD', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiU3ljekQ3dk1xN1hlcE5MdkdGZzl5YlVQRk4xZ1BFTjVKQWEyMjBpVyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407616),
('4QcgZp9nkHgyNYkODanEgM73cj2Qc4coyKNsndLr', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiRUdzWWJTcHBOWmd4WGpTRTlwTGt5blkybUpVRjVFTWxaa3I0WW9lYSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407425),
('6U7pHHfw55N9x2KqX8DZD7FfuPuNKemUKO3KyGSu', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiejNpVElqQ0VuZjhHbmh3eDF2OWpWR2ltbTNCTE55VnlCaWFycGcyciI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407535),
('6UKRWtYFh9uAYewEtx8VWaiDw2BUMDkIabsEoZx4', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoibVhxNklxS3Bua01Fc1RxeVJDRldHbjBMUjRnZUxqOTVjWGJmaFM1eCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407616),
('6XGKkt2sCLcvBdmAdh1qRTn9AgHt9l3uWlL7pGh5', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoibU9HUmtNdG15OGhlZGZHaTNkMmR3QjZXMEIxdXBVZHIyRG5RTjBxZSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407384),
('7AiANVKaRIh8cucZXvqsIeiyS4cn3dTcXr6t06Pw', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiNVZqZEFiU1Z6N1N1dzFIRWZibk5FWjBnNVBlQWdlS3RkZkcyMnRYViI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407654),
('7JPtao12gdj3Pi9S0kRvI2w28A2lPh85fCE1pG60', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiaVRjNklMeTVpcnBONzlqaEJDM2M3Q2tqdEt3Umo5bWJtNGI3NGN6ZyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407476),
('7Tj7x3XbesV1UFxH9jIhF0Z7XvktImkbMOlGsQyP', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiQm1yaVBXbEFCaGxtQ3ZBUXRtU3psSXBiMUpYWjdDdlBqalVIR29hdSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407535),
('88Vwb5rk1a0hTmqmkG4nMrgG39ZPUg5gyN8R4Bio', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiRnFsbVU0dFBwQnE3ZzVqczBWa2VYaWZrZk93MWVkWWtUenlQenhLayI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407655),
('93pl1M9ueKkk5oRDSc2dCKRmi052BBBiJgAVBrWI', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoib2FSdVFRNG5UejViRVgyQkQzY3gwUmZpVzhxT2RMYUZOelVZU3JYeiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407617),
('9c7Dh0G8QXPcU9fXKblqJNSzBikjtqGmKGY4jQu8', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiQ3B0cXFSWENUUTE2elNqaDdIQUVTMEVlaG45bUNPTEZwQVBSTzhjTiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407478),
('9EYulE2WbmR6KqQl6DoZKr8brYt2oNQkZeooCdyk', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiNlJTWjVaMmplVGxKN1c1QVJJcmhBRGxxNng1Vlo3dFE2aWNDYjRqdCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407454),
('A321jTveXbtt2FfAt1boPf92X2678sbWFkL7DsJp', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiRkI2WnJ3T0xRR0lBcGx6dXI1Vzh0SmRZYlhmS2YyTzlCZ0d3V3FacCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407385),
('acyvDilD7FlMul9GcFsJWDzwHqR1AVmXikzu9pKx', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiTnYxblJGaDNaSVVlaHEyOEMzVDNmT015aVJ3aG52SDRQMDQ5OWZ1YSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407700),
('AN8R2TWrPsWLex4dV0DfirNeb0hLdAW6vEjYDg6u', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiWTRMV2tPeVd3amVCOGhrZEZoRVZheDV6amJpbE5aUDNabENyTmFuQSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407562),
('aqsNEQWB1mjt9Xe9HTSMHAy5Knc75V6KRBHQonDm', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiSVg4MnpkQ2x3SFZEOXRqVVJveE1qQ3dudjB3NlRKQUFrajJvWEdVWCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407701),
('axNTP6Tr5ODhMJpJ0KabiAHvpt14yAA8Gs8Sjit4', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoicmdBM2lGNk9SZlBscWhqaW1QSXgzSTNoeHliZXNISnowcWpmV3o2MiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407615),
('AyFAYmVAs1euVOIruOrNnbnOsSLBDXJfZuXgp58m', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiREZaTkNkVEd5QkRKNjk3R2k5YW92Y1NjMm1tdTZKV1cxdUlkeExoaiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407429),
('AyjE8U5gQnQOFRcEC4pIP8LVtpzHPBQ8ROCKSote', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiRUE5UlkyVmVPdzd4ZWFaRXVLM2pNRUNYczVNQ0h5UzFXR2NjcUN1NSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407699),
('b7MC5cxuLGKjVYiG7BH3U6XiYu9nHgIEwD2eiBjS', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoibUxTR2MwcGpmSDQ3UWpVYXphNlhYRmVhcm93U1pYUWZVT2xiUEpYbSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407476),
('BBGZv73Cv81S5si94Vj0JBus6LYgZR2yTSzPOrxl', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiWHJSQzhWeFIxMEJFYlNqcmpMZVIwNmtoOWV5S3NYdUpDT1N3SElTNiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407430),
('BCbMBWOzwDbRlI54PIsi8fbmjXGZIgU4yGLFvVXA', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiNGI0T3prc3FudzJYR3ZQZ29IRFB5Qm0xTnV4amc3M1VZb3pGRldzdiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407611),
('BE0kKbNWSkOkqbhAI6nCIETezCb1VpgnRSec7dX1', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiZkZhYzdwbVpROXduVkVubUIxZUJ1d2RPTHh1ckR6cGszcnBBYzFkYSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407688),
('BemAoWeIUUjr3oGbIU3sk9qp5sCGphJMMG6fjd61', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiNEdnb3VQMzc2TjNGR1R2T01YSEZ0MElYOUxrNlp5UVo3cTMxNW4wTyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407459),
('bFpcRRXH8xhOoeKROKQ0ueyUvj9LQvY82o2tmVQu', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiZ05iS3JBbkFDNmk5SjlNelV6enFjblFjaThNenJPbDVZVWptYjFWMCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407477),
('Bk56fWg0n80etPIUceBOvUWuQXn9dJjCQXSsTiZt', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiT1lzcHhUVENnSENISW9IdW5uSGJnR0U3R3lQQTFLWGRGN3ZXdkRXMCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407622),
('bULl4FIrugKqkIO9j6Khnbe4EPBxyEhOnf3e8wYX', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiSHdsWjBiWkp4cGFxMnlGWEs5VGpJcVNqa2oyYUxtVEx1RWJ1OVZ1UCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407594),
('BuMJNyPrNHTDKfvCUcxMsG3SmdNogy1ioOC0qZND', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiQVpGOTh6SDZ1MVFJdmZGTVhVZkFPTnRHT2s3YUZjRU0wUXVNbjVNeSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407536),
('c0uEfdn33URGj1iKzlO9f1RfeOxruQsn3E4tRqlk', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiTDhwcEVycmhXRktwbUNSZGNseVdOYU9KRHprMjhMeEhzd0FOcGRoZCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407462),
('cBxd75yoBEXNemJIBZbEjcEm6daXo0m8dlU7kcIl', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoic08yTWR2QnRJRnNqQjJPcFhZMldoaEhiMDZLb2EwaGY1UUx5eEZENCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407736),
('cM6ekHArhUkgKaULNcPfrSpzGEASSXmEds7GH8Zh', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoieVNzbnJKbWMwYzBTalRrSlZjSU5qckVIZkZYU3ZBSGlRenpVWXNFQiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407475),
('cMy6AOt5Rv60DYyFaELg5f3FFIQ3wHRhoQSjYuNd', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiVnlZRDN5S1VZRXYzN2pNanhIZERLM3FLdk9ub2NmdWhrekk5eFp3NSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407613),
('cxtkFqusLVL1qC6UOMYSsTkfw8ksQSMsisynQtBb', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoieHR0MlRqdzlwS3doa0dPVHlVOExVaE40VHR5U0tGWFRueGYxWkR5eSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407597),
('d00ouZb33c7ObYBT6tL3q9TZngQcOaulbDScjWsq', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiejlnN3czc3dXa3hwRDU1OWtZTktVenFVM0FVVmZTS2Z3azZKajdDZyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407616),
('d4QKARbjKXqo8E081mpvKVDBUgq9uu3SipBql7cv', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiUzhvSlAwYnFidnRIWnpoV3FHUXk4WTR1RTRRamZqZGlDY0NZNmRLUiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407538),
('D9nGkxkfrNfXk0usganJ99bGQ89YHI9q6z85vWPG', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiTVRGc1V1dGtNbktNREF4ZmttNlFvYkhQQ0ZubFlNaFVpMWJOUERoTCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407463),
('dEbVnjhqee9YaVrz4d3YTpRxzfb4YYPKLekG2INg', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiNHBJRFBqM0JiVk80bzhraWU4elk2bFBXTnRnVUk3eXVkdzVTMGp2MSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407430),
('DIz9gyfQzUSC4T5O3e7MljcRKYvAqBtuuUTlMH6Q', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiNElLS1F6RENyUEpmNXN2Yko3MlJaU2d6ekVXVHNxWVlvdldzR0xmOSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407382),
('DNTMtlsZTf0cswwjrLUYB8M5b4Q8C1rPjTDcMvrm', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiUlJ0M01zUEtTZmFhQzhsaUJZQ1VnMDdKZVBzQ1BId0xEU1A4OHBsSSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407474),
('dNUVeHQ8PT3o5UQFxgUoSuDYMoiuCiOd5wysbcJD', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoib0l3NXBoOHlsREZiOWNWdk9BcktUa1pzT3dET2lQTlZsTmVybmRLMiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407614),
('dONIGkXNjzOQWX9aUXbErpwJp9DPNTLrGvW0e6Zl', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiT0J1MjR1YXlSd1hoa1ZGNGIxWlgwS0s0NFI2clRsVFY2bDgzVzR4byI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407530),
('E1C8LFoNgVXAbLFwZZ9tUL9hoMtFWQ1EiyuCctQq', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiMkhyQ0JMZDdhME1CZXFVTXJOdWt0bGVwVndXVndVa3N6TFZ0ejdEZiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407423),
('ebfm0DamUM9UXcIKlGTgtR1YFJQ0zOWnFuclNcZU', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36 Edg/141.0.0.0', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiVk1laDJRTTE5V1Q4eEZkRmhyb285VVlTd2Y2TWdkOVhISWNLSlczTSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761406983),
('ehbjwKoxa6yfqGoIsWJtwWp1fPBk5htAvWonowdL', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiaXFFamdQeWh5eDVLaG9ETlU3c3c1MUY3TEdGZUlIcEY5TnBHclBYSSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407603),
('eN9Tu5ujBQ6EFfKMexDgCzVcb1Kg6ci5Jwl0fc9f', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiamx3d0l2c3JkTEZVbFlmSHF4V2xBbGJlVVRJbzhtNTZ0U3oxQ1JHQyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407630),
('eriP9Vhkx6d7VNyMeXm2WOEgYxCafTXwBu08uwNO', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiTHdsNXdob3RrWVBLdmJwTGFWRFY5Tk1aQjQ4RWYyTHRjVG9rWW1KeSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407429),
('eS7OLugeIEHaqba1wgh3ePSL8meSISNsqsqslRgB', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiVXY0bjhEUWdaRzlUOXMyY0ZNQW9YbDlRZ0UyaFZ3RmN4QUlFVFQxeCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407618),
('EsBjCjShdHJEFObAhSNvUFprHwT15h5nWOJiTZjs', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiMDVKUmJEUms5cHRkODNhSXNGUmxJZTVKcGVrT0c1OHZXTkVpVTlRdSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407456),
('eTbTkyGrKKLpoAC16ZsbvrkQgaXruxUiLdWHI1sL', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoicERrMHZEWWo1TEFxdnhGcWRrQldadjJJZE9nMDh2NFJOVHRueXU1YSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407384),
('EWUg9S2Aob0My5HbJWBWStdeKBw1i2KZPnLoAZ8Z', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiTXV6aDQxek1ad1pscnQ3ekZ6VGhhUHI1bGN2UGdGOEtQV09LV3F4UiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407382),
('f72Q1Zm3W6QFUPjprXtiMZoA2UkOm7pgjqPT1PiL', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiUEptVGgwaWEzQ25CZFBTbktGN0t2TG9wQzE0bEVyMWRqUmJnelJPNCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407462),
('fDO45NIUu5imTGY6I9G4QfmxidaLtatXuVj63ycu', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiVll2T20wejYzTnJjTkJvSGRWMDhURGxabHlWQUhCUVZ2VXhSbWFVYSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407582),
('fHiaSEWlto7aj4Y5vYwomuEDCI2O8ei9QYOPOZSg', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiaG1TUTI4b0M2dTNBYkVCQjBiYjhOTms2QldHV3VoVXBham44eER5NSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407531),
('fJm8qhQ1nJye5RNouPC0eosAUQSX3ejCEVDooHoq', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiZDJQWVN2b09EdklRZ04wSnl2enZCb0t3OGYyVTF2ZkVvOXZKeVUzQiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407550),
('fl8vPmfHByNrm5eCEcW6HVRqEdu2AAnhr3cH35ah', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoidnNSUmJYQWJpVTNqNXJlRzFmYlFhalg2b3JyNEJJOTc4aHRnZHkzTSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407476),
('FnWFdXV2ZdKO5IxNMkG1M7uSj0QSI2XlCF5ZtfBC', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoibTIwZGRXTXBlNjFPSWtPaVNIWVZNbE95TmlQNjcycGgwSURNWDBGbSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407594),
('FpmI8RIHm9ZXevIZTjZlUG6zPbNT3tDpRlHrtUEE', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiaFhaUzc0Z21xU3pyb0pwc2RzcHNoQm00QThSeEZ3alBWbkVLMHJHWCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407611),
('FsZOMB5Jd8fZSzBQjIsFhKWmX7idaJp9mHVMCxBW', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiSTBGOVA4RDBQR095OHhpd3JmY0NIQ05zWk8yblA1N092cUtGaTVuMiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407583),
('fWS2U0zgmZ3GYTiBIOTu4S1wwTPoSYxGFDz9UH6Z', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiMWVLN09yTTNsemRuclcyeE9ObnhQQ0N1eWlaTXMwYkV0Wmo4S0J4byI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407611),
('FxEgnIYUUHJhqtghqnBr4DkMcL6L1OQfbqi0HAL4', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiWU9JUUlVNUNZY0RpSlpIZThqdmVJQ3VkMkJhSzNJaUV6WUFQNmtwZSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407427),
('Fxoe82kpRdPA8vpdVTqoEUxKTCZcFNWczRTxFNgo', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiV1FEQ010ZFFyVzBtS3NBZHpLMk9vOWcyeFBmMUo4MGhhSWRYUjd1VyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407603),
('g4LJjzfWtIYPhhXxdryxIV2PadXbDQAQriO1PqSx', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiTXZwemRWRjBtc2lNYkhlQ2ozMkpkVmFCVGxDZ1k4UjduUnk0M3FFbSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407615),
('gmH2nKQ77zTuTHKyYYegQ77Nz8BkNk462BmiI8TM', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiQnJHRmcyT3VGdGNmOFFuRDlaSXZpN2RXbk1HdmRnUGlqSXVVeHlZaCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407454),
('GuvDbMeCtWVUaHqnqHBqSt5mpGDFL81FHkMJNbsI', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoibUJEZE84anJaZlI4R2k3aHVoTXNiTEZmMEdveUxUTmJvWEdRMWVaUCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407478),
('H9yGrNUQbqtON7mzGNpHvnIhOFmuoatykWE0Xegf', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiMkJscFFKVEF2b05sTXlWeVdwTEpPeERtV2IzRXpnTkxESVoyRDZPdiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407386),
('hhY4ie0pUrML7JoTZAsyxfPA004syuv2pXOq4FBT', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiNG9jNVlLVWowTWtWQWVOWDZrZUVJbVZvRjZxdnRZbFBaQmVKblpUZSI7czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MTtzOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1761407468),
('HiXE2M6YeScHst80TadtZVM0DgJ96wOalciwDAxp', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoibnRFc2xCalZWZmJmSXlRMVZjbDJ6RlZOSUtZeEJhNWh3NTBNYjRKciI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407451),
('hKKhcp6mRVsfpRCiS3DhvToZ4YftRnhc0XX8jyp0', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiYVRKMVJab0F0SlBOUk5PTFdjdWk2V2xKMTdKdXgyR0MxWWJZUzNuNiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407428),
('IHbRiv9wTO9kjuqeOy6O513dntxxuwTTqiusIdzf', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiSERNamVnb3JPcUpIUk9CNHpxQzdJV3ZobXZVS3l6SWQ4Q0dnekV2MyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407558),
('IjddPAIl8L0KOraYVHrg4VRFjNnkelF2oJMIEysp', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiekNFeXF4c3FxUnl5TUVsRXkxc25CZjVaS2pKYWtUNFV2MnhYenBkaSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407686),
('iNbYRtI8xFs7Hw4hIbDvxWkusgnqREL9DuSBGQiV', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiSGRKdkt5Q1pqa2lRWTJWS1RSUGhVV3VWankxdXpvTUc1Q1VXMENRbSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407475),
('INwL0rkorXDfiaRWPUODOTOSsMjNjAZ0XBsWchku', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoicFQ2YnpxTG1UUmtwNlhEZGFaZWo3RkVOdzQ2Qm1wRFZNcDB3NERLYyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407682),
('iOcslftcXHlYEifkp4OLvGIuhtw4RxFpp2youOsH', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiQnE0cFJNWk1ZeTE5VDB6MG9POHFqZW1BVDNqRXkxMnRwb2d2M2VlbSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407538),
('iUTwfhCtt7iEUe48AcXy38WpXOBVOS8NL21BAng8', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoia2lLQkVvZ2ZkRzdNZFlQUXd3cWNzS1hDaDJKWUpTdVRPcTkzRjlBRCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407528),
('J27NaM3wAZNnzxtEu1DzfRM5kOqf4OvyyFEpGkm5', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiaFRtbjl5VEkwM09NRmFuYXRpRzV4eVBaRWJ0b0RpZENRVk1MM3pHMCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407629),
('J6nWTmnElpWtWSnU3R6lpH1mEbRbAbo8nXTBzCtW', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiR2I4TFU5dENCcXl1dzZpdk9pVGdHek5DU0JZVTNkdFdCWjJQUEV3TCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407387),
('jdcM5KQoOhwWypHBCpmEryDAaysq9q6f7VVMLt2W', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiamtRSExxVEk0Nm5Uc1Q1WXVGb3ZXU2NVRzhCcDVzbkNTVVFiYnBkdiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407383),
('jg3WroBIaU7y1ZNftZ8UdIU3GCYKL8IKbQZaC1PS', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoicXdqN3pGcExrN2Jmdms3RzFzMXMzcGNUNUtNalIzS0V0Z1dic09OZyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407527),
('jQIXtqyq7C5Vd8TfSV4jEDQh1WOMbnpcZdw2g5Pc', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiNlBuMUFPNFZRRm9OOTNaaU1wUGFkOFZLM21ZSHM0VGZXODZGdm92RCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407700),
('ka5nnxS91FArQENywdpvSpkgbmKPEyNy8orldeeH', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiSmJEdjUwa2RldldWaDZDbFcyMmcxSTJ3NWg0cmFKMW1kQVBqRnBWbyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407612),
('KefzHZBpoBhRs1Am0EHBStygbVuzssw7vpyOSSgs', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiY3hlSDY3czhsakxaQWE5bHU5T29WMzczS3ZjYUp1cDJ5ODg5OU03WCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407699),
('KGKUlUOXTGvYIwhXYjSBy0aXnOvGR0z6HCTKtS5v', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiZnM0TlRPNFlmcGJxS0pBbnRUcVRWdGlWVUtGaFpuMDc4WTFjbzJiZiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407457),
('Klf9FHrfXytOasYBJaK46EkgP1tH3oynYIti1OiP', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoibW1QYmRnY0FjWXZzMGJVanlXYjh0dmo3ckg2Z3dYSEhGV0JKaVVxWCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407459),
('KlMf9sd4Bu7ES0s68TBihEXSlgdqWFkhUkMIZXKM', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiU1BBbDFXb0R3ZUtNM0RES25BWnZFRzA5T1UzdDRvWUpJM250TXNLUCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407425),
('KmVN6xSXrJvmYrRRovuFFXXDpM4cOJEFmrips4j6', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoib205b3dZRWpzdE4xVTZ4NXFSQXNOa3JSZnRsaHVjdWlpZGoyR2VtTCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407742),
('kuzSLe2462tAYdlob4Z6SEfPHFasfI0TzdueBazx', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoia0dvZGVsZ1BsT1dJN0N2UndmcnhFbjJnRnRLRjRUa2NBTTFNYmdaZCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407629),
('L7GnAFdq9ypul2TQIyQEfuOGw78h9GpWJuM8Trln', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiQ0Uya3p3dEtFOFJ0MXFsOWk3MHNBYjliZU5XUXRkWnhJMmNEZHRpeSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407426),
('L7QejJuL396MkzQrviupkWZeu3Lf6QEkbhY4QNwX', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiNVQ4ZndhUUdjZWlIaFNDT09CdTJNWm9TYXNDTGdTUTU0OWZpc1BreiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407535),
('L9G9cqlpdHryxRhyn3au5fbFRiKA7SRWXTGdZWSc', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36 Edg/141.0.0.0', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiODNkWTRkSExYNHlQZUxveFhPM2pBR0Q4T0s3QTZubHU3UFlqNGdNSCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761406977),
('laGxxiwrWcnkaUEuSX4LRnKPM1r0we1lYk8r2aSI', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiSTFXNlJPcVVUb3VNY1Y1ampSckhDY2s0RmpHSk16NWVmY1FNbm55YyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407477),
('LBZtPa1wH24BXTVbIA626SG0gjgbxzbH4dKBuus8', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiWGo4bXpmMXZ4OXF2N3lsdzFHVDBETEZlY0pKWTdEbkdLQkp2ZjFEdSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407461),
('lCmFKbCLGzmw64pzkwsjlcPQYUnqhT1cuIpmTPEy', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoicDJ0aU1sMjRWVWdsdkFGNzYwY3hqcnNBaFIzT215d0c5c3cwbTlPMiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407475),
('lH6V7JyjDRcB25Op3wOOXog2nN6bh4fYiosjTKFN', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiQlBXV1F2WlVqUno1S2hmY2dwSEZLOXRWWTRyMWVMNHEzcU1GTlB5OSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407427),
('lrpIOcXTdgNcSJ9tygsPsm17P6CI2qw8Jd9Rx2Va', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiYU9SUHJQbllLdU00NzMyVDBHeHlsRGlLeFBaeVNoZm5nTGlGZzhzNCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407443),
('lsORuKUx5XbMVbQ1vQSjuDpuboQMcvWWrwKRHfT3', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoidGp1aU82aGFKY1lYbFpIU1RlbWRoQmFETDBSQzAwdjFYWk8yRHJVdiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407580),
('ltVNWMhJVr0LnenZDZhSoghKeHJbs18gqWptpzKd', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiY3Q1NGk2ZnYzdlY1OUxNUnBZQkJ0aHdJQVN1dUJpRzVGNHVuclh0SCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407628),
('lurTcaKmeyTtvv7hysl0AHxiko3E5qP9v4XalE0h', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiNFR3Q1F4NHJwN1h5Zm5uQzF2N2RobzR0WU5kcTVmVkZXVTBhbUhhNyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407479),
('lyjkNUZT1AWH5EIytwzi6hMlxqo5PzeLoNpk5AFd', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoibUV2Z2pHSDJWdlZselVoY0VrZHMyYkV5dG4wYUowdkxsc1V6d3NMcSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407609),
('MlWPXrtXsMPz2fr3v2fzuMIJpUGClMVI2YqQzyhB', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiWkVOSUlHUVJqaE1abU5DMVV3dlRzUE1tN3JybWRZSzlGTG5UOFNhbiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407381),
('mMWSADVv8ceeu0MjMVtC0zGL1xZmYA2GOx7jtuHs', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiUDU1NDFQVGwwQnI4UU9CaGRmallaRldWckpDSUdhRDl3UU9saHFUWiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407426),
('Mq04BIUl0MRHnRIEHYqs9A6FhUz674nUl69sKswJ', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiS2cwM1RWQmg5MFN4ZDhGRmpNc2htZEdYc0hhVGpBWlVaQWRaRG5DVyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407607),
('n5iLQCNbli91mxDmj5xpVqae8oZmGTxkwCHowXx5', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoib1h6UmR1dDNpcFdRVTZ4SHQ5SXdveVZTbUJ1VHpFRFpGVlVkYkVORSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407381),
('N63i1CUZg1Enf6kJS1pzOKTHe7t1JMupI9DAlnb5', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoia3lHb2hkNmoxWkpDSlA5S2J0RnVTYm4wWHRSQmViaWo5SmJNaDhZUCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407592),
('n6fzMEFa988a8qqkYCGYjUKho1gyTnz6M5JFtd5W', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiTER6TlNoOHcwQzJCbWlpOUplazU4Q0NleURYREN2V1k4RlltMG9XbSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407506),
('Natq4seZ3XtGKOfLL4cGw4PKC7YsILpxvPjIgLJR', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoialVWa1RpdHE2RWF3ZHFJUUZjbllHb2MwZkxSWjJIeGltZEpmbUp1cyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407386),
('NjRNxebaN2YdqukphzD9jpEpOaWnDCSgwvGv6OKu', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiVndITnFuMVowdkhVck9WaktUZkR3dGFoZGVpbGI1WTNZcmE0WG1ZUyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407618),
('NKVvQ5M6eIFJSON6p7OKI05p7Kslouk6pYf2hEQR', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiSTB3WDJyWFptUXYxTUlsMEc0Z0V4NTl6V2JuMHNZb3BBSFc4SE1lNSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407424),
('NniySIIxpqL2cmGanhb015XLoGihRUCIYZtsTS8w', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiVWtHWmRYNVZqeDFVR3ZpTlNaNGxvRzlUMU01UVYxeUdmdVZRcFpYMiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407501),
('nTF6X6nqICOXc4hHLhNalEKnz3v5WoOdnWkkInaC', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoialBIb0hvdElYTFUzTFI3OFlFcmhiRUNaeHQ3ZjdPYXd0MFFrVnBZRyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407460),
('O6zUnrsXSWEbM7UObsEPxSa4g6W1Sdm1Ow7RCtl5', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiOXduNW5Ccm5HZkFBeWhXeVhBVUU2dDJQSjI1amRqenBQemxLNlhQcSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407702),
('OnG2awf8QpEj26BnOcQzh7BCvsYab8geSLhllZYC', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiVnpZdWVhT05IRVh3aFU3bVB3S3B5ZEE5UEp3OXM3aTQ0SzZTQ1JMWCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407386),
('oskygXHfskXuq2YmNRYbERbld4hQjrLYhq69Jbn5', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiVDU1N004YXM5RHcwV1NVYmZGdURZc2RmOFVKRE1NcmdtSVhYWWdKMyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407613),
('Pjb3GnkegbZa94O1svyrNByhD163MgE8ZKfo7HPb', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiVWtoRVNHcWxUek5nWjNxdHhrMzBkOTdIY3p4N3FjamZZSFJOY2lTOSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407618),
('PoYTSY6m8CQIWPWdfMbYePSZEz1BlRjDQ7ScAnaU', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiUHU4V1dSWU1rOXE5a2VIdU5jd3NKNDZ2cUhOSmkyTU8yMmJ4RHdqNSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407539),
('QGBvNiNHayyViKr0NNUsi7ac5bDgGNeEka1WCrBo', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiVFFudkJFYWQwb3I3UjZTOTJjakxyZ1lkS1ZuTVVubXRjdTlORnVSRCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407608),
('qx288r8SBzus9dVsRjGn3gIlMbL7knqGZCTtVA31', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiTU10ZHE0MThHeFMxZ0lRT0NNQnV5cFNVOEZCOGNhNzIzcHpoVWFBZyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407580),
('qZabXSPr4syJ5ZjFx6IPxyLt2VIJBWNOBHPeOUP6', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiWHJtS3d6VERxa2JPR1BSTW0zS0tQNzh3ZkV0czc2VXdweWphdTdlViI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407424),
('R1Lf6W1rbkWEuzDh621RMkBJonJJhXuwuHJyLePL', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36 Edg/141.0.0.0', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiYzZrQzU4SllEcW5PU0JwdkZLbTJlYUJ0WDNnVUY2OVAzOEFVVU1ZWiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761406977),
('rJz7wm6tynNGyJSl3nguGZKRLAzogVldC6XBQTz1', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiNnhld1hBTUtFbW96ZnZPN2tOMHlPbTdlMWJBTHA2TnZHdHRBUUU5ZSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407713),
('RoU70freTu8KSTQyvquRTfCVIos5FoXOlgchT8cd', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiQW5pNG5vcXFIRVoxNzdtQVVtMk1wU3AxMExuR0JpTU1zQWNuMldqVSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407539),
('rPBKFNBBkZF0OXmQtlTRR8aDNBgDrSYHFndfcn2N', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiY2tNWkVnTE1QYmU2bmg3OTM5MlpRNWRrTW15elB4WVFGUkhicjE5dSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407460),
('ryOcrpoA02QoAIcZt00M7rgemtl7pT0nQCYinRAP', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiUk5KZE1GeVgyTTF5eVIwM0JRQnl0VTR1d0lPVWJZMnl2YjViRkhKdiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407463),
('SAWYhb7JgPb8FGnzq0xyOtxZlNetiTgbNkfRHGoO', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiVlZRckNEdlVjZ2lVQnNLemJZWGliMks3a3FYTFVrQWM2a2psM3N0ZiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407537),
('ShNMcl6BARzmJPJWQMvkjA3HTsze2a9bYPvx6Lnp', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiTFFkclhWMUxTc1ZoSndpajlieXN1S2R2TGJybW1pejhvNE5mR254diI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407493),
('SMhaEzHyXFtmD3AxbDl4LVEjQxDfzlLQ1sMH5QSE', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoicXdZMkhwRlZ0ZHlwcmF1Slk3bFRJYkVlS3Z6ZklGQzRZUk1BV0RpbCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407387),
('sTXTiLGYWpweTbn8NAlanIvbF0RSJ8Jkir0TcloU', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiQndkNUh2TlpHc3NqUnMyTnBlWFJvUGYwQWxKSGpJNU41ZEZ3dGRtbCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407428),
('sUmUSpXRw7SqE8EefXQE7ksg7mVA7Ob1gWY4Tx3f', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36 Edg/141.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiazZpdUltcmduOGVZc3RTS0RFd044ajNzQ2VZcW9mc2dpMXFoSXFrVyI7czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MTtzOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1761407002),
('Sxq8sbbjnanfgzkaPhMjhEvkMcuppU744GsNubBP', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiR09nMjJ5TFFIaXlhblhYcEhGdkhJMEFKdUxIcjNIdWxaaW1yZGNUaCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407478),
('tgXWNlUOvpnv5fxw966wJTLOfCKHVvhuvw0z1BF6', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoicEc4MzJXaTBQSjNmTVJlWnIyUkVxakFWR013b1p3YVQ1OVRjRDVLciI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407536),
('tiCd3nN3rpbU0NVgNwRC7knJ6nbnDkQn3yFynbsp', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoic0NzS1BNZVFFZXpqYVZGVVhCTTRIcUR0cTR6YnY4Znhqc05jM3BkQSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407405),
('Tij5Zbx4NmsjKoseqWT6Qd7f2vpD9cBFtYnbHwHF', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiaFdkSkc2TWNFZXZ5azI5bWJFdFh4WXczMkRoeE5NemRZYjFyamI3RiI7czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MTtzOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1761407415);
INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('TmuxQXmX33ij11VOPjnNx33CfK8yDgAJkDbRO1c4', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiVkpselQ5NEdBTGJpWUpwUDZrWFJ2S05BQ2djbE1xamRsQ1R2RnhZQyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407550),
('TWjyb11Jv2u4Kagxt1rqig9TomGZsvEL7nYnXtlX', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiSTFJRnV1RFNzUHhtRHRLaERMa0ZLbkVHN0w4Rld6Y1VYUTN0dW11SyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407538),
('TZjvOGgIk8YteZoVMskMtUOgKzlW8m7WaVbA0Aac', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiMHBDbWRMbXBkTzhROFJMNkJCWWlEQVNCUzk2c01CVGliMkFrSG9LWSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407629),
('u1eSVq3gLf22gXbWX7wQrGljarZ6eyBbFnC9NCw9', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiMHFmcXg2RVVNQjlPc0M3MDRqUDlzc0Z2UkxiYkhIUFl5aHY3TUhSWCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407477),
('U7m4r9rUJxmws8ro30s9zLBufLv9Rsu6eJKX34is', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoibmxNZlNIMXh4V1BhUjFaRVk3MlM2VmtHRlhKNlNvb2V6WFhMTFNSdSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407474),
('UAtyNxcPh7KibvhfCi7S4O7QgjvErrzaQnpcG4Rb', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiOTJmUFFTTHhuTEJ4R25MbW1uNldDMFJJb0x4YlprZFB6TUdkcFR0QyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407455),
('uBIvKmgrDdK0MyHcaBZEzzFLKZ1NrK1F0do2FlUe', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiYzMySHM4OHQwOEVnVGZsVVNXZFpISFlOS3BwVm5vRWdJaG5kVnlHaCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407612),
('UE5Jwn26z1ZnWHyxyKy2Zc4RMWEnFlCno0PXP7Tb', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiSmlLRjdJZ0NIU0VzVnpscE1VeGVocWlOZDJKbmY4bGozdkJsUXRTbiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407613),
('uEaqPQ9RgsBEho2LgV71oCREKsU1jE7Pw4ECGU3F', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoidzhKUFZIQ2VDRkhJZUsxMHJnVW9oejRldjJ4QTVPRnJxS3RvR1pyTyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407699),
('UinJKKTHU9mZ03oBO6CSKshPjLbLzIfIo0c8Iq9g', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiNFJIRk82MHd5ZGhEc2dkaUVibW5yRWx4N3plbHQwMXlyNUg5QVpWNCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407654),
('uyCsFUrLBBcSXBKn1FiukPGZWDLWxUkqgZ6gsuif', 1, '127.0.0.1', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiOFhNUWVvcjNKZlB5OVRTUW5IamNuc1lxOTJkcVlwZ3NLTzd1NEdidiI7czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MTtzOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1761407283),
('V4Suos2MqllH5xLqZyBmZtGIgRDf1oCPjBWE740O', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36 Edg/141.0.0.0', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiVTU2WWNKb05ibnN4NWxXRnlUcFZkT2p2QmlqbTdCMmpyVkpEdVhFOCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761406982),
('v8HpbPjTl9r5WjUqDnB25kYZYmVAJ5lNCx7xbU25', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoianZFcFdqVTZ5SHB1MHY2Qk9TcEVEakFzTEJqa09lTDNJQXRBd2IyZyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407698),
('V9PvJt2xozyg5BYrwDaJENtMJe6gB87ZpPpAwRjy', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoidk84VHJzZWtQWUZFSkJUTElqdGVCSUMxcmh2VVhWRnlzV2gyOVYwYSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407609),
('vCeQ7uN293A0irHQ32pwN7LP11QNs8o0DPwYmfia', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiZWk0YnVnQnA4S3NwaFMyU05GSVJSUzVMMHBBaGZablVvRkpHTW5DSiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407538),
('VcJiMEOhyGIz5wEfhhVYKNtUfgMxELJpm0kvdMUT', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiM2YwRG9WVjRJcVJFZFh3RkpDMllOUU9NREJaaVVLejFNNzczWVRMZCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407557),
('vCtAFQ20KMoWygylNd3QMpjHurrJ8zoz9c1M8rzb', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiaFNiS2NjU083YTVJUGw3ZEhUMWtPT3RhQ050MnJyV1NyWXU1eHB0YSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407593),
('VDMC2qrQ0PJqnh5aS0XXaixHSiY9tSpMPH1cdASL', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiWUJTUzZ0RzJoVVphR3JKSGozSXlrRzVZZ1FuSFB0cWpMaVRJZGw4aiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407614),
('VJZms8vJkIWdb9Sts8rG7UmrIgFnkMIH4FhLQZt6', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiM2x2N2kxaHliS09ONnhjekFtNnk2YUNjY29tR3g5RzF1VExFMXlnaCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407591),
('vRfpxg9NH5BntjKWNDXBDLoBQIlsE6PthKQrwV5u', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiZGdIZFZ2czRmdGtoRkJjVkx3MVFqekNVU2FIOTdjSlZnUW1haWxCNSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407383),
('vzcpGlxPg01PzPs35eYJewZ39ScUhWUnB9F7esbR', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiNEFQYzFEUVpqNFp4ZEpVV1YxSzFSUEJOeVc2YThLdnZESU40OHNXYSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407463),
('VzwFWENJHxMDQuM5NxCIV7TpDL8oMOBwMmIcGdq0', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiMUVWbWRNNUJId2dLZHZ5YXpGdUZJSUFtQTdqTDRZS1lpYmIweUNkYiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407536),
('W3L5qmxvgDdXjY2G8bzth7MJapgAFVv5LAhnvtCC', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiamhVbzZYUUt5eU4zUHpvOW1ZaWpxSFpCMDBJcXJBTUxqOE5tRVFrSCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407582),
('W9UUFf0Ll5l4J3wW8ptkobJenvn8W0P8rdZxnxPn', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36 Edg/141.0.0.0', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiQ1E1ajNUYUM3OFZFbVI5Y3hNWDRiZ2Y2eUFmQ3ZxQk9YSkw2WnBEdCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761406981),
('wG0BQutTWBTdX7DXoAYH22KwlF01PDvi1CoxBOzS', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiVlVHN1lkYjNsSDJOMkVSanhhOVpMWHNoTmZkd0FBWE5lYXFuaFZrYyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407610),
('Wtg227hsr1q9FL45jEPc9AcyGyF3dFTsfoLfbIvD', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiMFN3Rjc5UGhGSm4yV3ZQSjNrT1psZmJtV0lETkdyaktLVE9HY2lFRyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407441),
('X4a0y4rpEfzn3VLkDnKATU6WFMH8m7RT5MP1BRvz', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoib3JQUHludWVHY0pjMkh0YXJBb0JJelQ1NmZGWExSZjdFVnc2ZnJhNyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407407),
('Xb68HNkmWTFvUxQfSICOK7TbY1AZaEpLvvD3WD0G', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoibDExVzdDYWNKQnVKR0J5U21jd3RBRGs5NlFlMUNkTTNqNmM0aXJzYyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407423),
('XeVBsq9i3lhliPFxBhuy3N0Gm24D4QeP5UiTsHAB', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiTVVKNUI2OWJsYkJtWGtraERqbVNkck1vdGhFUzNva3psa1hZSWZoUCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407463),
('xFg952sBqIc1XrrwPC4zfMQRGruMrKi8gysWXTb0', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiMkZmVHNqbGlTaXJ2NXdEbXpnakR1WXRTR2p1Z3RNaE93S1VBNWxrUCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407539),
('Xfue3CDWGGcnQtuyjE9e7q7TCRiA12W7obVdj6DS', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiampNZzBDazZEQThrZkR5WjFUdDVCUVl3M1llTTF6Z1RmM3dhanNXWCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407701),
('xlGeqv0vSvCxZCLb8f13Vkd71YZZQjIRhHvdTXbV', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiS0tGeVM0ZU9la3lLVWJ4WEM0QVYydkJmMGlPZThRd3VxS2RMVHByUCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407689),
('XPNKVwECbk3mkbBH5w0PNcihQp90hgNZLwrcAp8b', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiRWFETWVhd2lyV0FyMGgwaUpNdmRpYkRwdENWNVNPdTJMbTNwbmlWdyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407493),
('yaPmC5iTWqiJZoXaRfnlEigwVgs4JCWq7GxawP60', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiVDQ0V2VHbDRtVzV4UE43emg0Uk1OMndQa28zVlphUlF6akJmM01wRiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407388),
('yEK8XFZ9IVAXlbm9QOZrFB2GGqmysK0e0slNsWTM', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiczk2cHNKdDVqVU9QWGhNZVJvQlEybFliODNWR0w4VnpkeDhCRTBBbCI7czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MTtzOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1761407081),
('yfG6sok0UfL1l4YD3cu66MSoYmDH8qST6OvsPzNr', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiN2RESVdBNWxVRlpoMVY3TmVrcGIyWWczZ3I5Nzg2MzV6T1p1WHNuUyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407455),
('YHWK81UhOCdlmV2mu7J2tb4B9Xf2oJfaZuRwU8DE', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiVndKVjdYZWNUalZsbUl5Q2xibTc5dXNKbTVkcjFwR1ZjRjdjanpiOSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407581),
('YPag6Ubkg798FS5cDt3XQQlql1fYNZKOpJA8GOFi', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiYjE0MlNITGt0SDlGd1BzdnFSYkcyYXl1YWpLWVc1NlVnVGl1a2J5ZiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407714),
('z9BLS3p2PRHftNq1ytc2kCDxpTpU1cOU4e83x3JK', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36 Edg/141.0.0.0', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiRHBaaVhzcjRyRXV2VXU1aGM0TDF5RjBrdmNFSWl4VXVEbjFrZW5xMCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761406976),
('Zcj6adjhY7BiRWWrCcdyMA5n1edmqXLW4zxCHhiw', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiYUl3QTZERWpRMGxzdEF0UWdZNWhjVjdHRWp1VThCUUhBeWZZc25FYiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407592),
('ZG59vPQSWnmhEB50eNm0dPDAFtnlUSzIimyIj7Fn', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoia1JFV2p2NHgwUTBvenh6a2dsN0NpWm5nUlljdktWeXBzVUY5Zkx2SCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407474),
('zH0X8838Zw3UsCo3DfpYc4QAQMgRY8FuI3e0b2bd', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiWTEyb3ZTNThoazBxRHFvRjJzMVdBN3NZTHY0OW5yaThhUXhSa3N4VSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407702),
('ZmK1NrwWMUR9zHgZSyKwxVTRDWn0YcSXBK4zk8Oy', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZzg5eVNDd3pRTkFTeEFyUUV3cEFlUWhIYXI0aEdsQnl1OU8xT29hQyI7czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MTtzOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1761407366),
('zzRKOrL8NlePHCD9mv1lx324FxPfWyenL0kvFXrA', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiVnFTbTlUU1Y2bFlDNHlrU1Z1T2pEWVpqdjZZZmowWGYyUVJyOHpMdSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761407439);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `role` enum('admin','super_admin') NOT NULL DEFAULT 'admin',
  `department` varchar(255) NOT NULL,
  `photo` text DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `position` varchar(255) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `avatar` longtext DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `last_login` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `role`, `department`, `photo`, `phone`, `position`, `address`, `avatar`, `status`, `last_login`) VALUES
(1, 'Azijul Akbar', 'superadmin@simora.com', NULL, '$2y$12$SFsIxE.8hey6Zgs7G/TK1e.Ge4DdSRDxTdn1W02c7aDRS6LrHX2ya', NULL, '2025-10-20 17:38:40', '2025-10-25 08:52:07', 'super_admin', 'IT', NULL, '081234567890', 'Super Administrator', 'HujKul', 'data:image/jpeg;base64,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', 'active', '2025-10-25 08:51:08'),
(2, 'Admin User', 'admin@simora.com', NULL, '$2y$12$pBwDIW5iuPEYhbsivDIJH.TK3NBxBLJg.9/joRaa7O0zNyxrIClXa', NULL, '2025-10-20 17:38:51', '2025-10-25 08:49:57', 'admin', 'HRD', NULL, '081234567891', 'HRD Manager', NULL, 'data:image/jpeg;base64,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', 'active', '2025-10-23 01:55:59');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bookings_employee_id_foreign` (`employee_id`),
  ADD KEY `bookings_driver_id_foreign` (`driver_id`),
  ADD KEY `bookings_car_id_foreign` (`car_id`),
  ADD KEY `bookings_recommended_car_id_foreign` (`recommended_car_id`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cars`
--
ALTER TABLE `cars`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cars_license_plate_unique` (`license_plate`);

--
-- Indexes for table `drivers`
--
ALTER TABLE `drivers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `drivers_license_number_unique` (`license_number`),
  ADD UNIQUE KEY `drivers_email_unique` (`email`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `employees_nik_unique` (`nik`),
  ADD UNIQUE KEY `employees_email_unique` (`email`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `notifications_user_id_foreign` (`user_id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  ADD KEY `personal_access_tokens_expires_at_index` (`expires_at`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `cars`
--
ALTER TABLE `cars`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `drivers`
--
ALTER TABLE `drivers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_car_id_foreign` FOREIGN KEY (`car_id`) REFERENCES `cars` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `bookings_driver_id_foreign` FOREIGN KEY (`driver_id`) REFERENCES `drivers` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `bookings_employee_id_foreign` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `bookings_recommended_car_id_foreign` FOREIGN KEY (`recommended_car_id`) REFERENCES `cars` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
