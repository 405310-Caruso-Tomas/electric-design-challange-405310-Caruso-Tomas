import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { BudgetRoutingModule } from './budget-routing.module';
import { BudgetFormComponent } from '../budget-form/budget-form.component';
import { ApiService } from '../api.service';
import { ReactiveFormsModule } from '@angular/forms';
import { BudgetListComponent } from '../budget-list/budget-list.component';
import { BudgetViewComponent } from '../budget-view/budget-view.component';


@NgModule({
  declarations: [BudgetFormComponent, BudgetListComponent,BudgetViewComponent],
  imports: [
    CommonModule,
    BudgetRoutingModule,
    ReactiveFormsModule, CurrencyPipe
  ],
  providers: [ApiService]
})
export class BudgetModule { }
