package hackton.Financas.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ResumoFinanceiroDTO {
    private Double totalReceitas;
    private Double totalDespesas;
    private Double saldoTotal;


}
