package br.ueg.trindade.eduarda_mygarden_fullstack.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import br.ueg.trindade.eduarda_mygarden_fullstack.dto.SecaoRequest;
import br.ueg.trindade.eduarda_mygarden_fullstack.model.Planta;
import br.ueg.trindade.eduarda_mygarden_fullstack.model.Secao;
import br.ueg.trindade.eduarda_mygarden_fullstack.model.Usuario;
import br.ueg.trindade.eduarda_mygarden_fullstack.repository.PlantaRepository;
import br.ueg.trindade.eduarda_mygarden_fullstack.repository.SecaoRepository;

@Service
public class SecaoService {
    private final SecaoRepository secaoRepository;
    private final PlantaRepository plantaRepository;
    private final UsuarioService usuarioService;

    public SecaoService(
            SecaoRepository secaoRepository,
            PlantaRepository plantaRepository,
            UsuarioService usuarioService) {
        this.secaoRepository = secaoRepository;
        this.plantaRepository = plantaRepository;
        this.usuarioService = usuarioService;
    }

    @Transactional(readOnly = true)
    public List<Secao> listarDoUsuario(Long usuarioId) {
        return secaoRepository.findAllByUsuarioIdOrderByIdAsc(usuarioId);
    }

    @Transactional(readOnly = true)
    public Secao buscarPorIdDoUsuario(Long id, Long usuarioId) {
        return secaoRepository.findByIdAndUsuarioId(id, usuarioId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Seção não encontrada"));
    }

    @Transactional(readOnly = true)
    public Secao buscarPorId(Long id) {
        return secaoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Seção não encontrada"));
    }

    @Transactional
    public Secao criar(SecaoRequest dados, Long usuarioId) {
        validar(dados);
        Usuario usuario = usuarioService.buscarPorId(usuarioId);

        Secao secao = new Secao();
        secao.setNome(dados.getNome().trim());
        secao.setDescricao(limpar(dados.getDescricao()));
        secao.setUsuario(usuario);
        secao = secaoRepository.save(secao);

        Planta planta = new Planta("Planta de " + secao.getNome(), secao);
        planta = plantaRepository.save(planta);
        secao.setPlanta(planta);

        return secao;
    }

    @Transactional
    public Secao atualizar(Long id, SecaoRequest dados, Long usuarioId) {
        validar(dados);

        Secao secao = buscarPorIdDoUsuario(id, usuarioId);
        secao.setNome(dados.getNome().trim());
        secao.setDescricao(limpar(dados.getDescricao()));

        if (secao.getPlanta() != null) {
            secao.getPlanta().setNome("Planta de " + secao.getNome());
        }

        return secaoRepository.save(secao);
    }

    @Transactional
    public void excluir(Long id, Long usuarioId) {
        Secao secao = buscarPorIdDoUsuario(id, usuarioId);
        secaoRepository.delete(secao);
    }

    private void validar(SecaoRequest dados) {
        if (dados.getNome() == null || dados.getNome().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Nome da seção é obrigatório");
        }
    }

    private String limpar(String valor) {
        return valor == null || valor.isBlank() ? null : valor.trim();
    }
}
