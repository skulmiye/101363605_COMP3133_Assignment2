import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GraphqlService } from '../graphql/graphql.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrl: './update-employee.component.css'
})

export class UpdateEmployeeComponent {
  employee: any;
  updatedEmployee: any = {};

  constructor(
    private graphqlService: GraphqlService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const employeeId = this.route.snapshot.paramMap.get('id');
    if (employeeId) {
      this.graphqlService.viewEmployee(employeeId).subscribe(data => {
        this.employee = data.searchEmployeeById;
        this.updatedEmployee = { ...this.employee };
      });
    }
  }

  updateEmployee(): void {
    const employeeId = this.route.snapshot.paramMap.get('id');
    if (employeeId) {
      this.graphqlService.updateEmployee(employeeId, this.updatedEmployee).subscribe(data => {
        console.log('Employee updated successfully', this.updatedEmployee);
        this.router.navigate(['/employee-list']);
      }, error => {
        console.error('Error updating employee:', error);
      });
    }
  }
  
  cancel(): void {
    this.router.navigate(['/employee-list']);
  }
}
