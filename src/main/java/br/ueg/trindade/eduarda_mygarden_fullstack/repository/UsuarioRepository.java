package br.ueg.trindade.eduarda_mygarden_fullstack.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import br.ueg.trindade.eduarda_mygarden_fullstack.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    boolean existsByUsernameIgnoreCase(String username);
    boolean existsByEmailIgnoreCase(String email);
    boolean existsByUsernameIgnoreCaseAndIdNot(String username, Long id);
    boolean existsByEmailIgnoreCaseAndIdNot(String email, Long id);
}
