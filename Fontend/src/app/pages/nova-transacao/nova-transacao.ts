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
    this.transacaoService.salvar(this.transacao).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (erro: any) => {
        console.error('Erro ao salvar', erro);
        alert('Erro ao salvar transação. Verifique o console.');
      }
    });
  } // <-- Chave fechando o salvar() corretamente aqui

  cancelar(): void {
    this.router.navigate(['/']);
  }
}