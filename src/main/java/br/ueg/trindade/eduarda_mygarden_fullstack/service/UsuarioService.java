package br.ueg.trindade.eduarda_mygarden_fullstack.service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import br.ueg.trindade.eduarda_mygarden_fullstack.dto.UsuarioRequest;
import br.ueg.trindade.eduarda_mygarden_fullstack.model.Permissao;
import br.ueg.trindade.eduarda_mygarden_fullstack.model.Usuario;
import br.ueg.trindade.eduarda_mygarden_fullstack.repository.PermissaoRepository;
import br.ueg.trindade.eduarda_mygarden_fullstack.repository.UsuarioRepository;

@Service
public class UsuarioService {
    private final UsuarioRepository usuarioRepository;
    private final PermissaoRepository permissaoRepository;
    private final PasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository usuarioRepository, PermissaoRepository permissaoRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.permissaoRepository = permissaoRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional(readOnly = true)
    public List<Usuario> listarTodos() { return usuarioRepository.findAll(); }

    @Transactional(readOnly = true)
    public Usuario buscarPorId(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não encontrado"));
    }

    @Transactional(readOnly = true)
    public Usuario buscarPorUsername(String username) {
        return usuarioRepository.findByUsernameIgnoreCase(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não encontrado"));
    }

    @Transactional
    public Usuario criar(UsuarioRequest dados) {
        validarCampos(dados, null, true);
        Usuario usuario = new Usuario();
        aplicarDados(usuario, dados, true);
        permissaoRepository.findByNomeIgnoreCase("USER")
                .ifPresent(p -> usuario.setPermissoes(new HashSet<>(Set.of(p))));
        return usuarioRepository.save(usuario);
    }

    @Transactional
    public Usuario atualizar(Long id, UsuarioRequest dados) {
        Usuario usuario = buscarPorId(id);
        validarCampos(dados, id, false);
        aplicarDados(usuario, dados, false);
        return usuarioRepository.save(usuario);
    }

    @Transactional
    public Usuario atribuirPermissoes(Long usuarioId, List<Long> idsPermissoes) {
        Usuario usuario = buscarPorId(usuarioId);
        Set<Permissao> permissoes = new HashSet<>(permissaoRepository.findAllById(idsPermissoes));
        usuario.setPermissoes(permissoes);
        return usuarioRepository.save(usuario);
    }

    @Transactional
    public void excluir(Long id) { buscarPorId(id); usuarioRepository.deleteById(id); }

    private void validarCampos(UsuarioRequest dados, Long idAtual, boolean senhaObrigatoria) {
        if (vazio(dados.getNome()) || vazio(dados.getUsername()) || vazio(dados.getEmail()))
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Nome, username e e-mail são obrigatórios");
        if (senhaObrigatoria && vazio(dados.getSenha()))
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Senha é obrigatória no cadastro");
        if (idAtual == null && usuarioRepository.existsByUsernameIgnoreCase(dados.getUsername().trim()))
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Esse username já está em uso");
        if (idAtual != null && usuarioRepository.existsByUsernameIgnoreCaseAndIdNot(dados.getUsername().trim(), idAtual))
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Esse username já está em uso");
        if (idAtual == null && usuarioRepository.existsByEmailIgnoreCase(dados.getEmail().trim()))
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Esse e-mail já está cadastrado");
        if (idAtual != null && usuarioRepository.existsByEmailIgnoreCaseAndIdNot(dados.getEmail().trim(), idAtual))
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Esse e-mail já está cadastrado");
    }

    private void aplicarDados(Usuario usuario, UsuarioRequest dados, boolean novo) {
        usuario.setNome(dados.getNome().trim());
        usuario.setUsername(dados.getUsername().trim());
        usuario.setEmail(dados.getEmail().trim().toLowerCase());
        if (novo || !vazio(dados.getSenha())) usuario.setSenha(passwordEncoder.encode(dados.getSenha()));
    }

    private boolean vazio(String valor) { return valor == null || valor.isBlank(); }
}
