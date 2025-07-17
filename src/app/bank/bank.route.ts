import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'list',
        loadComponent: () => import('./bank-list/bank-list.component').then(m => m.BankListComponent),
    },
    {
        path: 'form',
        loadComponent: () => import('./bank-form/bank-form.component').then(m => m.BankFormComponent),
    },
    {
        path: 'form/:id',
        loadComponent: () => import('./bank-form/bank-form.component').then(m => m.BankFormComponent),
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
    }
]