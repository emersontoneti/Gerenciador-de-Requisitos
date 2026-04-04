-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 21/03/2026 às 15:07
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `repmanager`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `projetos`
--

CREATE TABLE `projetos` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `descricao` text NOT NULL,
  `data_inicio` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `projetos`
--

INSERT INTO `projetos` (`id`, `nome`, `descricao`, `data_inicio`) VALUES
(1, 'testeteste', 'testando', '0000-00-00'),
(2, 'teste1', 'BLA', '0000-00-00'),
(3, 'testando 4', 'Blas', '2026-03-21');

-- --------------------------------------------------------

--
-- Estrutura para tabela `requisitos`
--

CREATE TABLE `requisitos` (
  `id` int(11) NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `descricao` text NOT NULL,
  `tipo` enum('funcional','nao-funcional') NOT NULL,
  `prioridade` enum('baixa','media','alta') NOT NULL,
  `status` enum('aberto','desenvolvimento','concluido') NOT NULL DEFAULT 'aberto',
  `id_projeto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `projetos`
--
ALTER TABLE `projetos`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `requisitos`
--
ALTER TABLE `requisitos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_projeto` (`id_projeto`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `projetos`
--
ALTER TABLE `projetos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `requisitos`
--
ALTER TABLE `requisitos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `requisitos`
--
ALTER TABLE `requisitos`
  ADD CONSTRAINT `requisitos_ibfk_1` FOREIGN KEY (`id_projeto`) REFERENCES `projetos` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
