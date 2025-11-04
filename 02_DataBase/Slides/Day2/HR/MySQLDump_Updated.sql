-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: db_updated
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department` (
  `dnum` int NOT NULL,
  `dname` varchar(45) DEFAULT NULL,
  `mgrssn` int DEFAULT NULL,
  `MGRStart Date` date DEFAULT NULL,
  PRIMARY KEY (`dnum`),
  KEY `fk_mgrssn_idx` (`mgrssn`),
  CONSTRAINT `fk_mgrssn` FOREIGN KEY (`mgrssn`) REFERENCES `employee` (`ssn`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES (10,'DP1',223344,'2005-01-01'),(20,'DP2',968574,'2006-03-01'),(30,'DP3',512463,'2006-06-01');
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dependent`
--

DROP TABLE IF EXISTS `dependent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dependent` (
  `essn` int DEFAULT NULL,
  `dependent_name` varchar(45) DEFAULT NULL,
  `gender` varchar(45) DEFAULT NULL,
  `bdate` date DEFAULT NULL,
  KEY `fk_essn_idx` (`essn`),
  CONSTRAINT `fk_essn` FOREIGN KEY (`essn`) REFERENCES `employee` (`ssn`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dependent`
--

LOCK TABLES `dependent` WRITE;
/*!40000 ALTER TABLE `dependent` DISABLE KEYS */;
INSERT INTO `dependent` VALUES (112233,'Hala Saied Ali','F','1970-10-18'),(223344,'Ahmed Kamel Mohamed','M','1998-03-27'),(223344,'Mona Adel Mohamed','F','1975-04-25'),(321654,'Ramy Amr Omran','M','1990-01-26'),(321654,'Omar Amr Omran','M','1993-03-30'),(321654,'Sanaa Gawish','F','1973-05-16'),(512463,'Sara Edward','F','2001-09-15'),(512463,'Nora Ghaly','F','1976-06-22');
/*!40000 ALTER TABLE `dependent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `fname` varchar(50) DEFAULT NULL,
  `lname` varchar(45) DEFAULT NULL,
  `ssn` int NOT NULL,
  `bdate` date DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `gender` varchar(45) DEFAULT NULL,
  `salary` int DEFAULT NULL,
  `superssn` int DEFAULT NULL,
  `dno` int DEFAULT NULL,
  PRIMARY KEY (`ssn`),
  KEY `fk_superssn_idx` (`superssn`),
  KEY `fk_dno_idx` (`dno`),
  CONSTRAINT `fk_dno` FOREIGN KEY (`dno`) REFERENCES `department` (`dnum`),
  CONSTRAINT `fk_superssn` FOREIGN KEY (`superssn`) REFERENCES `employee` (`ssn`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES ('Ahmed ','Ali',112233,'1965-01-01','15 Ali fahmy St.Giza','M',1300,223344,10),('Hanaa ','Sobhy',123456,'1973-03-18','38 Abdel Khalik Tharwat St. Downtown.Cairo','F',800,223344,10),('Kamel ','Mohamed',223344,'1970-10-15','38 Mohy el dien abo el Ezz  St.Cairo','M',1800,321654,10),('Amr','Omran',321654,'1963-09-14','44 Hilopolis.Cairo','M',2500,NULL,NULL),('Edward','Hanna',512463,'1972-08-19','18 Abaas El 3akaad St. Nasr City.Cairo','M',1500,321654,30),('Maged','Raoof',521634,'1980-04-06','18 Kholosi st.Shobra.Cairo','M',1000,968574,30),('Mariam','Adel',669955,'1982-06-12','269 El-Haram st. Giza','F',750,512463,20),('Noha ','Mohamed',968574,'1975-02-01','55 Orabi St. El Mohandiseen .Cairo','F',1600,321654,20);
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project` (
  `pname` varchar(45) DEFAULT NULL,
  `pnumber` int NOT NULL,
  `plocation` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `dnum` int DEFAULT NULL,
  PRIMARY KEY (`pnumber`),
  KEY `fk_pdnum_idx` (`dnum`),
  CONSTRAINT `fk_pdnum` FOREIGN KEY (`dnum`) REFERENCES `department` (`dnum`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
INSERT INTO `project` VALUES ('AL Solimaniah',100,'Cairo_Alex Road','Alex',10),('Al Rabwah',200,'6th of October City','Giza',10),('Al Rawdah',300,'Zaied City','Giza',10),('Al Rowad',400,'Cairo_Faiyom Road','Giza',20),('Al Rehab',500,'Nasr City','Cairo',30),('Pitcho american',600,'Maady','Cairo',30),('Ebad El Rahman',700,'Ring Road','Cairo',20);
/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `works_on`
--

DROP TABLE IF EXISTS `works_on`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `works_on` (
  `essn` int NOT NULL,
  `pno` int NOT NULL,
  `weekly_hours` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`essn`,`pno`),
  KEY `fk_pno_idx` (`pno`),
  CONSTRAINT `fk_essnp` FOREIGN KEY (`essn`) REFERENCES `employee` (`ssn`),
  CONSTRAINT `fk_pno` FOREIGN KEY (`pno`) REFERENCES `project` (`pnumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `works_on`
--

LOCK TABLES `works_on` WRITE;
/*!40000 ALTER TABLE `works_on` DISABLE KEYS */;
INSERT INTO `works_on` VALUES (112233,100,'40'),(223344,100,'10'),(223344,200,'10'),(223344,300,'10'),(223344,500,'10'),(512463,500,'10'),(512463,600,'25'),(521634,300,'6'),(521634,400,'4'),(521634,500,'10'),(521634,600,'20'),(669955,300,'10'),(669955,400,'20'),(669955,700,'7'),(968574,300,'10'),(968574,400,'15'),(968574,700,'15');
/*!40000 ALTER TABLE `works_on` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-10 22:18:30
