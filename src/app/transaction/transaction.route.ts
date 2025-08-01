import { Routes } from '@angular/router';
import { isAuthenticatedGuard } from '../authentication/guards/is-authenticated.guard';

export const routes: Routes = [
    {
        path: 'list',
        canActivate: [isAuthenticatedGuard],
        loadComponent: () => import('./transaction-list/transaction-list.component').then(m => m.TransactionListComponent),
    },
    {
        path: 'form',
        canActivate: [isAuthenticatedGuard],
        loadComponent: () => import('./transaction-form/transaction-form.component').then(m => m.TransactionFormComponent),
    },
    {
        path: 'form/:id',
        canActivate: [isAuthenticatedGuard],
        loadComponent: () => import('./transaction-form/transaction-form.component').then(m => m.TransactionFormComponent),
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
    }
]