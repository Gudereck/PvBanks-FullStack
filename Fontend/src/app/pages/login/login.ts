import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  loginData = { email: '', senha: '' }
  private router = inject(Router);

  fazerLogin() {
    if (this.loginData.email && this.loginData.senha) {
      console.log('Login realizado com sucesso', this.loginData);
      this.router.navigate(['/dashboard'])
    } else {
      alert('Preencha todos os campos')
    }
  }

}
