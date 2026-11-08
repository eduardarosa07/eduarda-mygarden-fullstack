package br.ueg.trindade.eduarda_mygarden_fullstack.controller;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import br.ueg.trindade.eduarda_mygarden_fullstack.dto.SecaoRequest;
import br.ueg.trindade.eduarda_mygarden_fullstack.model.Secao;
import br.ueg.trindade.eduarda_mygarden_fullstack.service.SecaoService;
import br.ueg.trindade.eduarda_mygarden_fullstack.service.UsuarioLogadoService;

@RestController
@RequestMapping("/api/secoes")
public class SecaoController {
    private final SecaoService secaoService;
    private final UsuarioLogadoService usuarioLogadoService;
    public SecaoController(SecaoService secaoService, UsuarioLogadoService usuarioLogadoService) { this.secaoService = secaoService; this.usuarioLogadoService = usuarioLogadoService; }
    @GetMapping public List<Secao> listar() { return secaoService.listarDoUsuario(usuarioLogadoService.exigirUsuarioId()); }
    @GetMapping("/{id}") public Secao buscar(@PathVariable Long id) { return secaoService.buscarPorIdDoUsuario(id, usuarioLogadoService.exigirUsuarioId()); }
    @PostMapping @ResponseStatus(HttpStatus.CREATED) public Secao criar(@RequestBody SecaoRequest dados) { return secaoService.criar(dados, usuarioLogadoService.exigirUsuarioId()); }
    @PutMapping("/{id}") public Secao atualizar(@PathVariable Long id, @RequestBody SecaoRequest dados) { return secaoService.atualizar(id, dados, usuarioLogadoService.exigirUsuarioId()); }
    @DeleteMapping("/{id}") @ResponseStatus(HttpStatus.NO_CONTENT) public void excluir(@PathVariable Long id) { secaoService.excluir(id, usuarioLogadoService.exigirUsuarioId()); }
}
