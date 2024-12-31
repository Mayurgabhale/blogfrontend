import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication-service/authentication.service';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';


export class CustomValidators {
  static passwordcontainsNumber(control: AbstractControl): ValidationErrors | null {
    const regex = /\d/;

    if (regex.test(control.value) && control.value !== null) {
      return null;
    } else {
      return { passwordInvalid: true };
    }
  }

  static passwordsMatch(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value || '';
    const passwordConfirm = control.get('passwordConfirm')?.value || '';

    if (password && passwordConfirm && password === passwordConfirm) {
      return null; 
    }
    return { passwordsNotMatching: true };
  }
}






@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {

  }

  // ngOnInit(): void {
  //   this.registerForm = this.formBuilder.group({
  //     name: [null, [Validators.required]],
  //     username: [null, [Validators.required]],
  //     email: [null, [Validators.required, Validators.email, Validators.minLength(6)]],
  //     password: [null, [Validators.required, Validators.minLength(3),
  //       CustomValidators.passwordcontainsNumber
  //     ]],
  //     passwordConfirm: [null, [Validators.required]]
  //   }, {
  //     Validators:CustomValidators.passwordsMatch
  //   })
  // }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        name: [null, [Validators.required]],
        username: [null, [Validators.required]],
        email: [null, [Validators.required, Validators.email, Validators.minLength(6)]],
        password: [
          null,
          [Validators.required, Validators.minLength(3), CustomValidators.passwordcontainsNumber],
        ],
        passwordConfirm: [null, [Validators.required]],
      },
      { validators: CustomValidators.passwordsMatch } // Correct usage
    );
  }
  


  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }
    console.log(this.registerForm.value);
    this.authService.register(this.registerForm.value).pipe(
      map(user => this.router.navigate(['login']))
    ).subscribe();
  }
}
