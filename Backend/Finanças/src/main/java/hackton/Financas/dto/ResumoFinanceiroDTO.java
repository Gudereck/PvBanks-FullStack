package hackton.Financas.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data

public class ResumoFinanceiroDTO {
    private Double totalReceitas;
    private Double totalDespesas;
    private Double saldoTotal;

    public ResumoFinanceiroDTO(Double totalReceitas, Double totalDespesas, Double saldoTotal) {
        this.totalReceitas = totalReceitas;
        this.totalDespesas = totalDespesas;
        this.saldoTotal = saldoTotal;
    }

}
