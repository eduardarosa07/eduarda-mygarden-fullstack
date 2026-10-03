package br.ueg.trindade.eduarda_mygarden_fullstack.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import br.ueg.trindade.eduarda_mygarden_fullstack.model.EstagioCrescimento;
import br.ueg.trindade.eduarda_mygarden_fullstack.model.Planta;
import br.ueg.trindade.eduarda_mygarden_fullstack.repository.PlantaRepository;
import br.ueg.trindade.eduarda_mygarden_fullstack.repository.TarefaRepository;

@Service
public class PlantaService {
    private final PlantaRepository plantaRepository;
    private final TarefaRepository tarefaRepository;

    public PlantaService(PlantaRepository plantaRepository, TarefaRepository tarefaRepository) {
        this.plantaRepository = plantaRepository;
        this.tarefaRepository = tarefaRepository;
    }

    public List<Planta> listarTodos() {
        return plantaRepository.findAll();
    }

    public Planta recalcularPorSecao(Long secaoId) {
        Planta planta = plantaRepository.findBySecaoId(secaoId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Planta da seção não encontrada"));

        long total = tarefaRepository.countBySecaoId(secaoId);
        long concluidas = tarefaRepository.countBySecaoIdAndConcluidaTrue(secaoId);
        int progresso = total == 0 ? 0 : (int) Math.round((concluidas * 100.0) / total);

        planta.setProgresso(progresso);
        planta.setEstagioCrescimento(calcularEstagio(progresso));
        return plantaRepository.save(planta);
    }

    private EstagioCrescimento calcularEstagio(int progresso) {
        if (progresso <= 0) return EstagioCrescimento.SEMENTE;
        if (progresso <= 25) return EstagioCrescimento.BROTO;
        if (progresso <= 50) return EstagioCrescimento.PLANTA_PEQUENA;
        if (progresso <= 75) return EstagioCrescimento.PLANTA_MEDIA;
        if (progresso <= 99) return EstagioCrescimento.PLANTA_GRANDE;
        return EstagioCrescimento.FLORESCIMENTO;
    }
}
