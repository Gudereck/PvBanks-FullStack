import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';

import { TransacaoService } from '../../services/transacao.service';
import { ResumoFinanceiro, Transacao } from '../../models/transacao.model';
import { Chart, ChartConfiguration, ChartData, ChartType, registerables } from 'chart.js';
import { Header } from '../../components/header/header';
import { ConfirmModalComponent } from '../../components/confirm-modal/confirm-modal';
import { ConfirmModalService } from '../../components/confirm-modal/confirm-modal.service';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, BaseChartDirective, FormsModule, Header, ConfirmModalComponent],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent implements OnInit {
  resumo: ResumoFinanceiro = { totalReceitas: 0, totalDespesas: 0, saldoTotal: 0 };
  transacoes: Transacao[] = [];
  transacoesFiltradas: Transacao[] = [];
  termoBusca: string = '';
  mesAnoFiltro: string = '';

  private transacaoService = inject(TransacaoService);
  private router = inject(Router);
  private confirmModal = inject(ConfirmModalService);   // ← novo

  // Configurações do Gráfico
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: true, position: 'top', labels: { color: '#fff' } } }
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = { labels: [], datasets: [{ data: [] }] };
  public pieChartType: ChartType = 'pie';

  percentualComparativo: number = 0;
  valorDiferenca: number = 0;
  totalMesPassado: number = 0;

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
        this.calcularRitmoDeGastos();
      },
      error: (erro) => console.error('Erro ao carregar transações', erro)
    });
  }

  editarTransacao(transacao: Transacao) {
    this.router.navigate(['/nova'], { state: { dadosParaEditar: transacao } });
  }

  // ✅ Substituiu confirm() pelo modal assíncrono
  async excluirTransacao(id?: string) {
    if (!id) return;

    const confirmado = await this.confirmModal.open({
      title: 'Excluir transação',
      message: 'Tem certeza que deseja excluir esta transação? Esta ação não pode ser desfeita.',
      confirmLabel: 'Excluir',
      cancelLabel: 'Cancelar',
      danger: true,
    });

    if (!confirmado) return;

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

  filtrar(): void {
    const termo = this.termoBusca.toLowerCase();

    this.transacoesFiltradas = this.transacoes.filter(t => {
      const bateTexto = t.descricao.toLowerCase().includes(termo) ||
        (t.categoria?.toLowerCase() || '').includes(termo);

      // Usa comparação de string para evitar bug de fuso horário
      const bateMes = this.mesAnoFiltro ? t.data.startsWith(this.mesAnoFiltro) : true;

      return bateTexto && bateMes;
    });

    this.atualizarDadosGrafico();
    this.recalcularResumoLocal();
  }

  atualizarDadosGrafico(): void {
    const categorias: { [key: string]: number } = {};

    this.transacoesFiltradas.filter(t => t.valor < 0 || t.tipo === 'DESPESA').forEach(t => {
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

  recalcularResumoLocal(): void {
    let receitas = 0;
    let despesas = 0;

    this.transacoesFiltradas.forEach(t => {
      if (t.tipo === 'RECEITA') {
        receitas += Math.abs(t.valor);
      } else {
        despesas += Math.abs(t.valor);
      }
    });

    this.resumo = {
      totalReceitas: receitas,
      totalDespesas: despesas,
      saldoTotal: receitas - despesas
    };
  }

  calcularRitmoDeGastos() {
    const agora = new Date();
    const mesAtual = agora.getMonth();
    const mesPassado = mesAtual === 0 ? 11 : mesAtual - 1;

    // Usa substring para evitar bug de fuso horário
    const gastosMesAtual = this.transacoes
      .filter(t => new Date(t.data + 'T00:00:00').getMonth() === mesAtual && t.tipo === 'DESPESA')
      .reduce((acc, t) => acc + t.valor, 0);

    this.totalMesPassado = this.transacoes
      .filter(t => new Date(t.data + 'T00:00:00').getMonth() === mesPassado && t.tipo === 'DESPESA')
      .reduce((acc, t) => acc + t.valor, 0);

    this.valorDiferenca = gastosMesAtual - this.totalMesPassado;

    this.percentualComparativo = this.totalMesPassado > 0
      ? (this.valorDiferenca / this.totalMesPassado) * 100
      : 0;
  }
}
