import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { AngularFireFunctions } from '@angular/fire/functions';
import { async } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private matSnackbar: MatSnackBar) {
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

  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
      this.matSnackbar.open('Logout Successful', 'Close', {
        duration: 2000
      })
    } catch (error) {
      this.matSnackbar.open(error.message, 'Close', {
        duration: 4000
      })
    }
  }

}

