import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./layout/layout.component').then(m => m.LayoutComponent),
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('../dashboard/dashboard/dashboard.component').then(r => r.DashboardComponent)
            },
            {
                path: 'user',
                loadChildren: () => import('../user/user.route').then(r => r.routes)
            },
            {
                path: 'category',
                loadChildren: () => import('../category/category.route').then(r => r.routes)
            },
            {
                path: 'bank',
                loadChildren: () => import('../bank/bank.route').then(r => r.routes)
            },
            {
                path: 'transaction',
                loadChildren: () => import('../transaction/transaction.route').then(r => r.routes)
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'dashboard'
            }
        ]
    }
]