import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GraphqlService } from '../graphql/graphql.service';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrl: './view-employee.component.css'
})

export class ViewEmployeeComponent {
  employee: any;

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
      });
    }
  }

  backToEmployeeList(): void {
    this.router.navigate(['/employee-list']);
  }
}
