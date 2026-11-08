package br.ueg.trindade.eduarda_mygarden_fullstack.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import br.ueg.trindade.eduarda_mygarden_fullstack.model.Habito;

public interface HabitoRepository extends JpaRepository<Habito, Long> {
    List<Habito> findAllByUsuarioIdOrderByIdAsc(Long usuarioId);
    Optional<Habito> findByIdAndUsuarioId(Long id, Long usuarioId);
    boolean existsByUsuarioIdAndNomeIgnoreCase(Long usuarioId, String nome);
    boolean existsByUsuarioIdAndNomeIgnoreCaseAndIdNot(Long usuarioId, String nome, Long id);
}
