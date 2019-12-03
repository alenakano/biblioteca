-- MySQL Administrator dump 1.4
--
-- ------------------------------------------------------
-- Server version	5.1.73-community


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


--
-- Create schema biblioteca
--

CREATE DATABASE IF NOT EXISTS biblioteca;
USE biblioteca;

--
-- Definition of table `exemplar`
--

DROP TABLE IF EXISTS `exemplar`;
CREATE TABLE `exemplar` (
  `IdExemplar` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `IdObra` int(10) unsigned NOT NULL,
  `NumExemplar` int(10) unsigned NOT NULL,
  `Local` varchar(255) NOT NULL,
  `DataAquisicao` datetime NOT NULL,
  `DataCadastro` datetime NOT NULL,
  `Status` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`IdExemplar`),
  KEY `Unique` (`IdObra`,`NumExemplar`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `exemplar`
--

/*!40000 ALTER TABLE `exemplar` DISABLE KEYS */;
/*!40000 ALTER TABLE `exemplar` ENABLE KEYS */;


--
-- Definition of table `obra`
--

DROP TABLE IF EXISTS `obra`;
CREATE TABLE `obra` (
  `IdObra` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `IdTipo` int(10) unsigned NOT NULL,
  `Identificador` varchar(30) NOT NULL,
  `Titulo` varchar(255) NOT NULL,
  `Autor` varchar(255) NOT NULL,
  `Ano` datetime NOT NULL,
  `Pais` varchar(255) NOT NULL,
  `Editora` varchar(255) NOT NULL,
  `Descricao` varchar(255) DEFAULT NULL,
  `Idioma` varchar(255) NOT NULL,
  `CDD` varchar(30) NOT NULL,
  `Status` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`IdObra`),
  KEY `UNIQUE` (`Identificador`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `obra`
--

/*!40000 ALTER TABLE `obra` DISABLE KEYS */;
/*!40000 ALTER TABLE `obra` ENABLE KEYS */;


--
-- Definition of table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
CREATE TABLE `usuario` (
  `IdUsuario` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `CPF` varchar(11) NOT NULL,
  `NomeUsuario` varchar(255) NOT NULL,
  `DataNascimento` datetime NOT NULL,
  `Email` varchar(255) NOT NULL,
  `CEP` varchar(9) NOT NULL,
  `Endereco` varchar(255) NOT NULL,
  `Complemento` varchar(255) DEFAULT NULL,
  `Bairro` varchar(255) NOT NULL,
  `Cidade` varchar(255) NOT NULL,
  `Status` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`IdUsuario`),
  KEY `UNIQUE` (`CPF`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `usuario`
--

--
-- Definition of table `emprestimo`
--

DROP TABLE IF EXISTS `emprestimo`;
CREATE TABLE `emprestimo` (
  `IdEmprestimo` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `IdExemplar` int(10) unsigned NOT NULL,
  `IDUsuario` int(10) unsigned NOT NULL,
  `DataEmprestimo` datetime NOT NULL,
  `DataPrevisao` datetime NOT NULL,
  `DataDevolucao` datetime NOT NULL,
  `Status` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`IdEmprestimo`),
  KEY `FK_EXEMPLAR` (`IdExemplar`),
  KEY `FK_USUARIO` (`IDUsuario`),
  CONSTRAINT `FK_EXEMPLAR` FOREIGN KEY (`IdExemplar`) REFERENCES `exemplar` (`IdExemplar`),
  CONSTRAINT `FK_USUARIO` FOREIGN KEY (`IDUsuario`) REFERENCES `usuario` (`IdUsuario`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `emprestimo`
--

/*!40000 ALTER TABLE `emprestimo` DISABLE KEYS */;
/*!40000 ALTER TABLE `emprestimo` ENABLE KEYS */;



/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;




/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
