# Sequel Pro dump
# Version 2492
# http://code.google.com/p/sequel-pro
#
# Host: 35.12.49.149 (MySQL 5.0.91-log)
# Database: clepsydra
# Generation Time: 2010-12-21 16:29:22 -0500
# ************************************************************

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table clepsydra_cards
# ------------------------------------------------------------

DROP TABLE IF EXISTS `clepsydra_cards`;

CREATE TABLE `clepsydra_cards` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `timein` int(11) DEFAULT '0',
  `timeout` int(11) DEFAULT '0',
  `person_id` int(11) NOT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=MyISAM AUTO_INCREMENT=56 DEFAULT CHARSET=latin1;


# Dump of table clepsydra_messages
# ------------------------------------------------------------

DROP TABLE IF EXISTS `clepsydra_messages`;

CREATE TABLE `clepsydra_messages` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) DEFAULT NULL,
  `message` text,
  `message_formatted` text,
  `user_id` int(11) DEFAULT NULL,
  `to_user` int(11) DEFAULT NULL,
  `general` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`uid`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

# Dump of table clepsydra_people
# ------------------------------------------------------------

DROP TABLE IF EXISTS `clepsydra_people`;

CREATE TABLE `clepsydra_people` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `salt` int(11) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `department` varchar(255) DEFAULT NULL,
  `pin` int(4) DEFAULT '0',
  `phone` varchar(10) DEFAULT '0',
  `active` tinyint(1) DEFAULT '0',
  `status` tinyint(1) DEFAULT '0',
  `is_admin` tinyint(1) DEFAULT '0',
  `track` tinyint(1) DEFAULT '1',
  `locked` int(11) DEFAULT '0',
  `attempts` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`uid`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
