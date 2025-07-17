import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./authentication/authentication.route').then(r => r.routes)
    },
    {
        path: 'main',
        loadChildren: () => import('./shared/layout.route').then(r => r.routes)
    },
    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full'
    }
];
