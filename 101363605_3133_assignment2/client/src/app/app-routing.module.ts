import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// User components
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
// Employee components
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';


const routes: Routes = [
  // User components
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  // Employee components
  { path: 'employee-list', component: EmployeeListComponent },
  { path: 'add-employee', component: AddEmployeeComponent },
  { path: 'employees/:id/view', component: ViewEmployeeComponent },
  { path: 'employees/:id/update', component: UpdateEmployeeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }