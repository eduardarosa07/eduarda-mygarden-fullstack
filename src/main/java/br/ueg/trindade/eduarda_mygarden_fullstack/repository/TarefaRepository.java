package br.ueg.trindade.eduarda_mygarden_fullstack.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import br.ueg.trindade.eduarda_mygarden_fullstack.model.Tarefa;

public interface TarefaRepository extends JpaRepository<Tarefa, Long> {
    long countBySecaoId(Long secaoId);
    long countBySecaoIdAndConcluidaTrue(Long secaoId);
}
