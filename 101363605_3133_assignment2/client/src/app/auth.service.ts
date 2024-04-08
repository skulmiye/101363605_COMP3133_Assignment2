import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private isAuthenticated = false;

  // Logic to check if the user is authenticated
  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  // Logic to log the user in
  login() {
    this.isAuthenticated = true;
  }

  // Logic to log the user out
  logout() {
    this.isAuthenticated = false;
  }

  constructor() { }
}
