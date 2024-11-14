import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BudgetFormComponent } from '../budget-form/budget-form.component';
import { BudgetListComponent } from '../budget-list/budget-list.component';
import { BudgetViewComponent } from '../budget-view/budget-view.component';

const routes: Routes = [{
  path: 'new-budget',
  component: BudgetFormComponent
},
{
  path: 'list',
  component: BudgetListComponent,
  children:[
    {
      path: 'budget-details/:id',
      component: BudgetViewComponent
    }
  ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BudgetRoutingModule { }
