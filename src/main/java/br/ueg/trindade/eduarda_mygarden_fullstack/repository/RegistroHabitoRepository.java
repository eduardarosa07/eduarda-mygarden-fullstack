package br.ueg.trindade.eduarda_mygarden_fullstack.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import br.ueg.trindade.eduarda_mygarden_fullstack.model.RegistroHabito;

public interface RegistroHabitoRepository extends JpaRepository<RegistroHabito, Long> {
    List<RegistroHabito> findAllByHabitoUsuarioIdOrderByDataDesc(Long usuarioId);
    Optional<RegistroHabito> findByIdAndHabitoUsuarioId(Long id, Long usuarioId);
    boolean existsByHabitoIdAndData(Long habitoId, LocalDate data);
    boolean existsByHabitoIdAndDataAndIdNot(Long habitoId, LocalDate data, Long id);
}
