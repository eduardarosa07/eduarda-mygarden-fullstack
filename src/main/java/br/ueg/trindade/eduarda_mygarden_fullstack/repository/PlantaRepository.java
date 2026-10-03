package br.ueg.trindade.eduarda_mygarden_fullstack.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import br.ueg.trindade.eduarda_mygarden_fullstack.model.Planta;

public interface PlantaRepository extends JpaRepository<Planta, Long> {
    Optional<Planta> findBySecaoId(Long secaoId);
}
