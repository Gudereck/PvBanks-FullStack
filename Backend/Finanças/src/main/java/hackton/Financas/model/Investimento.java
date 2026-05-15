package hackton.Financas.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Generated;

import java.time.LocalDate;

@Entity
@Table(name = "tb_investimentos")
@Data
public class Investimento {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    private String nomeAtivo;
    private String tipo;
    private Double valorInvestido;
    private Double rentabilidadeEsperada;
    private LocalDate dataAplicacao;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;
}
