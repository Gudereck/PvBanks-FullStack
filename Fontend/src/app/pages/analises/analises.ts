import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { TransacaoService } from '../../services/transacao.service';
import { ResumoFinanceiro, Transacao } from '../../models/transacao.model';

@Component({
  selector: 'app-analises',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './analises.html',
  styleUrls: ['./analises.scss'],
})
export class Analises implements OnInit {
  private transacaoService = inject(TransacaoService);

  public resumo: ResumoFinanceiro = { totalReceitas: 0, totalDespesas: 0, saldoTotal: 0 };
  public transacoes: Transacao[] = [];

  // Configurações do Gráfico de Barras (Receitas vs Despesas)
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#888' } },
      y: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#888' } }
    },
    plugins: {
      legend: { display: true, labels: { color: '#fff' } }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartData: ChartData<'bar'> = {
    labels: ['Geral'],
    datasets: [
      { data: [0], label: 'Receitas', backgroundColor: '#00e676', borderRadius: 4 },
      { data: [0], label: 'Despesas', backgroundColor: '#ff1744', borderRadius: 4 }
    ]
  };

  // Configurações do Gráfico de Rosca (Distribuição de Gastos)
  public doughnutChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'right', labels: { color: '#fff' } }
    }
  };
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: ['Sem Gastos'],
    datasets: [{ 
      data: [1],
      backgroundColor: ['#222222'],
      borderColor: '#111111',
      borderWidth: 2
    }]
  };

  public metaMensal = 5000;
  
  get percentualMeta(): number {
    if (this.metaMensal === 0) return 0;
    return (Math.abs(this.resumo.totalDespesas) / this.metaMensal) * 100;
  }

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados() {
    this.transacaoService.obterResumo().subscribe(resumo => {
      this.resumo = resumo;
    });

    this.transacaoService.listarTodas().subscribe(transacoes => {
      this.transacoes = transacoes;
      this.atualizarGraficos();
    });
  }

  atualizarGraficos() {
    // Atualizar Gráfico de Barras
    this.barChartData = {
      labels: ['Total Acumulado'],
      datasets: [
        { data: [this.resumo.totalReceitas], label: 'Receitas', backgroundColor: '#00e676', borderRadius: 4 },
        { data: [Math.abs(this.resumo.totalDespesas)], label: 'Despesas', backgroundColor: '#ff1744', borderRadius: 4 }
      ]
    };

    // Atualizar Gráfico de Distribuição de Despesas
    const categorias: { [key: string]: number } = {};
    const despesas = this.transacoes.filter(t => t.tipo === 'DESPESA' || t.valor < 0);

    despesas.forEach(t => {
      const cat = t.categoria || 'Outros';
      categorias[cat] = (categorias[cat] || 0) + Math.abs(t.valor);
    });

    if (Object.keys(categorias).length > 0) {
      const backgroundColors = ['#fff', '#cccccc', '#999999', '#666666', '#333333', '#111111'];
      this.doughnutChartData = {
        labels: Object.keys(categorias),
        datasets: [{ 
          data: Object.values(categorias),
          backgroundColor: backgroundColors.slice(0, Object.keys(categorias).length),
          borderColor: '#111111',
          borderWidth: 2
        }]
      };
    }
  }
}
