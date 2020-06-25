import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { AngularFireFunctions } from '@angular/fire/functions';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {

  constructor(private fns: AngularFireFunctions) {
    const addAdminRole = this.fns.httpsCallable('addAdminRole');
    addAdminRole('admin@admin.com').subscribe(value => console.log(value))
  }

}

