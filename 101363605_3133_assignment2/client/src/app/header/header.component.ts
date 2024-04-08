import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  isLoggedIn(): boolean {
    console.log('isLoggedIn:', this.authService.isLoggedIn());
    return this.authService.isLoggedIn();
  }

  logout() {
    console.log('logout');
    this.router.navigate(['/login']);
    this.authService.logout();
  }
}
