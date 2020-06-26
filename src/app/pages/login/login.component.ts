import { Component, OnInit } from '@angular/core';
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  faGoogle = faGoogle;
  faFacebook = faFacebook;

  hide: boolean = true;
  loginForm: FormGroup;
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private matSnackbar: MatSnackBar) {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    })
  }

  ngOnInit(): void {
  }

  login() {
    const { email, password } = this.loginForm.value;
    this.authService.loginWithEmailAndPassword(email, password)
  }

  async googleLogin() {
    try {
      await this.authService.googleLogin();
      this.matSnackbar.open('Login Successful', 'Close', {
        duration: 3000
      })
    } catch (error) {
      this.matSnackbar.open(error.message, 'Close', {
        duration: 6000
      })
    }
  }

}
