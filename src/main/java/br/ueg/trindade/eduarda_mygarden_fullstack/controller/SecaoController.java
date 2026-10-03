package br.ueg.trindade.eduarda_mygarden_fullstack.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import br.ueg.trindade.eduarda_mygarden_fullstack.dto.SecaoRequest;
import br.ueg.trindade.eduarda_mygarden_fullstack.model.Secao;
import br.ueg.trindade.eduarda_mygarden_fullstack.service.SecaoService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/secoes")
public class SecaoController {
    private final SecaoService secaoService;

    public SecaoController(SecaoService secaoService) {
        this.secaoService = secaoService;
    }

    @GetMapping
    public List<Secao> listar() {
        return secaoService.listarTodos();
    }

    @GetMapping("/{id}")
    public Secao buscar(@PathVariable Long id) {
        return secaoService.buscarPorId(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Secao criar(@RequestBody SecaoRequest dados) {
        return secaoService.criar(dados);
    }

    @PutMapping("/{id}")
    public Secao atualizar(@PathVariable Long id, @RequestBody SecaoRequest dados) {
        return secaoService.atualizar(id, dados);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void excluir(@PathVariable Long id) {
        secaoService.excluir(id);
    }
}
