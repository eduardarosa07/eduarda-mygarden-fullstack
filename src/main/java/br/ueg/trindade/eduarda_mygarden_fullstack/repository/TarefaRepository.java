package br.ueg.trindade.eduarda_mygarden_fullstack.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.ueg.trindade.eduarda_mygarden_fullstack.model.Tarefa;

public interface TarefaRepository extends JpaRepository<Tarefa, Long> {
    long countBySecaoId(Long secaoId);
    long countBySecaoIdAndConcluidaTrue(Long secaoId);
    List<Tarefa> findAllBySecaoUsuarioIdOrderByDataAscHorarioAsc(Long usuarioId);
    Optional<Tarefa> findByIdAndSecaoUsuarioId(Long id, Long usuarioId);
}
