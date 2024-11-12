import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-budget-view',
  standalone: true,
  imports: [],
  templateUrl: './budget-view.component.html',
  styleUrl: './budget-view.component.css',
})
export class BudgetViewComponent {
  // ADDITIONAL DOCS: same as BudgetListComponent
  id: string = '';
  budget: any = {};
  constructor(private router: ActivatedRoute,
    private apiService: ApiService
  ) 
  {
    this.id = this.router.snapshot.params['id'];
    console.log(this.id);
  }

  ngOnInit() {
    this.apiService.getBudgetById(this.id).subscribe((data: any) => {
      console.log(data);
      this.budget = data;
    });
  }
}
