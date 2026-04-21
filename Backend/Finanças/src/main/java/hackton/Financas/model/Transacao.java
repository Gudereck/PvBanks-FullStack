package hackton.Financas.model;

import hackton.Financas.Repository.TransacaoRepository;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Data
@Document(collection = "transacoes")
public class Transacao {
    @Id
    private String id;

    private String descricao;
    private Double valor;
    private LocalDate data;
    private String tipo;
    private String categoria;

    public void setId(String id) {
        this.id = id;
    }


    public String getTipo() {
        return tipo;
    }

    public double getValor() {
        return this.valor != null ? this.valor: 0.0;
    }

}
