import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Transacao } from '../../models/transacao.model';
import { TransacaoService } from '../../services/transacao.service';
import { Router } from '@angular/router'; // <-- Import corrigido!

@Component({
  selector: 'app-nova-transacao',
  imports: [CommonModule, FormsModule],
  templateUrl: './nova-transacao.html',
  styleUrl: './nova-transacao.scss',
})
export class NovaTransacao {
  transacao: Transacao = {
    descricao: '', // <-- Melhor deixar vazio sem o espaço em branco
    valor: 0,
    data: '',      // <-- Melhor deixar vazio sem o espaço em branco
    tipo: 'DESPESA',
    categoria: '',
  };

  private transacaoService = inject(TransacaoService);
  private router = inject(Router);

  salvar(): void {
    // Verifica se a transação já tem um ID (ou seja, é uma Edição)
    if (this.transacao.id) {

      // Cenário 1: ATUALIZAR (PUT)
      this.transacaoService.atualizarTransacao(this.transacao.id, this.transacao).subscribe({
        next: () => {
          this.router.navigate(['/']); // Volta para o Dashboard
        },
        error: (erro: any) => {
          console.error('Erro ao atualizar', erro);
          alert('Erro ao atualizar transação. Verifique o console.');
        }
      });

    } else {

      // Cenário 2: CRIAR NOVO (POST)
      this.transacaoService.salvar(this.transacao).subscribe({
        next: () => {
          this.router.navigate(['/']); // Volta para o Dashboard
        },
        error: (erro: any) => {
          console.error('Erro ao salvar', erro);
          alert('Erro ao salvar transação. Verifique o console.');
        }
      });

    }
  }// <-- Chave fechando o salvar() corretamente aqui

  cancelar(): void {
    this.router.navigate(['/']);
  }
  ngOnInit(): void {
    // "Desempacota" os dados enviados pelo botão Editar do Dashboard
    const state = history.state;

    // Se existir a bagagem 'dadosParaEditar', preenchemos o formulário!
    if (state && state.dadosParaEditar) {
      this.transacao = state.dadosParaEditar;
    }
  }
}