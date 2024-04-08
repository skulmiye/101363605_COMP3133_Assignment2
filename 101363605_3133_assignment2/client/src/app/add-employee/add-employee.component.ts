import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GraphqlService } from '../graphql/graphql.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})

export class AddEmployeeComponent {
  newEmployee: any = {};

  constructor(
    private graphqlService: GraphqlService,
    private router: Router
  ) { }

  addEmployee(): void {
    this.graphqlService.addEmployee(this.newEmployee).subscribe(
      () => {
        console.log('Employee added successfully', this.newEmployee);
        this.router.navigate(['/employee-list']);
      },
      error => {
        console.error('Error adding employee:', error);
      }
    );
  }

  cancel(): void {
    this.router.navigate(['/employee-list']);
  }
}
