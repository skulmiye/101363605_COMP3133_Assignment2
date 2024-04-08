import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GraphqlService {

  private graphqlEndpoint = 'http://localhost:8084/graphql';

  constructor(private http: HttpClient) { }

  // Method to execute a GraphQL query
  public query(query: string, variables: any = {}): Observable<any> {
    return this.http.post<any>(this.graphqlEndpoint, { query, variables }).pipe(
      map(response => {
        if (response.errors) {
          throw new Error(response.errors[0].message);
        }
        return response.data;
      })
    );
  }

  // Method to execute a GraphQL mutation
  public mutate(mutation: string, variables: any = {}): Observable<any> {
    return this.http.post<any>(this.graphqlEndpoint, { mutation, variables }).pipe(
      map(response => {
        if (response.errors) {
          throw new Error(response.errors[0].message);
        }
        return response.data;
      })
    );
  }

  // User Methods

  // Method for user login
  public login(usernameOrEmail: string, password: string): Observable<any> {
    const loginUrl = `${this.graphqlEndpoint}/user/login`;
    const query = `
      query Login($usernameOrEmail: String!, $password: String!) {
        login(usernameOrEmail: $usernameOrEmail, password: $password) {
          username
        }
      }
    `;
    const variables = { usernameOrEmail, password };
    const requestBody = { query, variables };

    return this.http.post(loginUrl, requestBody).pipe(
      map((response: any) => {
        if (response.errors) {
          const errorMessage = response.errors[0].message;
          return throwError(errorMessage);
        } else {
          const loginResult = response.data.login;
          if (!loginResult.status) {
            return throwError(loginResult.message);
          } else {
            return loginResult.username;
          }
        }
      }),
      catchError((error: any) => {
        console.error('Login failed:', error);
        return throwError('Login failed');
      })
    );
  }

  // Method for user signup
  public signup(username: string, email: string, password: string): Observable<any> {
    const signupUrl = `${this.graphqlEndpoint}/user/signup`;
    const mutation = `
      mutation Signup($username: String!, $email: String!, $password: String!) {
        signup(username: $username, email: $email, password: $password) {
          _id
          username
          email
        }
      }
    `;
    const variables = { username, email, password }; // Define variables for the mutation
    return this.http.post(signupUrl, { query: mutation, variables });
  }

  // Employee Methods
  
  // Method to add a new employee
  public addEmployee(newEmployeeData: any): Observable<any> {
    const addUrl = `${this.graphqlEndpoint}/emp/employees`;
    const mutation = `
      mutation AddEmployee($first_name: String!, $last_name: String!, $email: String!, $gender: String!, $salary: Float!) {
        addEmployee(first_name: $first_name, last_name: $last_name, email: $email, gender: $gender, salary: $salary) {
          _id
          first_name
          last_name
          email
          gender
          salary
        }
      }
    `;

    const variables = {
      first_name: newEmployeeData.first_name,
      last_name: newEmployeeData.last_name,
      email: newEmployeeData.email,
      gender: newEmployeeData.gender,
      salary: newEmployeeData.salary
    };

    return this.http.post(addUrl, {
      query: mutation,
      variables: variables
    }).pipe(
      catchError(error => {
        console.error('Error adding new employee:', error);
        return throwError('Error adding new employee');
      }),
      map((response: any) => {
        const addedEmployee = response?.data?.addEmployee;
        if (!addedEmployee) {
          throw new Error('Failed to add employee. Invalid response from server.');
        }
        return addedEmployee;
      })
    );
  }

  // Method to fetch all employees
  public getAllEmployees(): Observable<any> {
    const query = `
      query {
        getAllEmployees {
          _id
          first_name
          last_name
          email
          salary
        }
      }
    `;
    return this.query(query);
  }

  // Method to view employee details
  public viewEmployee(employeeId: string): Observable<any> {
    const query = `
      query SearchEmployeeById($eid: ID!) {
        searchEmployeeById(eid: $eid) {
          _id
          first_name
          last_name
          email
          gender
          salary
        }
      }
    `;
    return this.query(query, { eid: employeeId });
  }

  // Method to update employee details
  public updateEmployee(employeeId: string, updatedData: any): Observable<any> {
    const updateUrl = `${this.graphqlEndpoint}/emp/employees`;
    const mutation = `
      mutation UpdateEmployee($eid: ID!, $first_name: String!, $last_name: String!, $email: String!, $gender: String!, $salary: Float!) {
        updateEmployee(eid: $eid, first_name: $first_name, last_name: $last_name, email: $email, gender: $gender, salary: $salary) {
          _id
          first_name
          last_name
          email
          gender
          salary
        }
      }
    `;
    const variables = {
      eid: employeeId,
      first_name: updatedData.first_name,
      last_name: updatedData.last_name,
      email: updatedData.email,
      gender: updatedData.gender,
      salary: updatedData.salary
    };
    return this.http.post(updateUrl, { query: mutation, variables }).pipe(
      map((response: any) => {
        if (response.data && response.data.updateEmployee) {
          return response.data.updateEmployee;
        } else {
          throw new Error('Employee update failed or response structure is invalid.');
        }
      }),
      catchError(error => {
        console.error('Error updating employee:', error);
        throw new Error('Employee update failed.');
      })
    );
  }

  // Method to delete an employee
  public deleteEmployee(employeeId: string): Observable<any> {
    const deleteUrl = `${this.graphqlEndpoint}/emp/employees`;
    const mutation = `
      mutation DeleteEmployee($eid: ID!) {
        deleteEmployee(eid: $eid)
      }
    `;
    const variables = { eid: employeeId };

    return this.http.post(deleteUrl, { query: mutation, variables });
  }

}
