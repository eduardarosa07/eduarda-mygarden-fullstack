package br.ueg.trindade.eduarda_mygarden_fullstack.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import br.ueg.trindade.eduarda_mygarden_fullstack.model.Planta;
import br.ueg.trindade.eduarda_mygarden_fullstack.service.PlantaService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/plantas")
public class PlantaController {
    private final PlantaService plantaService;

    public PlantaController(PlantaService plantaService) {
        this.plantaService = plantaService;
    }

    @GetMapping
    public List<Planta> listar() {
        return plantaService.listarTodos();
    }
}
