import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { TransacaoService } from '../../services/transacao.service';
import { Transacao } from '../../models/transacao.model';
import { ConfirmModalService } from '../../components/confirm-modal/confirm-modal.service';

@Component({
  selector: 'app-transacoes',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './transacoes.html',
  styleUrls: ['./transacoes.scss'],
})
export class Transacoes implements OnInit {
  transacoes: Transacao[] = [];
  transacoesFiltradas: Transacao[] = [];
  
  termoBusca: string = '';
  mesAnoFiltro: string = '';
  tipoFiltro: string = ''; // '' = Todos, 'RECEITA' ou 'DESPESA'

  private transacaoService = inject(TransacaoService);
  private router = inject(Router);
  private confirmModal = inject(ConfirmModalService);

  ngOnInit(): void {
    this.carregarTransacoes();
  }

  carregarTransacoes(): void {
    this.transacaoService.listarTodas().subscribe({
      next: (dados) => {
        this.transacoes = dados;
        this.filtrar(); // Aplica filtros iniciais (se houver)
      },
      error: (erro) => console.error('Erro ao carregar transações', erro)
    });
  }

  filtrar(): void {
    const termo = this.termoBusca.toLowerCase();

    this.transacoesFiltradas = this.transacoes.filter(t => {
      // Filtro de Busca (Texto)
      const bateTexto = t.descricao.toLowerCase().includes(termo) ||
        (t.categoria?.toLowerCase() || '').includes(termo);

      // Filtro de Mês/Ano (YYYY-MM)
      const bateMes = this.mesAnoFiltro ? t.data.startsWith(this.mesAnoFiltro) : true;

      // Filtro de Tipo (Receita/Despesa)
      const bateTipo = this.tipoFiltro ? t.tipo === this.tipoFiltro : true;

      return bateTexto && bateMes && bateTipo;
    });
  }

  editarTransacao(transacao: Transacao) {
    this.router.navigate(['/nova'], { state: { dadosParaEditar: transacao } });
  }

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
        // Atualiza a lista local removendo a transação excluída
        this.transacoes = this.transacoes.filter(t => t.id !== id);
        this.filtrar();
      },
      error: (erro) => console.error('Erro ao deletar', erro)
    });
  }
}

