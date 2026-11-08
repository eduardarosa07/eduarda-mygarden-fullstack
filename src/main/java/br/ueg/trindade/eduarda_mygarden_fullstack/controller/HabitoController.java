package br.ueg.trindade.eduarda_mygarden_fullstack.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import br.ueg.trindade.eduarda_mygarden_fullstack.dto.HabitoRequest;
import br.ueg.trindade.eduarda_mygarden_fullstack.model.Habito;
import br.ueg.trindade.eduarda_mygarden_fullstack.service.HabitoService;
import br.ueg.trindade.eduarda_mygarden_fullstack.service.UsuarioLogadoService;
import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/habitos")
public class HabitoController {
    private final HabitoService habitoService;
    private final UsuarioLogadoService usuarioLogadoService;

    public HabitoController(HabitoService habitoService, UsuarioLogadoService usuarioLogadoService) {
        this.habitoService = habitoService;
        this.usuarioLogadoService = usuarioLogadoService;
    }

    @GetMapping
    public List<Habito> listar() { return habitoService.listar(usuarioLogadoService.exigirUsuarioId()); }

    @GetMapping("/{id}")
    public Habito buscar(@PathVariable Long id) { return habitoService.buscar(id, usuarioLogadoService.exigirUsuarioId()); }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Habito criar(@Valid @RequestBody HabitoRequest dados) {
        return habitoService.criar(dados, usuarioLogadoService.exigirUsuarioId());
    }

    @PutMapping("/{id}")
    public Habito atualizar(@PathVariable Long id, @Valid @RequestBody HabitoRequest dados) {
        return habitoService.atualizar(id, dados, usuarioLogadoService.exigirUsuarioId());
    }

    @PostMapping(value = "/{id}/imagem", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Habito imagem(@PathVariable Long id, @RequestParam("arquivo") MultipartFile arquivo) {
        return habitoService.salvarImagem(id, arquivo, usuarioLogadoService.exigirUsuarioId());
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void excluir(@PathVariable Long id) { habitoService.excluir(id, usuarioLogadoService.exigirUsuarioId()); }
}
