package br.ueg.trindade.eduarda_mygarden_fullstack.controller;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import br.ueg.trindade.eduarda_mygarden_fullstack.dto.TarefaRequest;
import br.ueg.trindade.eduarda_mygarden_fullstack.model.Tarefa;
import br.ueg.trindade.eduarda_mygarden_fullstack.service.TarefaService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/tarefas")
public class TarefaController {
    private final TarefaService tarefaService;

    public TarefaController(TarefaService tarefaService) {
        this.tarefaService = tarefaService;
    }

    @GetMapping
    public List<Tarefa> listar() {
        return tarefaService.listarTodos();
    }

    @GetMapping("/{id}")
    public Tarefa buscar(@PathVariable Long id) {
        return tarefaService.buscarPorId(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Tarefa criar(@RequestBody TarefaRequest dados) {
        return tarefaService.criar(dados);
    }

    @PutMapping("/{id}")
    public Tarefa atualizar(@PathVariable Long id, @RequestBody TarefaRequest dados) {
        return tarefaService.atualizar(id, dados);
    }

    @PatchMapping("/{id}/concluir")
    public Tarefa concluir(@PathVariable Long id) {
        return tarefaService.definirConclusao(id, true);
    }

    @PatchMapping("/{id}/desmarcar")
    public Tarefa desmarcar(@PathVariable Long id) {
        return tarefaService.definirConclusao(id, false);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void excluir(@PathVariable Long id) {
        tarefaService.excluir(id);
    }
}
