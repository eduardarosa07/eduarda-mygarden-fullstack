package br.ueg.trindade.eduarda_mygarden_fullstack.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.ueg.trindade.eduarda_mygarden_fullstack.dto.RegistroHabitoRequest;
import br.ueg.trindade.eduarda_mygarden_fullstack.model.RegistroHabito;
import br.ueg.trindade.eduarda_mygarden_fullstack.service.RegistroHabitoService;
import br.ueg.trindade.eduarda_mygarden_fullstack.service.UsuarioLogadoService;
import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/registros-habito")
public class RegistroHabitoController {
    private final RegistroHabitoService registroService;
    private final UsuarioLogadoService usuarioLogadoService;

    public RegistroHabitoController(RegistroHabitoService registroService, UsuarioLogadoService usuarioLogadoService) {
        this.registroService = registroService;
        this.usuarioLogadoService = usuarioLogadoService;
    }

    @GetMapping
    public List<RegistroHabito> listar() { return registroService.listar(usuarioLogadoService.exigirUsuarioId()); }

    @GetMapping("/{id}")
    public RegistroHabito buscar(@PathVariable Long id) { return registroService.buscar(id, usuarioLogadoService.exigirUsuarioId()); }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public RegistroHabito criar(@Valid @RequestBody RegistroHabitoRequest dados) {
        return registroService.criar(dados, usuarioLogadoService.exigirUsuarioId());
    }

    @PutMapping("/{id}")
    public RegistroHabito atualizar(@PathVariable Long id, @Valid @RequestBody RegistroHabitoRequest dados) {
        return registroService.atualizar(id, dados, usuarioLogadoService.exigirUsuarioId());
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void excluir(@PathVariable Long id) { registroService.excluir(id, usuarioLogadoService.exigirUsuarioId()); }
}
