import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { IUser } from '../model/iUser';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  usersCollection: AngularFirestoreCollection<IUser>;
  users: Observable<IUser[]>
  constructor(private afs: AngularFirestore) {
    this.usersCollection = this.afs.collection('users');

    this.users = this.usersCollection.snapshotChanges().pipe(
      map(action => action.map(value => {
        const id = value.payload.doc.id;
        const data = value.payload.doc.data()

        return {id, ...data}
      }))
    )
  }


  getUsers(): Observable<IUser[]> {
    return this.users
  }

  getUser(id: string): Observable<IUser> {
    return this.usersCollection.doc<IUser>(id).valueChanges()
  }

  addUser(id: string, data: IUser): Promise<void> {
    return this.usersCollection.doc(id).set(data)
  }

  deleteUser(id: string): Promise<void> {
    return this.usersCollection.doc(id).delete()
  }
}
