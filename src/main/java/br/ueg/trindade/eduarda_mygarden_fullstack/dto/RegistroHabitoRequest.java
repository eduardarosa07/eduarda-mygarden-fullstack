package br.ueg.trindade.eduarda_mygarden_fullstack.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class RegistroHabitoRequest {
    @NotNull(message = "Selecione um hábito")
    private Long habitoId;

    @NotNull(message = "Data do registro é obrigatória")
    private LocalDate data;

    private Boolean concluido;

    @Size(max = 220, message = "Observação deve ter no máximo 220 caracteres")
    private String observacao;

    public Long getHabitoId() { return habitoId; }
    public void setHabitoId(Long habitoId) { this.habitoId = habitoId; }
    public LocalDate getData() { return data; }
    public void setData(LocalDate data) { this.data = data; }
    public Boolean getConcluido() { return concluido; }
    public void setConcluido(Boolean concluido) { this.concluido = concluido; }
    public String getObservacao() { return observacao; }
    public void setObservacao(String observacao) { this.observacao = observacao; }
}
