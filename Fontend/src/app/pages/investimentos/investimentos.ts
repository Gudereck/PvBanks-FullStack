import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-investimentos',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './investimentos.html',
  styleUrls: ['./investimentos.scss'],
})
export class Investimentos implements OnInit {
  private http = inject(HttpClient);

  // Indicadores de Mercado
  public taxaSelic: number = 0;
  public dataTaxa: string = '';
  public carregandoTaxa: boolean = true;

  // Gráfico de Distribuição da Carteira
  public doughnutChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom', labels: { color: '#fff' } }
    }
  };
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: ['Renda Fixa', 'Ações', 'FIIs', 'Caixa'],
    datasets: [
      { 
        data: [25000, 15000, 5200, 0],
        backgroundColor: ['#00e676', '#2979ff', '#ffea00', '#aaaaaa'],
        borderColor: '#111111',
        borderWidth: 2
      }
    ]
  };

  ngOnInit(): void {
    this.buscarTaxaSelic();
  }

  // Busca a Taxa Selic/CDI atual diretamente da API pública do Banco Central
  // Série 432: Taxa de juros - Meta Selic
  buscarTaxaSelic() {
    this.carregandoTaxa = true;
    this.http.get<any[]>('https://api.bcb.gov.br/dados/serie/bcdata.sgs.432/dados/ultimos/1?formato=json')
      .subscribe({
        next: (dados) => {
          if (dados && dados.length > 0) {
            this.taxaSelic = parseFloat(dados[0].valor);
            this.dataTaxa = dados[0].data;
          }
          this.carregandoTaxa = false;
        },
        error: (err) => {
          console.error('Erro ao buscar taxa Selic', err);
          this.carregandoTaxa = false;
        }
      });
  }
}

