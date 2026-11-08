package br.ueg.trindade.eduarda_mygarden_fullstack.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import br.ueg.trindade.eduarda_mygarden_fullstack.model.Permissao;
import br.ueg.trindade.eduarda_mygarden_fullstack.model.Usuario;
import br.ueg.trindade.eduarda_mygarden_fullstack.repository.PermissaoRepository;
import br.ueg.trindade.eduarda_mygarden_fullstack.repository.UsuarioRepository;

@Service
public class PermissaoService {
    private final PermissaoRepository permissaoRepository;
    private final UsuarioRepository usuarioRepository;

    public PermissaoService(PermissaoRepository permissaoRepository, UsuarioRepository usuarioRepository) {
        this.permissaoRepository = permissaoRepository;
        this.usuarioRepository = usuarioRepository;
    }

    @Transactional(readOnly = true)
    public List<Permissao> listarTodos() {
        return permissaoRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Permissao buscarPorId(Long id) {
        return permissaoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Permissão não encontrada"));
    }

    @Transactional
    public Permissao criar(Permissao permissao) {
        validar(permissao, null);
        return permissaoRepository.save(permissao);
    }

    @Transactional
    public Permissao atualizar(Long id, Permissao dados) {
        Permissao permissao = buscarPorId(id);
        validar(dados, id);
        permissao.setNome(dados.getNome().trim());
        permissao.setDescricao(limpar(dados.getDescricao()));
        return permissaoRepository.save(permissao);
    }

    @Transactional
    public void excluir(Long id) {
        Permissao permissao = buscarPorId(id);
        List<Usuario> usuarios = usuarioRepository.findAll();
        for (Usuario usuario : usuarios) {
            boolean removeu = usuario.getPermissoes().removeIf(p -> p.getId().equals(permissao.getId()));
            if (removeu) {
                usuarioRepository.save(usuario);
            }
        }
        permissaoRepository.delete(permissao);
    }

    private void validar(Permissao permissao, Long idAtual) {
        if (permissao.getNome() == null || permissao.getNome().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Nome da permissão é obrigatório");
        }
        boolean duplicada = permissaoRepository.findByNomeIgnoreCase(permissao.getNome().trim())
                .filter(p -> idAtual == null || !p.getId().equals(idAtual))
                .isPresent();
        if (duplicada) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Já existe uma permissão com esse nome");
        }
        permissao.setNome(permissao.getNome().trim());
        permissao.setDescricao(limpar(permissao.getDescricao()));
    }

    private String limpar(String valor) {
        return valor == null || valor.isBlank() ? null : valor.trim();
    }
}
