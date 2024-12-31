import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthenticationService } from './services/authentication-service/authentication.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'], 
})
export class AppComponent implements OnInit {
  isUserLoggedIn = false;
  userName: string | null = null; 

  constructor(private router: Router, private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    this.isUserLoggedIn = this.authService.isLoggedIn();
    if (this.isUserLoggedIn) {
      const user = localStorage.getItem('bloguser');
      this.userName = user ? JSON.parse(user).name : null; 
    }
  }

  logout() {
    this.authService.logout();
    this.isUserLoggedIn = false;
    this.userName = null; 
    this.router.navigate(['/login']);
  }
}
