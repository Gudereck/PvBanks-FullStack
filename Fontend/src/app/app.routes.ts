import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { NovaTransacao } from './pages/nova-transacao/nova-transacao';
import { Login } from './pages/login/login';
import { Cadastro } from './pages/cadastro/cadastro';
import { Analises } from './pages/analises/analises';
import { Transacoes } from './pages/transacoes/transacoes';
import { Investimentos } from './pages/investimentos/investimentos';
import { Configuracoes } from './pages/configuracoes/configuracoes';
import { Seguranca } from './pages/seguranca/seguranca';
import { DashboardLayoutComponent } from './components/dashboard-layout/dashboard-layout';

export const routes: Routes = [
    { path: '', component: Login },
    { path: 'cadastro', component: Cadastro },
    { path: 'nova', component: NovaTransacao },
    { 
        path: '', 
        component: DashboardLayoutComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'analises', component: Analises },
            { path: 'transacoes', component: Transacoes },
            { path: 'investimentos', component: Investimentos },
            { path: 'configuracoes', component: Configuracoes },
            { path: 'seguranca', component: Seguranca }
        ]
    }
];
