package hackton.Financas.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResumoInvestimentoDTO {
    private Double patrimonioTotal;
    private Double rendimentoMensalEstimado;
}
