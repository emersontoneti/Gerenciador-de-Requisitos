<?php
require_once 'conexao.php';

// Pega os filtros da URL
$tipo = isset($_GET['tipo']) ? $_GET['tipo'] : '';
$prioridade = isset($_GET['prioridade']) ? $_GET['prioridade'] : '';
$status = isset($_GET['status']) ? $_GET['status'] : '';
$id_projeto = isset($_GET['id_projeto']) ? $_GET['id_projeto'] : '';

// Monta a query com os filtros usando prepared statements para evitar SQL Injection
$sql = "SELECT * FROM requisitos WHERE 1=1";
$tipos_bind = "";
$valores_bind = [];

if ($tipo !== '') {
    $sql .= " AND tipo = ?";
    $tipos_bind .= "s";
    $valores_bind[] = $tipo;
}
if ($prioridade !== '') {
    $sql .= " AND prioridade = ?";
    $tipos_bind .= "s";
    $valores_bind[] = $prioridade;
}
if ($status !== '') {
    $sql .= " AND status = ?";
    $tipos_bind .= "s";
    $valores_bind[] = $status;
}
if ($id_projeto !== '') {
    $sql .= " AND id_projeto = ?";
    $tipos_bind .= "i";
    $valores_bind[] = $id_projeto;
}

$stmt = $conn->prepare($sql);

if (!empty($tipos_bind)) {
    $stmt->bind_param($tipos_bind, ...$valores_bind);
}

$stmt->execute();
$resultado = $stmt->get_result();

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