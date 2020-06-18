import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { IUser } from 'src/app/model/iUser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup
  hide: boolean = true;
  hide2: boolean = true;

  constructor(private fb: FormBuilder, 
    private authService: AuthService, 
    private matSnackBar: MatSnackBar,
    private router: Router) {
    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    })
   }

  ngOnInit(): void {
  }

  async register() {
    try {
      // const email: string = this.signUpForm.get('email').value;
      // const password: string = this.signUpForm.get('password').value;
      const { email, password } = this.signUpForm.value;
      const userData: IUser = {
        name: this.signUpForm.get('name').value,
        email: email
      };
      await this.authService.createUserWithEmailAndPassword(email, password, userData)
      this.signUpForm.reset({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      })
      this.matSnackBar.open('Sign Up Successful', 'Close', {
        duration: 3000
      })

      this.router.navigate(['/login'])

    } catch (error) {
      console.log(error)
      this.matSnackBar.open(error.message, 'Close', {
        duration: 6000
      })
    }
  }

}
