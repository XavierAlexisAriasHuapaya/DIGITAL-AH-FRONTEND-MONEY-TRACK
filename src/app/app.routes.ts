import { Routes } from '@angular/router';
import { isNotAuthenticatedGuard } from './authentication/guards/is-not-authenticated.guard';
import { isAuthenticatedGuard } from './authentication/guards/is-authenticated.guard';

export const routes: Routes = [
    {
        path: 'auth',
        canActivate: [isNotAuthenticatedGuard],
        loadChildren: () => import('./authentication/authentication.route').then(r => r.routes)
    },
    {
        path: 'main',
        canActivate: [isAuthenticatedGuard],
        loadChildren: () => import('./shared/layout.route').then(r => r.routes)
    },
    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full'
    }
];
