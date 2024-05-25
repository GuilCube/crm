-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: localhost:3306
-- Час створення: Трв 25 2024 р., 17:14
-- Версія сервера: 8.0.30
-- Версія PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База даних: `auction`
--
CREATE DATABASE IF NOT EXISTS `auction` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `auction`;

-- --------------------------------------------------------

--
-- Структура таблиці `categorii`
--

CREATE TABLE `categorii` (
  `id_category` int NOT NULL,
  `category_name` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп даних таблиці `categorii`
--

INSERT INTO `categorii` (`id_category`, `category_name`) VALUES
(1, 'Годинники'),
(2, 'Взуття');

-- --------------------------------------------------------

--
-- Структура таблиці `holovni_categorii`
--

CREATE TABLE `holovni_categorii` (
  `id` int NOT NULL,
  `id_categorii` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп даних таблиці `holovni_categorii`
--

INSERT INTO `holovni_categorii` (`id`, `id_categorii`) VALUES
(1, 1),
(2, 2);

-- --------------------------------------------------------

--
-- Структура таблиці `tovary`
--

CREATE TABLE `tovary` (
  `id_tovary` int NOT NULL,
  `imya_tovaru` varchar(100) NOT NULL,
  `id_categorii` int NOT NULL,
  `opys` varchar(1000) NOT NULL,
  `img` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп даних таблиці `tovary`
--

INSERT INTO `tovary` (`id_tovary`, `imya_tovaru`, `id_categorii`, `opys`, `img`) VALUES
(1, 'SKMEI Mens LED', 1, '', '\"img/clocks.jpg\"'),
(2, 'Luxury Men Analog Digital Military Sport LED', 1, '', '\"img/clocks1.jpg\"'),
(3, 'Timex TW4B14000', 1, '', '\"img/clocks2.jpg\"'),
(4, 'PHOIBOS GREAT WALL', 1, '', '\"img/clocks3.jpg\"'),
(5, 'New Balance MT410LN7', 2, '', '\"img/shoes.jpg\"'),
(6, 'Nike Air Monarch', 2, '', '\"img/shoes1.jpg\"'),
(7, 'Plyo DMF371', 2, '', '\"img/shoes2.jpg\"'),
(8, 'Walking Footwear PS1251', 2, '', '\"img/shoes3.jpg\"');

-- --------------------------------------------------------

--
-- Структура таблиці `zayavy`
--

CREATE TABLE `zayavy` (
  `id_zayavy` int NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(30) NOT NULL,
  `comment` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп даних таблиці `zayavy`
--

INSERT INTO `zayavy` (`id_zayavy`, `name`, `email`, `comment`) VALUES
(15, 'somename', 'mail@gmail.com', 'helloworld'),
(16, 'Glib', 'mail@gmail.com', 'er;hfekruhwe'),
(17, 'Гліб', 'somemail@gmail.com', 'hello world');

--
-- Індекси збережених таблиць
--

--
-- Індекси таблиці `categorii`
--
ALTER TABLE `categorii`
  ADD PRIMARY KEY (`id_category`);

--
-- Індекси таблиці `holovni_categorii`
--
ALTER TABLE `holovni_categorii`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_categorii` (`id_categorii`);

--
-- Індекси таблиці `tovary`
--
ALTER TABLE `tovary`
  ADD PRIMARY KEY (`id_tovary`);

--
-- Індекси таблиці `zayavy`
--
ALTER TABLE `zayavy`
  ADD PRIMARY KEY (`id_zayavy`);

--
-- AUTO_INCREMENT для збережених таблиць
--

--
-- AUTO_INCREMENT для таблиці `categorii`
--
ALTER TABLE `categorii`
  MODIFY `id_category` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблиці `holovni_categorii`
--
ALTER TABLE `holovni_categorii`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблиці `tovary`
--
ALTER TABLE `tovary`
  MODIFY `id_tovary` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблиці `zayavy`
--
ALTER TABLE `zayavy`
  MODIFY `id_zayavy` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Обмеження зовнішнього ключа збережених таблиць
--

--
-- Обмеження зовнішнього ключа таблиці `holovni_categorii`
--
ALTER TABLE `holovni_categorii`
  ADD CONSTRAINT `holovni_categorii_ibfk_1` FOREIGN KEY (`id_categorii`) REFERENCES `categorii` (`id_category`) ON DELETE RESTRICT ON UPDATE RESTRICT;
--
-- База даних: `crm`
--
CREATE DATABASE IF NOT EXISTS `crm` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `crm`;

-- --------------------------------------------------------

--
-- Структура таблиці `depotworkers`
--

CREATE TABLE `depotworkers` (
  `w_id` int NOT NULL,
  `w_login` varchar(50) NOT NULL,
  `w_password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Структура таблиці `goods`
--

CREATE TABLE `goods` (
  `g_id` int NOT NULL,
  `g_name` varchar(50) NOT NULL,
  `g_articul` varchar(5) NOT NULL,
  `g_quantity` tinyint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Структура таблиці `leads`
--

CREATE TABLE `leads` (
  `idLead` tinyint NOT NULL,
  `leadType` enum('Фізична особа','Юридична особа') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `leadStatus` enum('Контакт','Перемовини','Оплата','Успіх','Не реалізовано') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `leadPhone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `leadName` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `leadEmail` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `leadComment` varchar(1000) NOT NULL,
  `m_id` int NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп даних таблиці `leads`
--

INSERT INTO `leads` (`idLead`, `leadType`, `leadStatus`, `leadPhone`, `leadName`, `leadEmail`, `leadComment`, `m_id`, `created`) VALUES
(1, 'Фізична особа', 'Контакт', '0678335676', 'Петронко Петро Петрович', 'petrenko@gmail.com', '', 1, '2024-05-17 15:12:42'),
(2, 'Фізична особа', 'Не реалізовано', '380800553535', 'Данило Петрович', 'danylo@gmail.com', '', 1, '2024-05-20 14:01:01'),
(3, 'Фізична особа', 'Контакт', '380678335686', 'Кармелюк Олександр', 'oleksa@gmail.com', '', 1, '2024-05-23 09:49:01');

-- --------------------------------------------------------

--
-- Структура таблиці `managers`
--

CREATE TABLE `managers` (
  `m_id` int NOT NULL,
  `m_login` varchar(50) NOT NULL,
  `m_pass` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп даних таблиці `managers`
--

INSERT INTO `managers` (`m_id`, `m_login`, `m_pass`) VALUES
(1, 'manager', 'manager');

-- --------------------------------------------------------

--
-- Структура таблиці `orders`
--

CREATE TABLE `orders` (
  `o_id` int NOT NULL,
  `g_id` int NOT NULL,
  `l_id` tinyint NOT NULL,
  `g_name` varchar(50) NOT NULL,
  `g_quantity` tinyint NOT NULL,
  `o_status` enum('Оформлено','Комплектується','Відправлено') NOT NULL,
  `adress` varchar(50) NOT NULL,
  `m_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Індекси збережених таблиць
--

--
-- Індекси таблиці `depotworkers`
--
ALTER TABLE `depotworkers`
  ADD PRIMARY KEY (`w_id`);

--
-- Індекси таблиці `goods`
--
ALTER TABLE `goods`
  ADD PRIMARY KEY (`g_id`);

--
-- Індекси таблиці `leads`
--
ALTER TABLE `leads`
  ADD PRIMARY KEY (`idLead`),
  ADD KEY `m_id` (`m_id`);

--
-- Індекси таблиці `managers`
--
ALTER TABLE `managers`
  ADD PRIMARY KEY (`m_id`);

--
-- Індекси таблиці `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`o_id`),
  ADD KEY `m_id` (`m_id`),
  ADD KEY `g_id` (`g_id`),
  ADD KEY `l_id` (`l_id`);

--
-- AUTO_INCREMENT для збережених таблиць
--

--
-- AUTO_INCREMENT для таблиці `depotworkers`
--
ALTER TABLE `depotworkers`
  MODIFY `w_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблиці `goods`
--
ALTER TABLE `goods`
  MODIFY `g_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблиці `leads`
--
ALTER TABLE `leads`
  MODIFY `idLead` tinyint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблиці `managers`
--
ALTER TABLE `managers`
  MODIFY `m_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Обмеження зовнішнього ключа збережених таблиць
--

--
-- Обмеження зовнішнього ключа таблиці `leads`
--
ALTER TABLE `leads`
  ADD CONSTRAINT `leads_ibfk_1` FOREIGN KEY (`m_id`) REFERENCES `managers` (`m_id`) ON UPDATE CASCADE;

--
-- Обмеження зовнішнього ключа таблиці `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`g_id`) REFERENCES `goods` (`g_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`m_id`) REFERENCES `managers` (`m_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`l_id`) REFERENCES `leads` (`idLead`) ON UPDATE CASCADE;
--
-- База даних: `laravelproject`
--
CREATE DATABASE IF NOT EXISTS `laravelproject` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `laravelproject`;

-- --------------------------------------------------------

--
-- Структура таблиці `categories`
--

CREATE TABLE `categories` (
  `id_category` bigint UNSIGNED NOT NULL,
  `category_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `main_description1` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `main_description2` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп даних таблиці `categories`
--

INSERT INTO `categories` (`id_category`, `category_name`, `main_description1`, `main_description2`, `created_at`, `updated_at`) VALUES
(1, 'Автомобілі', 'Тип шин', 'Призначення', NULL, NULL),
(2, 'Телефони', 'Оперативна Пам\'ять', 'Вбудована Пам\'ять', NULL, NULL),
(3, 'Аудіосистеми', 'Довжина кабелю', 'Вага', NULL, NULL),
(4, 'Дім', 'Призначення', 'Габарити', NULL, NULL),
(5, 'Інструменти', 'Матеріал леза', 'Максимальний діаметр зрізу', NULL, NULL);

-- --------------------------------------------------------

--
-- Структура таблиці `clients`
--

CREATE TABLE `clients` (
  `id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `surename` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп даних таблиці `clients`
--

INSERT INTO `clients` (`id`, `created_at`, `updated_at`, `name`, `surename`, `email`, `phone`, `password`) VALUES
(1, '2023-05-17 10:08:23', '2023-05-17 10:08:23', 'Євгеній', 'Остахов', 'ostakhov@gmail.com', '38090901212', 'ergergerg');

-- --------------------------------------------------------

--
-- Структура таблиці `goods`
--

CREATE TABLE `goods` (
  `id_good` bigint UNSIGNED NOT NULL,
  `name_good` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_category` bigint UNSIGNED NOT NULL,
  `main_1` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `main_2` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `path` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп даних таблиці `goods`
--

INSERT INTO `goods` (`id_good`, `name_good`, `id_category`, `main_1`, `main_2`, `path`, `created_at`, `updated_at`) VALUES
(1, 'iPhone 14 Pro Max Deep Purple', 2, '256 Гб', ' 4 Гб', 'images\\cards\\img1.jpg', NULL, NULL),
(2, 'Marshall Major IV Black', 3, '1,2 м\r\n', '165 г', 'images\\cards\\img2.jpg', NULL, NULL),
(3, 'Michelin Primacy 4', 1, 'Літні шини', 'Легкові автомобілі', 'images\\cards\\img3.jpg', NULL, NULL),
(4, 'Fiskars P90 PRO', 5, 'Нержавіюча сталь з тефлоновим покриттям\r\n', '26мм', 'images\\cards\\img4.jpg', NULL, NULL);

-- --------------------------------------------------------

--
-- Структура таблиці `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп даних таблиці `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '(1)create_clients', 1),
(2, '(2)create_categories', 1),
(3, '(3)create_goods', 1),
(4, '(4)create_shop_list', 1),
(5, '(5)create_shop_offers', 1),
(6, '2019_12_14_000001_create_personal_access_tokens_table', 1);

-- --------------------------------------------------------

--
-- Структура таблиці `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблиці `shop_list`
--

CREATE TABLE `shop_list` (
  `id_shop` bigint UNSIGNED NOT NULL,
  `name_shop` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп даних таблиці `shop_list`
--

INSERT INTO `shop_list` (`id_shop`, `name_shop`, `created_at`, `updated_at`) VALUES
(1, 'Allo', NULL, NULL),
(2, 'Exe.ua', NULL, NULL),
(3, 'Rozetka', NULL, NULL),
(4, 'Foxtrot', NULL, NULL),
(5, 'Comfy', NULL, NULL),
(6, 'Епіцентр', NULL, NULL),
(7, 'F.ua', NULL, NULL),
(8, 'RezinaCC', NULL, NULL),
(9, 'GumaUA', NULL, NULL);

-- --------------------------------------------------------

--
-- Структура таблиці `shop_offers`
--

CREATE TABLE `shop_offers` (
  `id_good` bigint UNSIGNED NOT NULL,
  `id_shop` bigint UNSIGNED NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп даних таблиці `shop_offers`
--

INSERT INTO `shop_offers` (`id_good`, `id_shop`, `price`, `created_at`, `updated_at`) VALUES
(1, 1, 53999.00, NULL, NULL),
(1, 2, 45600.00, NULL, NULL),
(1, 3, 48800.00, NULL, NULL),
(1, 4, 49900.00, NULL, NULL),
(2, 1, 6999.00, NULL, NULL),
(2, 2, 5999.00, NULL, NULL),
(2, 3, 6599.00, NULL, NULL),
(2, 5, 6099.00, NULL, NULL),
(3, 6, 3333.00, NULL, NULL),
(3, 7, 3250.00, NULL, NULL),
(3, 8, 3129.00, NULL, NULL),
(3, 9, 3150.00, NULL, NULL),
(4, 3, 999.00, NULL, NULL),
(4, 6, 1120.00, NULL, NULL),
(4, 7, 1699.00, NULL, NULL);

--
-- Індекси збережених таблиць
--

--
-- Індекси таблиці `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id_category`);

--
-- Індекси таблиці `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`);

--
-- Індекси таблиці `goods`
--
ALTER TABLE `goods`
  ADD PRIMARY KEY (`id_good`),
  ADD KEY `goods_id_category_foreign` (`id_category`);

--
-- Індекси таблиці `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Індекси таблиці `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Індекси таблиці `shop_list`
--
ALTER TABLE `shop_list`
  ADD PRIMARY KEY (`id_shop`);

--
-- Індекси таблиці `shop_offers`
--
ALTER TABLE `shop_offers`
  ADD KEY `shop_offers_id_good_foreign` (`id_good`),
  ADD KEY `shop_offers_id_shop_foreign` (`id_shop`);

--
-- AUTO_INCREMENT для збережених таблиць
--

--
-- AUTO_INCREMENT для таблиці `categories`
--
ALTER TABLE `categories`
  MODIFY `id_category` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблиці `clients`
--
ALTER TABLE `clients`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблиці `goods`
--
ALTER TABLE `goods`
  MODIFY `id_good` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT для таблиці `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблиці `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблиці `shop_list`
--
ALTER TABLE `shop_list`
  MODIFY `id_shop` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Обмеження зовнішнього ключа збережених таблиць
--

--
-- Обмеження зовнішнього ключа таблиці `goods`
--
ALTER TABLE `goods`
  ADD CONSTRAINT `goods_id_category_foreign` FOREIGN KEY (`id_category`) REFERENCES `categories` (`id_category`);

--
-- Обмеження зовнішнього ключа таблиці `shop_offers`
--
ALTER TABLE `shop_offers`
  ADD CONSTRAINT `shop_offers_id_good_foreign` FOREIGN KEY (`id_good`) REFERENCES `goods` (`id_good`),
  ADD CONSTRAINT `shop_offers_id_shop_foreign` FOREIGN KEY (`id_shop`) REFERENCES `shop_list` (`id_shop`);
--
-- База даних: `mydatabase`
--
CREATE DATABASE IF NOT EXISTS `mydatabase` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `mydatabase`;

-- --------------------------------------------------------

--
-- Структура таблиці `categories`
--

CREATE TABLE `categories` (
  `id_category` int NOT NULL,
  `category_name` varchar(15) NOT NULL,
  `main_description1` varchar(100) NOT NULL,
  `main_description2` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп даних таблиці `categories`
--

INSERT INTO `categories` (`id_category`, `category_name`, `main_description1`, `main_description2`) VALUES
(1, 'Автомобілі', 'Тип шин', 'Призначення'),
(2, 'Телефони', 'Оперативна Пам\'ять', 'Вбудована Пам\'ять'),
(3, 'Аудіосистеми', 'Довжина кабелю', 'Вага'),
(4, 'Дім', 'Призначення', 'Габарити'),
(5, 'Інструменти', 'Матеріал леза', 'Максимальний діаметр зрізу');

-- --------------------------------------------------------

--
-- Структура таблиці `client`
--

CREATE TABLE `client` (
  `id_client` int NOT NULL,
  `name` varchar(50) NOT NULL,
  `surname` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `password` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Структура таблиці `goods`
--

CREATE TABLE `goods` (
  `id_good` int NOT NULL,
  `name_good` varchar(30) NOT NULL,
  `id_category` int NOT NULL,
  `main_1` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'Опис в картках ',
  `main_2` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'Опис в картках',
  `path` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп даних таблиці `goods`
--

INSERT INTO `goods` (`id_good`, `name_good`, `id_category`, `main_1`, `main_2`, `path`) VALUES
(1, 'iPhone 14 Pro Max Deep Purple', 2, '256 Гб', ' 4 Гб', '\"images\\cards\\img1.jpg\"'),
(2, 'Marshall Major IV Black', 3, '1,2 м\r\n', '165 г', '\"images\\cards\\img2.jpg\"'),
(3, 'Michelin Primacy 4', 1, 'Літні шини', 'Легкові автомобілі', '\"images\\cards\\img3.jpg\"'),
(4, 'Fiskars P90 PRO', 5, 'Нержавіюча сталь з тефлоновим покриттям\r\n', '26мм', '\"images\\cards\\img4.jpg\"');

-- --------------------------------------------------------

--
-- Структура таблиці `shop_list`
--

CREATE TABLE `shop_list` (
  `id_shop` int NOT NULL,
  `name_shop` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп даних таблиці `shop_list`
--

INSERT INTO `shop_list` (`id_shop`, `name_shop`) VALUES
(1, 'Allo'),
(2, 'Exe.ua'),
(3, 'Rozetka'),
(4, 'Foxtrot'),
(5, 'Comfy'),
(6, 'Епіцентр'),
(7, 'F.ua'),
(8, 'RezinaCC'),
(9, 'GumaUA');

-- --------------------------------------------------------

--
-- Структура таблиці `shop_offer`
--

CREATE TABLE `shop_offer` (
  `id_good` int NOT NULL,
  `id_shop` int NOT NULL,
  `price` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп даних таблиці `shop_offer`
--

INSERT INTO `shop_offer` (`id_good`, `id_shop`, `price`) VALUES
(1, 1, 53999),
(1, 2, 45600),
(1, 3, 48800),
(1, 4, 49900),
(2, 1, 6999),
(2, 2, 5999),
(2, 3, 6599),
(2, 5, 6099),
(3, 6, 3333),
(3, 7, 3250),
(3, 8, 3129),
(3, 9, 3150),
(4, 3, 999),
(4, 6, 1120),
(4, 7, 1699);

--
-- Індекси збережених таблиць
--

--
-- Індекси таблиці `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id_category`);

--
-- Індекси таблиці `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`id_client`);

--
-- Індекси таблиці `goods`
--
ALTER TABLE `goods`
  ADD PRIMARY KEY (`id_good`),
  ADD KEY `id_category` (`id_category`);

--
-- Індекси таблиці `shop_list`
--
ALTER TABLE `shop_list`
  ADD PRIMARY KEY (`id_shop`);

--
-- Індекси таблиці `shop_offer`
--
ALTER TABLE `shop_offer`
  ADD KEY `id_good` (`id_good`,`id_shop`),
  ADD KEY `id_shop` (`id_shop`);

--
-- AUTO_INCREMENT для збережених таблиць
--

--
-- AUTO_INCREMENT для таблиці `categories`
--
ALTER TABLE `categories`
  MODIFY `id_category` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблиці `client`
--
ALTER TABLE `client`
  MODIFY `id_client` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблиці `goods`
--
ALTER TABLE `goods`
  MODIFY `id_good` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблиці `shop_list`
--
ALTER TABLE `shop_list`
  MODIFY `id_shop` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Обмеження зовнішнього ключа збережених таблиць
--

--
-- Обмеження зовнішнього ключа таблиці `goods`
--
ALTER TABLE `goods`
  ADD CONSTRAINT `goods_ibfk_1` FOREIGN KEY (`id_category`) REFERENCES `categories` (`id_category`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Обмеження зовнішнього ключа таблиці `shop_offer`
--
ALTER TABLE `shop_offer`
  ADD CONSTRAINT `shop_offer_ibfk_1` FOREIGN KEY (`id_good`) REFERENCES `goods` (`id_good`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `shop_offer_ibfk_2` FOREIGN KEY (`id_shop`) REFERENCES `shop_list` (`id_shop`) ON DELETE RESTRICT ON UPDATE RESTRICT;
--
-- База даних: `opendocman`
--
CREATE DATABASE IF NOT EXISTS `opendocman` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `opendocman`;

-- --------------------------------------------------------

--
-- Структура таблиці `odm_access_log`
--

CREATE TABLE `odm_access_log` (
  `file_id` int NOT NULL,
  `user_id` int NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `action` enum('A','B','C','V','D','M','X','I','O','Y','R') NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Структура таблиці `odm_admin`
--

CREATE TABLE `odm_admin` (
  `id` int UNSIGNED DEFAULT NULL,
  `admin` tinyint DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп даних таблиці `odm_admin`
--

INSERT INTO `odm_admin` (`id`, `admin`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Структура таблиці `odm_category`
--

CREATE TABLE `odm_category` (
  `id` int UNSIGNED NOT NULL,
  `NAME` varchar(255) NOT NULL DEFAULT ''
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп даних таблиці `odm_category`
--

INSERT INTO `odm_category` (`id`, `NAME`) VALUES
(1, 'SOP'),
(2, 'Training Manual'),
(3, 'Letter'),
(4, 'Presentation');

-- --------------------------------------------------------

--
-- Структура таблиці `odm_department`
--

CREATE TABLE `odm_department` (
  `id` int UNSIGNED NOT NULL,
  `NAME` varchar(255) NOT NULL DEFAULT ''
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп даних таблиці `odm_department`
--

INSERT INTO `odm_department` (`id`, `NAME`) VALUES
(1, 'Information Systems');

-- --------------------------------------------------------

--
-- Структура таблиці `odm_dept_perms`
--

CREATE TABLE `odm_dept_perms` (
  `fid` int UNSIGNED DEFAULT NULL,
  `dept_id` int UNSIGNED DEFAULT NULL,
  `rights` tinyint NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Структура таблиці `odm_dept_reviewer`
--

CREATE TABLE `odm_dept_reviewer` (
  `dept_id` int UNSIGNED DEFAULT NULL,
  `user_id` int UNSIGNED DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп даних таблиці `odm_dept_reviewer`
--

INSERT INTO `odm_dept_reviewer` (`dept_id`, `user_id`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Структура таблиці `odm_filetypes`
--

CREATE TABLE `odm_filetypes` (
  `id` int UNSIGNED NOT NULL,
  `type` varchar(255) NOT NULL,
  `active` tinyint NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп даних таблиці `odm_filetypes`
--

INSERT INTO `odm_filetypes` (`id`, `type`, `active`) VALUES
(1, 'image/gif', 1),
(2, 'text/html', 1),
(3, 'text/plain', 1),
(4, 'application/pdf', 1),
(5, 'image/gif', 1),
(6, 'text/html', 1),
(7, 'text/plain', 1),
(8, 'application/pdf', 1),
(9, 'image/pdf', 1),
(10, 'application/x-pdf', 1),
(11, 'application/msword', 1),
(12, 'image/jpeg', 1),
(13, 'image/pjpeg', 1),
(14, 'image/png', 1),
(15, 'application/msexcel', 1),
(16, 'application/msaccess', 1),
(17, 'text/richtxt', 1),
(18, 'application/mspowerpoint', 1),
(19, 'application/octet-stream', 1),
(20, 'application/x-zip-compressed', 1),
(21, 'application/x-zip', 1),
(22, 'application/zip', 1),
(23, 'image/tiff', 1),
(24, 'image/tif', 1),
(25, 'application/vnd.ms-powerpoint', 1),
(26, 'application/vnd.ms-excel', 1),
(27, 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 1),
(28, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 1),
(29, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 1),
(30, 'application/vnd.oasis.opendocument.chart', 1),
(31, 'application/vnd.oasis.opendocument.chart-template', 1),
(32, 'application/vnd.oasis.opendocument.formula', 1),
(33, 'application/vnd.oasis.opendocument.formula-template', 1),
(34, 'application/vnd.oasis.opendocument.graphics', 1),
(35, 'application/vnd.oasis.opendocument.graphics-template', 1),
(36, 'application/vnd.oasis.opendocument.image', 1),
(37, 'application/vnd.oasis.opendocument.image-template', 1),
(38, 'application/vnd.oasis.opendocument.presentation', 1),
(39, 'application/vnd.oasis.opendocument.presentation-template', 1),
(40, 'application/vnd.oasis.opendocument.spreadsheet', 1),
(41, 'application/vnd.oasis.opendocument.spreadsheet-template', 1),
(42, 'application/vnd.oasis.opendocument.text', 1),
(43, 'application/vnd.oasis.opendocument.text-master', 1),
(44, 'application/vnd.oasis.opendocument.text-template', 1),
(45, 'application/vnd.oasis.opendocument.text-web', 1),
(46, 'text/csv', 1),
(47, 'audio/mpeg', 0),
(48, 'image/x-dwg', 1),
(49, 'image/x-dfx', 1),
(50, 'drawing/x-dwf', 1),
(51, 'image/svg', 1),
(52, 'video/3gpp', 1);

-- --------------------------------------------------------

--
-- Структура таблиці `odm_log`
--

CREATE TABLE `odm_log` (
  `id` int UNSIGNED NOT NULL DEFAULT '0',
  `modified_on` datetime NOT NULL DEFAULT '1000-01-01 00:00:00',
  `modified_by` varchar(25) DEFAULT NULL,
  `note` text,
  `revision` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Структура таблиці `odm_odmsys`
--

CREATE TABLE `odm_odmsys` (
  `id` int NOT NULL,
  `sys_name` varchar(16) DEFAULT NULL,
  `sys_value` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп даних таблиці `odm_odmsys`
--

INSERT INTO `odm_odmsys` (`id`, `sys_name`, `sys_value`) VALUES
(1, 'version', '1.3.6');

-- --------------------------------------------------------

--
-- Структура таблиці `odm_rights`
--

CREATE TABLE `odm_rights` (
  `RightId` tinyint DEFAULT NULL,
  `Description` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп даних таблиці `odm_rights`
--

INSERT INTO `odm_rights` (`RightId`, `Description`) VALUES
(0, 'none'),
(1, 'view'),
(-1, 'forbidden'),
(2, 'read'),
(3, 'write'),
(4, 'admin');

-- --------------------------------------------------------

--
-- Структура таблиці `odm_settings`
--

CREATE TABLE `odm_settings` (
  `id` int UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `value` varchar(255) NOT NULL,
  `desription` varchar(255) NOT NULL,
  `validation` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп даних таблиці `odm_settings`
--

INSERT INTO `odm_settings` (`id`, `name`, `value`, `desription`, `validation`) VALUES
(1, 'debug', 'False', '(True/False) - Default=False - Debug the installation (not working)', 'bool'),
(2, 'demo', 'False', '(True/False) This setting is for a demo installation, where random people will be all loggging in as the same username/password like \"demo/demo\". This will keep users from removing files, users, etc.', 'bool'),
(3, 'authen', 'mysql', '(Default = mysql) Currently only MySQL authentication is supported', ''),
(4, 'title', 'Document Repository', 'This is the browser window title', 'maxsize=255'),
(5, 'site_mail', 'root@localhost', 'The email address of the administrator of this site', 'email|maxsize=255|req'),
(6, 'root_id', '1', 'This variable sets the root user id.  The root user will be able to access all files and have authority for everything.', 'num|req'),
(7, 'dataDir', 'c:/document_repository/', 'location of file repository. This should ideally be outside the Web server root. Make sure the server has permissions to read/write files to this folder!. (Examples: Linux - /var/www/document_repository/ : Windows - c:/document_repository/', 'maxsize=255'),
(8, 'max_filesize', '5000000', 'Set the maximum file upload size', 'num|maxsize=255'),
(9, 'revision_expiration', '90', 'This var sets the amount of days until each file needs to be revised,  assuming that there are 30 days in a month for all months.', 'num|maxsize=255'),
(10, 'file_expired_action', '1', 'Choose an action option when a file is found to be expired The first two options also result in sending email to reviewer  (1) Remove from file list until renewed (2) Show in file list but non-checkoutable (3) Send email to reviewer only (4) Do Nothing', 'num'),
(11, 'authorization', 'True', 'True or False. If set True, every document must be reviewed by an admin before it can go public. To disable set to False. If False, all newly added/checked-in documents will immediately be listed', 'bool'),
(12, 'allow_signup', 'False', 'Should we display the sign-up link?', 'bool'),
(13, 'allow_password_reset', 'False', 'Should we allow users to reset their forgotten password?', 'bool'),
(14, 'try_nis', 'False', 'Attempt NIS password lookups from YP server?', 'bool'),
(15, 'theme', 'tweeter', 'Which theme to use?', ''),
(16, 'language', 'english', 'Set the default language (english, spanish, turkish, etc.). Local users may override this setting. Check include/language folder for languages available', 'alpha|req'),
(17, 'max_query', '500', 'Set this to the maximum number of rows you want to be returned in a file listing.', 'num');

-- --------------------------------------------------------

--
-- Структура таблиці `odm_udf`
--

CREATE TABLE `odm_udf` (
  `id` int NOT NULL,
  `TABLE_NAME` varchar(50) DEFAULT NULL,
  `display_name` varchar(16) DEFAULT NULL,
  `field_type` int DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Структура таблиці `odm_user`
--

CREATE TABLE `odm_user` (
  `id` int UNSIGNED NOT NULL,
  `username` varchar(25) NOT NULL DEFAULT '',
  `PASSWORD` varchar(50) NOT NULL DEFAULT '',
  `department` int UNSIGNED DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `Email` varchar(50) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `pw_reset_code` char(32) DEFAULT NULL,
  `can_add` tinyint(1) DEFAULT '1',
  `can_checkin` tinyint(1) DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп даних таблиці `odm_user`
--

INSERT INTO `odm_user` (`id`, `username`, `PASSWORD`, `department`, `phone`, `Email`, `last_name`, `first_name`, `pw_reset_code`, `can_add`, `can_checkin`) VALUES
(1, 'admin', '21232f297a57a5a743894a0e4a801fc3', 1, '5555551212', 'admin@mailinator.com', 'User', 'Admin', '', 1, 1);

-- --------------------------------------------------------

--
-- Структура таблиці `odm_user_perms`
--

CREATE TABLE `odm_user_perms` (
  `fid` int UNSIGNED DEFAULT NULL,
  `uid` int UNSIGNED NOT NULL DEFAULT '0',
  `rights` tinyint NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Індекси збережених таблиць
--

--
-- Індекси таблиці `odm_category`
--
ALTER TABLE `odm_category`
  ADD PRIMARY KEY (`id`);

--
-- Індекси таблиці `odm_department`
--
ALTER TABLE `odm_department`
  ADD PRIMARY KEY (`id`);

--
-- Індекси таблиці `odm_dept_perms`
--
ALTER TABLE `odm_dept_perms`
  ADD KEY `rights` (`rights`),
  ADD KEY `dept_id` (`dept_id`),
  ADD KEY `fid` (`fid`);

--
-- Індекси таблиці `odm_filetypes`
--
ALTER TABLE `odm_filetypes`
  ADD PRIMARY KEY (`id`);

--
-- Індекси таблиці `odm_log`
--
ALTER TABLE `odm_log`
  ADD KEY `id` (`id`),
  ADD KEY `modified_on` (`modified_on`);

--
-- Індекси таблиці `odm_odmsys`
--
ALTER TABLE `odm_odmsys`
  ADD UNIQUE KEY `id` (`id`);

--
-- Індекси таблиці `odm_settings`
--
ALTER TABLE `odm_settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Індекси таблиці `odm_udf`
--
ALTER TABLE `odm_udf`
  ADD UNIQUE KEY `id` (`id`);

--
-- Індекси таблиці `odm_user`
--
ALTER TABLE `odm_user`
  ADD PRIMARY KEY (`id`);

--
-- Індекси таблиці `odm_user_perms`
--
ALTER TABLE `odm_user_perms`
  ADD KEY `user_perms_idx` (`fid`,`uid`,`rights`),
  ADD KEY `fid` (`fid`),
  ADD KEY `uid` (`uid`),
  ADD KEY `rights` (`rights`);

--
-- AUTO_INCREMENT для збережених таблиць
--

--
-- AUTO_INCREMENT для таблиці `odm_category`
--
ALTER TABLE `odm_category`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблиці `odm_department`
--
ALTER TABLE `odm_department`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблиці `odm_filetypes`
--
ALTER TABLE `odm_filetypes`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT для таблиці `odm_odmsys`
--
ALTER TABLE `odm_odmsys`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблиці `odm_settings`
--
ALTER TABLE `odm_settings`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT для таблиці `odm_udf`
--
ALTER TABLE `odm_udf`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблиці `odm_user`
--
ALTER TABLE `odm_user`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- База даних: `web1`
--
CREATE DATABASE IF NOT EXISTS `web1` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `web1`;

-- --------------------------------------------------------

--
-- Структура таблиці `businesses`
--

CREATE TABLE `businesses` (
  `business_id` bigint UNSIGNED NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `logo` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп даних таблиці `businesses`
--

INSERT INTO `businesses` (`business_id`, `name`, `logo`) VALUES
(1, 'ROZETKA', ''),
(2, 'YAKABOO', ''),
(3, 'ALLO', ''),
(4, 'RADIUS', '');

-- --------------------------------------------------------

--
-- Структура таблиці `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп даних таблиці `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(2, '2023_04_08_144718_create_user_datas_table', 1),
(3, '2023_04_09_090132_create_businesses_table', 1),
(4, '2023_04_09_090136_create_products_table', 1);

-- --------------------------------------------------------

--
-- Структура таблиці `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблиці `products`
--

CREATE TABLE `products` (
  `product_id` bigint UNSIGNED NOT NULL,
  `business_id` bigint UNSIGNED NOT NULL,
  `names` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` double NOT NULL,
  `description` varchar(400) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `images` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп даних таблиці `products`
--

INSERT INTO `products` (`product_id`, `business_id`, `names`, `price`, `description`, `images`) VALUES
(1, 1, 'Tecno T454 Dual Sim', 33.33, 'Екран (2.8\\\", TN, 240x320) / MediaTek MT6261D / основна камера: 0.08 Мп / RAM 4 МБ / 32 МБ вбудованої пам\\\'яті + microSD (до 32 ГБ) / підтримка 2 SIM-карток (Mini-SIM) / 1500 мА·год', 'img/phone5.jpg'),
(2, 2, 'THE SILMARILLION', 59.99, 'Нове видання цього чудового роману, який захопить шанувальників «Хоббіта» та «Володаря Перстнів» у світ міфів та легенд Середзем\"я. Сільмарилліон відноситься до Ранніх Днів Першої Епохи світу Толкієна. Це старовинна драма, у якій персонажі «Володаря кілець» оглядаються у минуле, де деякі з них брали участь, наприклад Елронд і Галадріель.', 'img/silmarillion.jpg'),
(3, 1, 'KUGOO M365', 599.99, 'Електросамокат Kugoo M365 чорний виконаний з алюмінію авіаційного класу, який має малу щільністю, але високими характеристиками міцності, також має гарну теплопровідність і стійкість до корозії. Стильний дизайн і зручні антиковзні ручки, дозволяє купити електросамокат як для чоловіків, як і для жінок.', 'img/scooter.jpg'),
(4, 3, 'Ігровий мікрофон FIFINE A6 RGB', 65.99, 'USB мікрофон Fifine A6V AMPLIGAME призначений для запису та передачі кришталево чистого звуку. Цей мікрофон має високу чутливість до будь-яких відтінків голосу, він уловлює та чітко передає будь-які зміни інтонації, а також зменшує фонові шуми, щоб підвищити якість звуку вашої трансляції.', 'img/microphone.jpg'),
(5, 4, 'Диски MAK MAGMA', 279.99, 'Прекрасні і надійні диски MAK Magma Matt Titan стануть дуже стильним і надійним супутником Вашого автомобіля.', 'img/diski.jpg');

-- --------------------------------------------------------

--
-- Структура таблиці `user_datas`
--

CREATE TABLE `user_datas` (
  `user_id` bigint UNSIGNED NOT NULL,
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(14) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп даних таблиці `user_datas`
--

INSERT INTO `user_datas` (`user_id`, `name`, `email`, `phone`, `password`, `created_at`, `updated_at`) VALUES
(10, 'serg', 'email@gmail.com', '1111', '$2y$10$fFiBwHAJi3CKztWZjfHE2uar4/n.eDZEy8kX4umtsavMwxvU7beN6', '2023-04-09 10:43:41', '2023-04-09 10:43:41'),
(17, 'sergey', 'sergey@gmail.com', '111111', '$2y$10$G3IR5nndlqrGsZWoSDbkguMGJeS4iYl1Va1btBDlec16wz6tVkEhe', '2023-04-09 10:57:08', '2023-04-09 10:57:08'),
(35, 'swer', 'qwe@fgs', '12123', '$2y$10$a7uQXo3MirN8IJjDXb4xheLILAnZhtOsTV6f9fKXEvUZ45HjciGka', '2023-04-09 15:37:16', '2023-04-09 15:37:16'),
(38, 'anna', 'anna@gmail.com', '0506789021', '$2y$10$7fofxXMwff/EWDWntmwNXuiIAQioA4iAK6dZz1L.pjcLOuR/OF6zO', '2023-04-09 15:59:56', '2023-04-09 15:59:56');

--
-- Індекси збережених таблиць
--

--
-- Індекси таблиці `businesses`
--
ALTER TABLE `businesses`
  ADD PRIMARY KEY (`business_id`);

--
-- Індекси таблиці `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Індекси таблиці `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Індекси таблиці `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `products_business_id_foreign` (`business_id`);

--
-- Індекси таблиці `user_datas`
--
ALTER TABLE `user_datas`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `phone` (`phone`);

--
-- AUTO_INCREMENT для збережених таблиць
--

--
-- AUTO_INCREMENT для таблиці `businesses`
--
ALTER TABLE `businesses`
  MODIFY `business_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблиці `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблиці `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблиці `products`
--
ALTER TABLE `products`
  MODIFY `product_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблиці `user_datas`
--
ALTER TABLE `user_datas`
  MODIFY `user_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- Обмеження зовнішнього ключа збережених таблиць
--

--
-- Обмеження зовнішнього ключа таблиці `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_business_id_foreign` FOREIGN KEY (`business_id`) REFERENCES `businesses` (`business_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
