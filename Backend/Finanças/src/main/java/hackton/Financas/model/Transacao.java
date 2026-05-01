package hackton.Financas.model;

import jakarta.persistence.*; // Importante para o MySQL
import lombok.Data;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "tb_transacoes")
public class Transacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Mudamos de String para Long (padrão MySQL) [cite: 339, 721]

    private String descricao;
    private Double valor;
    private LocalDate data;
    private String tipo;
    private String categoria;

    // A CHAVE DE OURO: Muitas transações pertencem a UM usuário
    @ManyToOne
    @JoinColumn(name = "usuario_id") // Nome da coluna no MySQL
    private Usuario usuario;

    public Double getValor() {
        return this.valor != null ? this.valor : 0.0; // Proteção contra nulos que já tínhamos [cite: 798]
    }
}