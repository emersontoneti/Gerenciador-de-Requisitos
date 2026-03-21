<?php

require_once 'models/Requisito.php';
require_once 'models/Projeto.php';

$meuProjeto = new Projeto("Sistema de Gestão", "Projeto da Faculdade", "2026-03-21");

$req1 = new Requisito("Login", "Criar tela de login", "funcional", "alta", "Concluído", 1);
$req2 = new Requisito("Cores", "Mudar azul para verde", "nao-funcional", "baixa", "Aberto", 1);
$req3 = new Requisito("Relatório", "Gerar PDF", "funcional", "media", "Concluído", 1);

$meuProjeto->adicionarRequisito($req1);
$meuProjeto->adicionarRequisito($req2);
$meuProjeto->adicionarRequisito($req3);

echo "<h2>Testando Métricas do Projeto</h2>";
echo "Total de Requisitos: " . count($meuProjeto->getRequisitos()) . "<br>";
echo "Percentual Concluído: " . $meuProjeto->calcularPercentualConcluido() . "%<br>";
echo "Requisitos Funcionais: " . $meuProjeto->contarPorTipo('funcional') . "<br>";

echo "<h2>Testando Filtros</h2>";
$altaPrioridade = $meuProjeto->filtrarPorPrioridade('alta');
echo "Requisitos de Alta Prioridade: " . count($altaPrioridade);
?>
