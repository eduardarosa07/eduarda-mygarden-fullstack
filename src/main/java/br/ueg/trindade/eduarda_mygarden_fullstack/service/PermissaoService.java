package br.ueg.trindade.eduarda_mygarden_fullstack.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import br.ueg.trindade.eduarda_mygarden_fullstack.model.Permissao;
import br.ueg.trindade.eduarda_mygarden_fullstack.repository.PermissaoRepository;

@Service
public class PermissaoService {
    private final PermissaoRepository permissaoRepository;

    public PermissaoService(PermissaoRepository permissaoRepository) {
        this.permissaoRepository = permissaoRepository;
    }

    public List<Permissao> listarTodos() {
        return permissaoRepository.findAll();
    }

    public Permissao buscarPorId(Long id) {
        return permissaoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Permissão não encontrada"));
    }

    public Permissao criar(Permissao permissao) {
        validar(permissao, null);
        return permissaoRepository.save(permissao);
    }

    public Permissao atualizar(Long id, Permissao dados) {
        Permissao permissao = buscarPorId(id);
        validar(dados, id);
        permissao.setNome(dados.getNome().trim());
        permissao.setDescricao(limpar(dados.getDescricao()));
        return permissaoRepository.save(permissao);
    }

    public void excluir(Long id) {
        buscarPorId(id);
        permissaoRepository.deleteById(id);
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
