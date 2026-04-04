<?php
require_once 'conexao.php';
require_once 'models/Projeto.php';

$nome = $_POST['nome'];
$descricao = $_POST['descricao'];
$data_inicio = $_POST['data_inicio'];

$sql = "INSERT INTO projetos (nome, descricao, data_inicio) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $nome, $descricao, $data_inicio);

if ($stmt->execute()) {
    $id_projeto = $conn->insert_id;
    echo json_encode(["sucesso" => true, "id_projeto" => $id_projeto]);
} else {
    echo json_encode(["sucesso" => false, "erro" => $conn->error]);
}
?>