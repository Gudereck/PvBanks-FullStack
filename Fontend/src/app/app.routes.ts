import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { NovaTransacao } from './pages/nova-transacao/nova-transacao';
import { Login } from './pages/login/login';
import { Cadastro } from './pages/cadastro/cadastro';

export const routes: Routes = [
    { path: '', component: Login },
    { path: 'cadastro', component: Cadastro },
    { path: 'nova', component: NovaTransacao },
    { path: 'dashboard', component: DashboardComponent }
];
