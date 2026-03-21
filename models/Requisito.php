<?php

class Requisito {

    private $titulo;
    private $descricao;
    private $tipo; //funcional e não funcional
    private $prioridade;
    private $status;
    private $id_projeto;

    public function __construct($titulo, $descricao, $tipo, $prioridade, $status, $id_projeto){
        $this->titulo = $titulo;
        $this->descricao = $descricao;
        $this->tipo = $tipo;
        $this->prioridade = $prioridade;
        $this->status = $status;
        $this->id_projeto = $id_projeto;
    }

    public function getTitulo() {
        return $this->titulo;
    }

    public function getDescricao() {
        return $this->descricao;
    }

    public function getTipo() {
        return $this->tipo;
    }

    public function getPrioridade() {
        return $this->prioridade;
    }

    public function getStatus() {
        return $this->status;
    }

    public function getIdProjeto() {
        return $this->id_projeto;
    }

    public function cadastrar($conn) {
    $sql = "INSERT INTO requisitos (titulo, descricao, tipo, prioridade, status, id_projeto)
            VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);

    $stmt->bind_param(
        "sssssi",
        $this->titulo,
        $this->descricao,
        $this->tipo,
        $this->prioridade,
        $this->status,
        $this->id_projeto,
    );

    return $stmt->execute();
}

?>
