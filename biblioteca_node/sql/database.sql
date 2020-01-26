-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Tempo de geração: 26/01/2020 às 15:18
-- Versão do servidor: 10.1.40-MariaDB
-- Versão do PHP: 7.1.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `biblioteca2`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `emprestimo`
--
-- Erro ao ler a estrutura para a tabela biblioteca2.emprestimo: #1932 - Table 'biblioteca2.emprestimo' doesn't exist in engine
-- Erro ao ler dados para tabela biblioteca2.emprestimo: #1064 - Você tem um erro de sintaxe no seu SQL próximo a 'FROM `biblioteca2`.`emprestimo`' na linha 1

-- --------------------------------------------------------

--
-- Estrutura para tabela `exemplar`
--

CREATE TABLE `exemplar` (
  `idExemplar` int(10) UNSIGNED NOT NULL,
  `idObra` int(10) UNSIGNED NOT NULL,
  `numExemplar` int(10) UNSIGNED NOT NULL,
  `local` varchar(255) NOT NULL,
  `dataAquisicao` datetime NOT NULL,
  `dataCadastro` datetime NOT NULL,
  `status` int(10) UNSIGNED NOT NULL DEFAULT '0',
  `tomo` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Despejando dados para a tabela `exemplar`
--

INSERT INTO `exemplar` (`idExemplar`, `idObra`, `numExemplar`, `local`, `dataAquisicao`, `dataCadastro`, `status`, `tomo`) VALUES
(19, 6, 1, 'São Paulo', '2019-12-11 00:00:00', '2019-12-11 17:22:47', 0, NULL),
(24, 7, 1, 'BLAH 1234', '2019-12-07 02:00:00', '2019-12-11 20:39:39', 0, NULL),
(26, 9, 1, 'São Paulo', '2019-12-07 00:00:00', '2019-12-11 18:56:47', 3, NULL),
(27, 10, 1, 'UYTRE', '2019-12-11 00:00:00', '2019-12-11 18:57:44', 0, NULL),
(28, 9, 987654, 'XPTO', '2019-12-07 00:00:00', '2019-12-11 20:03:22', 3, NULL);

-- --------------------------------------------------------

--
-- Estrutura para tabela `obra`
--

CREATE TABLE `obra` (
  `idObra` int(10) UNSIGNED NOT NULL,
  `idTipo` int(10) UNSIGNED NOT NULL,
  `identificador` varchar(30) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `autor` varchar(255) NOT NULL,
  `ano` year(4) NOT NULL,
  `pais` varchar(255) NOT NULL,
  `editora` varchar(255) NOT NULL,
  `descricao` varchar(255) DEFAULT NULL,
  `idioma` varchar(255) NOT NULL,
  `CDD` varchar(30) NOT NULL,
  `status` int(10) UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Despejando dados para a tabela `obra`
--

INSERT INTO `obra` (`idObra`, `idTipo`, `identificador`, `titulo`, `autor`, `ano`, `pais`, `editora`, `descricao`, `idioma`, `CDD`, `status`) VALUES
(6, 1, '9788578887230', 'Dom Casmurro', 'Machado de Assis', 2019, 'Brasil', 'Panda Books', 'Clássico da literatura brasileira', 'Português', '869.3', 0),
(7, 1, '9788577992287', 'As aventuras de Huckleberry Finn ', 'Mark Twain', 2011, 'Estados Unidos', 'Best Seller', 'Edição de bolso', 'Português', '813', 0),
(8, 1, '9788536812670', 'Mundo Animal', 'Parragon Books', 2019, 'EUA', ' DCL - Difusão Cultural do Livro', NULL, 'Português', '456', 0),
(9, 2, '123456', 'Super Interessante', 'Grupo Abril', 2019, 'Brasil', 'Editora Abril', NULL, 'Português', '123', 0),
(10, 3, '0980980', 'Os melhores', 'Testando', 2013, 'Etiópia', 'HUH', 'Legal', 'Francês', '23434367', 0);

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuario`
--

CREATE TABLE `usuario` (
  `idUsuario` int(10) UNSIGNED NOT NULL,
  `CPF` varchar(11) NOT NULL,
  `nomeUsuario` varchar(255) NOT NULL,
  `dataNascimento` datetime NOT NULL,
  `email` varchar(255) NOT NULL,
  `endereco` varchar(255) NOT NULL,
  `complemento` varchar(255) DEFAULT NULL,
  `cidade` varchar(255) NOT NULL,
  `status` int(10) UNSIGNED NOT NULL DEFAULT '0',
  `dataBloqueio` datetime DEFAULT NULL,
  `dataDesbloqueio` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Despejando dados para a tabela `usuario`
--

INSERT INTO `usuario` (`idUsuario`, `CPF`, `nomeUsuario`, `dataNascimento`, `email`, `endereco`, `complemento`, `cidade`, `status`, `dataBloqueio`, `dataDesbloqueio`) VALUES
(1, '35094503880', 'Alexandre Nakano Marques', '2017-06-06 12:00:00', 'ale@ale.com', 'Rua do Teste, 1234', 'Vila Teste', 'São Paulo', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(4, '36699993887', 'José Teste', '2001-10-09 03:00:00', 'teste@gmail.com', 'Rua do Teste, 10000', 'casa', 'Teste', 0, NULL, NULL),
(5, '40252249844', 'Maria do Teste', '1997-02-11 02:00:00', 'maria@teste.co', 'Rua do teste, 233', '', 'São Paulo', 0, NULL, NULL),
(6, '40519065824', 'Anna Braz', '1993-03-01 03:00:00', 'anna@legal.com', 'rua teste', NULL, 'sao paulo', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

--
-- Índices de tabelas apagadas
--

--
-- Índices de tabela `exemplar`
--
ALTER TABLE `exemplar`
  ADD PRIMARY KEY (`idExemplar`),
  ADD UNIQUE KEY `Unique` (`idObra`,`numExemplar`) USING BTREE;

--
-- Índices de tabela `obra`
--
ALTER TABLE `obra`
  ADD PRIMARY KEY (`idObra`),
  ADD UNIQUE KEY `UNIQUE` (`identificador`) USING BTREE;

--
-- Índices de tabela `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idUsuario`),
  ADD UNIQUE KEY `UNIQUE` (`CPF`) USING BTREE;

--
-- AUTO_INCREMENT de tabelas apagadas
--

--
-- AUTO_INCREMENT de tabela `exemplar`
--
ALTER TABLE `exemplar`
  MODIFY `idExemplar` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de tabela `obra`
--
ALTER TABLE `obra`
  MODIFY `idObra` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de tabela `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idUsuario` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restrições para dumps de tabelas
--

--
-- Restrições para tabelas `exemplar`
--
ALTER TABLE `exemplar`
  ADD CONSTRAINT `FK_Obra` FOREIGN KEY (`idObra`) REFERENCES `obra` (`idObra`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
