package br.ueg.trindade.eduarda_mygarden_fullstack.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import br.ueg.trindade.eduarda_mygarden_fullstack.model.Secao;

public interface SecaoRepository extends JpaRepository<Secao, Long> {
}
