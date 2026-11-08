package br.ueg.trindade.eduarda_mygarden_fullstack.controller;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import br.ueg.trindade.eduarda_mygarden_fullstack.dto.TarefaRequest;
import br.ueg.trindade.eduarda_mygarden_fullstack.model.Tarefa;
import br.ueg.trindade.eduarda_mygarden_fullstack.service.TarefaService;
import br.ueg.trindade.eduarda_mygarden_fullstack.service.UsuarioLogadoService;

@RestController
@RequestMapping("/api/tarefas")
public class TarefaController {
    private final TarefaService tarefaService;
    private final UsuarioLogadoService usuarioLogadoService;
    public TarefaController(TarefaService tarefaService, UsuarioLogadoService usuarioLogadoService) { this.tarefaService = tarefaService; this.usuarioLogadoService = usuarioLogadoService; }
    @GetMapping public List<Tarefa> listar() { return tarefaService.listarDoUsuario(usuarioLogadoService.exigirUsuarioId()); }
    @GetMapping("/{id}") public Tarefa buscar(@PathVariable Long id) { return tarefaService.buscarPorIdDoUsuario(id, usuarioLogadoService.exigirUsuarioId()); }
    @PostMapping @ResponseStatus(HttpStatus.CREATED) public Tarefa criar(@RequestBody TarefaRequest dados) { return tarefaService.criar(dados, usuarioLogadoService.exigirUsuarioId()); }
    @PutMapping("/{id}") public Tarefa atualizar(@PathVariable Long id, @RequestBody TarefaRequest dados) { return tarefaService.atualizar(id, dados, usuarioLogadoService.exigirUsuarioId()); }
    @PatchMapping("/{id}/concluir") public Tarefa concluir(@PathVariable Long id) { return tarefaService.definirConclusao(id, true, usuarioLogadoService.exigirUsuarioId()); }
    @PatchMapping("/{id}/desmarcar") public Tarefa desmarcar(@PathVariable Long id) { return tarefaService.definirConclusao(id, false, usuarioLogadoService.exigirUsuarioId()); }
    @DeleteMapping("/{id}") @ResponseStatus(HttpStatus.NO_CONTENT) public void excluir(@PathVariable Long id) { tarefaService.excluir(id, usuarioLogadoService.exigirUsuarioId()); }
}
