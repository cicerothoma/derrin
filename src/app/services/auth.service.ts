import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from './user.service';
import { IUser } from '../model/iUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private userService: UserService) { }



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
}
