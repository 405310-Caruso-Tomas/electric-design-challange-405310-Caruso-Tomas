import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',   
        redirectTo: 'budget',
        pathMatch: 'full'
    },
    {
        path: 'budget',
        loadChildren:() => import('./budget/budget.module').then(m => m.BudgetModule)
    },
];
