import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication-service/authentication.service';
import { Router } from '@angular/router';
// import {FormControl, FormGroup, FormsModule, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent implements OnInit {
  
  
  loginForm!: FormGroup;


  constructor(
    private authService:AuthenticationService,
    private router:Router
  ){}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null,[
        Validators.required,
        Validators.email,
        Validators.minLength(6)
      ]),
      password: new FormControl(null,[
        Validators.required,Validators.minLength(3)])
    })
  }
  
onSubmit(){
  if(this.loginForm.invalid){
    return;
  }
  this.authService.login(this.loginForm.value).pipe(
    
    map(token => this.router.navigate(['home']).then(()=>{
      alert("Login Success");
    }))
  ).subscribe()
}

}

// 



