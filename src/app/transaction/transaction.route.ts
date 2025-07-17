import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'list',
        loadComponent: () => import('./transaction-list/transaction-list.component').then(m => m.TransactionListComponent),
    },
    {
        path: 'form',
        loadComponent: () => import('./transaction-form/transaction-form.component').then(m => m.TransactionFormComponent),
    },
    {
        path: 'form/:id',
        loadComponent: () => import('./transaction-form/transaction-form.component').then(m => m.TransactionFormComponent),
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
    }
]