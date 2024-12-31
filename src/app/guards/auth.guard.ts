import { Injectable } from '@angular/core';
import {  CanActivate,  Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication-service/authentication.service';



@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
constructor(private authService: AuthenticationService, private router: Router) {}

  // canActivate(): boolean {
  //   if(!this.auth.isAuthenticated()) {
  //     this.router.navigate(['login']);
  //     return false;
  //   }
  //   return true;
  // }


  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    }
    console.error('Access denied - not authenticated');
    this.router.navigate(['login']); // Redirect to login
    return false;
  }
  
}

