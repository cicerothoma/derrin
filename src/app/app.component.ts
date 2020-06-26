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

  constructor(private fns: AngularFireFunctions,
    private afAuth: AngularFireAuth,
    private matSnackbar: MatSnackBar) {
    // const addAdminRole = this.fns.httpsCallable('addAdminRole');
    // addAdminRole('admin@admin.com').subscribe(value => console.log(value))
  }

  async logout(): Promise<void> {
    await this.afAuth.signOut();
    this.matSnackbar.open('Logout Successful', 'Close', {
      duration: 2000
    })
  }

}

