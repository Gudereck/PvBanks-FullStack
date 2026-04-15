import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumoFinanceiro, Transacao } from '../../models/transacao.model';
import { TransacaoService } from '../../services/transacao.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'] // <-- Corrigido para styleUrls (plural)
})

export class DashboardComponent implements OnInit {
  // Variável para guardar os números que vêm do Java (inicia zerada)
  resumo: ResumoFinanceiro = { totalReceitas: 0, totalDespesas: 0, saldoTotal: 0 };
  transacoes: Transacao[] = [];
  // Injeta o Service
  private transacaoService = inject(TransacaoService);

  // O ngOnInit roda assim que a tela abre
  ngOnInit(): void {
    this.carregarResumo();
    this.carregarTransacoes();
  }

  carregarResumo(): void {
    this.transacaoService.obterResumo().subscribe({
      next: (dados: any) => {
        this.resumo = dados; // Recebeu do Java, salvou na variável!
      },
      error: (erro: any) => {
        console.error('Erro ao conectar com o back-end', erro);
      }
    });
  }
  carregarTransacoes(): void {
    this.transacaoService.listarTodas().subscribe({
      next: (dados) => {
        this.transacoes = dados;
      },
      error: (erro: any) => {
        console.error('Erro ao conectar com o back-end', erro);
      }
    });
  }
}