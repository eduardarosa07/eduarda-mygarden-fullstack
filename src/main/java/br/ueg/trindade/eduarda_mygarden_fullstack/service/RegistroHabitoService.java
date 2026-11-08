package br.ueg.trindade.eduarda_mygarden_fullstack.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import br.ueg.trindade.eduarda_mygarden_fullstack.dto.RegistroHabitoRequest;
import br.ueg.trindade.eduarda_mygarden_fullstack.model.Habito;
import br.ueg.trindade.eduarda_mygarden_fullstack.model.RegistroHabito;
import br.ueg.trindade.eduarda_mygarden_fullstack.repository.RegistroHabitoRepository;

@Service
public class RegistroHabitoService {
    private final RegistroHabitoRepository registroRepository;
    private final HabitoService habitoService;

    public RegistroHabitoService(RegistroHabitoRepository registroRepository, HabitoService habitoService) {
        this.registroRepository = registroRepository;
        this.habitoService = habitoService;
    }

    @Transactional(readOnly = true)
    public List<RegistroHabito> listar(Long usuarioId) {
        return registroRepository.findAllByHabitoUsuarioIdOrderByDataDesc(usuarioId);
    }

    @Transactional(readOnly = true)
    public RegistroHabito buscar(Long id, Long usuarioId) {
        return registroRepository.findByIdAndHabitoUsuarioId(id, usuarioId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Registro de hábito não encontrado"));
    }

    @Transactional
    public RegistroHabito criar(RegistroHabitoRequest dados, Long usuarioId) {
        Habito habito = habitoService.buscar(dados.getHabitoId(), usuarioId);
        if (registroRepository.existsByHabitoIdAndData(habito.getId(), dados.getData())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Esse hábito já possui um registro nessa data");
        }
        RegistroHabito registro = new RegistroHabito();
        aplicar(registro, dados, habito);
        return registroRepository.save(registro);
    }

    @Transactional
    public RegistroHabito atualizar(Long id, RegistroHabitoRequest dados, Long usuarioId) {
        RegistroHabito registro = buscar(id, usuarioId);
        Habito habito = habitoService.buscar(dados.getHabitoId(), usuarioId);
        if (registroRepository.existsByHabitoIdAndDataAndIdNot(habito.getId(), dados.getData(), id)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Esse hábito já possui um registro nessa data");
        }
        aplicar(registro, dados, habito);
        return registroRepository.save(registro);
    }

    @Transactional
    public void excluir(Long id, Long usuarioId) {
        registroRepository.delete(buscar(id, usuarioId));
    }

    private void aplicar(RegistroHabito registro, RegistroHabitoRequest dados, Habito habito) {
        registro.setHabito(habito);
        registro.setData(dados.getData());
        registro.setConcluido(Boolean.TRUE.equals(dados.getConcluido()));
        registro.setObservacao(dados.getObservacao() == null || dados.getObservacao().isBlank() ? null : dados.getObservacao().trim());
    }
}
