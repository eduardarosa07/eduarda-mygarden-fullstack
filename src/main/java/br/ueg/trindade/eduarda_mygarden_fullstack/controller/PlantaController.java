package br.ueg.trindade.eduarda_mygarden_fullstack.controller;

import java.util.List;
import org.springframework.web.bind.annotation.*;
import br.ueg.trindade.eduarda_mygarden_fullstack.model.Planta;
import br.ueg.trindade.eduarda_mygarden_fullstack.service.PlantaService;
import br.ueg.trindade.eduarda_mygarden_fullstack.service.UsuarioLogadoService;

@RestController
@RequestMapping("/api/plantas")
public class PlantaController {
    private final PlantaService plantaService;
    private final UsuarioLogadoService usuarioLogadoService;
    public PlantaController(PlantaService plantaService, UsuarioLogadoService usuarioLogadoService) { this.plantaService = plantaService; this.usuarioLogadoService = usuarioLogadoService; }
    @GetMapping public List<Planta> listar() { return plantaService.listarDoUsuario(usuarioLogadoService.exigirUsuarioId()); }
}
