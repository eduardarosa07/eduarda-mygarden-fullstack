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

    public List<Secao> listarTodos() {
        return secaoRepository.findAll();
    }

    public Secao buscarPorId(Long id) {
        return secaoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Seção não encontrada"));
    }

    @Transactional
    public Secao criar(SecaoRequest dados) {
        validar(dados);
        Usuario usuario = usuarioService.buscarPorId(dados.getUsuarioId());

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
    public Secao atualizar(Long id, SecaoRequest dados) {
        validar(dados);

        Secao secao = buscarPorId(id);
        secao.setNome(dados.getNome().trim());
        secao.setDescricao(limpar(dados.getDescricao()));
        secao.setUsuario(usuarioService.buscarPorId(dados.getUsuarioId()));

        if (secao.getPlanta() != null) {
            secao.getPlanta().setNome("Planta de " + secao.getNome());
        }

        return secaoRepository.save(secao);
    }

    public void excluir(Long id) {
        buscarPorId(id);
        secaoRepository.deleteById(id);
    }

    private void validar(SecaoRequest dados) {
        if (dados.getNome() == null || dados.getNome().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Nome da seção é obrigatório");
        }
        if (dados.getUsuarioId() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Selecione o usuário da seção");
        }
    }

    private String limpar(String valor) {
        return valor == null || valor.isBlank() ? null : valor.trim();
    }
}
