package br.ueg.trindade.eduarda_mygarden_fullstack.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import br.ueg.trindade.eduarda_mygarden_fullstack.dto.TarefaRequest;
import br.ueg.trindade.eduarda_mygarden_fullstack.model.Secao;
import br.ueg.trindade.eduarda_mygarden_fullstack.model.Tarefa;
import br.ueg.trindade.eduarda_mygarden_fullstack.repository.TarefaRepository;

@Service
public class TarefaService {
    private final TarefaRepository tarefaRepository;
    private final SecaoService secaoService;
    private final PlantaService plantaService;

    public TarefaService(TarefaRepository tarefaRepository, SecaoService secaoService, PlantaService plantaService) {
        this.tarefaRepository = tarefaRepository;
        this.secaoService = secaoService;
        this.plantaService = plantaService;
    }

    public List<Tarefa> listarTodos() {
        return tarefaRepository.findAll();
    }

    public Tarefa buscarPorId(Long id) {
        return tarefaRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Tarefa não encontrada"));
    }

    @Transactional
    public Tarefa criar(TarefaRequest dados) {
        validar(dados);
        Secao secao = secaoService.buscarPorId(dados.getSecaoId());
        Tarefa tarefa = new Tarefa();
        aplicarDados(tarefa, dados, secao);
        tarefa = tarefaRepository.save(tarefa);
        plantaService.recalcularPorSecao(secao.getId());
        return tarefa;
    }

    @Transactional
    public Tarefa atualizar(Long id, TarefaRequest dados) {
        validar(dados);
        Tarefa tarefa = buscarPorId(id);
        Long secaoAntiga = tarefa.getSecao().getId();
        Secao secaoNova = secaoService.buscarPorId(dados.getSecaoId());
        aplicarDados(tarefa, dados, secaoNova);
        tarefa = tarefaRepository.save(tarefa);
        plantaService.recalcularPorSecao(secaoAntiga);
        if (!secaoAntiga.equals(secaoNova.getId())) {
            plantaService.recalcularPorSecao(secaoNova.getId());
        }
        return tarefa;
    }

    @Transactional
    public Tarefa definirConclusao(Long id, boolean concluida) {
        Tarefa tarefa = buscarPorId(id);
        tarefa.setConcluida(concluida);
        tarefa = tarefaRepository.save(tarefa);
        plantaService.recalcularPorSecao(tarefa.getSecao().getId());
        return tarefa;
    }

    @Transactional
    public void excluir(Long id) {
        Tarefa tarefa = buscarPorId(id);
        Long secaoId = tarefa.getSecao().getId();
        tarefaRepository.delete(tarefa);
        tarefaRepository.flush();
        plantaService.recalcularPorSecao(secaoId);
    }

    private void validar(TarefaRequest dados) {
        if (dados.getTitulo() == null || dados.getTitulo().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Título da tarefa é obrigatório");
        }
        if (dados.getSecaoId() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Selecione uma seção para a tarefa");
        }
    }

    private void aplicarDados(Tarefa tarefa, TarefaRequest dados, Secao secao) {
        tarefa.setTitulo(dados.getTitulo().trim());
        tarefa.setDescricao(dados.getDescricao() == null || dados.getDescricao().isBlank() ? null : dados.getDescricao().trim());
        tarefa.setData(dados.getData());
        tarefa.setHorario(dados.getHorario());
        tarefa.setConcluida(Boolean.TRUE.equals(dados.getConcluida()));
        tarefa.setSecao(secao);
    }
}
