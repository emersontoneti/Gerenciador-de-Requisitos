<?php
require_once 'conexao.php';
require_once 'models/Requisito.php';

$titulo = $_POST['titulo'] ?? '';
$descricao = $_POST['descricao'] ?? '';
$tipo = $_POST['tipo'] ?? '';
$prioridade = $_POST['prioridade'] ?? '';
$status = $_POST['status'] ?? '';
$id_projeto = $_POST['id_projeto'] ?? '';

if(empty($titulo) || empty($descricao) || empty($tipo) || empty($id_projeto)) {
    echo json_encode(["sucesso" => false, "erro" => "Preencha todos os campos obrigatórios."]);
    exit;
}

$requisito = new Requisito($titulo, $descricao, $tipo, $prioridade, $status, $id_projeto);

if ($requisito->cadastrar($conn)) {
    echo json_encode(["sucesso" => true]);
} else {
    echo json_encode(["sucesso" => false, "erro" => $conn->error]);
}
?>