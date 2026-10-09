package br.ueg.trindade.eduarda_mygarden_fullstack.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import br.ueg.trindade.eduarda_mygarden_fullstack.dto.UsuarioRequest;
import br.ueg.trindade.eduarda_mygarden_fullstack.model.Permissao;
import br.ueg.trindade.eduarda_mygarden_fullstack.model.Usuario;
import br.ueg.trindade.eduarda_mygarden_fullstack.repository.UsuarioRepository;
import br.ueg.trindade.eduarda_mygarden_fullstack.util.PasswordHashUtil;

@Service
public class UsuarioService {
    private final UsuarioRepository usuarioRepository;
    private final PermissaoService permissaoService;

    public UsuarioService(UsuarioRepository usuarioRepository, PermissaoService permissaoService) {
        this.usuarioRepository = usuarioRepository;
        this.permissaoService = permissaoService;
    }

    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }

    public Usuario buscarPorId(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não encontrado"));
    }


    public Usuario autenticar(String username, String senha) {
        if (vazio(username) || vazio(senha)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Nome de usuário e senha são obrigatórios");
        }

        Usuario usuario = usuarioRepository.findByUsernameIgnoreCase(username.trim())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Usuário ou senha inválidos"));

        if (!PasswordHashUtil.matches(senha, usuario.getSenha())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Usuário ou senha inválidos");
        }

        return usuario;
    }

    public Usuario criar(UsuarioRequest dados) {
        validarCampos(dados, null, true);
        Usuario usuario = new Usuario();
        aplicarDados(usuario, dados, true);
        return usuarioRepository.save(usuario);
    }

    public Usuario atualizar(Long id, UsuarioRequest dados) {
        Usuario usuario = buscarPorId(id);
        validarCampos(dados, id, false);
        aplicarDados(usuario, dados, false);
        return usuarioRepository.save(usuario);
    }

    public void excluir(Long id) {
        buscarPorId(id);
        usuarioRepository.deleteById(id);
    }

    private void validarCampos(UsuarioRequest dados, Long idAtual, boolean senhaObrigatoria) {
        if (vazio(dados.getNome()) || vazio(dados.getUsername()) || vazio(dados.getEmail())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Nome, username e e-mail são obrigatórios");
        }
        if (senhaObrigatoria && vazio(dados.getSenha())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Senha é obrigatória no cadastro");
        }
        if (idAtual == null && usuarioRepository.existsByUsernameIgnoreCase(dados.getUsername().trim())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Esse username já está em uso");
        }
        if (idAtual != null && usuarioRepository.existsByUsernameIgnoreCaseAndIdNot(dados.getUsername().trim(), idAtual)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Esse username já está em uso");
        }
        if (idAtual == null && usuarioRepository.existsByEmailIgnoreCase(dados.getEmail().trim())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Esse e-mail já está cadastrado");
        }
        if (idAtual != null && usuarioRepository.existsByEmailIgnoreCaseAndIdNot(dados.getEmail().trim(), idAtual)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Esse e-mail já está cadastrado");
        }
    }

    private void aplicarDados(Usuario usuario, UsuarioRequest dados, boolean novo) {
        usuario.setNome(dados.getNome().trim());
        usuario.setUsername(dados.getUsername().trim());
        usuario.setEmail(dados.getEmail().trim().toLowerCase());

        if (novo || !vazio(dados.getSenha())) {
            usuario.setSenha(PasswordHashUtil.hash(dados.getSenha()));
        }

        Permissao permissao = dados.getPermissaoId() == null ? null : permissaoService.buscarPorId(dados.getPermissaoId());
        usuario.setPermissao(permissao);
    }

    private boolean vazio(String valor) {
        return valor == null || valor.isBlank();
    }
}
