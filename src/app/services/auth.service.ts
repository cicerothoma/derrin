import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from './user.service';
import { IUser } from '../model/iUser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, 
    private userService: UserService, 
    private matSnackBar: MatSnackBar,
    private router: Router) { }



  async createUserWithEmailAndPassword(email: string, password: string, userData: IUser) {
    try {
      const user = await this.afAuth.createUserWithEmailAndPassword(email, password);
      if (user.additionalUserInfo.isNewUser) {
        await this.userService.addUser(user.user.uid, userData)
      }
    } catch (error) {
      console.log(error)
    }
  }

  async loginWithEmailAndPassword(email: string, password: string) {
    try {
      const user = await this.afAuth.signInWithEmailAndPassword(email, password);
      this.matSnackBar.open('Login Successful', 'Close', {
        duration: 2000
      })
      const userClaims = await user.user.getIdTokenResult();
      if (userClaims.claims.admin) {
        this.router.navigate(['/admin'])
      }
    } catch (error) {
      this.matSnackBar.open(error.message, 'Close', {
        duration: 6000
      })
    }
  }

  async googleLogin() {
    try {
      const user = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      const userId = user.user.uid;
      const userName = user.user.displayName;
      const userEmail = user.user.email;
      const userPhotoUrl = user.user.photoURL
      if (user.additionalUserInfo.isNewUser) {
        this.userService.addUser(userId, {
          name: userName,
          email: userEmail,
          imageUrl: userPhotoUrl
        })
      }

      const userClaims = await user.user.getIdTokenResult();
      if (userClaims.claims.admin) {
        this.router.navigate(['/admin'])
      }
      
      return user
    } catch (error) {
      this.matSnackBar.open(error.message, 'Close', {
        duration: 6000
      })
    }
  }
}
