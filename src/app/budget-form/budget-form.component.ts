import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import {Budget, Zone } from '../models/budget';
import { ApiService } from '../api.service';
import { Module } from '../module';
@Component({
  selector: 'app-budget-form',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './budget-form.component.html',
  styleUrl: './budget-form.component.css',
})
export class BudgetFormComponent {
  /* ADDITIONAL DOCS:
    - https://angular.dev/guide/forms/typed-forms#formarray-dynamic-homogenous-collections
    - https://dev.to/chintanonweb/angular-reactive-forms-mastering-dynamic-form-validation-and-user-interaction-32pe
  */
  budget: Budget|undefined;
  moduleTypes:any[] = [];
  budgetForm = new FormGroup({
    date: new FormControl('', [Validators.required, this.dateNonGreather()]),
    client: new FormControl('',[Validators.min(1),Validators.required]),
    modules : new FormArray([],[Validators.required,this.atLeast5Modules(),
      this.max3SlotsPerBox()]),
  });
  zonesMap: Map<string, Zone> = new Map<string, Zone>();

  constructor(private apiService: ApiService) {
    for (const zone of Object.values(Zone)) {
      this.zonesMap.set(zone, zone);
    }
   }
    
  ngOnInit() {
    this.apiService.getTypes().subscribe((data: any) => {
      console.log(data);
      this.moduleTypes = data;
    });
  }

  get modules() {
    return this.budgetForm.get('modules') as FormArray;
  }

  removeModule(index: number) {
    this.modules.removeAt(index);
  }

  max3SlotsPerBox(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const modules = control.value;
      const moduleTypesOfDTO=modules.map((module:any)=>module.type);
      console.log(moduleTypesOfDTO);
      let slots=0; 
      for (let i = 0; i < moduleTypesOfDTO.length; i++) {
        for(let z=0;z<this.moduleTypes.length;z++){
          if(moduleTypesOfDTO[i]===this.moduleTypes[z].id){
            slots=slots+this.moduleTypes[z].slots;  
          }
        }
      }
      return slots > 3 ? { max3SlotsPerBox: true } : null;
    }
  }

  atLeast5Modules(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const modules = control.value;
      return modules.length < 3 ? { atLeast5Modules: true } : null;
    };
  }

  ngSubmit(form : FormGroup){ 
    if(this.budgetForm.valid){
      const today = new Date();
      const formValue = form.value;
      console.log(formValue);
      const budgetDTO:Budget = {
        client: formValue.client ? formValue.client : '',
        modules: formValue.modules ? formValue.modules : [],
        date: formValue.date ? formValue.date : null,
      }
      console.log(this.budgetForm.value);
      this.apiService.postBudget(budgetDTO).subscribe((data: any) => {
        console.log("pasa ",data);
        this.budgetForm.reset();
        alert("Budget created successfully");
      }),
      (error: any) => {
        console.log("error ",error);
        alert("An error occurred while creating the budget");
      }
    };
  }

  addModule() {
    const fg=new FormGroup({
      type: new FormControl('',[Validators.required]),
      price: new FormControl('',[Validators.required,Validators.min(1)]),
      place: new FormControl('',[Validators.required,Validators.min(1)]),
      zone: new FormControl('',[Validators.required]),
    });
    this.modules.push(fg);
  }

  dateNonGreather(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const dateControl=control.value;
      console.log(dateControl);
      console.log(this.formatDate(new Date()));
      console.log(dateControl > this.formatDate(new Date()));
      return dateControl > this.formatDate(new Date()) ? { dateNonGreather: true } : null;
    };
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11, así que sumamos 1
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  
  
  
}
