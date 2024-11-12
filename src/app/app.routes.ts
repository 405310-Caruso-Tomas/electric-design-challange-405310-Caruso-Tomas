import { Routes } from '@angular/router';
import { BudgetFormComponent } from './budget-form/budget-form.component';
import { BudgetListComponent } from './budget-list/budget-list.component';
import { BudgetViewComponent } from './budget-view/budget-view.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'new-budget',
        pathMatch: 'full',
    },
    {
        path: 'new-budget',
        component: BudgetFormComponent
    },
    {
        path: 'list-budget',
        component: BudgetListComponent
    },
    {
        path: 'budget-details/:id',
        component: BudgetViewComponent
    }
];
