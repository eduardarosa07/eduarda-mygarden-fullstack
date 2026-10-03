package br.ueg.trindade.eduarda_mygarden_fullstack.dto;

import java.time.LocalDate;
import java.time.LocalTime;

public class TarefaRequest {
    private String titulo;
    private String descricao;
    private LocalDate data;
    private LocalTime horario;
    private Boolean concluida;
    private Long secaoId;

    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }
    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }
    public LocalDate getData() { return data; }
    public void setData(LocalDate data) { this.data = data; }
    public LocalTime getHorario() { return horario; }
    public void setHorario(LocalTime horario) { this.horario = horario; }
    public Boolean getConcluida() { return concluida; }
    public void setConcluida(Boolean concluida) { this.concluida = concluida; }
    public Long getSecaoId() { return secaoId; }
    public void setSecaoId(Long secaoId) { this.secaoId = secaoId; }
}
