import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { Observable, Subscription } from 'rxjs';
import { Budget } from '../models/budget';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-budget-view',
  templateUrl: './budget-view.component.html',
  styleUrl: './budget-view.component.css',
})
export class BudgetViewComponent {
  // ADDITIONAL DOCS: same as BudgetListComponent
  id: string = '';
  budget: Budget | undefined;
  getBudgetById$: Observable<any> = new Observable();
  getBudgetById$Subscription: Subscription = new Subscription();
  
  getTypeById$: Observable<any> = new Observable();
  getTypeById$Subscription: Subscription = new Subscription();
  moduleTypes: any[] = [];
  constructor(private router: ActivatedRoute,
    private apiService: ApiService
  ) 
  {
    this.id = this.router.snapshot.params['id'];
    console.log(this.id);
  }

  ngOnInit() {
    this.getBudgetById$= this.apiService.getBudgetById(this.id);
    this.getBudgetById$Subscription=this.getBudgetById$.subscribe((data: any) => {
      this.budget = data;
      console.log(data);
      for(let i=0; i<data.modules.length; i++) {
        this.getTypeById$= this.apiService.getTypesById(data.modules[i].type);
        this.getTypeById$Subscription=this.getTypeById$.subscribe((data: any) => {
          console.log(data);
          this.moduleTypes.push(data);
        });
      }
    });
    console.log(this.moduleTypes);
  }

  ngOnDestroy() {
    this.getBudgetById$Subscription.unsubscribe();
    this.getTypeById$Subscription.unsubscribe();
  }
}
