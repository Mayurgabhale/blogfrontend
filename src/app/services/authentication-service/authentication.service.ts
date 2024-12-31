import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";
import { User } from '../../model/user.interface';


export interface LoginForm{
  email:string;
  password:string;
};



export const JWT_NAME = 'blog-token';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {



  constructor(private http:HttpClient, private jwtHelper:JwtHelperService ) { }


  // login(loginForm:LoginForm){
  //   return this.http.post<any>('/api/users/login',{email:loginForm.email,password:loginForm.password}).pipe(
  //     map((token) => {
  //       console.log('Login Success!')
  //       localStorage.setItem(JWT_NAME,token.assess_token);
  //       return token;
  //     })
  //   )
  // }

  login(loginForm: LoginForm) {
    return this.http.post<any>('/api/users/login', {
      email: loginForm.email,
      password: loginForm.password
    }).pipe(
      map((res) => {
        console.log('Login Success!');
        if (res && res.assess_token) {
          localStorage.setItem(JWT_NAME, res.assess_token);
          if (res.user) {
            localStorage.setItem('bloguser', JSON.stringify(res.user)); // Save the user data
          }
        }
        return res;
      })
    );
  }
  
  
  

  logout(){
    localStorage.removeItem(JWT_NAME);
  }


  isLoggedIn(): boolean {
    // Example: Check if a token exists in localStorage
    return !!localStorage.getItem(JWT_NAME);
  }

  register(user:User){
    return this.http.post<any>('/api/users/',user).pipe(
      map(user => user)
    )
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(JWT_NAME);
    console.log('Token:', token);
    if (!token) return false;
    return !this.jwtHelper.isTokenExpired(token);
  }
  

  // getUserId():Observable<number>{
  //   return of(localStorage.getItem(JWT_NAME)).pipe(
  //     switchMap((jwt:string)=> of(this.jwtHelper.decodeToken()).pipe(
  //       tap((jwt) => console.log(jwt))
  //       map((jwt) =jwt.user.id))
  //     )
  //   )
  // }

  getUserId(): Observable<number> {
    return of(localStorage.getItem(JWT_NAME)).pipe(
      switchMap((jwt: string | null) => {
        if (!jwt) {
          throw new Error('JWT not found in localStorage');
        }
        const decodedToken = this.jwtHelper.decodeToken(jwt);
        console.log('Decoded Token:', decodedToken);  // Log the decoded token
        return of(decodedToken).pipe(
          map((decoded: any) => {
            if (decoded && decoded.user && decoded.user.id) {
              return decoded.user.id;
            } else {
              throw new Error('User ID not found in decoded token');
            }
          })
        );
      })
    );
  }
  

}


// // ------------------------------
