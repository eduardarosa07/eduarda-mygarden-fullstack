package br.ueg.trindade.eduarda_mygarden_fullstack.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class HabitoRequest {
    @NotBlank(message = "Nome do hábito é obrigatório")
    @Size(max = 80, message = "Nome do hábito deve ter no máximo 80 caracteres")
    private String nome;

    @Size(max = 220, message = "Descrição deve ter no máximo 220 caracteres")
    private String descricao;

    @NotBlank(message = "Frequência é obrigatória")
    private String frequencia;

    private Boolean ativo;

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }
    public String getFrequencia() { return frequencia; }
    public void setFrequencia(String frequencia) { this.frequencia = frequencia; }
    public Boolean getAtivo() { return ativo; }
    public void setAtivo(Boolean ativo) { this.ativo = ativo; }
}
