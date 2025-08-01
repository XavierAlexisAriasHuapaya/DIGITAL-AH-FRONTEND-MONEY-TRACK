import { Routes } from '@angular/router';
import { isAuthenticatedGuard } from '../authentication/guards/is-authenticated.guard';

export const routes: Routes = [
    {
        path: 'list',
        canActivate: [isAuthenticatedGuard],
        loadComponent: () => import('./bank-list/bank-list.component').then(m => m.BankListComponent),
    },
    {
        path: 'form',
        canActivate: [isAuthenticatedGuard],
        loadComponent: () => import('./bank-form/bank-form.component').then(m => m.BankFormComponent),
    },
    {
        path: 'form/:id',
        canActivate: [isAuthenticatedGuard],
        loadComponent: () => import('./bank-form/bank-form.component').then(m => m.BankFormComponent),
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
    }
]