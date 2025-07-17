import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'list',
        loadComponent: () => import('./category-list/category-list.component').then(m => m.CategoryListComponent),
    },
    {
        path: 'form',
        loadComponent: () => import('./category-form/category-form.component').then(m => m.CategoryFormComponent),
    },
    {
        path: 'form/:id',
        loadComponent: () => import('./category-form/category-form.component').then(m => m.CategoryFormComponent),
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
    }
]