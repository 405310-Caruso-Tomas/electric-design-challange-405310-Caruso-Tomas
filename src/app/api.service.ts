import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Budget } from './models/budget';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly API_URL_types = 'http://localhost:3000/module-types';
  private readonly API_URL_budget = 'http://localhost:3000/budgets';

  constructor(private http: HttpClient) {
  }
  
  getTypes() :Observable<any> {
       return this.http.get<any>(this.API_URL_types);
  }

  postBudget(budget: Budget): Observable<any> {
    return this.http.post<any>(this.API_URL_budget, budget);
  }

  getBudgets(): Observable<any> {
    return this.http.get<any>(this.API_URL_budget);
  }

  getBudgetById(id: string): Observable<any> {
    return this.http.get<any>(`${this.API_URL_budget}/${id}`);
  }
  
}
