import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { NovaTransacao } from './pages/nova-transacao/nova-transacao';

export const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'nova', component: NovaTransacao }
];
