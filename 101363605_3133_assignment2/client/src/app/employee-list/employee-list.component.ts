import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GraphqlService } from '../graphql/graphql.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})

export class EmployeeListComponent {
  employees: any[] = [];
  displayedColumns: string[] = ['first_name', 'last_name', 'email', 'salary', 'actions'];

  constructor(
    private graphqlService: GraphqlService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.graphqlService.getAllEmployees().subscribe(data => {
      this.employees = data.getAllEmployees;
    });
  }

  addEmployee(): void {
    this.router.navigate(['/add-employee']);
  }

  viewEmployee(id: string): void {
    this.router.navigate([`/employees/${id}/view`]);
  }

  updateEmployee(id: string): void {
    this.router.navigate([`/employees/${id}/update`]);
  }

  deleteEmployee(employeeId: string): void {
    if (confirm('Are you sure you want to delete this Employee?')) {
      this.graphqlService.deleteEmployee(employeeId).subscribe(
        () => {
          console.log('Employee deleted successfully');
          this.loadEmployees();
        },
        error => {
          console.error('Error deleting employee:', error);
        }
      );
    }
  }
}
