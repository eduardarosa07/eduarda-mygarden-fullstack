package br.ueg.trindade.eduarda_mygarden_fullstack.config;

import java.util.HashSet;
import java.util.Set;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import br.ueg.trindade.eduarda_mygarden_fullstack.model.Permissao;
import br.ueg.trindade.eduarda_mygarden_fullstack.model.Usuario;
import br.ueg.trindade.eduarda_mygarden_fullstack.repository.PermissaoRepository;
import br.ueg.trindade.eduarda_mygarden_fullstack.repository.UsuarioRepository;

@Configuration
public class ConfiguracaoInicial {

    @Bean
    CommandLineRunner carregarDados(UsuarioRepository usuarios, PermissaoRepository permissoes, PasswordEncoder encoder) {
        return args -> {
            Permissao admin = permissoes.findByNomeIgnoreCase("ADMIN")
                    .orElseGet(() -> permissoes.save(new Permissao("ADMIN", "Acesso total")));
            Permissao user = permissoes.findByNomeIgnoreCase("USER")
                    .orElseGet(() -> permissoes.save(new Permissao("USER", "Acesso comum")));

            if (usuarios.findByUsernameIgnoreCase("admin").isEmpty()) {
                Usuario usuario = new Usuario();
                usuario.setNome("Administrador");
                usuario.setUsername("admin");
                usuario.setSenha(encoder.encode("admin123"));
                usuario.setEmail("admin@mygarden.local");
                usuario.setPermissoes(new HashSet<>(Set.of(admin, user)));
                usuarios.save(usuario);
            }
        };
    }
}
