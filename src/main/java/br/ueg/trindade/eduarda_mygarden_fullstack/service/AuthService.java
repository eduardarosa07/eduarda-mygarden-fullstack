package br.ueg.trindade.eduarda_mygarden_fullstack.service;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.ueg.trindade.eduarda_mygarden_fullstack.model.Permissao;
import br.ueg.trindade.eduarda_mygarden_fullstack.model.Usuario;
import br.ueg.trindade.eduarda_mygarden_fullstack.repository.UsuarioRepository;
import br.ueg.trindade.eduarda_mygarden_fullstack.security.JwtUtil;
import br.ueg.trindade.eduarda_mygarden_fullstack.util.PasswordHashUtil;

@Service
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @Transactional
    public LoginResposta login(String username, String senha) {
        Usuario usuario = usuarioRepository.findByUsernameIgnoreCase(username)
                .orElseThrow(() -> new RuntimeException("Credenciais inválidas"));

        String hash = usuario.getSenha();
        boolean valido = hash != null && (hash.startsWith("$2")
                ? passwordEncoder.matches(senha, hash)
                : PasswordHashUtil.matches(senha, hash));

        if (!valido) {
            throw new RuntimeException("Credenciais inválidas");
        }

        // Compatibilidade com usuários criados antes da adoção do BCrypt.
        if (!hash.startsWith("$2")) {
            usuario.setSenha(passwordEncoder.encode(senha));
            usuarioRepository.save(usuario);
        }

        List<String> permissoes = usuario.getPermissoes().stream()
                .map(Permissao::getNome)
                .toList();

        return new LoginResposta(jwtUtil.gerarToken(usuario), usuario.getNome(), usuario.getUsername(), permissoes);
    }

    public record LoginResposta(String token, String nome, String username, List<String> permissoes) {}
}
