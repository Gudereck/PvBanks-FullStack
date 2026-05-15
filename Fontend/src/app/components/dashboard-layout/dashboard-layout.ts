import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  encapsulation: ViewEncapsulation.None,
  template: `
<div class="app-layout">
    <aside class="sidebar" [class.open]="sidebarOpen">
        <div class="sidebar-header">
            <div class="logo">
                <span class="icon">🏦</span> Pv<span>Banks</span>
            </div>
            <button class="close-btn" (click)="toggleSidebar()" aria-label="Fechar menu">✕</button>
        </div>

        <nav class="sidebar-menu">
            <p class="menu-label">MENU PRINCIPAL</p>
            <ul>
                <li routerLinkActive="active"><a routerLink="/dashboard"><span class="icon">📊</span> Painel Geral</a></li>
                <li routerLinkActive="active"><a routerLink="/analises"><span class="icon">📈</span> Análises</a></li>
                <li routerLinkActive="active"><a routerLink="/transacoes"><span class="icon">💳</span> Transações</a></li>
                <li routerLinkActive="active"><a routerLink="/investimentos"><span class="icon">💰</span> Investimentos</a></li>
            </ul>

            <p class="menu-label mt-4">OUTROS</p>
            <ul>
                <li routerLinkActive="active"><a routerLink="/seguranca"><span class="icon">🔒</span> Segurança</a></li>
                <li routerLinkActive="active"><a routerLink="/configuracoes"><span class="icon">⚙️</span> Configurações</a></li>
                <li><a><span class="icon">🎧</span> Suporte</a></li>
            </ul>
        </nav>
    </aside>

    <div class="sidebar-overlay" *ngIf="sidebarOpen" (click)="toggleSidebar()"></div>

    <main class="main-content">
        <header class="topbar">
            <div class="topbar-left">
                <button class="hamburger-btn" (click)="toggleSidebar()" aria-label="Abrir menu">☰</button>
                <div class="welcome-text">
                    <h2>Bem-vindo!</h2>
                    <p>Gerencie seu saldo e suas finanças com eficiência.</p>
                </div>
            </div>
            <div class="user-actions">
                <button class="icon-btn" aria-label="Pesquisar">🔍</button>
                <button class="icon-btn" aria-label="Notificações">🔔</button>
                <div class="avatar">G</div>
            </div>
        </header>

        <div class="dashboard-content">
            <router-outlet></router-outlet>
        </div>
    </main>
</div>
  `,
  styleUrl: '../../pages/dashboard/dashboard.scss'
})
export class DashboardLayoutComponent {
  sidebarOpen = false;

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
