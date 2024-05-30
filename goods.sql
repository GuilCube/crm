-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: localhost:3306
-- Час створення: Трв 30 2024 р., 09:39
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

--
-- Індекси збережених таблиць
--

--
-- Індекси таблиці `goods`
--
ALTER TABLE `goods`
  ADD PRIMARY KEY (`g_id`);

--
-- AUTO_INCREMENT для збережених таблиць
--

--
-- AUTO_INCREMENT для таблиці `goods`
--
ALTER TABLE `goods`
  MODIFY `g_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
