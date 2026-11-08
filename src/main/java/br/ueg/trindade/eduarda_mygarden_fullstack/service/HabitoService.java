package br.ueg.trindade.eduarda_mygarden_fullstack.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import br.ueg.trindade.eduarda_mygarden_fullstack.dto.HabitoRequest;
import br.ueg.trindade.eduarda_mygarden_fullstack.model.Habito;
import br.ueg.trindade.eduarda_mygarden_fullstack.model.Usuario;
import br.ueg.trindade.eduarda_mygarden_fullstack.repository.HabitoRepository;

@Service
public class HabitoService {
    private final HabitoRepository habitoRepository;
    private final UsuarioService usuarioService;
    private final StorageService storageService;

    public HabitoService(HabitoRepository habitoRepository, UsuarioService usuarioService, StorageService storageService) {
        this.habitoRepository = habitoRepository;
        this.usuarioService = usuarioService;
        this.storageService = storageService;
    }

    @Transactional(readOnly = true)
    public List<Habito> listar(Long usuarioId) {
        return habitoRepository.findAllByUsuarioIdOrderByIdAsc(usuarioId);
    }

    @Transactional(readOnly = true)
    public Habito buscar(Long id, Long usuarioId) {
        return habitoRepository.findByIdAndUsuarioId(id, usuarioId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Hábito não encontrado"));
    }

    @Transactional
    public Habito criar(HabitoRequest dados, Long usuarioId) {
        validarNomeUnico(dados.getNome(), usuarioId, null);
        Usuario usuario = usuarioService.buscarPorId(usuarioId);
        Habito habito = new Habito();
        aplicar(habito, dados);
        habito.setUsuario(usuario);
        return habitoRepository.save(habito);
    }

    @Transactional
    public Habito atualizar(Long id, HabitoRequest dados, Long usuarioId) {
        Habito habito = buscar(id, usuarioId);
        validarNomeUnico(dados.getNome(), usuarioId, id);
        aplicar(habito, dados);
        return habitoRepository.save(habito);
    }

    @Transactional
    public Habito salvarImagem(Long id, MultipartFile arquivo, Long usuarioId) {
        Habito habito = buscar(id, usuarioId);
        habito.setImagem(storageService.salvarImagemHabito(arquivo));
        return habitoRepository.save(habito);
    }

    @Transactional
    public void excluir(Long id, Long usuarioId) {
        habitoRepository.delete(buscar(id, usuarioId));
    }

    private void validarNomeUnico(String nome, Long usuarioId, Long idAtual) {
        String valor = nome.trim();
        boolean existe = idAtual == null
                ? habitoRepository.existsByUsuarioIdAndNomeIgnoreCase(usuarioId, valor)
                : habitoRepository.existsByUsuarioIdAndNomeIgnoreCaseAndIdNot(usuarioId, valor, idAtual);
        if (existe) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Você já possui um hábito com esse nome");
        }
    }

    private void aplicar(Habito habito, HabitoRequest dados) {
        habito.setNome(dados.getNome().trim());
        habito.setDescricao(limpar(dados.getDescricao()));
        habito.setFrequencia(dados.getFrequencia().trim().toUpperCase());
        habito.setAtivo(dados.getAtivo() == null || dados.getAtivo());
    }

    private String limpar(String valor) {
        return valor == null || valor.isBlank() ? null : valor.trim();
    }
}
