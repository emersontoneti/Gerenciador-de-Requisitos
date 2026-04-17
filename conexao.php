<?php
$host = "localhost";
$usuario = "root";
$senha = "";
$banco = "repmanager";

try {
    mysqli_report(MYSQLI_REPORT_STRICT | MYSQLI_REPORT_ERROR);
    $conn = new mysqli($host, $usuario, $senha, $banco);
    $conn->set_charset("utf8mb4");
} catch (Exception $e) {
    header('Content-Type: application/json');
    echo json_encode(["sucesso" => false, "erro" => "Falha no banco de dados. Verifique se o MySQL está rodando e se o banco 'repmanager' foi criado."]);
    exit;
}
?>