<?php
require_once 'conexao.php';

// Pega os filtros da URL
$tipo = isset($_GET['tipo']) ? $_GET['tipo'] : '';
$prioridade = isset($_GET['prioridade']) ? $_GET['prioridade'] : '';
$status = isset($_GET['status']) ? $_GET['status'] : '';
$id_projeto = isset($_GET['id_projeto']) ? $_GET['id_projeto'] : '';

// Monta a query com os filtros
$sql = "SELECT * FROM requisitos WHERE 1=1";

if ($tipo !== '') $sql .= " AND tipo = '$tipo'";
if ($prioridade !== '') $sql .= " AND prioridade = '$prioridade'";
if ($status !== '') $sql .= " AND status = '$status'";
if ($id_projeto !== '') $sql .= " AND id_projeto = '$id_projeto'";

$resultado = $conn->query($sql);

$requisitos = [];
while ($row = $resultado->fetch_assoc()) {
    $requisitos[] = $row;
}

// Métricas
$total = count($requisitos);
$funcionais = count(array_filter($requisitos, fn($r) => $r['tipo'] === 'funcional'));
$nao_funcionais = count(array_filter($requisitos, fn($r) => $r['tipo'] === 'nao-funcional'));
$concluidos = count(array_filter($requisitos, fn($r) => $r['status'] === 'concluido'));
$percentual = $total > 0 ? round(($concluidos / $total) * 100) : 0;

echo json_encode([
    "requisitos" => $requisitos,
    "metricas" => [
        "total" => $total,
        "funcionais" => $funcionais,
        "nao_funcionais" => $nao_funcionais,
        "concluidos" => $concluidos,
        "percentual_concluido" => $percentual
    ]
]);
?>