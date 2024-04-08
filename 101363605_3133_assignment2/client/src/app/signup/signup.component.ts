import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GraphqlService } from '../graphql/graphql.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent {
  username!: string;
  email!: string;
  password!: string;
  errorMessage!: string;
  hide: boolean = true;

  constructor(
    private graphqlService: GraphqlService,
    private router: Router
  ) { }

  onSubmit(): void {
    // Call the signup method from GraphqlService
    this.graphqlService.signup(this.username, this.email, this.password).subscribe(
      (response) => {
        console.log('Signup successful:', response);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Signup failed:', error);
      }
    );
  }
}
