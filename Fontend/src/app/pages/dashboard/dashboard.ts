import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';

import { TransacaoService } from '../../services/transacao.service';
import { ResumoFinanceiro, Transacao } from '../../models/transacao.model';
import { Chart, ChartConfiguration, ChartData, ChartType, registerables } from 'chart.js';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, BaseChartDirective, FormsModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent implements OnInit {
  resumo: ResumoFinanceiro = { totalReceitas: 0, totalDespesas: 0, saldoTotal: 0 };
  transacoes: Transacao[] = [];
  transacoesFiltradas: Transacao[] = [];
  termoBusca: string = '';

  private transacaoService = inject(TransacaoService);
  private router = inject(Router);

  // Configurações do Gráfico
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: true, position: 'top', labels: { color: '#fff' } } }
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = { labels: [], datasets: [{ data: [] }] };
  public pieChartType: ChartType = 'pie';

  ngOnInit(): void {
    this.carregarResumo();
    this.carregarTransacoes();
  }

  carregarTransacoes(): void {
    this.transacaoService.listarTodas().subscribe({
      next: (dados) => {
        this.transacoes = dados;
        this.transacoesFiltradas = dados;
        this.atualizarDadosGrafico();
      }
    });
  }

  filtrar(): void {
    const termo = this.termoBusca.toLowerCase();
    this.transacoesFiltradas = this.transacoes.filter(t =>
      t.descricao.toLowerCase().includes(termo) || t.categoria?.toLowerCase().includes(termo)
    );
  }

  atualizarDadosGrafico(): void {
    const categorias: { [key: string]: number } = {};
    this.transacoes.filter(t => t.valor < 0).forEach(t => {
      const cat = t.categoria || 'Outros';
      categorias[cat] = (categorias[cat] || 0) + Math.abs(t.valor);
    });
    this.pieChartData = {
      labels: Object.keys(categorias),
      datasets: [{
        data: Object.values(categorias),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
      }]
    };
  }

  editarTransacao(transacao: Transacao) {
    this.router.navigate(['/nova'], { state: { dadosParaEditar: transacao } });
  }

  excluirTransacao(id?: string) {
    if (!id || !confirm('Excluir transação?')) return;
    this.transacaoService.deletar(id).subscribe({
      next: () => {
        this.transacoes = this.transacoes.filter(t => t.id !== id);
        this.filtrar();
        this.atualizarDadosGrafico();
        this.carregarResumo();
      }
    });
  }

  carregarResumo(): void {
    this.transacaoService.obterResumo().subscribe(dados => this.resumo = dados);
  }
}