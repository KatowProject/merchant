-- phpMyAdmin SQL Dump
-- version 5.2.1deb1ubuntu1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 01, 2024 at 01:49 AM
-- Server version: 8.0.37-0ubuntu0.23.10.2
-- PHP Version: 8.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `this`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'admin',
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `product_id` bigint UNSIGNED NOT NULL,
  `quantity` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id`, `user_id`, `product_id`, `quantity`, `created_at`, `updated_at`) VALUES
(13, 2, 3, 1, '2024-08-31 06:54:25', '2024-08-31 06:54:25'),
(14, 2, 22, 1, '2024-08-31 06:54:31', '2024-08-31 06:54:31'),
(15, 2, 34, 1, '2024-08-31 07:28:21', '2024-08-31 07:28:21');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'et quo', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(2, 'deserunt et', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(3, 'nihil et', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(4, 'consequatur perferendis', '2024-08-30 07:30:00', '2024-08-30 07:30:00');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(3, '2014_10_12_100000_create_password_resets_table', 1),
(4, '2019_08_19_000000_create_failed_jobs_table', 1),
(5, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(6, '2024_08_20_101140_create_categories_table', 1),
(7, '2024_08_20_101143_create_sub_categories_table', 1),
(8, '2024_08_20_101153_create_products_table', 1),
(9, '2024_08_20_140113_create_admins_table', 2),
(10, '2024_08_22_104404_create_orders_table', 2),
(11, '2024_08_22_105359_create_order_product_table', 2),
(12, '2024_08_22_112905_add_role_to_users_and_admins_tables', 2);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `postal_code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `order_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `shipping_address` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `name`, `postal_code`, `phone_number`, `user_id`, `order_number`, `total_amount`, `status`, `shipping_address`, `created_at`, `updated_at`) VALUES
(1, 'dd', 'dd', 'dd', 1, 'INV/20240831/121507', 215.27, 'pending', 'dd', '2024-08-31 05:15:07', '2024-08-31 05:15:07'),
(2, 'dd', 'dd', 'dd', 2, 'INV/20240831/015217', 203.52, 'pending', 'dd', '2024-08-31 06:52:17', '2024-08-31 06:52:17');

-- --------------------------------------------------------

--
-- Table structure for table `order_product`
--

CREATE TABLE `order_product` (
  `id` bigint UNSIGNED NOT NULL,
  `order_id` bigint UNSIGNED NOT NULL,
  `product_id` bigint UNSIGNED NOT NULL,
  `quantity` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order_product`
--

INSERT INTO `order_product` (`id`, `order_id`, `product_id`, `quantity`, `price`, `created_at`, `updated_at`) VALUES
(1, 1, 5, 2, 54.43, '2024-08-31 05:15:07', '2024-08-31 05:15:07'),
(2, 1, 4, 3, 35.47, '2024-08-31 05:15:07', '2024-08-31 05:15:07'),
(3, 2, 1, 3, 19.73, '2024-08-31 06:52:17', '2024-08-31 06:52:17'),
(4, 2, 6, 3, 48.11, '2024-08-31 06:52:17', '2024-08-31 06:52:17');

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `price` decimal(8,2) NOT NULL,
  `stock` int NOT NULL,
  `category_id` bigint UNSIGNED NOT NULL,
  `sub_category_id` bigint UNSIGNED DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `stock`, `category_id`, `sub_category_id`, `image`, `created_at`, `updated_at`) VALUES
(1, 'et', 'Perferendis consequuntur alias vitae.', 19.73, 90, 1, 1, 'https://via.placeholder.com/640x480.png/00ffdd?text=products+neque', '2024-08-30 07:30:00', '2024-08-31 06:52:17'),
(2, 'earum', 'Nisi perferendis odit aut explicabo et sunt quo non.', 70.88, 20, 1, 1, 'https://via.placeholder.com/640x480.png/008866?text=products+laborum', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(3, 'corrupti', 'Quo dolorem quis optio dolore dignissimos perspiciatis earum.', 36.81, 21, 1, 1, 'https://via.placeholder.com/640x480.png/00aa99?text=products+est', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(4, 'ut', 'Dolore maiores incidunt sapiente dolorem blanditiis at.', 35.47, 38, 1, 1, 'https://via.placeholder.com/640x480.png/007788?text=products+et', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(5, 'sed', 'Voluptatem eos recusandae quis non debitis.', 54.43, 94, 1, 1, 'https://via.placeholder.com/640x480.png/00aa33?text=products+officiis', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(6, 'iste', 'Consequatur molestiae est eum repellendus facilis deserunt porro.', 48.11, 27, 1, 1, 'https://via.placeholder.com/640x480.png/0022aa?text=products+vero', '2024-08-30 07:30:00', '2024-08-31 06:52:17'),
(7, 'pariatur', 'Sapiente voluptatem accusamus debitis quibusdam aut quia.', 54.84, 28, 1, 1, 'https://via.placeholder.com/640x480.png/00ff77?text=products+sint', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(8, 'et', 'Sit dolorem et dicta commodi impedit molestiae culpa voluptatem.', 92.42, 84, 1, 1, 'https://via.placeholder.com/640x480.png/00ffff?text=products+aut', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(9, 'ut', 'Qui sit et molestias quis.', 90.41, 76, 1, 1, 'https://via.placeholder.com/640x480.png/00aa33?text=products+in', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(10, 'impedit', 'Ipsum est architecto eos.', 94.68, 84, 1, 1, 'https://via.placeholder.com/640x480.png/00aa99?text=products+molestias', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(11, 'aut', 'Explicabo quisquam voluptatem quidem debitis.', 42.10, 26, 1, 2, 'https://via.placeholder.com/640x480.png/007700?text=products+voluptatibus', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(12, 'est', 'Voluptate illum nihil voluptatum alias quia amet deleniti.', 64.06, 73, 1, 2, 'https://via.placeholder.com/640x480.png/004422?text=products+doloribus', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(13, 'magni', 'Non qui voluptatibus laudantium.', 23.78, 73, 1, 2, 'https://via.placeholder.com/640x480.png/00aa22?text=products+delectus', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(14, 'ut', 'Voluptatum reiciendis omnis ut optio.', 72.31, 3, 1, 2, 'https://via.placeholder.com/640x480.png/00ffee?text=products+aut', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(15, 'inventore', 'Iusto nemo omnis numquam voluptatem cum et non.', 72.17, 79, 1, 2, 'https://via.placeholder.com/640x480.png/00ccbb?text=products+autem', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(16, 'atque', 'In aliquam consequatur illum fuga possimus.', 36.74, 88, 1, 2, 'https://via.placeholder.com/640x480.png/0044dd?text=products+tempore', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(17, 'et', 'Rem adipisci et alias perferendis iusto eligendi.', 19.06, 9, 1, 2, 'https://via.placeholder.com/640x480.png/00bb44?text=products+voluptatum', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(18, 'animi', 'Ut magni nihil omnis sit aut ullam.', 60.73, 22, 1, 2, 'https://via.placeholder.com/640x480.png/0066ee?text=products+odit', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(19, 'est', 'Et ut sit dolores veritatis praesentium quo dolor.', 67.91, 59, 1, 2, 'https://via.placeholder.com/640x480.png/004444?text=products+perspiciatis', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(20, 'est', 'Facilis temporibus praesentium alias voluptates accusantium quam quia.', 51.50, 41, 1, 2, 'https://via.placeholder.com/640x480.png/007777?text=products+facere', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(21, 'eveniet', 'Repellendus dolorem magnam est quos minus.', 45.57, 100, 1, 3, 'https://via.placeholder.com/640x480.png/00ee00?text=products+cumque', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(22, 'nemo', 'Autem accusantium est aut pariatur tenetur culpa.', 70.47, 4, 1, 3, 'https://via.placeholder.com/640x480.png/0088dd?text=products+dolorem', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(23, 'sed', 'Corporis et aut ipsa rerum quidem.', 31.98, 30, 1, 3, 'https://via.placeholder.com/640x480.png/0011bb?text=products+tempora', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(24, 'cupiditate', 'Similique voluptatibus quidem quod modi asperiores autem.', 36.80, 100, 1, 3, 'https://via.placeholder.com/640x480.png/00aadd?text=products+adipisci', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(25, 'porro', 'Nobis aut et qui sit molestiae.', 59.98, 44, 1, 3, 'https://via.placeholder.com/640x480.png/0055dd?text=products+nisi', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(26, 'ut', 'Et quas quia iste magnam sint magnam aut.', 14.60, 63, 1, 3, 'https://via.placeholder.com/640x480.png/00ffee?text=products+sunt', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(27, 'necessitatibus', 'Ullam quos fugit modi.', 45.83, 42, 1, 3, 'https://via.placeholder.com/640x480.png/00ffee?text=products+odio', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(28, 'labore', 'Dolores facilis quo qui qui sequi dolor.', 68.95, 21, 1, 3, 'https://via.placeholder.com/640x480.png/00eebb?text=products+ipsum', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(29, 'eos', 'Inventore enim odit est accusamus ab nisi.', 58.03, 32, 1, 3, 'https://via.placeholder.com/640x480.png/004433?text=products+quisquam', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(30, 'odio', 'Recusandae vel soluta sed qui incidunt sequi.', 20.85, 13, 1, 3, 'https://via.placeholder.com/640x480.png/0077dd?text=products+totam', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(31, 'voluptatem', 'Ex sed nihil dignissimos voluptatum necessitatibus iure.', 54.39, 21, 2, 4, 'https://via.placeholder.com/640x480.png/00aadd?text=products+at', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(32, 'et', 'Voluptatem rerum veritatis dolores aut aspernatur reiciendis nemo et.', 9.12, 87, 2, 4, 'https://via.placeholder.com/640x480.png/003377?text=products+autem', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(33, 'autem', 'Molestiae omnis molestias officia ratione incidunt velit sed facilis.', 75.06, 69, 2, 4, 'https://via.placeholder.com/640x480.png/00ddaa?text=products+exercitationem', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(34, 'asperiores', 'Temporibus voluptas rerum dolores iste sed quis.', 94.26, 69, 2, 4, 'https://via.placeholder.com/640x480.png/0088ee?text=products+libero', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(35, 'itaque', 'Provident perferendis error voluptatum perspiciatis et voluptate ea.', 99.92, 70, 2, 4, 'https://via.placeholder.com/640x480.png/00ccbb?text=products+sunt', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(36, 'aut', 'Laborum in sed quia quia impedit soluta eum.', 51.64, 4, 2, 4, 'https://via.placeholder.com/640x480.png/0044cc?text=products+optio', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(37, 'qui', 'Quia perferendis quia quidem qui veritatis inventore.', 46.11, 37, 2, 4, 'https://via.placeholder.com/640x480.png/0099aa?text=products+illo', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(38, 'numquam', 'Molestiae tempora facere voluptatem quae nostrum quam corporis.', 33.88, 76, 2, 4, 'https://via.placeholder.com/640x480.png/00dd22?text=products+ut', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(39, 'ad', 'Et non nemo quos minima in eos.', 92.70, 21, 2, 4, 'https://via.placeholder.com/640x480.png/0066cc?text=products+laborum', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(40, 'et', 'Excepturi molestiae maiores iusto dicta distinctio ad explicabo.', 46.45, 54, 2, 4, 'https://via.placeholder.com/640x480.png/008855?text=products+ipsa', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(41, 'sint', 'Iste similique atque deleniti culpa.', 65.69, 79, 2, 5, 'https://via.placeholder.com/640x480.png/00aadd?text=products+est', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(42, 'sit', 'Quia omnis eum ut aut qui fugit accusamus quasi.', 58.08, 92, 2, 5, 'https://via.placeholder.com/640x480.png/003355?text=products+velit', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(43, 'consequatur', 'Odit quaerat fugit sed iure illo aut qui impedit.', 31.94, 4, 2, 5, 'https://via.placeholder.com/640x480.png/007744?text=products+quam', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(44, 'odio', 'Quo maxime ut vitae asperiores commodi et ut vitae.', 19.49, 49, 2, 5, 'https://via.placeholder.com/640x480.png/005588?text=products+voluptatum', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(45, 'voluptatem', 'Suscipit enim magnam et et libero sit.', 34.30, 78, 2, 5, 'https://via.placeholder.com/640x480.png/0022dd?text=products+sint', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(46, 'enim', 'Commodi et ut autem molestiae sed et.', 71.22, 66, 2, 5, 'https://via.placeholder.com/640x480.png/0055bb?text=products+assumenda', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(47, 'et', 'Veniam facilis similique qui laboriosam quia nisi.', 27.61, 3, 2, 5, 'https://via.placeholder.com/640x480.png/00ccee?text=products+architecto', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(48, 'magni', 'Qui id ducimus accusamus eaque assumenda.', 66.40, 65, 2, 5, 'https://via.placeholder.com/640x480.png/001100?text=products+rerum', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(49, 'voluptatem', 'Aut dicta illo sint quis totam.', 90.58, 35, 2, 5, 'https://via.placeholder.com/640x480.png/006644?text=products+officia', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(50, 'dolor', 'Tempora voluptatem corporis nulla sed.', 34.96, 47, 2, 5, 'https://via.placeholder.com/640x480.png/007766?text=products+aut', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(51, 'commodi', 'Vel dicta illum aliquid asperiores doloribus voluptatem est.', 28.59, 13, 2, 6, 'https://via.placeholder.com/640x480.png/009977?text=products+perferendis', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(52, 'et', 'Id ea aut voluptatibus voluptatum.', 68.42, 10, 2, 6, 'https://via.placeholder.com/640x480.png/007755?text=products+iure', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(53, 'quisquam', 'Suscipit sit molestiae saepe voluptas.', 30.13, 82, 2, 6, 'https://via.placeholder.com/640x480.png/007700?text=products+temporibus', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(54, 'sit', 'Quasi iure consequatur sapiente aut corporis blanditiis.', 91.63, 61, 2, 6, 'https://via.placeholder.com/640x480.png/002244?text=products+temporibus', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(55, 'voluptas', 'Et magnam quibusdam eius veniam hic laborum tempora voluptas.', 18.46, 72, 2, 6, 'https://via.placeholder.com/640x480.png/003399?text=products+hic', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(56, 'eos', 'Incidunt ullam a consequuntur ipsum recusandae.', 67.77, 91, 2, 6, 'https://via.placeholder.com/640x480.png/0077aa?text=products+et', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(57, 'cum', 'Suscipit amet sint et est fuga autem id.', 99.31, 85, 2, 6, 'https://via.placeholder.com/640x480.png/003366?text=products+sequi', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(58, 'voluptas', 'Ipsam commodi alias ipsum enim et officia dolore et.', 53.89, 29, 2, 6, 'https://via.placeholder.com/640x480.png/00dddd?text=products+voluptatibus', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(59, 'aliquam', 'Similique ut est iste ex.', 93.86, 45, 2, 6, 'https://via.placeholder.com/640x480.png/00cc55?text=products+tempora', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(60, 'ipsam', 'Quidem commodi dolores unde qui odio deserunt aperiam.', 23.84, 32, 2, 6, 'https://via.placeholder.com/640x480.png/00cccc?text=products+numquam', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(61, 'nemo', 'Quia inventore vel ut quam.', 70.64, 81, 3, 7, 'https://via.placeholder.com/640x480.png/00ff11?text=products+officiis', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(62, 'accusamus', 'Illo possimus veniam sit a quidem qui.', 59.35, 39, 3, 7, 'https://via.placeholder.com/640x480.png/00aaaa?text=products+magnam', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(63, 'architecto', 'Expedita necessitatibus nesciunt id corporis.', 13.32, 22, 3, 7, 'https://via.placeholder.com/640x480.png/0055aa?text=products+aliquam', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(64, 'voluptatum', 'Et repellendus quia omnis sit enim eaque.', 57.93, 31, 3, 7, 'https://via.placeholder.com/640x480.png/008833?text=products+rerum', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(65, 'laboriosam', 'Reprehenderit quas incidunt quas nemo ex vel culpa iste.', 64.43, 86, 3, 7, 'https://via.placeholder.com/640x480.png/0066aa?text=products+eveniet', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(66, 'nihil', 'Nam nostrum repellendus nam voluptas sit tempora ut.', 73.76, 94, 3, 7, 'https://via.placeholder.com/640x480.png/0088dd?text=products+eos', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(67, 'nesciunt', 'Vel mollitia et est aspernatur illo architecto et sit.', 40.91, 34, 3, 7, 'https://via.placeholder.com/640x480.png/0077dd?text=products+numquam', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(68, 'quasi', 'Quia eum quia dignissimos eius voluptatum quis.', 2.47, 98, 3, 7, 'https://via.placeholder.com/640x480.png/006644?text=products+libero', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(69, 'omnis', 'Harum quibusdam et eos ad rem provident ipsum.', 92.35, 60, 3, 7, 'https://via.placeholder.com/640x480.png/0044cc?text=products+facilis', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(70, 'praesentium', 'Porro eos ut consequatur quibusdam sed cum qui.', 13.17, 85, 3, 7, 'https://via.placeholder.com/640x480.png/004477?text=products+vel', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(71, 'facilis', 'Id et qui distinctio ratione itaque necessitatibus minus.', 63.51, 45, 3, 8, 'https://via.placeholder.com/640x480.png/00bb88?text=products+beatae', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(72, 'saepe', 'Recusandae consequatur nisi placeat sed ipsam eos vero.', 80.46, 60, 3, 8, 'https://via.placeholder.com/640x480.png/004411?text=products+qui', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(73, 'autem', 'Sed nihil tenetur dolor.', 44.21, 60, 3, 8, 'https://via.placeholder.com/640x480.png/00ccbb?text=products+omnis', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(74, 'ipsam', 'Omnis ut corrupti excepturi dolores animi nulla in.', 31.69, 78, 3, 8, 'https://via.placeholder.com/640x480.png/001199?text=products+atque', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(75, 'consequatur', 'Perferendis ea architecto incidunt quo quam eaque officia.', 59.50, 89, 3, 8, 'https://via.placeholder.com/640x480.png/00aa77?text=products+sapiente', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(76, 'accusantium', 'Tempore rerum iure possimus quas.', 53.97, 48, 3, 8, 'https://via.placeholder.com/640x480.png/0055cc?text=products+corporis', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(77, 'amet', 'Nesciunt eum repellat nemo quia similique qui nostrum et.', 74.54, 68, 3, 8, 'https://via.placeholder.com/640x480.png/007755?text=products+voluptates', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(78, 'ad', 'Rerum aperiam in nostrum beatae harum cumque.', 37.55, 86, 3, 8, 'https://via.placeholder.com/640x480.png/00ccdd?text=products+et', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(79, 'veritatis', 'Voluptatem tempore excepturi et dolor at quo.', 71.63, 22, 3, 8, 'https://via.placeholder.com/640x480.png/0022bb?text=products+nihil', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(80, 'neque', 'Occaecati non incidunt saepe soluta.', 96.34, 37, 3, 8, 'https://via.placeholder.com/640x480.png/00ffbb?text=products+consequatur', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(81, 'quis', 'Provident ut ut quae rem quos.', 52.04, 53, 3, 9, 'https://via.placeholder.com/640x480.png/002277?text=products+aut', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(82, 'magnam', 'Accusantium non est accusamus aut aut aut et neque.', 1.51, 72, 3, 9, 'https://via.placeholder.com/640x480.png/006677?text=products+ut', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(83, 'eligendi', 'Quos dolores alias aut.', 32.44, 36, 3, 9, 'https://via.placeholder.com/640x480.png/004477?text=products+facilis', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(84, 'ex', 'Earum et quia blanditiis est tenetur qui unde.', 68.27, 87, 3, 9, 'https://via.placeholder.com/640x480.png/004455?text=products+aut', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(85, 'eaque', 'Doloremque numquam qui nobis itaque provident.', 70.55, 81, 3, 9, 'https://via.placeholder.com/640x480.png/002233?text=products+aliquid', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(86, 'qui', 'Sed molestiae aut velit incidunt sequi ipsam odit.', 82.51, 51, 3, 9, 'https://via.placeholder.com/640x480.png/00aabb?text=products+molestiae', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(87, 'quia', 'Fugiat et qui voluptas.', 52.38, 88, 3, 9, 'https://via.placeholder.com/640x480.png/007766?text=products+magni', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(88, 'aut', 'Et odit reprehenderit et eos temporibus.', 51.30, 40, 3, 9, 'https://via.placeholder.com/640x480.png/004444?text=products+autem', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(89, 'ipsa', 'Qui praesentium facilis architecto voluptatem incidunt.', 37.34, 76, 3, 9, 'https://via.placeholder.com/640x480.png/002288?text=products+et', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(90, 'incidunt', 'Modi excepturi voluptate dolorem.', 52.30, 68, 3, 9, 'https://via.placeholder.com/640x480.png/0044dd?text=products+est', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(91, 'nemo', 'Sed a provident in illo qui.', 7.55, 50, 4, 10, 'https://via.placeholder.com/640x480.png/00aa66?text=products+saepe', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(92, 'facilis', 'Sit inventore inventore neque et doloremque eos autem dolor.', 96.93, 100, 4, 10, 'https://via.placeholder.com/640x480.png/009988?text=products+dolor', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(93, 'alias', 'Et quibusdam autem inventore nesciunt molestiae.', 74.06, 42, 4, 10, 'https://via.placeholder.com/640x480.png/009933?text=products+sint', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(94, 'officia', 'Ipsam tempora corrupti aut.', 31.16, 37, 4, 10, 'https://via.placeholder.com/640x480.png/004433?text=products+et', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(95, 'reiciendis', 'Autem quia et error sit ut.', 12.34, 98, 4, 10, 'https://via.placeholder.com/640x480.png/00aa66?text=products+eaque', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(96, 'et', 'Corporis eum dolorem quasi eveniet hic aut veritatis.', 94.15, 84, 4, 10, 'https://via.placeholder.com/640x480.png/00dd22?text=products+sed', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(97, 'tenetur', 'Blanditiis molestias aliquam temporibus voluptatem deserunt reiciendis.', 69.87, 54, 4, 10, 'https://via.placeholder.com/640x480.png/00dd44?text=products+impedit', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(98, 'distinctio', 'Quidem adipisci minus et totam eum nemo aut.', 47.04, 80, 4, 10, 'https://via.placeholder.com/640x480.png/00ffbb?text=products+atque', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(99, 'facilis', 'Quidem atque ipsum quos quisquam expedita.', 59.53, 99, 4, 10, 'https://via.placeholder.com/640x480.png/0011ff?text=products+ex', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(100, 'est', 'Amet cupiditate id sit et voluptatem.', 10.32, 74, 4, 10, 'https://via.placeholder.com/640x480.png/00eeff?text=products+totam', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(101, 'maxime', 'Aspernatur aut rerum libero qui et sint.', 81.33, 64, 4, 11, 'https://via.placeholder.com/640x480.png/003355?text=products+voluptates', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(102, 'molestiae', 'Animi ab vitae qui harum.', 72.10, 82, 4, 11, 'https://via.placeholder.com/640x480.png/00ff88?text=products+aperiam', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(103, 'ut', 'Animi quis rerum velit nulla doloribus aut illum.', 14.34, 18, 4, 11, 'https://via.placeholder.com/640x480.png/00cc77?text=products+asperiores', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(104, 'eveniet', 'Quibusdam corrupti sit eaque.', 87.23, 42, 4, 11, 'https://via.placeholder.com/640x480.png/00bbcc?text=products+rem', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(105, 'sequi', 'Sit modi voluptatem occaecati architecto.', 26.79, 46, 4, 11, 'https://via.placeholder.com/640x480.png/002222?text=products+sapiente', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(106, 'necessitatibus', 'Reprehenderit pariatur blanditiis animi non aliquid consequuntur libero.', 19.99, 78, 4, 11, 'https://via.placeholder.com/640x480.png/0022bb?text=products+mollitia', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(107, 'molestiae', 'Quasi quia consequatur voluptas labore recusandae.', 61.95, 23, 4, 11, 'https://via.placeholder.com/640x480.png/00bbee?text=products+mollitia', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(108, 'temporibus', 'Aut recusandae qui nemo qui iure quam.', 32.74, 42, 4, 11, 'https://via.placeholder.com/640x480.png/00cc00?text=products+minus', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(109, 'exercitationem', 'Voluptatem earum dolor non.', 45.66, 75, 4, 11, 'https://via.placeholder.com/640x480.png/006699?text=products+corporis', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(110, 'id', 'Commodi sed fuga porro voluptas vel.', 17.17, 63, 4, 11, 'https://via.placeholder.com/640x480.png/00bbff?text=products+excepturi', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(111, 'aut', 'Rerum molestiae voluptate totam.', 50.00, 39, 4, 12, 'https://via.placeholder.com/640x480.png/00ffee?text=products+dicta', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(112, 'consequatur', 'Dolorem unde est dolorum eos sunt voluptas.', 95.17, 16, 4, 12, 'https://via.placeholder.com/640x480.png/0033ff?text=products+repellat', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(113, 'quisquam', 'Illum ea quisquam reiciendis hic asperiores reiciendis.', 8.44, 42, 4, 12, 'https://via.placeholder.com/640x480.png/00ff11?text=products+officia', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(114, 'qui', 'Aut ab suscipit in sed voluptatum.', 20.68, 74, 4, 12, 'https://via.placeholder.com/640x480.png/009955?text=products+eos', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(115, 'nesciunt', 'Minima quibusdam iure eveniet veniam distinctio.', 41.35, 53, 4, 12, 'https://via.placeholder.com/640x480.png/00bbee?text=products+non', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(116, 'natus', 'Commodi sed rem temporibus neque amet.', 5.03, 51, 4, 12, 'https://via.placeholder.com/640x480.png/004411?text=products+omnis', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(117, 'ut', 'Maiores qui nostrum illo repellat quia est.', 40.14, 9, 4, 12, 'https://via.placeholder.com/640x480.png/00ee55?text=products+odio', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(118, 'rerum', 'Architecto voluptatem quis corporis repellat consequatur distinctio.', 26.71, 51, 4, 12, 'https://via.placeholder.com/640x480.png/005511?text=products+explicabo', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(119, 'odit', 'Consequuntur quas ea vitae.', 31.48, 29, 4, 12, 'https://via.placeholder.com/640x480.png/00aa00?text=products+debitis', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(120, 'nihil', 'Ullam est quasi dolorem possimus cupiditate et est quisquam.', 35.00, 16, 4, 12, 'https://via.placeholder.com/640x480.png/00aabb?text=products+dicta', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(151, 'test', 'test', 20000.00, 12, 1, 1, 'images/1725150440.png', '2024-08-31 17:27:20', '2024-08-31 17:27:20'),
(152, 'testd', 'test', 20000.00, 12, 1, 1, 'images/1725151915.png', '2024-08-31 17:51:55', '2024-08-31 17:51:55'),
(153, 'x', '21', 2000.00, 212, 4, 1, 'images/1725152080.png', '2024-08-31 17:54:40', '2024-08-31 17:54:40'),
(154, 'x', '212', 20001.00, 2121, 4, 1, 'images/1725152398.jpg', '2024-08-31 17:59:58', '2024-08-31 17:59:58');

-- --------------------------------------------------------

--
-- Table structure for table `sub_categories`
--

CREATE TABLE `sub_categories` (
  `id` bigint UNSIGNED NOT NULL,
  `category_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sub_categories`
--

INSERT INTO `sub_categories` (`id`, `category_id`, `name`, `created_at`, `updated_at`) VALUES
(1, 1, 'doloribus', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(2, 1, 'facere', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(3, 1, 'aut', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(4, 2, 'voluptas', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(5, 2, 'nam', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(6, 2, 'veritatis', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(7, 3, 'omnis', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(8, 3, 'maxime', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(9, 3, 'dolorem', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(10, 4, 'voluptatibus', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(11, 4, 'cumque', '2024-08-30 07:30:00', '2024-08-30 07:30:00'),
(12, 4, 'nulla', '2024-08-30 07:30:00', '2024-08-30 07:30:00');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'user',
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `role`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Lucasids Jakubowski', 'pbalistreri@example.net', '2024-08-30 07:30:00', '$2a$12$sEnT6VsG9XpUS92B2F83EukLIF1f0r8O5tUwylqchD2WtLg5bbhaG', 'admin', 'oZ6fC2Hdjd', '2024-08-30 07:30:00', '2024-08-31 00:34:23'),
(2, 'Lucasids Jakubowski', 'user@mail.com', '2024-08-30 07:30:00', '$2a$12$WAWTOxwfDa5ZgGLqORyLxeL/9fXqOlVSXgjmnAcxAijtmEYCgbNUG', 'user', 'oZ6fC2Hdjd', '2024-08-30 07:30:00', '2024-08-31 00:34:23'),
(3, 'Lucasids Jakubowski', 'admin@mail.com', '2024-08-30 07:30:00', '$2a$12$sEnT6VsG9XpUS92B2F83EukLIF1f0r8O5tUwylqchD2WtLg5bbhaG', 'admin', 'oZ6fC2Hdjd', '2024-08-30 07:30:00', '2024-08-31 00:34:23');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `admins_email_unique` (`email`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cart_user_id_foreign` (`user_id`),
  ADD KEY `cart_product_id_foreign` (`product_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `categories_name_unique` (`name`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `orders_order_number_unique` (`order_number`),
  ADD KEY `orders_user_id_foreign` (`user_id`);

--
-- Indexes for table `order_product`
--
ALTER TABLE `order_product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_product_order_id_foreign` (`order_id`),
  ADD KEY `order_product_product_id_foreign` (`product_id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

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
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `products_category_id_foreign` (`category_id`),
  ADD KEY `products_sub_category_id_foreign` (`sub_category_id`);

--
-- Indexes for table `sub_categories`
--
ALTER TABLE `sub_categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sub_categories_category_id_foreign` (`category_id`);

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
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `order_product`
--
ALTER TABLE `order_product`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=155;

--
-- AUTO_INCREMENT for table `sub_categories`
--
ALTER TABLE `sub_categories`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cart_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `order_product`
--
ALTER TABLE `order_product`
  ADD CONSTRAINT `order_product_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_product_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `products_sub_category_id_foreign` FOREIGN KEY (`sub_category_id`) REFERENCES `sub_categories` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `sub_categories`
--
ALTER TABLE `sub_categories`
  ADD CONSTRAINT `sub_categories_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
