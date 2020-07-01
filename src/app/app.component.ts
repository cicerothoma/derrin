import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  loggedIn: boolean = false;
  isAdmin: boolean = false;

  constructor(private fns: AngularFireFunctions,
    private afAuth: AngularFireAuth,
    private authService: AuthService) {
    // const addAdminRole = this.fns.httpsCallable('addAdminRole');
    // addAdminRole('aderinsolacynthia@gmail.com').subscribe(value => console.log(value))
  }

  ngAfterViewInit(): void {
    this.afAuth.authState.subscribe((res) => {
      if (!res) {
        this.loggedIn = false;
        this.isAdmin = false;
      }
      if (res) {
        this.loggedIn = true;
        res.getIdTokenResult().then((val) => {
          this.isAdmin = val.claims.admin;
        })
      }
    })
  }

  logout() {
    this.authService.logout()
  }

}

