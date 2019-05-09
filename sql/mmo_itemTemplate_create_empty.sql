-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: classmysql.engr.oregonstate.edu:3306
-- Generation Time: May 07, 2019 at 04:26 PM
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
-- Table structure for table `mmo_itemTemplate`
--

CREATE TABLE `mmo_itemTemplate` (
  `id` mediumint(8) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Item prototype ID.',
  `itemClass_id` tinyint(3) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Class of the item.',
  `itemSubClass_id` tinyint(3) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'The subclass of the item template.',
  `name` varchar(255) NOT NULL DEFAULT '' COMMENT 'Item name.',
  `itemIcon_id` mediumint(8) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'A display model identifier for the Item.',
  `itemQuality_id` tinyint(3) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Quality of item.',
  `BuyPrice` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Item buying price (coppers).',
  `SellPrice` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Item selling price (coppers).',
  `ItemLevel` tinyint(3) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Level of item.',
  `RequiredLevel` tinyint(3) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Required level.',
  `maxcount` smallint(5) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'The maximum amount of copies of the item that a character may have.',
  `stackable` smallint(5) UNSIGNED NOT NULL DEFAULT 1 COMMENT 'Maximum stack size.',
  `stat_type1` tinyint(3) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'An item modifier to apply for this item. ',
  `stat_value1` smallint(6) NOT NULL DEFAULT 0 COMMENT 'The value to add for the matching modifier.',
  `stat_type2` tinyint(3) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'An item modifier to apply for this item. ',
  `stat_value2` smallint(6) NOT NULL DEFAULT 0 COMMENT 'The value to add for the matching modifier.',
  `stat_type3` tinyint(3) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'An item modifier to apply for this item. ',
  `stat_value3` smallint(6) NOT NULL DEFAULT 0 COMMENT 'The value to add for the matching modifier.',
  `stat_type4` tinyint(3) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'An item modifier to apply for this item. ',
  `stat_value4` smallint(6) NOT NULL DEFAULT 0 COMMENT 'The value to add for the matching modifier.',
  `stat_type5` tinyint(3) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'An item modifier to apply for this item. ',
  `stat_value5` smallint(6) NOT NULL DEFAULT 0 COMMENT 'The value to add for the matching modifier.',
  `stat_type6` tinyint(3) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'An item modifier to apply for this item. ',
  `stat_value6` smallint(6) NOT NULL DEFAULT 0 COMMENT 'The value to add for the matching modifier.',
  `stat_type7` tinyint(3) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'An item modifier to apply for this item. ',
  `stat_value7` smallint(6) NOT NULL DEFAULT 0 COMMENT 'The value to add for the matching modifier.',
  `stat_type8` tinyint(3) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'An item modifier to apply for this item. ',
  `stat_value8` smallint(6) NOT NULL DEFAULT 0 COMMENT 'The value to add for the matching modifier.',
  `stat_type9` tinyint(3) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'An item modifier to apply for this item. ',
  `stat_value9` smallint(6) NOT NULL DEFAULT 0 COMMENT 'The value to add for the matching modifier.',
  `stat_type10` tinyint(3) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'An item modifier to apply for this item. ',
  `stat_value10` smallint(6) NOT NULL DEFAULT 0 COMMENT 'The value to add for the matching modifier.',
  `dmg_min1` float NOT NULL DEFAULT 0 COMMENT 'The minimum damage caused by the item.',
  `dmg_max1` float NOT NULL DEFAULT 0 COMMENT 'The maximum damage caused by the item.',
  `dmg_type1` tinyint(3) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'The type of damage the matching dmg_min/dmg_max fields cause.',
  `dmg_min2` float NOT NULL DEFAULT 0 COMMENT 'The minimum damage caused by the item.',
  `dmg_max2` float NOT NULL DEFAULT 0 COMMENT 'The maximum damage caused by the item.',
  `dmg_type2` tinyint(3) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'The type of damage the matching dmg_min/dmg_max fields cause.',
  `dmg_min3` float NOT NULL DEFAULT 0 COMMENT 'The minimum damage caused by the item.',
  `dmg_max3` float NOT NULL DEFAULT 0 COMMENT 'The maximum damage caused by the item.',
  `dmg_type3` tinyint(3) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'The type of damage the matching dmg_min/dmg_max fields cause.',
  `dmg_min4` float NOT NULL DEFAULT 0 COMMENT 'The minimum damage caused by the item.',
  `dmg_max4` float NOT NULL DEFAULT 0 COMMENT 'The maximum damage caused by the item.',
  `dmg_type4` tinyint(3) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'The type of damage the matching dmg_min/dmg_max fields cause.',
  `dmg_min5` float NOT NULL DEFAULT 0 COMMENT 'The minimum damage caused by the item.',
  `dmg_max5` float NOT NULL DEFAULT 0 COMMENT 'The maximum damage caused by the item.',
  `dmg_type5` tinyint(3) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'The type of damage the matching dmg_min/dmg_max fields cause.',
  `armor` smallint(5) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'The armor value of the item.',
  `delay` smallint(5) UNSIGNED NOT NULL DEFAULT 1000 COMMENT 'The delay in milliseconds between successive hits for the item.',
  `itemBonding_id` tinyint(3) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Defines if and how and item will be bound to a character. ',
  `description` varchar(255) NOT NULL DEFAULT '' COMMENT 'A short - usually one sentence - description of the item. Mostly flavor texts.',
  `block` mediumint(8) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'If an item is a shield, this field holds the block chance.',
  `MaxDurability` smallint(5) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'The maximum durability for an item.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Item System' ROW_FORMAT=DYNAMIC;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `mmo_itemTemplate`
--
ALTER TABLE `mmo_itemTemplate`
  ADD PRIMARY KEY (`id`),
  ADD KEY `items_index` (`itemClass_id`),
  ADD KEY `itemSubClass_id` (`itemSubClass_id`),
  ADD KEY `itemIcon_id` (`itemIcon_id`,`itemQuality_id`,`itemBonding_id`),
  ADD KEY `stat_type1` (`stat_type1`,`stat_type2`,`stat_type3`,`stat_type4`,`stat_type5`,`stat_type6`,`stat_type7`,`stat_type8`,`stat_type9`,`stat_type10`),
  ADD KEY `itemQuality_fk` (`itemQuality_id`),
  ADD KEY `itemBonding_fk` (`itemBonding_id`),
  ADD KEY `itemStatType_fk1` (`stat_type2`),
  ADD KEY `itemStatType_fk2` (`stat_type3`),
  ADD KEY `itemStatType_fk3` (`stat_type4`),
  ADD KEY `itemStatType_fk4` (`stat_type5`),
  ADD KEY `itemStatType_fk5` (`stat_type6`),
  ADD KEY `itemStatType_fk6` (`stat_type7`),
  ADD KEY `itemStatType_fk7` (`stat_type8`),
  ADD KEY `itemStatType_fk8` (`stat_type9`),
  ADD KEY `itemStatType_fk9` (`stat_type10`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `mmo_itemTemplate`
--
ALTER TABLE `mmo_itemTemplate`
  ADD CONSTRAINT `itemBonding_fk` FOREIGN KEY (`itemBonding_id`) REFERENCES `mmo_itemBonding` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `itemClass_fk` FOREIGN KEY (`itemClass_id`) REFERENCES `mmo_itemClass` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `itemIcon_fk` FOREIGN KEY (`itemIcon_id`) REFERENCES `mmo_itemIcon` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `itemQuality_fk` FOREIGN KEY (`itemQuality_id`) REFERENCES `mmo_itemQuality` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `itemStatType_fk` FOREIGN KEY (`stat_type1`) REFERENCES `mmo_itemStatType` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `itemStatType_fk1` FOREIGN KEY (`stat_type2`) REFERENCES `mmo_itemStatType` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `itemStatType_fk2` FOREIGN KEY (`stat_type3`) REFERENCES `mmo_itemStatType` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `itemStatType_fk3` FOREIGN KEY (`stat_type4`) REFERENCES `mmo_itemStatType` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `itemStatType_fk4` FOREIGN KEY (`stat_type5`) REFERENCES `mmo_itemStatType` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `itemStatType_fk5` FOREIGN KEY (`stat_type6`) REFERENCES `mmo_itemStatType` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `itemStatType_fk6` FOREIGN KEY (`stat_type7`) REFERENCES `mmo_itemStatType` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `itemStatType_fk7` FOREIGN KEY (`stat_type8`) REFERENCES `mmo_itemStatType` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `itemStatType_fk8` FOREIGN KEY (`stat_type9`) REFERENCES `mmo_itemStatType` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `itemStatType_fk9` FOREIGN KEY (`stat_type10`) REFERENCES `mmo_itemStatType` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `itemSubClass_fk` FOREIGN KEY (`itemSubClass_id`) REFERENCES `mmo_itemSubClass` (`subclass_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
