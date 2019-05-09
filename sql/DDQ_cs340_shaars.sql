-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: classmysql.engr.oregonstate.edu:3306
-- Generation Time: May 06, 2019 at 07:10 PM
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
-- Table structure for table `mmo_account`
--

CREATE TABLE `mmo_account` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `Banned` tinyint(1) NOT NULL DEFAULT 0,
  `Offense` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `mmo_account`
--

INSERT INTO `mmo_account` (`id`, `email`, `password`, `Banned`, `Offense`) VALUES
(1, 'subhei999@gmail.com', 'password', 0, NULL),
(2, 'johndoe@gmail.com', 'password1', 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `mmo_character`
--

CREATE TABLE `mmo_character` (
  `id` int(11) NOT NULL,
  `account_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `race_id` int(11) DEFAULT NULL,
  `class_id` int(11) DEFAULT NULL,
  `lvl` int(11) DEFAULT 1,
  `maxHP` int(11) DEFAULT 1,
  `maxMana` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `mmo_character`
--

INSERT INTO `mmo_character` (`id`, `account_id`, `name`, `race_id`, `class_id`, `lvl`, `maxHP`, `maxMana`) VALUES
(1, 1, 'Themanslayer', 1, 2, 1, 1, 1),
(2, 1, 'Substeroni', 3, 8, 30, 156, 200),
(3, 2, 'Destroyer', 5, 6, 60, 2500, 4000);

-- --------------------------------------------------------

--
-- Table structure for table `mmo_class`
--

CREATE TABLE `mmo_class` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `mmo_class`
--

INSERT INTO `mmo_class` (`id`, `name`) VALUES
(1, 'Warrior'),
(2, 'Rogue'),
(3, 'Mage'),
(4, 'Warlock'),
(5, 'Shaman'),
(6, 'Paladin'),
(7, 'Priest'),
(8, 'Hunter');

-- --------------------------------------------------------

--
-- Table structure for table `mmo_faction`
--

CREATE TABLE `mmo_faction` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `population` int(11) NOT NULL,
  `capital` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `mmo_faction`
--

INSERT INTO `mmo_faction` (`id`, `name`, `population`, `capital`) VALUES
(1, 'Alliance', 0, 'Ironforge'),
(2, 'Horde', 0, 'Orgrimmar');

-- --------------------------------------------------------

--
-- Table structure for table `mmo_inventory`
--

CREATE TABLE `mmo_inventory` (
  `character_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `mmo_inventory`
--

INSERT INTO `mmo_inventory` (`character_id`, `item_id`) VALUES
(1, 1),
(3, 6),
(3, 7),
(2, 5),
(2, 5),
(2, 5),
(2, 1),
(1, 3),
(1, 3),
(1, 3);

-- --------------------------------------------------------

--
-- Table structure for table `mmo_item`
--

CREATE TABLE `mmo_item` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL DEFAULT 'Generic',
  `rarity` varchar(255) NOT NULL DEFAULT 'Common',
  `iLvl` int(11) NOT NULL DEFAULT 1,
  `minLvl` int(11) NOT NULL DEFAULT 1,
  `vendorPrice` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `mmo_item`
--

INSERT INTO `mmo_item` (`id`, `name`, `type`, `rarity`, `iLvl`, `minLvl`, `vendorPrice`) VALUES
(1, 'Short Sword', 'Melee Weapon', 'Common', 3, 1, 10),
(3, 'Wool Cloth', 'Trade Good', 'Common', 1, 1, 5),
(4, 'Silk Cloth', 'Trade Good', 'Common', 1, 1, 10),
(5, 'Mageweave Cloth', 'Trade Good', 'Common', 1, 1, 0),
(6, 'Sulfuras, Hand of Ragnaros', 'Melee Weapon', 'Legendary', 80, 60, 330),
(7, 'Helm of Wrath', 'Plate Head', 'Epic', 76, 60, 30);

-- --------------------------------------------------------

--
-- Table structure for table `mmo_race`
--

CREATE TABLE `mmo_race` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `faction_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `mmo_race`
--

INSERT INTO `mmo_race` (`id`, `name`, `faction_id`) VALUES
(1, 'Human', 1),
(2, 'Orc', 2),
(3, 'Night Elf', 1),
(4, 'Gnome', 1),
(5, 'Dwarf', 1),
(6, 'Troll', 2),
(7, 'Undead', 2),
(8, 'Tauren', 2);

-- --------------------------------------------------------

--
-- Table structure for table `mmo_reputation`
--

CREATE TABLE `mmo_reputation` (
  `faction_id` int(11) NOT NULL,
  `character_id` int(11) NOT NULL,
  `reputation` int(11) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `mmo_reputation`
--

INSERT INTO `mmo_reputation` (`faction_id`, `character_id`, `reputation`, `status`) VALUES
(1, 1, 95, 'Friendly'),
(1, 3, 250, 'Honored');

-- --------------------------------------------------------

--
-- Table structure for table `mmo_session`
--

CREATE TABLE `mmo_session` (
  `id` int(11) NOT NULL,
  `character_id` int(11) NOT NULL,
  `login` datetime NOT NULL DEFAULT current_timestamp(),
  `logout` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `mmo_session`
--

INSERT INTO `mmo_session` (`id`, `character_id`, `login`, `logout`) VALUES
(1, 1, '2019-05-03 00:00:00', '2019-05-04 15:18:04');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `mmo_account`
--
ALTER TABLE `mmo_account`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mmo_character`
--
ALTER TABLE `mmo_character`
  ADD PRIMARY KEY (`id`),
  ADD KEY `account_fk` (`account_id`),
  ADD KEY `race_fk` (`race_id`),
  ADD KEY `class_fk` (`class_id`);

--
-- Indexes for table `mmo_class`
--
ALTER TABLE `mmo_class`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mmo_faction`
--
ALTER TABLE `mmo_faction`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mmo_inventory`
--
ALTER TABLE `mmo_inventory`
  ADD KEY `item_fk` (`item_id`),
  ADD KEY `character_fk` (`character_id`);

--
-- Indexes for table `mmo_item`
--
ALTER TABLE `mmo_item`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mmo_race`
--
ALTER TABLE `mmo_race`
  ADD PRIMARY KEY (`id`),
  ADD KEY `faction_fk1` (`faction_id`);

--
-- Indexes for table `mmo_reputation`
--
ALTER TABLE `mmo_reputation`
  ADD KEY `character_fk2` (`character_id`),
  ADD KEY `faction_fk2` (`faction_id`) USING BTREE;

--
-- Indexes for table `mmo_session`
--
ALTER TABLE `mmo_session`
  ADD PRIMARY KEY (`id`),
  ADD KEY `character_fk1` (`character_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `mmo_account`
--
ALTER TABLE `mmo_account`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `mmo_character`
--
ALTER TABLE `mmo_character`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `mmo_class`
--
ALTER TABLE `mmo_class`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `mmo_faction`
--
ALTER TABLE `mmo_faction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `mmo_item`
--
ALTER TABLE `mmo_item`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `mmo_race`
--
ALTER TABLE `mmo_race`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `mmo_session`
--
ALTER TABLE `mmo_session`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `mmo_character`
--
ALTER TABLE `mmo_character`
  ADD CONSTRAINT `account_fk` FOREIGN KEY (`account_id`) REFERENCES `mmo_account` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `class_fk` FOREIGN KEY (`class_id`) REFERENCES `mmo_class` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `race_fk` FOREIGN KEY (`race_id`) REFERENCES `mmo_race` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `mmo_inventory`
--
ALTER TABLE `mmo_inventory`
  ADD CONSTRAINT `character_fk` FOREIGN KEY (`character_id`) REFERENCES `mmo_character` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `item_fk` FOREIGN KEY (`item_id`) REFERENCES `mmo_item` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `mmo_race`
--
ALTER TABLE `mmo_race`
  ADD CONSTRAINT `faction_fk1` FOREIGN KEY (`faction_id`) REFERENCES `mmo_faction` (`id`);

--
-- Constraints for table `mmo_reputation`
--
ALTER TABLE `mmo_reputation`
  ADD CONSTRAINT `character_fk2` FOREIGN KEY (`character_id`) REFERENCES `mmo_character` (`id`);

--
-- Constraints for table `mmo_session`
--
ALTER TABLE `mmo_session`
  ADD CONSTRAINT `character_fk1` FOREIGN KEY (`character_id`) REFERENCES `mmo_character` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
