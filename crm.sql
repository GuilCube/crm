-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: localhost:3306
-- Час створення: Трв 17 2024 р., 13:32
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
-- Структура таблиці `depotworker`
--

CREATE TABLE `depotworker` (
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
-- Структура таблиці `lead`
--

CREATE TABLE `lead` (
  `l_id` tinyint NOT NULL,
  `l_status` enum('Контакт','Перемовини','Оплата','Успіх','Не реалізовано') NOT NULL,
  `type` enum('Фізична особа','Юридична особа') NOT NULL,
  `l_name` varchar(50) NOT NULL,
  `phone` tinyint NOT NULL,
  `email` varchar(50) NOT NULL,
  `m_id` int NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Структура таблиці `manager`
--

CREATE TABLE `manager` (
  `m_id` int NOT NULL,
  `m_login` varchar(50) NOT NULL,
  `m_pass` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
-- Індекси таблиці `depotworker`
--
ALTER TABLE `depotworker`
  ADD PRIMARY KEY (`w_id`);

--
-- Індекси таблиці `goods`
--
ALTER TABLE `goods`
  ADD PRIMARY KEY (`g_id`);

--
-- Індекси таблиці `lead`
--
ALTER TABLE `lead`
  ADD PRIMARY KEY (`l_id`),
  ADD KEY `m_id` (`m_id`);

--
-- Індекси таблиці `manager`
--
ALTER TABLE `manager`
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
-- AUTO_INCREMENT для таблиці `depotworker`
--
ALTER TABLE `depotworker`
  MODIFY `w_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблиці `goods`
--
ALTER TABLE `goods`
  MODIFY `g_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблиці `lead`
--
ALTER TABLE `lead`
  MODIFY `l_id` tinyint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблиці `manager`
--
ALTER TABLE `manager`
  MODIFY `m_id` int NOT NULL AUTO_INCREMENT;

--
-- Обмеження зовнішнього ключа збережених таблиць
--

--
-- Обмеження зовнішнього ключа таблиці `lead`
--
ALTER TABLE `lead`
  ADD CONSTRAINT `lead_ibfk_1` FOREIGN KEY (`m_id`) REFERENCES `manager` (`m_id`) ON UPDATE CASCADE;

--
-- Обмеження зовнішнього ключа таблиці `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`g_id`) REFERENCES `goods` (`g_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`m_id`) REFERENCES `manager` (`m_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`l_id`) REFERENCES `lead` (`l_id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
