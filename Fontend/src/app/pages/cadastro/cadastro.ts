import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.scss',
})
export class Cadastro {
  userData = {
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  }
  private router = inject(Router);
  registrarUsuario() {
    if (this.userData.senha !== this.userData.confirmarSenha) {
      alert('Senhas não conferem')
      return;
    }
    console.log('Usuário cadastrado:', this.userData);
    alert('Conta criada com sucesso! Redirecionando para o login...');
    this.router.navigate(['/login']);
  }
}
