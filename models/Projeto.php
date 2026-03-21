<?php
require_once 'Requisito.php';

class Projeto {
    private $nome;
    private $descricao;
    private $data_inicio;
    private $requisitos = [];

    public function __construct($nome, $descricao, $data_inicio){
        $this->nome = $nome;
        $this->descricao = $descricao;
        $this->data_inicio = $data_inicio;
    }

    public function getNome(){ return $this->nome; }
    public function getDescricao(){ return $this->descricao; }
    public function getDataInicio(){ return $this->data_inicio; }

    public function adicionarRequisito(Requisito $requisito) {
        $this->requisitos[] = $requisito;
    }

    public function getRequisitos() {
        return $this->requisitos;
    }

    public function calcularPercentualConcluido() {
        $total = count($this->requisitos);
        if ($total === 0) return 0;

        $concluidos = 0;
        foreach ($this->requisitos as $req) {
            if ($req->getStatus() === "Concluído") {
                $concluidos++;
            }
        }
        return ($concluidos / $total) * 100;
    }

    // PONTO 5: Filtros (Requisito do tema)
    public function filtrarPorPrioridade($nivel) {
        return array_filter($this->requisitos, function($req) use ($nivel) {
            return $req->getPrioridade() === $nivel; 
        });
    }

    public function filtrarPorTipo($tipo) {
        return array_filter($this->requisitos, function($req) use ($tipo) {
            return $req->getTipo() === $tipo; 
        });
    }

    // PONTO 6: Métricas complementares
    public function contarPorTipo($tipo) {
        return count($this->filtrarPorTipo($tipo));
    }
} 
