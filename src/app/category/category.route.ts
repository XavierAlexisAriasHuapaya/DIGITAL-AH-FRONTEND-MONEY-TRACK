import { Routes } from '@angular/router';
import { isAuthenticatedGuard } from '../authentication/guards/is-authenticated.guard';

export const routes: Routes = [
    {
        path: 'list',
        canActivate: [isAuthenticatedGuard],
        loadComponent: () => import('./category-list/category-list.component').then(m => m.CategoryListComponent),
    },
    {
        path: 'form',
        canActivate: [isAuthenticatedGuard],
        loadComponent: () => import('./category-form/category-form.component').then(m => m.CategoryFormComponent),
    },
    {
        path: 'form/:id',
        canActivate: [isAuthenticatedGuard],
        loadComponent: () => import('./category-form/category-form.component').then(m => m.CategoryFormComponent),
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
    }
]