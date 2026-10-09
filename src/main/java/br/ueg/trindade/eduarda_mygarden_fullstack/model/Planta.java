package br.ueg.trindade.eduarda_mygarden_fullstack.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;

@Entity
public class Planta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 80)
    private String nome;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private EstagioCrescimento estagioCrescimento = EstagioCrescimento.SEMENTE;

    @Column(nullable = false)
    private Integer progresso = 0;

    @JsonIgnore
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "secao_id", nullable = false, unique = true)
    private Secao secao;

    public Planta() {
    }

    public Planta(String nome, Secao secao) {
        this.nome = nome;
        this.secao = secao;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public EstagioCrescimento getEstagioCrescimento() {
        return estagioCrescimento;
    }

    public void setEstagioCrescimento(EstagioCrescimento estagioCrescimento) {
        this.estagioCrescimento = estagioCrescimento;
    }

    public Integer getProgresso() {
        return progresso;
    }

    public void setProgresso(Integer progresso) {
        this.progresso = progresso;
    }

    public Secao getSecao() {
        return secao;
    }

    public void setSecao(Secao secao) {
        this.secao = secao;
    }
}
