import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IMessage } from '../model/iMessage';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  messagesCollection: AngularFirestoreCollection<IMessage>;
  messages: Observable<IMessage[]>;

  constructor(private afs: AngularFirestore) {
    this.messagesCollection = this.afs.collection('messages');

    this.messages = this.messagesCollection.snapshotChanges().pipe(
      map(action => action.map(value => {
        const id = value.payload.doc.id;
        const data = value.payload.doc.data() as IMessage;

        return { id, ...data }
      }))
    )
  }

  getMessages(): Observable<IMessage[]> {
    return this.messages
  }

  getMessage(id: string): Observable<IMessage> {
    return this.messagesCollection.doc<IMessage>(id).valueChanges()
  }

  addMessage(data: IMessage): Promise<DocumentReference> {
    return this.messagesCollection.add(data)
  }

  updateMessage(id: string, data: Partial<IMessage>): Promise<void> {
    return this.messagesCollection.doc(id).update(data)
  }

  deleteMessage(id: string): Promise<void> {
    return this.messagesCollection.doc(id).delete()
  }
}
