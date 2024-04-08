import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GraphqlService } from '../graphql/graphql.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  usernameOrEmail!: string;
  password!: string;
  errorMessage!: string;
  hide: boolean = true;
  
  constructor(
    private graphqlService: GraphqlService,
    private router: Router,
    private authService: AuthService
  ) { }

  onSubmit(): void {
    this.graphqlService.login(this.usernameOrEmail, this.password).subscribe(
      (response) => {
        console.log('Login successful:', response);
        this.authService.login();
        this.router.navigate(['/employee-list']);
      },
      (error) => {
        console.error('Login failed:', error);
      }
    );
  }
}
