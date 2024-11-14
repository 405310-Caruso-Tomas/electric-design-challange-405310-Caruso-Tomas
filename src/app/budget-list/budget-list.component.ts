import { Component, Pipe } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-budget-list',
  standalone: false,
  templateUrl: './budget-list.component.html',
  styleUrl: './budget-list.component.css',
})
export class BudgetListComponent {
  /* ADDITIONAL DOCS:
    - https://angular.dev/guide/components/lifecycle#
    - https://angular.dev/guide/http/making-requests#http-observables
    - https://angular.dev/guide/http/setup#providing-httpclient-through-dependency-injection
    - https://angular.dev/guide/http/making-requests#setting-request-headers
    - https://angular.dev/guide/http/making-requests#handling-request-failure
    - https://angular.dev/guide/http/making-requests#best-practices (async pipe)
    - https://angular.dev/guide/testing/components-scenarios#example-17 (async pipe)
  */

  budgets: any[] = [];
  
  constructor(private apiService: ApiService, 
    private router: Router) {
    console.log("entra");

    
  }

  ngOnInit() {
    this.apiService.getBudgets().subscribe((data: any) => {
      console.log(data);
      this.budgets = data;
    });
  }

  goSeeDetails(id: string) {
    this.router.navigate(['/budget', 'list', 'budget-details', id]);
  }

}
