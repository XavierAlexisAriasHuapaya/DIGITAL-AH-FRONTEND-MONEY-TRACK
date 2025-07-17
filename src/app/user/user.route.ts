import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'form/:id',
        loadComponent: () => import('./user-form/user-form.component').then(m => m.UserFormComponent),
    }
]