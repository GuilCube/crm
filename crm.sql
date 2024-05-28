-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: localhost:3306
-- Час створення: Трв 28 2024 р., 13:34
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
-- База даних: `crm`
--

-- --------------------------------------------------------

--
-- Структура таблиці `depotworkers`
--

CREATE TABLE `depotworkers` (
  `w_id` int NOT NULL,
  `w_login` varchar(50) NOT NULL,
  `w_password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп даних таблиці `depotworkers`
--

INSERT INTO `depotworkers` (`w_id`, `w_login`, `w_password`) VALUES
(1, 'depot', 'depot');

-- --------------------------------------------------------

--
-- Структура таблиці `goods`
--

CREATE TABLE `goods` (
  `g_id` int NOT NULL,
  `g_name` varchar(50) NOT NULL,
  `g_articul` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `g_quantity` tinyint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп даних таблиці `goods`
--

INSERT INTO `goods` (`g_id`, `g_name`, `g_articul`, `g_quantity`) VALUES
(1, 'Shure SM-58', 'SM58', 10),
(2, 'Rode PSA1', 'ROD1', 5);

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
(1, 'Фізична особа', 'Перемовини', '0678335666', 'Петронко Петро Петрович', 'petrenko@gmail.com', '', 1, '2024-05-17 15:12:42'),
(2, 'Фізична особа', 'Не реалізовано', '380800553555', 'Данило Петрович', 'danylo@gmail.com', '', 1, '2024-05-20 14:01:01'),
(3, 'Фізична особа', 'Контакт', '380678335686', 'Кармелюк Олександр', 'oleksa@gmail.com', '', 1, '2024-05-23 09:49:01'),
(4, 'Юридична особа', 'Перемовини', '380678335676', 'Кармелюк Олександра', 'oleksandra@gmail.com', '', 1, '2024-05-27 21:04:27'),
(5, 'Фізична особа', 'Перемовини', '380678335676', 'Кармелюк Олександра', 'oleksa@gmail.com', '', 1, '2024-05-28 09:30:57');

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
  `l_id` tinyint NOT NULL,
  `o_status` enum('Оформлено','Комплектується','Відправлено') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `adress` varchar(50) NOT NULL,
  `o_comment` varchar(1000) NOT NULL,
  `m_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп даних таблиці `orders`
--

INSERT INTO `orders` (`o_id`, `l_id`, `o_status`, `adress`, `o_comment`, `m_id`) VALUES
(3, 1, 'Оформлено', '123 Main St, Kyiv', 'Please deliver between 9 AM and 5 PM', 1);

-- --------------------------------------------------------

--
-- Структура таблиці `order_items`
--

CREATE TABLE `order_items` (
  `oi_id` int NOT NULL,
  `o_id` int NOT NULL,
  `g_id` int NOT NULL,
  `g_quantity` tinyint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп даних таблиці `order_items`
--

INSERT INTO `order_items` (`oi_id`, `o_id`, `g_id`, `g_quantity`) VALUES
(4, 3, 1, 3),
(5, 3, 2, 1);

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
  ADD KEY `l_id` (`l_id`);

--
-- Індекси таблиці `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`oi_id`),
  ADD KEY `o_id` (`o_id`),
  ADD KEY `g_id` (`g_id`);

--
-- AUTO_INCREMENT для збережених таблиць
--

--
-- AUTO_INCREMENT для таблиці `depotworkers`
--
ALTER TABLE `depotworkers`
  MODIFY `w_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблиці `goods`
--
ALTER TABLE `goods`
  MODIFY `g_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблиці `leads`
--
ALTER TABLE `leads`
  MODIFY `idLead` tinyint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблиці `managers`
--
ALTER TABLE `managers`
  MODIFY `m_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблиці `orders`
--
ALTER TABLE `orders`
  MODIFY `o_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблиці `order_items`
--
ALTER TABLE `order_items`
  MODIFY `oi_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`m_id`) REFERENCES `managers` (`m_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`l_id`) REFERENCES `leads` (`idLead`) ON UPDATE CASCADE;

--
-- Обмеження зовнішнього ключа таблиці `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`o_id`) REFERENCES `orders` (`o_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`g_id`) REFERENCES `goods` (`g_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
