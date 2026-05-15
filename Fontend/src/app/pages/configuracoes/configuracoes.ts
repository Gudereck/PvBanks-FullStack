import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-configuracoes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './configuracoes.html',
  styleUrls: ['./configuracoes.scss'],
})
export class Configuracoes {
  // Dados simulados do usuário
  usuario = {
    nome: 'Gustavo',
    sobrenome: 'Silva',
    email: 'gustavo@pvbanks.com',
    telefone: '(11) 98765-4321',
    notificacoesApp: true,
    notificacoesEmail: false
  };

  salvarPerfil() {
    // Simulação de salvar
    console.log('Perfil salvo', this.usuario);
    alert('Configurações salvas com sucesso!');
  }
}
