-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: classmysql.engr.oregonstate.edu:3306
-- Generation Time: May 07, 2019 at 03:44 PM
-- Server version: 10.3.13-MariaDB-log
-- PHP Version: 7.0.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs340_shaars`
--

-- --------------------------------------------------------

--
-- Table structure for table `mmo_itemSubClass`
--

CREATE TABLE `mmo_itemSubClass` (
  `class_id` tinyint(3) NOT NULL,
  `subclass_id` int(11) UNSIGNED NOT NULL DEFAULT 0,
  `subclass` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `mmo_itemSubClass`
--

INSERT INTO `mmo_itemSubClass` (`class_id`, `subclass_id`, `subclass`) VALUES
(0, 0, 'Consumable'),
(1, 0, 'Container, Bag'),
(1, 1, 'Container, Soul bag'),
(1, 2, 'Container, Herb bag'),
(1, 3, 'Container, Enchanting bag'),
(1, 4, 'Container, Engineering bag'),
(2, 0, 'Weapon, Axe 1H'),
(2, 1, 'Weapon, Axe 2H'),
(2, 2, 'Weapon, Bow'),
(2, 3, 'Weapon, Gun'),
(2, 4, 'Weapon, Mace 1H'),
(2, 5, 'Weapon, Mace 2H'),
(2, 6, 'Weapon, Polearm'),
(2, 7, 'Weapon, Sword 1H'),
(2, 8, 'Weapon, Sword 2H'),
(2, 10, 'Weapon, Staff'),
(2, 13, 'Weapon, Fist weapon'),
(2, 14, 'Weapon, Miscellaneous'),
(2, 15, 'Weapon, Dagger'),
(2, 16, 'Weapon, Thrown'),
(2, 17, 'Weapon, Spear'),
(2, 18, 'Weapon, Crossbow'),
(2, 19, 'Weapon, Wand'),
(2, 20, 'Weapon, Fishing pole'),
(4, 0, 'Armor, Miscellaneous'),
(4, 1, 'Armor, Cloth'),
(4, 2, 'Armor, Leather'),
(4, 3, 'Armor, Mail'),
(4, 4, 'Armor, Plate'),
(4, 6, 'Armor, Shield'),
(4, 7, 'Armor, Libram'),
(4, 8, 'Armor, Idol'),
(4, 9, 'Armor, Totem'),
(5, 0, 'Reagent'),
(6, 2, 'Projectile, Arrow'),
(6, 3, 'Projectile, Bullet'),
(7, 0, 'Trade goods, Trade goods'),
(7, 1, 'Trade goods, Parts'),
(7, 2, 'Trade goods, Explosives'),
(7, 3, 'Trade goods, Devices'),
(9, 0, 'Recipe, Book'),
(9, 1, 'Recipe, Leatherworking'),
(9, 2, 'Recipe, Tailoring'),
(9, 3, 'Recipe, Engineering'),
(9, 4, 'Recipe, Blacksmithing'),
(9, 5, 'Recipe, Cooking'),
(9, 6, 'Recipe, Alchemy'),
(9, 7, 'Recipe, First aid'),
(9, 8, 'Recipe, Enchanting'),
(9, 9, 'Recipe, Fishing'),
(11, 2, 'Quiver'),
(11, 3, 'Ammo pouch'),
(12, 0, 'Quest'),
(13, 0, 'Key'),
(13, 1, 'Lockpick'),
(15, 0, 'Miscellaneous, Junk');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `mmo_itemSubClass`
--
ALTER TABLE `mmo_itemSubClass`
  ADD PRIMARY KEY (`class_id`,`subclass_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
