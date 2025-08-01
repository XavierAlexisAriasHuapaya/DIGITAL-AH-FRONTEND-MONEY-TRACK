import { Routes } from '@angular/router';
import { isAuthenticatedGuard } from '../authentication/guards/is-authenticated.guard';

export const routes: Routes = [
    {
        canActivate: [isAuthenticatedGuard],
        path: 'form/:id',
        loadComponent: () => import('./user-form/user-form.component').then(m => m.UserFormComponent),
    }
]