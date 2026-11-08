package br.ueg.trindade.eduarda_mygarden_fullstack.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.ueg.trindade.eduarda_mygarden_fullstack.model.Secao;

public interface SecaoRepository extends JpaRepository<Secao, Long> {
    List<Secao> findAllByUsuarioIdOrderByIdAsc(Long usuarioId);
    Optional<Secao> findByIdAndUsuarioId(Long id, Long usuarioId);
}
