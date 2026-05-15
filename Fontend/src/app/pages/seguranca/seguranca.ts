import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seguranca',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seguranca.html',
  styleUrls: ['./seguranca.scss'],
})
export class Seguranca {
  twoFactorEnabled = false;

  toggle2FA() {
    this.twoFactorEnabled = !this.twoFactorEnabled;
  }

  mudarSenha() {
    alert('E-mail com instruções para redefinição de senha enviado!');
  }

  desconectar(dispositivo: string) {
    alert(`Desconectado do dispositivo: ${dispositivo}`);
  }
}
